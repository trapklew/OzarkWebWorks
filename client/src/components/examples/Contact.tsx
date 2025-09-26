import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import Contact from '../Contact'

export default function ContactExample() {
  return (
    <TooltipProvider>
      <Contact />
      <Toaster />
    </TooltipProvider>
  );
}