import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/i18n";
import SEOHead from "@/components/seo-head";

interface FormData {
  title: string;
  description: string;
  tags: string;
  category1: string;
  category2: string;
  violence: string;
  nudity: string;
  sexualContent: string;
  externalUrl: string;
  file: File | null;
  squareThumbnail: File | null;
  verticalThumbnail: File | null;
  agreeToTerms: boolean;
}

/**
 * Visual Novel 업로드 페이지 컴포넌트
 * Canvas 페이지와 일관된 모바일 친화적 디자인 적용
 */
export default function UploadVNPage() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    tags: "",
    category1: "",
    category2: "",
    violence: "",
    nudity: "",
    sexualContent: "",
    externalUrl: "",
    file: null,
    squareThumbnail: null,
    verticalThumbnail: null,
    agreeToTerms: false,
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: keyof FormData, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual upload logic
    console.log("Form data:", formData);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 dark:bg-slate-900">
      <SEOHead 
        title="Upload Visual Novel | Visual Novel Hub"
        description="Upload your visual novel to share with the community. Create and share interactive stories."
        url="https://visual-novel-hub.replit.app/upload-vn"
      />
      
      {/* Header - Canvas 스타일과 일치 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center bg-white dark:bg-slate-800 px-4 py-6 justify-between shadow-sm"
      >
        <Link href="/canvas">
          <Button variant="ghost" size="icon" className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200">
          {getTranslation('uploadVn', language)}
        </h1>
        <div className="w-10" /> {/* Spacer */}
      </motion.div>

      <form onSubmit={handleSubmit} className="px-4 pb-32">
        {/* Thumbnails Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-slate-800 dark:text-slate-200 text-lg font-bold leading-tight tracking-[-0.015em] pb-4 pt-6">
            {getTranslation('thumbnail', language)}
          </h3>
          
          {/* Square Thumbnail */}
          <div className="mb-4">
            <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 px-6 py-12 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Upload className="w-8 h-8 text-slate-400 dark:text-slate-500" />
              <div className="text-center">
                <p className="font-medium text-slate-700 dark:text-slate-300">{getTranslation('uploadSquareThumbnail', language)} (1080x1080)</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">JPG, PNG, 500KB 이하</p>
              </div>
            </div>
          </div>

          {/* Vertical Thumbnail */}
          <div className="mb-6">
            <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 px-6 py-12 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Upload className="w-8 h-8 text-slate-400 dark:text-slate-500" />
              <div className="text-center">
                <p className="font-medium text-slate-700 dark:text-slate-300">{getTranslation('uploadVerticalThumbnail', language)} (1080x1920)</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">JPG, PNG, 700KB 이하</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-slate-800 dark:text-slate-200 text-lg font-bold leading-tight tracking-[-0.015em] pb-4 pt-6">
            {getTranslation('details', language)}
          </h3>
          
          {/* Title */}
          <div className="mb-4">
            <Input
              placeholder={getTranslation('title', language)}
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="h-12 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-slate-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <Textarea
              placeholder={getTranslation('simpleDescription', language)}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="min-h-32 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-slate-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          {/* Tags */}
          <div className="mb-4">
            <Input
              placeholder={getTranslation('tagsCommaSeparated', language)}
              value={formData.tags}
              onChange={(e) => handleInputChange("tags", e.target.value)}
              className="h-12 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-slate-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          {/* Category 1 */}
          <div className="mb-4">
            <Select value={formData.category1} onValueChange={(value) => handleInputChange("category1", value)}>
              <SelectTrigger className="h-12 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400">
                <SelectValue placeholder={getTranslation('category1', language)} />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <SelectItem value="romance" className="text-slate-800 dark:text-slate-200">{getTranslation('romance', language)}</SelectItem>
                <SelectItem value="adventure" className="text-slate-800 dark:text-slate-200">{getTranslation('adventure', language)}</SelectItem>
                <SelectItem value="mystery" className="text-slate-800 dark:text-slate-200">{getTranslation('mystery', language)}</SelectItem>
                <SelectItem value="horror" className="text-slate-800 dark:text-slate-200">{getTranslation('horror', language)}</SelectItem>
                <SelectItem value="comedy" className="text-slate-800 dark:text-slate-200">{getTranslation('comedy', language)}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category 2 */}
          <div className="mb-6">
            <Select value={formData.category2} onValueChange={(value) => handleInputChange("category2", value)}>
              <SelectTrigger className="h-12 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400">
                <SelectValue placeholder={getTranslation('category2', language)} />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <SelectItem value="romance" className="text-slate-800 dark:text-slate-200">{getTranslation('romance', language)}</SelectItem>
                <SelectItem value="adventure" className="text-slate-800 dark:text-slate-200">{getTranslation('adventure', language)}</SelectItem>
                <SelectItem value="mystery" className="text-slate-800 dark:text-slate-200">{getTranslation('mystery', language)}</SelectItem>
                <SelectItem value="horror" className="text-slate-800 dark:text-slate-200">{getTranslation('horror', language)}</SelectItem>
                <SelectItem value="comedy" className="text-slate-800 dark:text-slate-200">{getTranslation('comedy', language)}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Content Rating Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-slate-800 dark:text-slate-200 text-lg font-bold leading-tight tracking-[-0.015em] pb-4 pt-6">
            {getTranslation('contentRating', language)}
          </h3>

          {/* Violence */}
          <div className="mb-4">
            <Select value={formData.violence} onValueChange={(value) => handleInputChange("violence", value)}>
              <SelectTrigger className="h-12 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400">
                <SelectValue placeholder={getTranslation('violence', language)} />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <SelectItem value="none" className="text-slate-800 dark:text-slate-200">{getTranslation('none', language)}</SelectItem>
                <SelectItem value="mild" className="text-slate-800 dark:text-slate-200">{getTranslation('mild', language)}</SelectItem>
                <SelectItem value="moderate" className="text-slate-800 dark:text-slate-200">{getTranslation('moderate', language)}</SelectItem>
                <SelectItem value="intense" className="text-slate-800 dark:text-slate-200">{getTranslation('strong', language)}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Nudity */}
          <div className="mb-4">
            <Select value={formData.nudity} onValueChange={(value) => handleInputChange("nudity", value)}>
              <SelectTrigger className="h-12 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400">
                <SelectValue placeholder={getTranslation('nudity', language)} />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <SelectItem value="none" className="text-slate-800 dark:text-slate-200">{getTranslation('none', language)}</SelectItem>
                <SelectItem value="partial" className="text-slate-800 dark:text-slate-200">{getTranslation('partial', language)}</SelectItem>
                <SelectItem value="full" className="text-slate-800 dark:text-slate-200">{getTranslation('full', language)}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sexual Content */}
          <div className="mb-6">
            <Select value={formData.sexualContent} onValueChange={(value) => handleInputChange("sexualContent", value)}>
              <SelectTrigger className="h-12 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400">
                <SelectValue placeholder={getTranslation('sexualContent', language)} />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <SelectItem value="none" className="text-slate-800 dark:text-slate-200">{getTranslation('none', language)}</SelectItem>
                <SelectItem value="suggestive" className="text-slate-800 dark:text-slate-200">{getTranslation('suggestive', language)}</SelectItem>
                <SelectItem value="explicit" className="text-slate-800 dark:text-slate-200">{getTranslation('explicit', language)}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Work Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-slate-800 dark:text-slate-200 text-lg font-bold leading-tight tracking-[-0.015em] pb-4 pt-6">
            {getTranslation('workUpload', language)}
          </h3>

          {/* External URL */}
          <div className="mb-4">
            <Input
              placeholder={getTranslation('externalUrl', language)}
              value={formData.externalUrl}
              onChange={(e) => handleInputChange("externalUrl", e.target.value)}
              className="h-12 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-slate-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 px-6 py-12 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Upload className="w-8 h-8 text-slate-400 dark:text-slate-500" />
              <div className="text-center">
                <p className="font-medium text-slate-700 dark:text-slate-300">{getTranslation('dragOrSelectFiles', language)}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">최대 파일 크기: 100MB</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Episodes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-slate-800 dark:text-slate-200 text-lg font-bold leading-tight tracking-[-0.015em] pb-4 pt-6">
            {getTranslation('episode', language)}
          </h3>

          <div className="mb-6">
            <div className="flex items-center gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <div className="flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 shrink-0 size-12">
                <Plus className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-slate-800 dark:text-slate-200 text-base font-medium leading-normal">
                  {getTranslation('addEpisode', language)}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                  {getTranslation('startFromEpisode1', language)}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Terms Agreement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <div className="flex items-center space-x-3 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToTerms: !!checked }))}
              className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            />
            <Label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400">
              {getTranslation('agreeToTerms', language)}
            </Label>
          </div>
        </motion.div>
      </form>

      {/* Submit Button - Fixed at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="sticky bottom-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700"
      >
        <div className="max-w-md mx-auto px-4 py-4">
          <Button 
            type="submit"
            onClick={handleSubmit}
            className="w-full h-12 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-base font-bold transition-colors disabled:bg-slate-300 disabled:text-slate-500"
            disabled={!formData.agreeToTerms}
          >
            {getTranslation('createSeries', language)}
          </Button>
        </div>
        <div className="h-4 bg-white dark:bg-slate-800"></div>
      </motion.div>
    </div>
  );
}
