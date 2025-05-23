
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock, Shield, Key } from "lucide-react";
import MasterPasswordModal from "@/components/MasterPasswordModal";

const Index = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="p-4 bg-blue-600 rounded-full shadow-lg">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
            Master Key
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
            Your personal vault for storing and managing passwords securely. 
            One master password protects them all.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure Storage</h3>
            <p className="text-sm text-gray-600">Your passwords are protected with military-grade encryption</p>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-4">
              <Key className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Easy Access</h3>
            <p className="text-sm text-gray-600">Access all your passwords with one master key</p>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Organized</h3>
            <p className="text-sm text-gray-600">Categorize passwords for cards, websites, and accounts</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-8">
          <Button 
            onClick={() => setShowPasswordModal(true)}
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
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
