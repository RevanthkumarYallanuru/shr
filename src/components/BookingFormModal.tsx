/**
 * ============================================================================
 * BOOKING FORM MODAL COMPONENT
 * ============================================================================
 * A popup form for collecting booking details before sending to WhatsApp
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, MapPin, Clock, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
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
import { SITE_CONFIG } from '@/data/data';

// =============================================================================
// FORM VALIDATION SCHEMA
// =============================================================================
const bookingFormSchema = z.object({
  guestName: z.string().min(2, 'Name must be at least 2 characters'),
  mobileNumber: z.string().regex(/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'),
  arrivingFrom: z.string().min(2, 'Please specify where you are arriving from'),
  numberOfGuests: z.number().min(1, 'Number of guests must be at least 1').max(10, 'Maximum 10 guests allowed'),
  checkInDate: z.string().min(1, 'Check-in date is required'),
  checkInTime: z.string().min(1, 'Check-in time is required'),
  numberOfDays: z.number().min(1, 'Number of days must be at least 1'),
  specialRequests: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

// =============================================================================
// BOOKING FORM MODAL PROPS
// =============================================================================
interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomType?: string;
  pricePerNight?: number;
}

// =============================================================================
// MAIN BOOKING FORM MODAL COMPONENT
// =============================================================================
export function BookingFormModal({ 
  isOpen, 
  onClose, 
  roomType = "2BHK Apartment", 
  pricePerNight = 4000 
}: BookingFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      guestName: '',
      mobileNumber: '',
      arrivingFrom: '',
      numberOfGuests: 1,
      checkInDate: '',
      checkInTime: '',
      numberOfDays: 1,
      specialRequests: '',
    },
  });

  // Watch numberOfDays to calculate total amount
  const numberOfDays = form.watch('numberOfDays') || 1;
  const subtotal = pricePerNight * numberOfDays;
  const gstAmount = subtotal * 0.05; // 5% GST
  const totalAmount = subtotal + gstAmount;

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);

    try {
      // Format the booking message
      const message = `
🏨 *BOOKING REQUEST - ${SITE_CONFIG.name}*

👤 *Guest Details:*
• Name: ${data.guestName}
• Mobile: ${data.mobileNumber}
• Arriving from: ${data.arrivingFrom}
• Number of guests: ${data.numberOfGuests}

📅 *Stay Details:*
• Room type: ${roomType}
• Check-in date: ${data.checkInDate}
• Check-in time: ${data.checkInTime}
• Number of days: ${data.numberOfDays}

💰 *Pricing Details:*
• Room rate: ₹${pricePerNight.toLocaleString()}/night
• Subtotal (${data.numberOfDays} ${data.numberOfDays === 1 ? 'day' : 'days'}): ₹${subtotal.toLocaleString()}
• GST (5%): ₹${gstAmount.toLocaleString()}
• *Total Amount: ₹${totalAmount.toLocaleString()}*

${data.specialRequests ? `💬 *Special Requests:*\n${data.specialRequests}\n\n` : ''}Please confirm availability and provide booking confirmation.

Thank you!
      `.trim();

      const encodedMessage = encodeURIComponent(message);
      window.open(`https://api.whatsapp.com/send?phone=${SITE_CONFIG.contact.whatsapp}&text=${encodedMessage}`, '_blank');
      
      onClose();
      form.reset();
    } catch (error) {
      console.error('Booking submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[550px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-serif text-center">
            Book Your Stay
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            {/* Guest Name */}
            <FormField
              control={form.control}
              name="guestName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="flex items-center gap-2 text-sm sm:text-base font-medium">
                    <User className="w-4 h-4" />
                    Guest Name
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your full name" 
                      {...field} 
                      className="h-10 sm:h-11 text-base"
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />

            {/* Mobile Number */}
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="flex items-center gap-2 text-sm sm:text-base font-medium">
                    <Phone className="w-4 h-4" />
                    Mobile Number
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter 10-digit mobile number" 
                      {...field}
                      className="h-10 sm:h-11 text-base"
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

            {/* Arriving From */}
            <FormField
              control={form.control}
              name="arrivingFrom"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="flex items-center gap-2 text-sm sm:text-base font-medium">
                    <MapPin className="w-4 h-4" />
                    Arriving From
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Bangalore, Chennai, Delhi" 
                      {...field} 
                      className="h-10 sm:h-11 text-base"
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />

            {/* Number of Guests & Days */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <FormField
                control={form.control}
                name="numberOfGuests"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="flex items-center gap-2 text-sm sm:text-base font-medium">
                      <Users className="w-4 h-4" />
                      Guests
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        max="10"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        className="h-10 sm:h-11 text-base"
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numberOfDays"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="flex items-center gap-2 text-sm sm:text-base font-medium">
                      <Calendar className="w-4 h-4" />
                      Days
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        className="h-10 sm:h-11 text-base"
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
            </div>

            {/* Check-in Date & Time */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <FormField
                control={form.control}
                name="checkInDate"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm sm:text-base font-medium">Check-in Date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field} 
                        className="h-10 sm:h-11 text-base"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="checkInTime"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="flex items-center gap-2 text-sm sm:text-base font-medium">
                      <Clock className="w-4 h-4" />
                      Check-in Time
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="time" 
                        {...field} 
                        className="h-10 sm:h-11 text-base"
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
            </div>

            {/* Special Requests */}
            <FormField
              control={form.control}
              name="specialRequests"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm sm:text-base font-medium">Special Requests (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any special requirements or preferences..." 
                      {...field} 
                      className="min-h-[80px] sm:min-h-[100px] text-base resize-none"
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />

            {/* Pricing Summary */}
            <div className="bg-secondary p-3 sm:p-4 rounded-lg space-y-2 border border-border">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Room rate ({numberOfDays} {numberOfDays === 1 ? 'day' : 'days'})</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span>GST (5%)</span>
                <span>₹{gstAmount.toLocaleString()}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between items-center font-bold text-base sm:text-lg">
                <span>Total Amount</span>
                <span className="text-accent">₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 sm:h-12 text-sm sm:text-base bg-accent hover:bg-accent/90 text-primary font-bold"
            >
              {isSubmitting ? 'Sending...' : 'Book via WhatsApp'}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Your booking request will be sent via WhatsApp for confirmation
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}