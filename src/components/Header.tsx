import { Gamepad2 } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-orange-600 to-red-700 text-white shadow-xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">BGMI Accounts</h1>
              <p className="text-orange-100 text-sm">Premium Game Accounts Marketplace</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
