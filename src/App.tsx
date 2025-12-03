import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AccountCard } from './components/AccountCard';
import { PurchaseModal } from './components/PurchaseModal';
import { BGMIAccount } from './types';
import { supabase } from './lib/supabase';
import { Sparkles, Filter } from 'lucide-react';

function App() {
  const [accounts, setAccounts] = useState<BGMIAccount[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<BGMIAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<BGMIAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [tierFilter, setTierFilter] = useState<string>('all');

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    if (tierFilter === 'all') {
      setFilteredAccounts(accounts);
    } else {
      setFilteredAccounts(accounts.filter(acc => acc.tier === tierFilter));
    }
  }, [tierFilter, accounts]);

  const fetchAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('bgmi_accounts')
        .select('*')
        .eq('status', 'available')
        .order('featured', { ascending: false })
        .order('price', { ascending: false });

      if (error) throw error;
      setAccounts(data || []);
      setFilteredAccounts(data || []);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const tiers = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Crown', 'Ace', 'Conqueror'];
  const featuredAccounts = filteredAccounts.filter(acc => acc.featured);
  const regularAccounts = filteredAccounts.filter(acc => !acc.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Buy Premium BGMI Accounts
            </h2>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Discover high-tier accounts with rare skins, exclusive items, and competitive rankings. Start your journey to victory today!
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Filter by Tier:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTierFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  tierFilter === 'all'
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                All Tiers
              </button>
              {tiers.map(tier => (
                <button
                  key={tier}
                  onClick={() => setTierFilter(tier)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    tierFilter === tier
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
              <p className="text-gray-600 mt-4">Loading accounts...</p>
            </div>
          ) : filteredAccounts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No accounts found for this tier.</p>
            </div>
          ) : (
            <>
              {featuredAccounts.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                    <h3 className="text-2xl font-bold text-gray-900">Featured Accounts</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredAccounts.map(account => (
                      <AccountCard
                        key={account.id}
                        account={account}
                        onSelect={setSelectedAccount}
                      />
                    ))}
                  </div>
                </div>
              )}

              {regularAccounts.length > 0 && (
                <div>
                  {featuredAccounts.length > 0 && (
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">More Accounts</h3>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularAccounts.map(account => (
                      <AccountCard
                        key={account.id}
                        account={account}
                        onSelect={setSelectedAccount}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />

      {selectedAccount && (
        <PurchaseModal
          account={selectedAccount}
          onClose={() => setSelectedAccount(null)}
        />
      )}
    </div>
  );
}

export default App;
