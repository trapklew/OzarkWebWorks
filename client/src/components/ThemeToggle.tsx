import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface ThemeToggleProps {
  isScrolled?: boolean;
}

export default function ThemeToggle({ isScrolled = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`transition-all duration-300 hover:scale-105 ${
        isScrolled
          ? 'text-foreground hover:text-primary hover:bg-primary/10'
          : 'text-white hover:text-primary hover:bg-white/10 backdrop-blur-sm'
      }`}
      data-testid="button-theme-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
}