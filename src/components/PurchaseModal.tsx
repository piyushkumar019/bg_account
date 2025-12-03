import { useState } from 'react';
import { X, Trophy, TrendingUp, Shirt, Crosshair, Smile } from 'lucide-react';
import { BGMIAccount, PurchaseInquiry } from '../types';
import { supabase } from '../lib/supabase';

interface PurchaseModalProps {
  account: BGMIAccount;
  onClose: () => void;
}

export function PurchaseModal({ account, onClose }: PurchaseModalProps) {
  const [formData, setFormData] = useState<PurchaseInquiry>({
    account_id: account.id,
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('purchase_inquiries')
        .insert([formData]);

      if (error) throw error;

      setSubmitSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  if (submitSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Inquiry Submitted!</h3>
          <p className="text-gray-600">We'll contact you shortly to complete your purchase.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-8">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Purchase Account</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-5 mb-6 border border-orange-200">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{account.title}</h3>
                <span className={`font-bold text-lg ${getTierColor(account.tier)}`}>
                  {account.tier}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Price</p>
                <p className="text-3xl font-bold text-gray-900">₹{account.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Trophy className="w-4 h-4 text-orange-600" />
                <span>Lvl {account.level}</span>
              </div>
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
                <span>{account.gun_skins_count} Guns</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Smile className="w-4 h-4 text-yellow-600" />
                <span>{account.emotes_count} Emotes</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.customer_email}
                onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.customer_phone}
                onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Message (Optional)
              </label>
              <textarea
                id="message"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                placeholder="Any questions or special requests?"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
