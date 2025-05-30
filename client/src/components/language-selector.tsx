import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe } from "lucide-react";
import { languages, getTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageSelect = (langCode: string) => {
    onLanguageChange(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="w-5 h-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Language Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-12 z-50"
            >
              <Card className="w-64 max-h-80 overflow-y-auto bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg">
                <CardContent className="p-2">
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-3 py-2 border-b border-slate-200 dark:border-slate-700">
                    {getTranslation('selectLanguage', currentLanguage)}
                  </div>
                  <div className="mt-2 space-y-1">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageSelect(language.code)}
                        className={cn(
                          "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
                          "hover:bg-slate-100 dark:hover:bg-slate-700",
                          currentLanguage === language.code 
                            ? "bg-primary/10 text-primary" 
                            : "text-slate-700 dark:text-slate-300"
                        )}
                      >
                        <span className="text-lg">{language.flag}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">
                            {language.nativeName}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {language.name}
                          </div>
                        </div>
                        {currentLanguage === language.code && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}