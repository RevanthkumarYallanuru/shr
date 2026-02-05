import { Outlet } from 'react-router-dom';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { ScrollToTop } from '@/components/ScrollToTop';

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to main content
      </a>
      <PublicHeader />
      <main className="flex-1 relative" id="main-content" role="main">
        <Outlet />
      </main>
      <PublicFooter />
      <ScrollToTop />
    </div>
  );
}
