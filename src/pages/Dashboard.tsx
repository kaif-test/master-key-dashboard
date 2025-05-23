
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, CreditCard, Globe, Mail, ArrowLeft, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AddPasswordModal from "@/components/AddPasswordModal";
import PasswordCard from "@/components/PasswordCard";

export interface Password {
  id: string;
  type: "card" | "website" | "email";
  title: string;
  username?: string;
  email?: string;
  password: string;
  website?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardHolderName?: string;
  createdAt: Date;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [passwords, setPasswords] = useState<Password[]>([
    {
      id: "1",
      type: "website",
      title: "GitHub",
      username: "john_doe",
      password: "gh_secure123",
      website: "https://github.com",
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      type: "card",
      title: "Visa Credit Card",
      cardNumber: "**** **** **** 1234",
      expiryDate: "12/26",
      cvv: "123",
      cardHolderName: "John Doe",
      password: "1234",
      createdAt: new Date("2024-01-10"),
    },
    {
      id: "3",
      type: "email",
      title: "Personal Gmail",
      email: "john.doe@gmail.com",
      password: "email_pass456",
      createdAt: new Date("2024-01-20"),
    },
  ]);

  const addPassword = (newPassword: Omit<Password, "id" | "createdAt">) => {
    const password: Password = {
      ...newPassword,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setPasswords([...passwords, password]);
  };

  const deletePassword = (id: string) => {
    setPasswords(passwords.filter(p => p.id !== id));
  };

  const getPasswordsByType = (type: string) => {
    return passwords.filter(p => p.type === type);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-gray-600 hover:text-gray-900 self-start"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Button>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              <span className="sm:hidden">Dashboard</span>
              <span className="hidden sm:inline">Password Dashboard</span>
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="sm:hidden">Add</span>
              <span className="hidden sm:inline">Add Password</span>
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50 w-full sm:w-auto"
              size="sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <Card className="p-3 sm:p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 sm:p-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Total Passwords</CardTitle>
              <div className="text-sm sm:text-base">🔒</div>
            </CardHeader>
            <CardContent className="p-0 sm:p-2 pt-2">
              <div className="text-xl sm:text-2xl font-bold">{passwords.length}</div>
            </CardContent>
          </Card>
          
          <Card className="p-3 sm:p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 sm:p-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Card Passwords</CardTitle>
              <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            </CardHeader>
            <CardContent className="p-0 sm:p-2 pt-2">
              <div className="text-xl sm:text-2xl font-bold">{getPasswordsByType("card").length}</div>
            </CardContent>
          </Card>
          
          <Card className="p-3 sm:p-4 sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 sm:p-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Website Passwords</CardTitle>
              <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            </CardHeader>
            <CardContent className="p-0 sm:p-2 pt-2">
              <div className="text-xl sm:text-2xl font-bold">{getPasswordsByType("website").length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Password Categories */}
        <Tabs defaultValue="all" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto p-1">
            <TabsTrigger value="all" className="text-xs sm:text-sm px-2 py-2">
              <span className="sm:hidden">All</span>
              <span className="hidden sm:inline">All Passwords</span>
            </TabsTrigger>
            <TabsTrigger value="card" className="text-xs sm:text-sm px-2 py-2">Cards</TabsTrigger>
            <TabsTrigger value="website" className="text-xs sm:text-sm px-2 py-2">
              <span className="sm:hidden">Web</span>
              <span className="hidden sm:inline">Websites</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="text-xs sm:text-sm px-2 py-2">Email</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {passwords.map((password) => (
                <PasswordCard 
                  key={password.id} 
                  password={password} 
                  onDelete={deletePassword}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="card" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {getPasswordsByType("card").map((password) => (
                <PasswordCard 
                  key={password.id} 
                  password={password} 
                  onDelete={deletePassword}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="website" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {getPasswordsByType("website").map((password) => (
                <PasswordCard 
                  key={password.id} 
                  password={password} 
                  onDelete={deletePassword}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {getPasswordsByType("email").map((password) => (
                <PasswordCard 
                  key={password.id} 
                  password={password} 
                  onDelete={deletePassword}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <AddPasswordModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addPassword}
      />
    </div>
  );
};

export default Dashboard;
