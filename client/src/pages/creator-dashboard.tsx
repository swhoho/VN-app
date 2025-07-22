import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Calendar, DollarSign, Eye, TrendingUp, Menu, X, ChevronDown, ChevronRight, Wallet, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { SupabaseService } from "@/services/supabaseService";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/i18n";

/**
 * Creator Dashboard - 크리에이터 정산 대시보드
 */
export default function CreatorDashboard() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('2024-07');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [settlementTypeTab, setSettlementTypeTab] = useState('eligible');
  const [loading, setLoading] = useState(true);
  const [settlementData, setSettlementData] = useState({
    totalAmount: 0,
    subscriptionRevenue: 0,
    premiumRevenue: 0,
    subscriptionPercent: 0,
    premiumPercent: 0,
    availableForWithdrawal: 0
  });
  const [contentData, setContentData] = useState<any[]>([]);

  /**
   * 통화 포맷팅 (언어별)
   */
  const formatCurrency = (amount: number) => {
    const currencyMap: { [key: string]: { locale: string; currency: string } } = {
      ko: { locale: 'ko-KR', currency: 'KRW' },
      en: { locale: 'en-US', currency: 'USD' },
      ja: { locale: 'ja-JP', currency: 'JPY' },
      zh: { locale: 'zh-CN', currency: 'CNY' },
      es: { locale: 'es-ES', currency: 'EUR' },
      fr: { locale: 'fr-FR', currency: 'EUR' },
      de: { locale: 'de-DE', currency: 'EUR' },
      pt: { locale: 'pt-BR', currency: 'BRL' },
      ru: { locale: 'ru-RU', currency: 'RUB' },
      ar: { locale: 'ar-SA', currency: 'SAR' },
      hi: { locale: 'hi-IN', currency: 'INR' },
      th: { locale: 'th-TH', currency: 'THB' },
      vi: { locale: 'vi-VN', currency: 'VND' },
      it: { locale: 'it-IT', currency: 'EUR' },
      tr: { locale: 'tr-TR', currency: 'TRY' }
    };

    const { locale, currency } = currencyMap[language] || currencyMap.en;
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  /**
   * 월 옵션 생성 (언어별)
   */
  const generateMonthOptions = () => {
    const options = [];
    const currentDate = new Date();
    const localeMap: { [key: string]: string } = {
      ko: 'ko-KR',
      en: 'en-US',
      ja: 'ja-JP',
      zh: 'zh-CN',
      es: 'es-ES',
      fr: 'fr-FR',
      de: 'de-DE',
      pt: 'pt-BR',
      ru: 'ru-RU',
      ar: 'ar-SA',
      hi: 'hi-IN',
      th: 'th-TH',
      vi: 'vi-VN',
      it: 'it-IT',
      tr: 'tr-TR'
    };
    
    const locale = localeMap[language] || 'en-US';
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = date.toLocaleDateString(locale, { year: 'numeric', month: 'long' });
      options.push({ value, label });
    }
    return options;
  };

  /**
   * 정산 데이터 로드
   */
  useEffect(() => {
    const loadSettlementData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const [year, month] = selectedPeriod.split('-').map(Number);
        
        // 실제 정산 데이터 조회
        const settlement = await SupabaseService.getMonthlySettlement(user.id, year, month);
        
        if (settlement) {
          setSettlementData({
            totalAmount: settlement.total_revenue || 0,
            subscriptionRevenue: settlement.subscription_revenue || 0,
            premiumRevenue: settlement.pay_per_view_revenue || 0,
            subscriptionPercent: settlement.total_revenue > 0 
              ? Math.round((settlement.subscription_revenue / settlement.total_revenue) * 100) 
              : 0,
            premiumPercent: settlement.total_revenue > 0 
              ? Math.round((settlement.pay_per_view_revenue / settlement.total_revenue) * 100) 
              : 0,
            availableForWithdrawal: settlement.settlement_amount || 0
          });
        } else {
          // 샘플 데이터 (개발용)
          setSettlementData({
            totalAmount: 125000,
            subscriptionRevenue: 80000,
            premiumRevenue: 45000,
            subscriptionPercent: 64,
            premiumPercent: 36,
            availableForWithdrawal: 102000
          });
        }

        // 사용자 작품 목록 조회 (샘플 데이터)
        setContentData([
          {
            id: 1,
            title: "로맨스 소설 A",
            subscriptionViews: 1200,
            subscriptionRevenue: 12000,
            premiumTransactions: 45,
            premiumRevenue: 9000,
            settlementRate: 70,
            settlementAmount: 6300
          },
          {
            id: 2,
            title: "판타지 소설 B",
            subscriptionViews: 2800,
            subscriptionRevenue: 28000,
            premiumTransactions: 23,
            premiumRevenue: 4600,
            settlementRate: 65,
            settlementAmount: 2990
          },
          {
            id: 3,
            title: "스릴러 소설 C",
            subscriptionViews: 800,
            subscriptionRevenue: 8000,
            premiumTransactions: 67,
            premiumRevenue: 13400,
            settlementRate: 75,
            settlementAmount: 10050
          }
        ]);
      } catch (error) {
        console.error('정산 데이터 로드 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettlementData();
  }, [user, selectedPeriod]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            {t.creatorDashboard}
          </h1>
          <Button className="w-full relative group" size="sm">
            <Wallet className="w-4 h-4 mr-2" />
            {t.availableForWithdrawal} {formatCurrency(settlementData.availableForWithdrawal)}
            <div className="absolute bottom-full left-0 mb-2 w-72 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
              {t.withdrawalInDevelopment}
            </div>
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {generateMonthOptions().map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* 요약 카드 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4 mb-6"
      >
        {/* 총 정산 금액 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {t.totalSettlementAmount}
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {formatCurrency(settlementData.totalAmount)}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <DollarSign className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 구독 매출 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {t.subscriptionRevenue}
                </p>
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {formatCurrency(settlementData.subscriptionRevenue)}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                  {settlementData.subscriptionPercent}%
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <TrendingUp className="text-green-600 dark:text-green-400" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 프리미엄 매출 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {t.premiumTransactions}
                </p>
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {formatCurrency(settlementData.premiumRevenue)}
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                  {settlementData.premiumPercent}%
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Eye className="text-purple-600 dark:text-purple-400" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 상세 정보 탭 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="overview" className="text-xs">{t.overview}</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs">{t.analytics}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.contentSettlementStatus}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contentData.map((content) => (
                    <div key={content.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                          {content.title}
                        </h4>
                        <Badge variant="secondary" className="text-xs">
                          {content.settlementRate}%
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                        <div className="flex justify-between">
                          <span>{t.subscriptionViews}:</span>
                          <span>{content.subscriptionViews.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t.premiumDeals}:</span>
                          <span>{content.premiumTransactions}건</span>
                        </div>
                        <div className="flex justify-between font-medium text-primary pt-1 border-t">
                          <span>{t.settlementAmount}:</span>
                          <span>{formatCurrency(content.settlementAmount)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.revenueComposition}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{t.subscriptionRevenue}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${settlementData.subscriptionPercent}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium min-w-[3rem]">
                        {settlementData.subscriptionPercent}%
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{t.premiumTransactions}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full" 
                          style={{ width: `${settlementData.premiumPercent}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium min-w-[3rem]">
                        {settlementData.premiumPercent}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.performanceMetrics}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">{t.averageSettlementRate}</span>
                    <span className="font-medium">70%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">{t.totalViews}</span>
                    <span className="font-medium">4,800</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">{t.registeredContent}</span>
                    <span className="font-medium">{contentData.length}개</span>
                  </div>
                  <div className="flex justify-between text-sm border-t pt-3">
                    <span className="text-slate-600 dark:text-slate-400">{t.availableForWithdrawal}</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {formatCurrency(settlementData.availableForWithdrawal)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.thisMonthHighlights}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                  <li>• {t.subscriptionRevenueIncreased}</li>
                  <li>• {t.averageCompletionRate}</li>
                  <li>• {t.newContentAdded}</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}