import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Heart, Search as SearchIcon } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/i18n";
import type { Item } from "@shared/schema";
import { useLocation } from "wouter";

// 아이템 번역 데이터 (home.tsx와 동일)
const itemTranslations = {
  en: {
    "Neon Dreams": { title: "Neon Dreams", description: "In a cyberpunk future, a hacker discovers a conspiracy that threatens humanity" },
    "Crimson Hearts": { title: "Crimson Hearts", description: "A passionate love story set against the backdrop of a vampire war" },
    "Shadow Detective": { title: "Shadow Detective", description: "A detective with supernatural abilities solves crimes in the dark underworld" },
    "Royal Deception": { title: "Royal Deception", description: "Court intrigue and forbidden romance in a medieval fantasy kingdom" },
    "Digital Ghost": { title: "Digital Ghost", description: "A programmer trapped in a virtual reality world must find a way back to reality" },
    "Autumn Reverie": { title: "Autumn Reverie", description: "Autumn Reverie follows Kaede Asakura, a quiet transfer student arriving at Maplewood High as the leaves turn. Amid the gentle rustle of amber foliage, she discovers a series of mysterious postcards addressed to her—each hinting at forgotten memories and unspoken promises. As you guide Kaede through branching story paths, you'll form deep bonds with classmates, unravel a hidden past, and decide whether to embrace the warmth of friendship or retreat into the solitude of her autumn thoughts." },
    "Rebel's Twilight Confession": { title: "Rebel's Twilight Confession", description: "Step into the last moments of daylight as you navigate a risky romance with the school's most notorious rebel girl. In this visual novel, your heartfelt choices determine whether her tough exterior will crack and reveal the warmth beneath. Will you gain her trust before the final bell rings?" },
    "Seraph Dawn: Last Stand": { title: "Seraph Dawn: Last Stand", description: "In a world ravaged by the mysterious Cancer threat, you become one of the elite Seraph pilots—humanity's final hope. Stand on the rain-slicked runway at dawn, gripping your helmet as the towering mech behind you readies for combat. Your choices will shape the battle against overwhelming odds and reveal the courage hidden within your resolve." },
    "Seraph Twilight: Battle at Dusk": { title: "Seraph Twilight: Battle at Dusk", description: "Amid a crumbling cityscape at twilight, you stand as a Seraph pilot—humanity's last line of defense. The rain-slicked streets reflect neon holo-ads as the towering mech behind you prepares for one final mission. Hold your rifle tight and steel your resolve: tonight, the fate of the world rests in your hands." },
    "Sunlit Pages: Literature Club Chronicles": { title: "Sunlit Pages: Literature Club Chronicles", description: "Join the Literature Club and experience heartfelt moments with four unique personalities as they bond over poetry, novels, and shared dreams. In this visual novel, your choices will shape friendships, reveal hidden passions, and bring warmth to each bright afternoon in the classroom." },
    "Pages of Connection: Clubroom Bonds": { title: "Pages of Connection: Clubroom Bonds", description: "Step into the sunlit sanctuary of the Literature Club, where shared stories and whispered dreams forge unbreakable bonds. As you help each member find her voice—whether through poetry, prose, or heartfelt conversation—you'll uncover hidden secrets and shape the destiny of this close-knit circle of friends." }
  },
  ko: {
    "Neon Dreams": { title: "네온 드림", description: "사이버펑크 미래에서 해커가 인류를 위협하는 음모를 발견합니다" },
    "Crimson Hearts": { title: "크림슨 하트", description: "뱀파이어 전쟁을 배경으로 한 열정적인 사랑 이야기" },
    "Shadow Detective": { title: "그림자 탐정", description: "초자연적 능력을 가진 탐정이 어둠의 지하세계에서 범죄를 해결합니다" },
    "Royal Deception": { title: "왕실의 기만", description: "중세 판타지 왕국의 궁중 음모와 금지된 로맨스" },
    "Digital Ghost": { title: "디지털 고스트", description: "가상현실 세계에 갇힌 프로그래머가 현실로 돌아갈 방법을 찾아야 합니다" },
    "Autumn Reverie": { title: "가을 몽상", description: "단풍이 물드는 계절에 메이플우드 고등학교에 전학 온 조용한 학생 카에데 아사쿠라의 이야기입니다. 황금빛 낙엽이 부드럽게 바스락거리는 가운데, 그녀는 자신에게 보내진 신비로운 엽서들을 발견하게 됩니다. 각각의 엽서는 잊혀진 기억과 말하지 못한 약속들을 암시하고 있습니다. 분기하는 스토리를 통해 카에데를 이끌어가며, 동급생들과 깊은 유대를 형성하고 숨겨진 과거를 풀어나가며, 우정의 따뜻함을 받아들일지 아니면 가을의 고독 속으로 물러날지 결정해야 합니다." },
    "Rebel's Twilight Confession": { title: "반항아의 황혼 고백", description: "해질녘의 마지막 순간, 학교에서 가장 악명 높은 반항아와의 위험한 로맨스를 경험해보세요. 이 비주얼 노벨에서 당신의 진심 어린 선택이 그녀의 거친 외면이 무너지고 내면의 따뜻함이 드러날지를 결정합니다. 마지막 종이 울리기 전에 그녀의 신뢰를 얻을 수 있을까요?" },
    "Seraph Dawn: Last Stand": { title: "세라프 새벽: 최후의 저항", description: "신비로운 캔서 위협으로 황폐해진 세상에서, 당신은 인류의 마지막 희망인 엘리트 세라프 파일럿이 됩니다. 비에 젖은 활주로에서 새벽녘에 서서 헬멧을 꽉 쥐고, 뒤에 서 있는 거대한 메카가 전투를 준비합니다. 당신의 선택이 압도적인 역경에 맞선 전투를 좌우하고 내면에 숨겨진 용기를 드러낼 것입니다." },
    "Seraph Twilight: Battle at Dusk": { title: "세라프 황혼: 석양의 전투", description: "황혼 속 무너져가는 도시 풍경 속에서, 당신은 인류의 마지막 방어선인 세라프 파일럿으로 서 있습니다. 비에 젖은 거리는 네온 홀로 광고를 반사하고, 뒤의 거대한 메카가 마지막 임무를 준비합니다. 라이플을 꽉 쥐고 각오를 다지세요. 오늘 밤, 세상의 운명이 당신의 손에 달려 있습니다." },
    "Sunlit Pages: Literature Club Chronicles": { title: "햇살 가득한 페이지: 문학부 연대기", description: "문학부에 가입하여 시, 소설, 그리고 공유하는 꿈을 통해 유대감을 형성하는 네 명의 독특한 인물들과 마음따뜻한 순간들을 경험하세요. 이 비주얼 노벨에서 당신의 선택이 우정을 형성하고, 숨겨진 열정을 드러내며, 교실에서의 밝은 오후마다 따뜻함을 가져다줄 것입니다." },
    "Pages of Connection: Clubroom Bonds": { title: "연결의 페이지: 동아리방 유대", description: "햇살이 비치는 문학부의 성소로 발걸음을 옮겨보세요. 공유하는 이야기와 속삭이는 꿈이 끊을 수 없는 유대를 만들어갑니다. 각 멤버가 자신만의 목소리를 찾도록 도와주며—시를 통해서든, 산문을 통해서든, 아니면 진심어린 대화를 통해서든—숨겨진 비밀을 밝혀내고 이 긴밀한 친구들의 운명을 만들어가게 될 것입니다." }
  }
};

const getItemTranslation = (originalTitle: string, field: 'title' | 'description', lang: string = 'en'): string => {
  const translations = itemTranslations[lang as keyof typeof itemTranslations] || itemTranslations.en;
  const item = translations[originalTitle as keyof typeof translations];
  if (item) {
    return item[field];
  }
  return field === 'title' ? originalTitle : '';
};

export default function Search() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { language } = useLanguage();
  const [, setLocation] = useLocation();

  // 검색어 디바운싱
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const { data: searchResults, isLoading } = useQuery<Item[]>({
    queryKey: ["/api/items/search", { q: debouncedQuery }],
    enabled: debouncedQuery.length > 0,
  });

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* 검색 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          {getTranslation('search', language) || 'Search'}
        </h1>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            type="text"
            placeholder={getTranslation('searchPlaceholder', language) || 'Search for visual novels...'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
          />
        </div>
      </div>

      {/* 검색 결과 */}
      {debouncedQuery.length === 0 ? (
        <div className="text-center py-12">
          <SearchIcon className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">
            {getTranslation('searchHint', language) || 'Enter keywords to search for visual novels'}
          </p>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-60 w-full rounded-xl" />
          ))}
        </div>
      ) : searchResults && searchResults.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {searchResults.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => setLocation(`/novel/${item.id}`)}
            >
              <Card className="overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                {/* 이미지 섹션 */}
                <div className="aspect-[832/1216] relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-white font-medium">{item.rating}</span>
                    </div>
                  </div>
                </div>
                
                {/* 콘텐츠 섹션 */}
                <div className="p-3">
                  <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200 line-clamp-1 mb-1">
                    {getItemTranslation(item.title, 'title', language)}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-2 leading-relaxed">
                    {getItemTranslation(item.title, 'description', language).slice(0, 80)}...
                  </p>
                  
                  {/* 태그들 */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {item.tags.slice(0, 3).map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex}
                        variant="secondary" 
                        className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-0"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {item.tags.length > 3 && (
                      <Badge 
                        variant="secondary" 
                        className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-0"
                      >
                        +{item.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  {/* 통계 */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3 text-red-400 fill-current" />
                        <span>{(item.likeCount / 1000).toFixed(1)}K</span>
                      </div>
                      <span>{item.viewCount.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <SearchIcon className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">
            {getTranslation('noSearchResults', language) || `No results found for "${debouncedQuery}"`}
          </p>
        </div>
      )}
    </div>
  );
}