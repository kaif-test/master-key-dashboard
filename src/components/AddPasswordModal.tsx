
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Globe, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Password } from "@/pages/Dashboard";

interface AddPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (password: Omit<Password, "id" | "createdAt">) => void;
}

const AddPasswordModal = ({ isOpen, onClose, onAdd }: AddPasswordModalProps) => {
  const [type, setType] = useState<"card" | "website" | "email">("website");
  const [formData, setFormData] = useState({
    title: "",
    username: "",
    email: "",
    password: "",
    website: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.password) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields.",
      });
      return;
    }

    onAdd({
      type,
      title: formData.title,
      username: formData.username || undefined,
      email: formData.email || undefined,
      password: formData.password,
      website: formData.website || undefined,
      cardNumber: formData.cardNumber || undefined,
      expiryDate: formData.expiryDate || undefined,
      cvv: formData.cvv || undefined,
      cardHolderName: formData.cardHolderName || undefined,
    });

    toast({
      title: "Password Added",
      description: "Your password has been securely stored.",
    });

    // Reset form
    setFormData({
      title: "",
      username: "",
      email: "",
      password: "",
      website: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardHolderName: "",
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === "card" && <CreditCard className="w-5 h-5 text-blue-600" />}
            {type === "website" && <Globe className="w-5 h-5 text-blue-600" />}
            {type === "email" && <Mail className="w-5 h-5 text-blue-600" />}
            Add New Password
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Password Type</Label>
            <Select value={type} onValueChange={(value: "card" | "website" | "email") => setType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website/App</SelectItem>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
                <SelectItem value="email">Email Account</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="e.g., My Bank Account, Netflix, Gmail"
              required
            />
          </div>

          {type === "website" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="website">Website URL</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  placeholder="Your username"
                />
              </div>
            </>
          )}

          {type === "email" && (
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
          )}

          {type === "card" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="cardHolderName">Card Holder Name</Label>
                <Input
                  id="cardHolderName"
                  value={formData.cardHolderName}
                  onChange={(e) => handleInputChange("cardHolderName", e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                    placeholder="MM/YY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    placeholder="123"
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">
              {type === "card" ? "PIN/Password *" : "Password *"}
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Add Password
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPasswordModal;
