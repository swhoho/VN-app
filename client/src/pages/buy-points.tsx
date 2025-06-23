import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Coins, Star, Crown } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import SEOHead from "@/components/seo-head";

// Initialize Stripe
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

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
    price: "$2.99",
    points: 100,
    title: "Starter",
    isPopular: false,
    discountPercent: 0,
  },
  {
    id: 2,
    price: "$9.99",
    points: 500,
    title: "Popular",
    isPopular: true,
    discountPercent: 25,
  },
  {
    id: 3,
    price: "$19.99",
    points: 1200,
    title: "Best Value",
    isPopular: false,
    discountPercent: 40,
  },
  {
    id: 4,
    price: "$39.99",
    points: 2800,
    title: "Premium",
    isPopular: false,
    discountPercent: 55,
  },
  {
    id: 5,
    price: "$79.99",
    points: 6500,
    title: "Mega",
    isPopular: false,
    discountPercent: 70,
  },
];

// Payment Form Component
const CheckoutForm = ({ selectedPackage, onSuccess, onCancel }: {
  selectedPackage: PointsPackage;
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/buy-points',
        },
        redirect: 'if_required',
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment succeeded, add points to user account
        await apiRequest("POST", "/api/points/purchase", {
          packageId: selectedPackage.id,
          points: selectedPackage.points,
          paymentIntentId: paymentIntent.id
        });

        toast({
          title: "Purchase Successful",
          description: "Points have been added to your account!",
        });
        queryClient.invalidateQueries({ queryKey: ["/api/user"] });
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your purchase.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto px-4 py-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Complete Purchase</CardTitle>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{selectedPackage.points} Points</p>
            <p className="text-lg text-slate-600 dark:text-slate-400">{selectedPackage.price}</p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!stripe || isLoading}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                {isLoading ? "Processing..." : `Pay ${selectedPackage.price}`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function BuyPoints() {
  const [selectedPackage, setSelectedPackage] = useState<PointsPackage | null>(null);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();

  // Create payment intent when package is selected
  useEffect(() => {
    if (selectedPackage) {
      const createPaymentIntent = async () => {
        try {
          const response = await apiRequest("POST", "/api/create-payment-intent", {
            amount: parseFloat(selectedPackage.price.replace('$', '')),
            packageId: selectedPackage.id,
          });
          const data = await response.json();
          setClientSecret(data.clientSecret);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to initialize payment. Please try again.",
            variant: "destructive",
          });
          setSelectedPackage(null);
        }
      };
      createPaymentIntent();
    }
  }, [selectedPackage, toast]);

  const handlePurchase = (pkg: PointsPackage) => {
    setSelectedPackage(pkg);
  };

  const handlePaymentSuccess = () => {
    setSelectedPackage(null);
    setClientSecret("");
    setLocation("/my-page");
  };

  const handlePaymentCancel = () => {
    setSelectedPackage(null);
    setClientSecret("");
  };

  const getPackageIcon = (pkg: PointsPackage) => {
    if (pkg.points >= 5000) return Crown;
    if (pkg.points >= 1000) return Star;
    return Coins;
  };

  const getPackageColor = (pkg: PointsPackage) => {
    if (pkg.points >= 5000) return "from-purple-500 to-pink-500";
    if (pkg.points >= 1000) return "from-blue-500 to-cyan-500";
    return "from-yellow-500 to-orange-500";
  };

  // Show payment form if package is selected and clientSecret is available
  if (selectedPackage && clientSecret) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm 
          selectedPackage={selectedPackage}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      </Elements>
    );
  }

  // Show loading state while creating payment intent
  if (selectedPackage && !clientSecret) {
    return (
      <div className="max-w-md mx-auto px-4 py-6">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Initializing payment...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <SEOHead 
        title="Buy Points - Unlock Premium Visual Novel Content | Visual Novel Hub"
        description="Purchase points to unlock premium visual novel chapters and exclusive content. Choose from affordable packages starting at $2.99. Secure payment with Stripe."
        url="https://visual-novel-hub.replit.app/buy-points"
        keywords="buy points, premium content, visual novel chapters, in-app purchase, unlock stories, stripe payment"
      />
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700"
      >
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/my-page")}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200">Buy Points</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </motion.div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Current Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-1">
                {user?.points || 0} Points
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Current Balance</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Points Packages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Choose Points Package
          </h3>
          
          {pointsPackages.map((pkg, index) => {
            const IconComponent = getPackageIcon(pkg);
            const gradientColor = getPackageColor(pkg);
            
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  pkg.isPopular ? 'ring-2 ring-primary ring-opacity-50' : ''
                }`}>
                  {pkg.isPopular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-white px-3 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientColor} flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-slate-200">{pkg.title}</h4>
                          <p className="text-lg font-bold text-primary">{pkg.points} Points</p>
                          {pkg.discountPercent > 0 && (
                            <p className="text-sm text-green-600 dark:text-green-400">
                              {pkg.discountPercent}% bonus
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{pkg.price}</p>
                        <Button
                          onClick={() => handlePurchase(pkg)}
                          size="sm"
                          className="mt-2 bg-primary hover:bg-primary/90"
                        >
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About Points</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
              <p>• Use points to unlock premium chapters</p>
              <p>• Points never expire</p>
              <p>• Secure payment with Stripe</p>
              <p>• Instant delivery to your account</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}