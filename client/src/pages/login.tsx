import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Chrome, Smartphone } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/i18n";

export default function Login() {
  const { loginWithGoogle } = useAuth();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <LogIn className="w-8 h-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              {getTranslation('welcome', language) || 'Welcome'}
            </CardTitle>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              {getTranslation('loginMessage', language) || 'Sign in to access your visual novel library'}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={loginWithGoogle}
                className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm"
                variant="outline"
              >
                <Chrome className="w-5 h-5 mr-3 text-blue-500" />
                {getTranslation('continueWithGoogle', language) || 'Continue with Google'}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                disabled
                className="w-full h-12 bg-gray-100 text-gray-400 cursor-not-allowed"
                variant="outline"
              >
                <Smartphone className="w-5 h-5 mr-3" />
                {getTranslation('continueWithApple', language) || 'Continue with Apple'} 
                <span className="ml-2 text-xs">(Coming Soon)</span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center pt-4"
            >
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {getTranslation('loginTerms', language) || 'By signing in, you agree to our Terms of Service and Privacy Policy'}
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}