import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Play, Bookmark, Share2, Star, Heart } from "lucide-react";
import type { Item } from "@/types";
import SEOHead from "@/components/seo-head";

export default function NovelDetail() {
  const [, params] = useRoute("/novel/:id");
  const novelId = parseInt(params?.id || "0");

  const { data: novel, isLoading } = useQuery<Item>({
    queryKey: ["/api/items", novelId],
    enabled: !!novelId,
  });

  const handleStartReading = () => {
    const event = new CustomEvent('show-coming-soon');
    window.dispatchEvent(event);
  };

  const handleBack = () => {
    window.history.back();
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto">
        <Skeleton className="h-64 w-full" />
        <div className="p-6 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  if (!novel) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <p className="text-slate-600">Novel not found</p>
        <Button onClick={handleBack} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  // Mock progress for demo
  const currentChapter = 3;
  const totalChapters = 12; // Mock total chapters
  const progressPercentage = (currentChapter / totalChapters) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto bg-white min-h-screen"
    >
      <SEOHead 
        title={`${novel.title} - Visual Novel | Visual Novel Hub`}
        description={`Read ${novel.title} - ${novel.description ? novel.description.slice(0, 150) + '...' : 'Interactive visual novel story.'} Join thousands of readers enjoying this visual novel on Visual Novel Hub.`}
        url={`https://visual-novel-hub.replit.app/novel/${novel.id}`}
        image={novel.image}
        type="article"
        keywords={`${novel.title}, visual novel, interactive story, ${novel.tags?.join(', ')}`}
      />
      {/* Header with Cover */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={novel.image} 
          alt={novel.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-black/20 text-white hover:bg-black/40"
          onClick={handleBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Novel Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="text-2xl font-bold mb-2">{novel.title}</h1>
          <p className="text-white/80 text-sm mb-3">Visual Novel</p>
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              {novel.tags?.[0] || 'Novel'}
            </Badge>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm">{novel.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span className="text-sm">{(novel.likeCount / 1000).toFixed(1)}K</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Status and Chapter Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-sm font-medium text-green-600">
                Complete
              </span>
            </div>
            <span className="text-sm text-slate-600">
              {totalChapters} chapters
            </span>
          </div>
        </motion.div>

        {/* Synopsis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-3">Synopsis</h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            {novel.description}
          </p>
        </motion.div>

        {/* Reading Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Reading Progress</CardTitle>
                <span className="text-sm text-slate-500">
                  Chapter {currentChapter} of {totalChapters}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={progressPercentage} className="mb-2" />
              <p className="text-xs text-slate-500">
                {progressPercentage.toFixed(0)}% completed
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg"
            onClick={handleStartReading}
          >
            <Play className="w-5 h-5 mr-2" />
            {currentChapter > 0 ? "Continue Reading" : "Start Reading"}
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="py-3">
              <Bookmark className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" className="py-3">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Premium content section - always show for demo */}
          {Math.random() > 0.5 && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-yellow-800">Premium Content</p>
                    <p className="text-xs text-yellow-600">
                      Unlock with Premium membership or Points
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
