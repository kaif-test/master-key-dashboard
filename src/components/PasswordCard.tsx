
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Globe, Mail, Eye, EyeOff, Copy, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Password } from "@/pages/Dashboard";

interface PasswordCardProps {
  password: Password;
  onDelete: (id: string) => void;
}

const PasswordCard = ({ password, onDelete }: PasswordCardProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const getIcon = () => {
    switch (password.type) {
      case "card":
        return <CreditCard className="w-4 h-4" />;
      case "website":
        return <Globe className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
    }
  };

  const getTypeColor = () => {
    switch (password.type) {
      case "card":
        return "bg-green-100 text-green-800";
      case "website":
        return "bg-blue-100 text-blue-800";
      case "email":
        return "bg-purple-100 text-purple-800";
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
      duration: 2000,
    });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this password?")) {
      onDelete(password.id);
      toast({
        title: "Password Deleted",
        description: "The password has been removed from your vault.",
      });
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            {getIcon()}
            {password.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={getTypeColor()}>
              {password.type}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {password.type === "website" && (
          <>
            {password.website && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Website:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono">{password.website}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(password.website!, "Website URL")}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )}
            {password.username && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Username:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono">{password.username}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(password.username!, "Username")}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {password.type === "email" && password.email && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Email:</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono">{password.email}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(password.email!, "Email")}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}

        {password.type === "card" && (
          <>
            {password.cardHolderName && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Holder:</span>
                <span className="text-sm font-mono">{password.cardHolderName}</span>
              </div>
            )}
            {password.cardNumber && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Number:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono">{password.cardNumber}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(password.cardNumber!, "Card Number")}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )}
            {password.expiryDate && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Expiry:</span>
                <span className="text-sm font-mono">{password.expiryDate}</span>
              </div>
            )}
            {password.cvv && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">CVV:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono">{showPassword ? password.cvv : "***"}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(password.cvv!, "CVV")}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {password.type === "card" ? "PIN/Password:" : "Password:"}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono">
              {showPassword ? password.password : "••••••••"}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(password.password, "Password")}
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="text-xs text-gray-400 pt-2 border-t">
          Added: {password.createdAt.toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default PasswordCard;
