
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock, Shield, Key } from "lucide-react";
import MasterPasswordModal from "@/components/MasterPasswordModal";

const Index = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 w-full">
        {/* Hero Section */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex justify-center">
            <div className="p-3 sm:p-4 bg-blue-600 rounded-full shadow-lg">
              <Shield className="w-8 h-8 sm:w-10 lg:w-12 sm:h-10 lg:h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight px-2">
            Master Key
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto px-4">
            Your personal vault for storing and managing passwords securely. 
            One master password protects them all.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 px-4 sm:px-0">
          <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Secure Storage</h3>
            <p className="text-xs sm:text-sm text-gray-600">Your passwords are protected with military-grade encryption</p>
          </div>
          
          <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Key className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Easy Access</h3>
            <p className="text-xs sm:text-sm text-gray-600">Access all your passwords with one master key</p>
          </div>
          
          <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Organized</h3>
            <p className="text-xs sm:text-sm text-gray-600">Categorize passwords for cards, websites, and accounts</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-6 sm:pt-8 px-4">
          <Button 
            onClick={() => setShowPasswordModal(true)}
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 w-full sm:w-auto"
          >
            Show Dashboard
          </Button>
        </div>
      </div>

      <MasterPasswordModal 
        isOpen={showPasswordModal} 
        onClose={() => setShowPasswordModal(false)} 
      />
    </div>
  );
};

export default Index;
