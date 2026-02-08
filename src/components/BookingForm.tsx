import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { sendBookingToWhatsApp, sendBookingConfirmationToGuest } from '@/lib/whatsapp';
import { useToast } from '@/hooks/use-toast';

const bookingFormSchema = z.object({
  guestName: z.string().min(2, 'Name must be at least 2 characters'),
  guestEmail: z.string().email('Invalid email address'),
  guestPhone: z.string().regex(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number'),
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  guests: z.number().min(1, 'Number of guests is required'),
  specialRequests: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  roomName: string;
  roomPrice: number;
  roomId: string;
}

export function BookingForm({ isOpen, onClose, roomName, roomPrice, roomId }: BookingFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [nights, setNights] = useState(1);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      guestName: '',
      guestEmail: '',
      guestPhone: '',
      checkIn: '',
      checkOut: '',
      guests: 1,
      specialRequests: '',
    },
  });

  const checkInDate = form.watch('checkIn');
  const checkOutDate = form.watch('checkOut');

  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const calculatedNights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      if (calculatedNights > 0) {
        setNights(calculatedNights);
      }
    }
  };

  const onSubmit = async (data: BookingFormValues) => {
    calculateNights();
    setIsLoading(true);

    try {
      const totalAmount = roomPrice * nights;

      // Prepare booking details
      const bookingDetails = {
        guestName: data.guestName,
        guestPhone: data.guestPhone,
        guestEmail: data.guestEmail,
        roomName: roomName,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        guests: data.guests,
        totalAmount: totalAmount,
        specialRequests: data.specialRequests,
      };

      // Send to admin via WhatsApp
      sendBookingToWhatsApp(bookingDetails);

      // Show success toast
      toast({
        title: 'Booking Request Sent!',
        description: 'Your booking details have been sent to our team via WhatsApp. We will confirm your reservation shortly.',
        duration: 5000,
      });

      // Close the form
      setTimeout(() => {
        onClose();
        form.reset();
      }, 1000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send booking request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const totalAmount = roomPrice * nights;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-lg sm:text-xl">Book {roomName}</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Fill in your details and we'll confirm your booking via WhatsApp
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="guestName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm sm:text-base font-medium">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} className="text-base sm:text-base h-10 sm:h-11" />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="guestEmail"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm sm:text-base font-medium">Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} className="text-base sm:text-base h-10 sm:h-11" />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="guestPhone"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm sm:text-base font-medium">WhatsApp Number (10 digits)</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="9876543210"
                      maxLength="10"
                      {...field}
                      className="text-base sm:text-base h-10 sm:h-11"
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />

            {/* Check-in */}
            <FormField
              control={form.control}
              name="checkIn"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm sm:text-base font-medium">Check-in Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="text-base sm:text-base h-10 sm:h-11"
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                        field.onChange(e);
                        calculateNights();
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />

            {/* Check-out */}
            <FormField
              control={form.control}
              name="checkOut"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm sm:text-base font-medium">Check-out Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="text-base sm:text-base h-10 sm:h-11"
                      min={checkInDate || new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                        field.onChange(e);
                        calculateNights();
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />

            {/* Guests */}
            <FormField
              control={form.control}
              name="guests"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm sm:text-base font-medium">Number of Guests</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      {...field}
                      className="text-base sm:text-base h-10 sm:h-11"
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Special Requests */}
            <FormField
              control={form.control}
              name="specialRequests"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm sm:text-base font-medium">Special Requests (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any special requests for your stay?" {...field} className="text-base sm:text-base min-h-[80px] sm:min-h-[100px] resize-none" />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />

            {/* Price Summary */}
            <div className="bg-secondary p-3 sm:p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">₹{roomPrice}/night × {nights} nights</span>
                <span className="font-medium">₹{totalAmount}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-semibold text-sm sm:text-base">
                <span>Total Amount</span>
                <span className="text-accent text-base sm:text-lg">₹{totalAmount}</span>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="btn-gold w-full text-sm sm:text-base h-10 sm:h-11"
            >
              {isLoading ? 'Processing...' : 'Send Booking Request via WhatsApp'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
