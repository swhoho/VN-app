import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

export default function ComingSoonModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleShowModal = () => {
      setIsOpen(true);
    };

    window.addEventListener('show-coming-soon', handleShowModal);
    
    return () => {
      window.removeEventListener('show-coming-soon', handleShowModal);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Clock className="w-8 h-8 text-primary" />
            </motion.div>
            
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Coming Soon!
            </h3>
            
            <p className="text-slate-600 text-sm mb-6">
              This feature is currently under development. Stay tuned for updates!
            </p>
            
            <Button 
              onClick={handleClose}
              className="bg-primary hover:bg-primary/90 text-white px-6"
            >
              Got it!
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
