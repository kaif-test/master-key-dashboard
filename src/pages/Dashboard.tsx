
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, CreditCard, Globe, Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Password Dashboard</h1>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Password
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Passwords</CardTitle>
              <div className="w-4 h-4 text-blue-600">🔒</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{passwords.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Card Passwords</CardTitle>
              <CreditCard className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getPasswordsByType("card").length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Website Passwords</CardTitle>
              <Globe className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getPasswordsByType("website").length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Password Categories */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Passwords</TabsTrigger>
            <TabsTrigger value="card">Cards</TabsTrigger>
            <TabsTrigger value="website">Websites</TabsTrigger>
            <TabsTrigger value="email">Email Accounts</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
