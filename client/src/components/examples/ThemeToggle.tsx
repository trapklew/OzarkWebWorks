import { ThemeProvider } from '../ThemeProvider';
import ThemeToggle from '../ThemeToggle';

export default function ThemeToggleExample() {
  return (
    <ThemeProvider>
      <div className="p-8 space-y-4">
        <h3 className="text-lg font-semibold">Theme Toggle</h3>
        <div className="flex items-center space-x-4">
          <span>Light mode:</span>
          <ThemeToggle isScrolled={true} />
        </div>
        <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded">
          <span className="text-white">On dark background:</span>
          <ThemeToggle isScrolled={false} />
        </div>
      </div>
    </ThemeProvider>
  );
}