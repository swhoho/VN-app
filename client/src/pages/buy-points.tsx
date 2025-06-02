import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Coins, Star, Crown } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface PointsPackage {
  id: number;
  price: string;
  points: number;
  title: string;
  isPopular: boolean;
  discountPercent: number;
}

const pointsPackages: PointsPackage[] = [
  {
    id: 1,
    price: "3.00",
    points: 30,
    title: "Basic",
    isPopular: false,
    discountPercent: 0,
  },
  {
    id: 2,
    price: "7.00",
    points: 77,
    title: "Popular",
    isPopular: true,
    discountPercent: 8,
  },
  {
    id: 3,
    price: "14.00",
    points: 168,
    title: "Great Value",
    isPopular: false,
    discountPercent: 16,
  },
  {
    id: 4,
    price: "30.00",
    points: 390,
    title: "Premium",
    isPopular: false,
    discountPercent: 23,
  },
  {
    id: 5,
    price: "70.00",
    points: 1015,
    title: "Ultimate",
    isPopular: false,
    discountPercent: 31,
  },
  {
    id: 6,
    price: "140.00",
    points: 6667,
    title: "Mega",
    isPopular: false,
    discountPercent: 70,
  },
];

export default function BuyPoints() {
  const [selectedPackage, setSelectedPackage] = useState<PointsPackage | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const purchaseMutation = useMutation({
    mutationFn: async (packageData: PointsPackage) => {
      return await apiRequest("POST", "/api/points/purchase", {
        packageId: packageData.id,
        amount: packageData.price,
        points: packageData.points,
      });
    },
    onSuccess: () => {
      toast({
        title: "Purchase Successful",
        description: "Points have been added to your account!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      navigate("/my-page");
    },
    onError: (error) => {
      toast({
        title: "Purchase Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handlePurchase = (pkg: PointsPackage) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to purchase points.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedPackage(pkg);
    purchaseMutation.mutate(pkg);
  };

  const getPackageIcon = (pkg: PointsPackage) => {
    if (pkg.discountPercent >= 50) return <Crown className="w-6 h-6 text-purple-600" />;
    if (pkg.isPopular) return <Star className="w-6 h-6 text-yellow-600" />;
    return <Coins className="w-6 h-6 text-blue-600" />;
  };

  const getPackageColor = (pkg: PointsPackage) => {
    if (pkg.discountPercent >= 50) return "border-purple-200 bg-purple-50 dark:bg-purple-950/20";
    if (pkg.isPopular) return "border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20";
    return "border-slate-200 bg-white dark:bg-slate-800";
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3 mb-6"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/my-page")}
          className="p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
          Buy Points
        </h1>
      </motion.div>

      {/* Current Balance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Coins className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-1">
              {user?.points || 0}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Current Points</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Points Packages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
          Choose Your Package
        </h3>
        
        {pointsPackages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className={`relative ${getPackageColor(pkg)} hover:shadow-lg transition-all duration-200`}>
              {pkg.isPopular && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
                    Most Popular
                  </Badge>
                </div>
              )}
              {pkg.discountPercent >= 50 && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-500 hover:bg-purple-600 text-white">
                    Best Value
                  </Badge>
                </div>
              )}
              
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                      {getPackageIcon(pkg)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                        {pkg.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {pkg.points.toLocaleString()} Points
                      </p>
                      {pkg.discountPercent > 0 && (
                        <p className="text-xs text-green-600 dark:text-green-400">
                          {pkg.discountPercent}% Extra Bonus
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                      ${pkg.price}
                    </div>
                    <Button
                      onClick={() => handlePurchase(pkg)}
                      disabled={purchaseMutation.isPending && selectedPackage?.id === pkg.id}
                      className="mt-2 w-20"
                      size="sm"
                    >
                      {purchaseMutation.isPending && selectedPackage?.id === pkg.id
                        ? "..."
                        : "Buy"
                      }
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg"
      >
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
          About Points
        </h4>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• Use points to unlock premium content</li>
          <li>• Points never expire</li>
          <li>• Secure payment processing</li>
          <li>• Instant delivery to your account</li>
        </ul>
      </motion.div>
    </div>
  );
}