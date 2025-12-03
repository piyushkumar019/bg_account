import { Trophy, TrendingUp, Shirt, Crosshair, Smile } from 'lucide-react';
import { BGMIAccount } from '../types';

interface AccountCardProps {
  account: BGMIAccount;
  onSelect: (account: BGMIAccount) => void;
}

export function AccountCard({ account, onSelect }: AccountCardProps) {
  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      Bronze: 'text-orange-600',
      Silver: 'text-gray-400',
      Gold: 'text-yellow-500',
      Platinum: 'text-cyan-400',
      Diamond: 'text-blue-400',
      Crown: 'text-purple-500',
      Ace: 'text-red-500',
      Conqueror: 'text-red-600',
    };
    return colors[tier] || 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
      <div className="relative h-48 bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center">
        <Trophy className="w-24 h-24 text-white opacity-30" />
        {account.featured && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
            FEATURED
          </div>
        )}
        <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Level {account.level}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900">{account.title}</h3>
          <span className={`font-bold text-lg ${getTierColor(account.tier)}`}>
            {account.tier}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{account.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span>{account.uc_amount} UC</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Shirt className="w-4 h-4 text-blue-600" />
            <span>{account.skins_count} Skins</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Crosshair className="w-4 h-4 text-red-600" />
            <span>{account.gun_skins_count} Gun Skins</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Smile className="w-4 h-4 text-yellow-600" />
            <span>{account.emotes_count} Emotes</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="text-2xl font-bold text-gray-900">₹{account.price.toLocaleString()}</p>
          </div>
          <button
            onClick={() => onSelect(account)}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
