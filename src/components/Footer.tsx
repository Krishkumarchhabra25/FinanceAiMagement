import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-5"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full opacity-5"></div>
      </div>
      
      {/* Newsletter section */}
      <div className="border-b border-gray-800 relative z-10">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Stay Updated with Financial Insights
            </h3>
            <p className="text-gray-400 mb-6">
              Get the latest tips, insights, and updates delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <Button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-300 group">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main footer content */}
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-4">
                FinanceAI
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Empowering individuals and businesses with AI-powered financial management tools for a smarter financial future.
              </p>
            </div>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <div key={index} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-green-600 transition-all duration-300 cursor-pointer group">
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Product</h3>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Integrations', 'API', 'Security', 'Enterprise'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
            <ul className="space-y-3">
              {['Help Center', 'Documentation', 'Community', 'Contact Us', 'Status', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>support@financeai.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 text-green-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-purple-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>
            
            {/* Trust badges */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>256-bit SSL Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom bar */}
      <div className="border-t border-gray-800 relative z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} FinanceAI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Cookie Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
