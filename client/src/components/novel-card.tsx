import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { Novel } from "@shared/schema";

interface NovelCardProps {
  novel: Novel;
}

export default function NovelCard({ novel }: NovelCardProps) {
  const handleClick = () => {
    window.location.href = `/novel/${novel.id}`;
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <div className="flex">
          <div className="w-24 h-32 flex-shrink-0">
            <img 
              src={novel.coverImage} 
              alt={novel.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 text-sm line-clamp-1">
                  {novel.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Chapter 1-{novel.availableChapters} Available
                </p>
              </div>
              <Badge 
                variant="secondary" 
                className="ml-2 text-xs"
              >
                {novel.genre}
              </Badge>
            </div>
            
            <p className="text-xs text-slate-600 mb-3 line-clamp-2">
              {novel.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs text-slate-500">{novel.rating}</span>
              </div>
              <Badge 
                variant={novel.isPremium ? "default" : "outline"}
                className="text-xs"
              >
                {novel.isPremium ? "Premium" : "Free"}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
