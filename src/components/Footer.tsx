import { Mail, Phone, Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400 leading-relaxed">
              Your trusted marketplace for premium BGMI accounts. We offer secure transactions and verified accounts with detailed information.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5" />
                <span>contact@bgmiaccounts.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5" />
                <span>+91 XXXXX XXXXX</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Safe & Secure</h3>
            <div className="flex items-start gap-3 text-gray-400">
              <Shield className="w-5 h-5 mt-1 flex-shrink-0" />
              <p className="leading-relaxed">
                All transactions are secure. We verify every account before listing and provide complete account details.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 BGMI Accounts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
