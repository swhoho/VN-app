import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { Item } from "@shared/schema";
import { getItemTranslation, getTagTranslation } from "@/lib/i18n";
import { useLanguage } from "@/hooks/use-language";

interface NovelCardProps {
  novel: Item;
}

export default function NovelCard({ novel }: NovelCardProps) {
  const { language } = useLanguage();
  
  const handleClick = () => {
    window.location.href = `/novel/${novel.id}`;
  };

  const translatedTitle = getItemTranslation(novel.title, 'title', language);
  const translatedDescription = getItemTranslation(novel.title, 'description', language);
  const displayDescription = translatedDescription !== novel.title ? translatedDescription : (novel.description || "No description available");
  const translatedTag = getTagTranslation(novel.tags[0] || 'Visual Novel', language);

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <div className="flex">
          <div className="w-24 h-32 flex-shrink-0">
            <img 
              src={novel.image} 
              alt={translatedTitle}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 text-sm line-clamp-1">
                  {translatedTitle}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {novel.viewCount} views • {novel.likeCount} likes
                </p>
              </div>
              <Badge 
                variant="secondary" 
                className="ml-2 text-xs"
              >
                {translatedTag}
              </Badge>
            </div>
            
            <p className="text-xs text-slate-600 mb-3 line-clamp-2">
              {displayDescription}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs text-slate-500">{novel.rating}</span>
              </div>
              <Badge 
                variant={novel.featured ? "default" : "outline"}
                className="text-xs"
              >
                {novel.featured ? "Featured" : "Regular"}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
