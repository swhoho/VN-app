export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
];

export const translations = {
  en: {
    appName: "Visual Novel Hub",
    home: "Home",
    ranking: "Ranking",
    myPage: "My Page",
    featured: "Featured",
    popularNovels: "Popular Novels",
    mostPopular: "Most Popular",
    weeklyRankings: "Weekly Rankings",
    membership: "Membership",
    points: "Points",
    buyPoints: "Buy Points",
    favorites: "Favorites",
    viewAll: "View All",
    readingStats: "Reading Stats",
    novelsRead: "Novels Read",
    chapters: "Chapters",
    readingTime: "Reading Time",
    dayStreak: "Day Streak",
    quickActions: "Quick Actions",
    myLibrary: "My Library",
    readingHistory: "Reading History",
    settings: "Settings",
    notifications: "Notifications",
    darkMode: "Dark Mode",
    helpSupport: "Help & Support",
    privacyPolicy: "Privacy Policy",
    comingSoon: "Coming Soon!",
    comingSoonMessage: "This feature is currently under development. Stay tuned for updates!",
    gotIt: "Got it!",
    language: "Language",
    selectLanguage: "Select Language",
    items: {
      "Neon Dreams": {
        title: "Neon Dreams",
        description: "In a cyberpunk future, a hacker discovers a conspiracy that threatens humanity. Navigate through neon-lit streets and digital networks as you uncover the truth behind the corporate facade."
      },
      "Shadow Detective": {
        title: "Shadow Detective",
        description: "A detective with supernatural abilities solves crimes in the dark underworld. Each case reveals deeper mysteries about the nature of good and evil in this noir-inspired thriller."
      },
      "Royal Deception": {
        title: "Royal Deception",
        description: "Court intrigue and forbidden romance in a medieval fantasy kingdom. Your choices will determine the fate of kingdoms and the hearts of those you encounter."
      },
      "Autumn Reverie": {
        title: "Autumn Reverie",
        description: "Autumn Reverie follows Kaede Asakura, a quiet transfer student arriving at Maplewood High as the leaves turn. Amid the gentle rustle of amber foliage, she discovers a series of mysterious postcards addressed to her—each hinting at forgotten memories and unspoken promises. As you guide Kaede through branching story paths, you'll form deep bonds with classmates, unravel a hidden past, and decide whether to embrace the warmth of friendship or retreat into the solitude of her autumn thoughts."
      },
      "Rebel's Twilight Confession": {
        title: "Rebel's Twilight Confession",
        description: "Step into the last moments of daylight as you navigate a risky romance with the school's most notorious rebel girl. In this visual novel, your heartfelt choices determine whether her tough exterior will crack and reveal the warmth beneath. Will you gain her trust before the final bell rings?"
      },
      "Seraph Dawn: Last Stand": {
        title: "Seraph Dawn: Last Stand",
        description: "In a world ravaged by the mysterious Cancer threat, you become one of the elite Seraph pilots—humanity's final hope. Stand on the rain-slicked runway at dawn, gripping your helmet as the towering mech behind you readies for combat. Your choices will shape the battle against overwhelming odds and reveal the courage hidden within your resolve."
      },
      "Seraph Twilight: Battle at Dusk": {
        title: "Seraph Twilight: Battle at Dusk",
        description: "Amid a crumbling cityscape at twilight, you stand as a Seraph pilot—humanity's last line of defense. The rain-slicked streets reflect neon holo-ads as the towering mech behind you prepares for one final mission. Hold your rifle tight and steel your resolve: tonight, the fate of the world rests in your hands."
      },
      "Sunlit Pages: Literature Club Chronicles": {
        title: "Sunlit Pages: Literature Club Chronicles",
        description: "Join the Literature Club and experience heartfelt moments with four unique personalities as they bond over poetry, novels, and shared dreams. In this visual novel, your choices will shape friendships, reveal hidden passions, and bring warmth to each bright afternoon in the classroom."
      },
      "Pages of Connection: Clubroom Bonds": {
        title: "Pages of Connection: Clubroom Bonds",
        description: "Step into the sunlit sanctuary of the Literature Club, where shared stories and whispered dreams forge unbreakable bonds. As you help each member find her voice—whether through poetry, prose, or heartfelt conversation—you'll uncover hidden secrets and shape the destiny of this close-knit circle of friends."
      },
      "Crimson Halo: Seraph's Edge": {
        title: "Crimson Halo: Seraph's Edge",
        description: "Clad in a sleek tactical bodysuit and wielding a radiant blade, the Seraph pilot emerges under a burning red halo amidst a dystopian battlefield. Her unwavering gaze and flowing silver hair signal humanity's final resolve against the encroaching darkness. Every choice will determine whether hope ignites or fades into ash."
      }
    }
  },
  ko: {
    appName: "비주얼 노벨 허브",
    home: "홈",
    ranking: "랭킹",
    myPage: "마이페이지",
    featured: "추천작",
    popularNovels: "인기 소설",
    mostPopular: "최고 인기작",
    weeklyRankings: "주간 랭킹",
    membership: "멤버십",
    points: "포인트",
    buyPoints: "포인트 구매",
    favorites: "즐겨찾기",
    viewAll: "전체보기",
    readingStats: "독서 통계",
    novelsRead: "완독한 소설",
    chapters: "챕터",
    readingTime: "독서 시간",
    dayStreak: "연속 일수",
    quickActions: "빠른 실행",
    myLibrary: "내 서재",
    readingHistory: "독서 기록",
    settings: "설정",
    notifications: "알림",
    darkMode: "다크 모드",
    helpSupport: "도움말 및 지원",
    privacyPolicy: "개인정보처리방침",
    comingSoon: "곧 출시 예정!",
    comingSoonMessage: "이 기능은 현재 개발 중입니다. 업데이트를 기다려 주세요!",
    gotIt: "확인!",
    language: "언어",
    selectLanguage: "언어 선택",
    items: {
      "Neon Dreams": {
        title: "네온 드림",
        description: "사이버펑크 미래에서 해커가 인류를 위협하는 음모를 발견합니다. 네온사인이 빛나는 거리와 디지털 네트워크를 통해 기업 파사드 뒤에 숨겨진 진실을 밝혀내세요."
      },
      "Shadow Detective": {
        title: "그림자 탐정",
        description: "초자연적 능력을 가진 탐정이 어둠의 지하세계에서 범죄를 해결합니다. 각 사건은 이 누아르 스타일 스릴러에서 선과 악의 본질에 대한 더 깊은 미스터리를 드러냅니다."
      },
      "Royal Deception": {
        title: "왕실의 기만",
        description: "중세 판타지 왕국의 궁중 음모와 금지된 로맨스. 당신의 선택이 왕국의 운명과 마주치는 이들의 마음을 결정할 것입니다."
      },
      "Autumn Reverie": {
        title: "가을 몽상",
        description: "단풍이 물드는 계절에 메이플우드 고등학교에 전학 온 조용한 학생 카에데 아사쿠라의 이야기입니다. 황금빛 낙엽이 부드럽게 바스락거리는 가운데, 그녀는 자신에게 보내진 신비로운 엽서들을 발견하게 됩니다. 각각의 엽서는 잊혀진 기억과 말하지 못한 약속들을 암시하고 있습니다. 분기하는 스토리를 통해 카에데를 이끌어가며, 동급생들과 깊은 유대를 형성하고 숨겨진 과거를 풀어나가며, 우정의 따뜻함을 받아들일지 아니면 가을의 고독 속으로 물러날지 결정해야 합니다."
      },
      "Rebel's Twilight Confession": {
        title: "반항아의 황혼 고백",
        description: "해질녘의 마지막 순간, 학교에서 가장 악명 높은 반항아와의 위험한 로맨스를 경험해보세요. 이 비주얼 노벨에서 당신의 진심 어린 선택이 그녀의 거친 외면이 무너지고 내면의 따뜻함이 드러날지를 결정합니다. 마지막 종이 울리기 전에 그녀의 신뢰를 얻을 수 있을까요?"
      },
      "Seraph Dawn: Last Stand": {
        title: "세라프 새벽: 최후의 저항",
        description: "신비로운 캔서 위협으로 황폐해진 세상에서, 당신은 인류의 마지막 희망인 엘리트 세라프 파일럿이 됩니다. 비에 젖은 활주로에서 새벽녘에 서서 헬멧을 꽉 쥐고, 뒤에 서 있는 거대한 메카가 전투를 준비합니다. 당신의 선택이 압도적인 역경에 맞선 전투를 좌우하고 내면에 숨겨진 용기를 드러낼 것입니다."
      },
      "Seraph Twilight: Battle at Dusk": {
        title: "세라프 황혼: 석양의 전투",
        description: "황혼 속 무너져가는 도시 풍경 속에서, 당신은 인류의 마지막 방어선인 세라프 파일럿으로 서 있습니다. 비에 젖은 거리는 네온 홀로 광고를 반사하고, 뒤의 거대한 메카가 마지막 임무를 준비합니다. 라이플을 꽉 쥐고 각오를 다지세요. 오늘 밤, 세상의 운명이 당신의 손에 달려 있습니다."
      },
      "Sunlit Pages: Literature Club Chronicles": {
        title: "햇살 가득한 페이지: 문학부 연대기",
        description: "문학부에 가입하여 시, 소설, 그리고 공유하는 꿈을 통해 유대감을 형성하는 네 명의 독특한 인물들과 마음따뜻한 순간들을 경험하세요. 이 비주얼 노벨에서 당신의 선택이 우정을 형성하고, 숨겨진 열정을 드러내며, 교실에서의 밝은 오후마다 따뜻함을 가져다줄 것입니다."
      },
      "Pages of Connection: Clubroom Bonds": {
        title: "연결의 페이지: 동아리방 유대",
        description: "햇살이 비치는 문학부의 성소로 발걸음을 옮겨보세요. 공유하는 이야기와 속삭이는 꿈이 끊을 수 없는 유대를 만들어갑니다. 각 멤버가 자신만의 목소리를 찾도록 도와주며—시를 통해서든, 산문을 통해서든, 아니면 진심어린 대화를 통해서든—숨겨진 비밀을 밝혀내고 이 긴밀한 친구들의 운명을 만들어가게 될 것입니다."
      },
      "Crimson Halo: Seraph's Edge": {
        title: "크림슨 헤일로: 세라프의 끝",
        description: "세련된 전술복을 입고 빛나는 검을 든 세라프 파일럿이 디스토피아 전장에서 타오르는 붉은 후광 아래 등장합니다. 그녀의 흔들리지 않는 시선과 흘러내리는 은빛 머리카락은 다가오는 어둠에 맞선 인류의 마지막 결의를 나타냅니다. 모든 선택이 희망이 타오를지 재로 사라질지를 결정할 것입니다."
      }
    }
  },
  ja: {
    appName: "ビジュアルノベルハブ",
    home: "ホーム",
    ranking: "ランキング",
    myPage: "マイページ",
    featured: "注目作品",
    popularNovels: "人気小説",
    mostPopular: "最も人気",
    weeklyRankings: "週間ランキング",
    membership: "メンバーシップ",
    points: "ポイント",
    buyPoints: "ポイント購入",
    favorites: "お気に入り",
    viewAll: "すべて表示",
    readingStats: "読書統計",
    novelsRead: "読了小説",
    chapters: "チャプター",
    readingTime: "読書時間",
    dayStreak: "連続日数",
    quickActions: "クイックアクション",
    myLibrary: "マイライブラリ",
    readingHistory: "読書履歴",
    settings: "設定",
    notifications: "通知",
    darkMode: "ダークモード",
    helpSupport: "ヘルプとサポート",
    privacyPolicy: "プライバシーポリシー",
    comingSoon: "近日公開！",
    comingSoonMessage: "この機能は現在開発中です。アップデートをお待ちください！",
    gotIt: "了解！",
    language: "言語",
    selectLanguage: "言語を選択",
    items: {
      "Neon Dreams": {
        title: "ネオンドリーム",
        description: "サイバーパンクな未来で、ハッカーが人類を脅かす陰謀を発見します。ネオンサインが光る街並みとデジタルネットワークを通じて、企業のファサードに隠された真実を明らかにしてください。"
      },
      "Shadow Detective": {
        title: "影の探偵",
        description: "超自然的な能力を持つ探偵が闇の地下世界で犯罪を解決します。各事件は、このノワールスタイルのスリラーで善と悪の本質についてより深い謎を明らかにします。"
      },
      "Royal Deception": {
        title: "王室の欺瞞",
        description: "中世ファンタジー王国での宮廷陰謀と禁じられたロマンス。あなたの選択が王国の運命と出会う者たちの心を決定するでしょう。"
      },
      "Autumn Reverie": {
        title: "秋の夢想",
        description: "紅葉の季節にメープルウッド高校に転校してきた静かな学生、楓朝倉の物語です。金色の落ち葉が優しくざわめく中、彼女は自分宛ての謎めいた葉書を発見します。それぞれの葉書は忘れられた記憶と語られなかった約束を暗示しています。分岐するストーリーを通じて楓を導き、同級生たちとの深い絆を築き、隠された過去を解き明かし、友情の温かさを受け入れるか秋の孤独に退くかを決めなければなりません。"
      },
      "Rebel's Twilight Confession": {
        title: "反逆者の黄昏告白",
        description: "夕暮れの最後の瞬間、学校で最も悪名高い反逆者との危険なロマンスを体験してください。このビジュアルノベルでは、あなたの心からの選択が彼女の荒々しい外見を崩し、内なる温かさを明らかにするかを決定します。最後の鐘が鳴る前に彼女の信頼を得ることができるでしょうか？"
      },
      "Seraph Dawn: Last Stand": {
        title: "セラフの夜明け：最後の抵抗",
        description: "謎めいたキャンサーの脅威によって荒廃した世界で、あなたは人類最後の希望であるエリートセラフパイロットになります。雨に濡れた滑走路で夜明けに立ち、ヘルメットを握りしめ、背後の巨大なメカが戦闘の準備をします。あなたの選択が圧倒的な困難に対する戦いを形作り、決意の中に隠された勇気を明らかにするでしょう。"
      },
      "Seraph Twilight: Battle at Dusk": {
        title: "セラフの黄昏：夕暮れの戦い",
        description: "黄昏時の崩れゆく都市景観の中で、あなたは人類最後の防衛線であるセラフパイロットとして立っています。雨に濡れた街はネオンホロ広告を反射し、背後の巨大なメカが最後の任務の準備をしています。ライフルをしっかりと握り、決意を固めてください。今夜、世界の運命があなたの手に委ねられています。"
      },
      "Sunlit Pages: Literature Club Chronicles": {
        title: "陽だまりのページ：文学部年代記",
        description: "文学部に参加し、詩、小説、共有する夢を通じて絆を形成する4人のユニークな人格との心温まる瞬間を体験してください。このビジュアルノベルでは、あなたの選択が友情を形成し、隠された情熱を明らかにし、教室での明るい午後ごとに温かさをもたらすでしょう。"
      },
      "Pages of Connection: Clubroom Bonds": {
        title: "繋がりのページ：部室の絆",
        description: "陽光が差し込む文学部の聖域に足を踏み入れてください。共有する物語とささやかれる夢が断ち切れない絆を築きます。各メンバーが自分の声を見つけるのを手助けしながら—詩を通じて、散文を通じて、または心からの会話を通じて—隠された秘密を明らかにし、この親密な友人サークルの運命を形作ることになるでしょう。"
      },
      "Crimson Halo: Seraph's Edge": {
        title: "クリムゾンヘイロー：セラフの刃",
        description: "洗練された戦術スーツを身に纏い、輝く剣を wielding するセラフパイロットが、ディストピアの戦場で燃える赤い後光の下に現れます。彼女の揺るぎない眼差しと流れる銀髪は、迫り来る闇に対する人類の最後の決意を示しています。すべての選択が希望が燃え上がるか灰に帰すかを決定するでしょう。"
      }
    }
  },
  zh: {
    appName: "视觉小说中心",
    home: "首页",
    ranking: "排行榜",
    myPage: "我的页面",
    featured: "精选",
    popularNovels: "热门小说",
    mostPopular: "最受欢迎",
    weeklyRankings: "周排行榜",
    membership: "会员",
    points: "积分",
    buyPoints: "购买积分",
    favorites: "收藏",
    viewAll: "查看全部",
    readingStats: "阅读统计",
    novelsRead: "已读小说",
    chapters: "章节",
    readingTime: "阅读时间",
    dayStreak: "连续天数",
    quickActions: "快速操作",
    myLibrary: "我的书库",
    readingHistory: "阅读历史",
    settings: "设置",
    notifications: "通知",
    darkMode: "深色模式",
    helpSupport: "帮助与支持",
    privacyPolicy: "隐私政策",
    comingSoon: "即将推出！",
    comingSoonMessage: "此功能正在开发中，敬请期待更新！",
    gotIt: "知道了！",
    language: "语言",
    selectLanguage: "选择语言",
    items: {
      "Neon Dreams": {
        title: "霓虹梦境",
        description: "在赛博朋克的未来中，黑客发现了威胁人类的阴谋。通过霓虹灯闪烁的街道和数字网络，揭示隐藏在企业门面背后的真相。"
      },
      "Shadow Detective": {
        title: "暗影侦探",
        description: "拥有超自然能力的侦探在黑暗的地下世界解决犯罪。每个案件都在这部黑色风格的惊悚片中揭示关于善恶本质的更深层谜团。"
      },
      "Royal Deception": {
        title: "皇室欺骗",
        description: "中世纪奇幻王国中的宫廷阴谋和禁忌爱情。你的选择将决定王国的命运以及相遇之人的心灵。"
      },
      "Autumn Reverie": {
        title: "秋日遐想",
        description: "在枫叶飘落的季节转学到枫木高中的安静学生枫朝仓的故事。在金色落叶轻柔沙沙声中，她发现了寄给自己的神秘明信片。每张明信片都暗示着被遗忘的回忆和未曾言明的承诺。通过分支故事引导枫，与同学们建立深厚的纽带，揭开隐藏的过去，决定是拥抱友谊的温暖还是退回到秋日的孤独中。"
      },
      "Rebel's Twilight Confession": {
        title: "叛逆者的黄昏告白",
        description: "在黄昏的最后时刻，体验与学校最臭名昭著的叛逆者的危险浪漫。在这部视觉小说中，你真诚的选择将决定她粗糙的外表是否会崩塌，内心的温暖是否会显露。你能在最后一声铃响前赢得她的信任吗？"
      },
      "Seraph Dawn: Last Stand": {
        title: "炽天使黎明：最后抵抗",
        description: "在被神秘癌症威胁蹂躏的世界中，你成为了人类最后希望的精英炽天使飞行员。在黎明时分站在雨水湿润的跑道上，紧握头盔，身后巨大的机甲准备战斗。你的选择将塑造对抗压倒性困难的战斗，并揭示隐藏在决心中的勇气。"
      },
      "Seraph Twilight: Battle at Dusk": {
        title: "炽天使黄昏：黄昏之战",
        description: "在黄昏时分崩塌的城市景观中，你作为人类最后的防线炽天使飞行员屹立不倒。雨水湿润的街道反射着霓虹全息广告，身后巨大的机甲准备执行最后任务。紧握步枪，坚定决心：今夜，世界的命运就在你手中。"
      },
      "Sunlit Pages: Literature Club Chronicles": {
        title: "阳光书页：文学社编年史",
        description: "加入文学社，与四个独特的人格体验温馨时光，他们通过诗歌、小说和共同梦想建立纽带。在这部视觉小说中，你的选择将塑造友谊，揭示隐藏的激情，为教室里每个明亮的午后带来温暖。"
      },
      "Pages of Connection: Clubroom Bonds": {
        title: "连接之页：社团室纽带",
        description: "踏入阳光洒落的文学社圣所，在这里分享的故事和轻声的梦想锻造着无法断裂的纽带。当你帮助每个成员找到自己的声音时——无论是通过诗歌、散文还是真心对话——你将揭开隐藏的秘密，塑造这个紧密朋友圈的命运。"
      },
      "Crimson Halo: Seraph's Edge": {
        title: "深红光环：炽天使之刃",
        description: "身着精密战术服，挥舞着光芒四射的剑刃，炽天使飞行员在反乌托邦战场上的燃烧红色光环下现身。她坚定的凝视和飘逸的银发标志着人类对抗侵袭黑暗的最后决心。每个选择都将决定希望是燃起还是化为灰烬。"
      }
    }
  },
  es: {
    appName: "Centro de Novelas Visuales",
    home: "Inicio",
    ranking: "Clasificación",
    myPage: "Mi Página",
    featured: "Destacado",
    popularNovels: "Novelas Populares",
    mostPopular: "Más Popular",
    weeklyRankings: "Rankings Semanales",
    membership: "Membresía",
    points: "Puntos",
    buyPoints: "Comprar Puntos",
    favorites: "Favoritos",
    viewAll: "Ver Todo",
    readingStats: "Estadísticas de Lectura",
    novelsRead: "Novelas Leídas",
    chapters: "Capítulos",
    readingTime: "Tiempo de Lectura",
    dayStreak: "Días Consecutivos",
    quickActions: "Acciones Rápidas",
    myLibrary: "Mi Biblioteca",
    readingHistory: "Historial de Lectura",
    settings: "Configuración",
    notifications: "Notificaciones",
    darkMode: "Modo Oscuro",
    helpSupport: "Ayuda y Soporte",
    privacyPolicy: "Política de Privacidad",
    comingSoon: "¡Próximamente!",
    comingSoonMessage: "Esta función está en desarrollo. ¡Mantente atento a las actualizaciones!",
    gotIt: "¡Entendido!",
    language: "Idioma",
    selectLanguage: "Seleccionar Idioma",
    items: {
      "Neon Dreams": {
        title: "Sueños de Neón",
        description: "En un futuro ciberpunk, un hacker descubre una conspiración que amenaza a la humanidad. A través de calles iluminadas por neón y redes digitales, descubre la verdad oculta detrás de las fachadas corporativas."
      },
      "Shadow Detective": {
        title: "Detective Sombra",
        description: "Un detective con habilidades sobrenaturales resuelve crímenes en el oscuro submundo. Cada caso revela un misterio más profundo sobre la naturaleza del bien y el mal en este thriller de estilo noir."
      },
      "Royal Deception": {
        title: "Engaño Real",
        description: "Intrigas palaciegas y romance prohibido en un reino de fantasía medieval. Tus decisiones determinarán el destino del reino y los corazones de quienes encuentres."
      },
      "Autumn Reverie": {
        title: "Ensueño de Otoño",
        description: "La historia de Kaede Asakura, una estudiante tranquila que se transfiere a la Escuela Secundaria Maplewood durante la temporada de hojas cambiantes. Mientras las hojas doradas susurran suavemente, descubre misteriosas postales dirigidas a ella. Cada postal insinúa recuerdos olvidados y promesas no dichas. Guía a Kaede a través de historias ramificadas, forjando vínculos profundos con compañeros de clase, desentrañando un pasado oculto y decidiendo si abrazar la calidez de la amistad o retirarse a la soledad del otoño."
      },
      "Rebel's Twilight Confession": {
        title: "Confesión del Rebelde al Atardecer",
        description: "En los últimos momentos del crepúsculo, experimenta un romance peligroso con la rebelde más notoria de la escuela. En esta novela visual, tus decisiones sinceras determinarán si su exterior rudo se desmorona y se revela su calidez interior. ¿Podrás ganar su confianza antes de que suene la campana final?"
      },
      "Seraph Dawn: Last Stand": {
        title: "Amanecer Serafín: Última Resistencia",
        description: "En un mundo devastado por la misteriosa amenaza del Cáncer, te conviertes en uno de los pilotos Serafín de élite, la última esperanza de la humanidad. Párate en la pista empapada por la lluvia al amanecer, agarrando tu casco mientras el mecha imponente detrás de ti se prepara para el combate. Tus decisiones darán forma a la batalla contra probabilidades abrumadoras y revelarán el coraje oculto dentro de tu determinación."
      },
      "Seraph Twilight: Battle at Dusk": {
        title: "Crepúsculo Serafín: Batalla al Anochecer",
        description: "En medio de un paisaje urbano que se desmorona al atardecer, te yergues como un piloto Serafín, la última línea de defensa de la humanidad. Las calles empapadas por la lluvia reflejan anuncios holográficos de neón mientras el mecha imponente detrás de ti se prepara para una misión final. Agarra tu rifle con fuerza y fortalece tu determinación: esta noche, el destino del mundo está en tus manos."
      },
      "Sunlit Pages: Literature Club Chronicles": {
        title: "Páginas Iluminadas: Crónicas del Club de Literatura",
        description: "Únete al Club de Literatura y experimenta momentos conmovedores con cuatro personalidades únicas mientras se unen a través de poesía, novelas y sueños compartidos. En esta novela visual, tus decisiones darán forma a las amistades, revelarán pasiones ocultas y traerán calidez a cada tarde brillante en el aula."
      },
      "Pages of Connection: Clubroom Bonds": {
        title: "Páginas de Conexión: Vínculos del Salón del Club",
        description: "Entra en el santuario iluminado por el sol del Club de Literatura, donde las historias compartidas y los sueños susurrados forjan vínculos inquebrantables. Mientras ayudas a cada miembro a encontrar su voz, ya sea a través de poesía, prosa o conversación sincera, descubrirás secretos ocultos y darás forma al destino de este círculo cercano de amigos."
      },
      "Crimson Halo: Seraph's Edge": {
        title: "Halo Carmesí: Filo del Serafín",
        description: "Vestida con un traje táctico elegante y empuñando una espada radiante, la piloto Serafín emerge bajo un halo rojo ardiente en medio de un campo de batalla distópico. Su mirada inquebrantable y cabello plateado que fluye señalan la resolución final de la humanidad contra la oscuridad que se acerca. Cada decisión determinará si la esperanza se enciende o se desvanece en cenizas."
      }
    }
  },
  fr: {
    appName: "Centre de Romans Visuels",
    home: "Accueil",
    ranking: "Classement",
    myPage: "Ma Page",
    featured: "En Vedette",
    popularNovels: "Romans Populaires",
    mostPopular: "Plus Populaire",
    weeklyRankings: "Classements Hebdomadaires",
    membership: "Adhésion",
    points: "Points",
    buyPoints: "Acheter des Points",
    favorites: "Favoris",
    viewAll: "Voir Tout",
    readingStats: "Statistiques de Lecture",
    novelsRead: "Romans Lus",
    chapters: "Chapitres",
    readingTime: "Temps de Lecture",
    dayStreak: "Jours Consécutifs",
    quickActions: "Actions Rapides",
    myLibrary: "Ma Bibliothèque",
    readingHistory: "Historique de Lecture",
    settings: "Paramètres",
    notifications: "Notifications",
    darkMode: "Mode Sombre",
    helpSupport: "Aide et Support",
    privacyPolicy: "Politique de Confidentialité",
    comingSoon: "Bientôt Disponible !",
    comingSoonMessage: "Cette fonctionnalité est en cours de développement. Restez à l'écoute !",
    gotIt: "Compris !",
    language: "Langue",
    selectLanguage: "Sélectionner la Langue",
    items: {
      "Neon Dreams": {
        title: "Rêves de Néon",
        description: "Dans un futur cyberpunk, un hacker découvre une conspiration qui menace l'humanité. À travers les rues éclairées au néon et les réseaux numériques, découvrez la vérité cachée derrière les façades d'entreprise."
      },
      "Shadow Detective": {
        title: "Détective de l'Ombre",
        description: "Un détective aux capacités surnaturelles résout des crimes dans le sombre monde souterrain. Chaque affaire révèle un mystère plus profond sur la nature du bien et du mal dans ce thriller de style noir."
      },
      "Royal Deception": {
        title: "Tromperie Royale",
        description: "Intrigues de cour et romance interdite dans un royaume de fantasy médiéval. Vos choix détermineront le destin du royaume et les cœurs de ceux que vous rencontrez."
      },
      "Autumn Reverie": {
        title: "Rêverie d'Automne",
        description: "L'histoire de Kaede Asakura, une étudiante tranquille qui transfère au lycée Maplewood pendant la saison des feuilles changeantes. Alors que les feuilles dorées murmurent doucement, elle découvre de mystérieuses cartes postales qui lui sont adressées. Chaque carte postale évoque des souvenirs oubliés et des promesses non dites. Guidez Kaede à travers des histoires ramifiées, forgeant des liens profonds avec ses camarades de classe, dévoilant un passé caché, et décidant d'embrasser la chaleur de l'amitié ou de se retirer dans la solitude de l'automne."
      },
      "Rebel's Twilight Confession": {
        title: "Confession du Rebelle au Crépuscule",
        description: "Dans les derniers moments du crépuscule, vivez une romance dangereuse avec la rebelle la plus notoire de l'école. Dans ce roman visuel, vos choix sincères détermineront si son extérieur rude s'effrite et révèle sa chaleur intérieure. Pourrez-vous gagner sa confiance avant que la cloche finale ne sonne ?"
      },
      "Seraph Dawn: Last Stand": {
        title: "Aube du Séraphin : Dernier Rempart",
        description: "Dans un monde ravagé par la mystérieuse menace du Cancer, vous devenez l'un des pilotes Séraphin d'élite—le dernier espoir de l'humanité. Tenez-vous sur la piste trempée de pluie à l'aube, serrant votre casque tandis que le mecha imposant derrière vous se prépare au combat. Vos choix façonneront la bataille contre des obstacles écrasants et révéleront le courage caché dans votre détermination."
      },
      "Seraph Twilight: Battle at Dusk": {
        title: "Crépuscule du Séraphin : Bataille au Crépuscule",
        description: "Au milieu d'un paysage urbain en ruine au crépuscule, vous vous dressez comme un pilote Séraphin—la dernière ligne de défense de l'humanité. Les rues trempées de pluie reflètent les publicités holographiques néon tandis que le mecha imposant derrière vous se prépare pour une mission finale. Serrez fermement votre fusil et fortifiez votre détermination : ce soir, le destin du monde repose entre vos mains."
      },
      "Sunlit Pages: Literature Club Chronicles": {
        title: "Pages Ensoleillées : Chroniques du Club de Littérature",
        description: "Rejoignez le Club de Littérature et vivez des moments touchants avec quatre personnalités uniques qui se lient à travers la poésie, les romans et les rêves partagés. Dans ce roman visuel, vos choix façonneront les amitiés, révéleront des passions cachées et apporteront de la chaleur à chaque après-midi lumineux dans la salle de classe."
      },
      "Pages of Connection: Clubroom Bonds": {
        title: "Pages de Connexion : Liens de la Salle de Club",
        description: "Entrez dans le sanctuaire ensoleillé du Club de Littérature, où les histoires partagées et les rêves murmurés forgent des liens incassables. En aidant chaque membre à trouver sa voix—que ce soit à travers la poésie, la prose ou une conversation sincère—vous découvrirez des secrets cachés et façonnerez le destin de ce cercle d'amis proche."
      },
      "Crimson Halo: Seraph's Edge": {
        title: "Halo Cramoisi : Lame du Séraphin",
        description: "Vêtue d'une combinaison tactique élégante et brandissant une lame radieuse, la pilote Séraphin émerge sous un halo rouge ardent au milieu d'un champ de bataille dystopique. Son regard inébranlable et ses cheveux argentés flottants signalent la détermination finale de l'humanité contre les ténèbres qui approchent. Chaque choix déterminera si l'espoir s'enflamme ou se transforme en cendres."
      }
    }
  },
  de: {
    appName: "Visual Novel Hub",
    home: "Startseite",
    ranking: "Rangliste",
    myPage: "Meine Seite",
    featured: "Empfohlen",
    popularNovels: "Beliebte Romane",
    mostPopular: "Am Beliebtesten",
    weeklyRankings: "Wöchentliche Rankings",
    membership: "Mitgliedschaft",
    points: "Punkte",
    buyPoints: "Punkte Kaufen",
    favorites: "Favoriten",
    viewAll: "Alle Anzeigen",
    readingStats: "Lesestatistiken",
    novelsRead: "Gelesene Romane",
    chapters: "Kapitel",
    readingTime: "Lesezeit",
    dayStreak: "Tage in Folge",
    quickActions: "Schnellaktionen",
    myLibrary: "Meine Bibliothek",
    readingHistory: "Leseverlauf",
    settings: "Einstellungen",
    notifications: "Benachrichtigungen",
    darkMode: "Dunkler Modus",
    helpSupport: "Hilfe & Support",
    privacyPolicy: "Datenschutzrichtlinie",
    comingSoon: "Demnächst!",
    comingSoonMessage: "Diese Funktion wird derzeit entwickelt. Bleiben Sie dran!",
    gotIt: "Verstanden!",
    language: "Sprache",
    selectLanguage: "Sprache Auswählen",
    items: {
      "Neon Dreams": {
        title: "Neonträume",
        description: "In einer Cyberpunk-Zukunft entdeckt ein Hacker eine Verschwörung, die die Menschheit bedroht. Durch neonbeleuchtete Straßen und digitale Netzwerke enthüllen Sie die Wahrheit hinter Unternehmensfassaden."
      },
      "Shadow Detective": {
        title: "Schatten-Detektiv",
        description: "Ein Detektiv mit übernatürlichen Fähigkeiten löst Verbrechen in der dunklen Unterwelt. Jeder Fall enthüllt ein tieferes Mysterium über die Natur von Gut und Böse in diesem Noir-Thriller."
      },
      "Royal Deception": {
        title: "Königlicher Betrug",
        description: "Hofintrigen und verbotene Romantik in einem mittelalterlichen Fantasy-Königreich. Ihre Entscheidungen werden das Schicksal des Königreichs und die Herzen derer bestimmen, die Sie treffen."
      },
      "Autumn Reverie": {
        title: "Herbstträumerei",
        description: "Die Geschichte von Kaede Asakura, einer ruhigen Schülerin, die während der Zeit des Laubwechsels an die Maplewood High School wechselt. Während goldene Blätter sanft rascheln, entdeckt sie geheimnisvolle Postkarten, die an sie adressiert sind. Jede Postkarte deutet auf vergessene Erinnerungen und unausgesprochene Versprechen hin. Führen Sie Kaede durch verzweigte Geschichten, knüpfen Sie tiefe Verbindungen zu Klassenkameraden, enthüllen Sie eine verborgene Vergangenheit und entscheiden Sie, ob Sie die Wärme der Freundschaft annehmen oder sich in die Einsamkeit des Herbstes zurückziehen."
      },
      "Rebel's Twilight Confession": {
        title: "Geständnis der Rebellin in der Dämmerung",
        description: "In den letzten Momenten der Dämmerung erleben Sie eine gefährliche Romanze mit der berüchtigtsten Rebellin der Schule. In dieser Visual Novel bestimmen Ihre aufrichtigen Entscheidungen, ob ihre raue Fassade bröckelt und ihre innere Wärme zum Vorschein kommt. Können Sie ihr Vertrauen gewinnen, bevor die letzte Glocke läutet?"
      },
      "Seraph Dawn: Last Stand": {
        title: "Seraph-Dämmerung: Letzter Stand",
        description: "In einer von der mysteriösen Krebs-Bedrohung verwüsteten Welt werden Sie zu einem der Elite-Seraph-Piloten—der letzten Hoffnung der Menschheit. Stehen Sie im Morgengrauen auf der regennassen Landebahn, greifen Sie Ihren Helm, während sich der imposante Mecha hinter Ihnen auf den Kampf vorbereitet. Ihre Entscheidungen werden den Kampf gegen überwältigende Widrigkeiten prägen und den in Ihrer Entschlossenheit verborgenen Mut offenbaren."
      },
      "Seraph Twilight: Battle at Dusk": {
        title: "Seraph-Dämmerung: Schlacht in der Abenddämmerung",
        description: "Inmitten einer bröckelnden Stadtlandschaft in der Dämmerung stehen Sie als Seraph-Pilot—die letzte Verteidigungslinie der Menschheit. Die regennassen Straßen reflektieren Neon-Holo-Werbung, während sich der imposante Mecha hinter Ihnen auf eine finale Mission vorbereitet. Greifen Sie Ihr Gewehr fest und stärken Sie Ihre Entschlossenheit: Heute Nacht liegt das Schicksal der Welt in Ihren Händen."
      },
      "Sunlit Pages: Literature Club Chronicles": {
        title: "Sonnenbeschienene Seiten: Literaturclub-Chroniken",
        description: "Treten Sie dem Literaturclub bei und erleben Sie herzerwärmende Momente mit vier einzigartigen Persönlichkeiten, die sich durch Poesie, Romane und geteilte Träume verbinden. In dieser Visual Novel werden Ihre Entscheidungen Freundschaften formen, verborgene Leidenschaften enthüllen und Wärme in jeden hellen Nachmittag im Klassenzimmer bringen."
      },
      "Pages of Connection: Clubroom Bonds": {
        title: "Seiten der Verbindung: Clubraum-Bindungen",
        description: "Betreten Sie das sonnenbeschienene Heiligtum des Literaturclubs, wo geteilte Geschichten und geflüsterte Träume unzerbrechliche Bindungen schmieden. Während Sie jedem Mitglied helfen, seine Stimme zu finden—sei es durch Poesie, Prosa oder herzliche Gespräche—werden Sie verborgene Geheimnisse aufdecken und das Schicksal dieses engen Freundeskreises gestalten."
      },
      "Crimson Halo: Seraph's Edge": {
        title: "Purpurroter Heiligenschein: Seraphs Klinge",
        description: "Gekleidet in einen eleganten taktischen Anzug und eine strahlende Klinge schwingend, erscheint die Seraph-Pilotin unter einem brennenden roten Heiligenschein inmitten eines dystopischen Schlachtfelds. Ihr unerschütterlicher Blick und ihr fließendes silbernes Haar signalisieren die finale Entschlossenheit der Menschheit gegen die herannahende Dunkelheit. Jede Entscheidung wird bestimmen, ob Hoffnung entflammt oder zu Asche zerfällt."
      }
    }
  },
  pt: {
    appName: "Centro de Novelas Visuais",
    home: "Início",
    ranking: "Classificação",
    myPage: "Minha Página",
    featured: "Destaque",
    popularNovels: "Novelas Populares",
    mostPopular: "Mais Popular",
    weeklyRankings: "Rankings Semanais",
    membership: "Assinatura",
    points: "Pontos",
    buyPoints: "Comprar Pontos",
    favorites: "Favoritos",
    viewAll: "Ver Todos",
    readingStats: "Estatísticas de Leitura",
    novelsRead: "Novelas Lidas",
    chapters: "Capítulos",
    readingTime: "Tempo de Leitura",
    dayStreak: "Dias Consecutivos",
    quickActions: "Ações Rápidas",
    myLibrary: "Minha Biblioteca",
    readingHistory: "Histórico de Leitura",
    settings: "Configurações",
    notifications: "Notificações",
    darkMode: "Modo Escuro",
    helpSupport: "Ajuda e Suporte",
    privacyPolicy: "Política de Privacidade",
    comingSoon: "Em Breve!",
    comingSoonMessage: "Esta funcionalidade está em desenvolvimento. Fique atento às atualizações!",
    gotIt: "Entendi!",
    language: "Idioma",
    selectLanguage: "Selecionar Idioma",
    items: {
      "Neon Dreams": {
        title: "Sonhos de Néon",
        description: "Em um futuro cyberpunk, um hacker descobre uma conspiração que ameaça a humanidade. Através de ruas iluminadas por néon e redes digitais, descubra a verdade escondida por trás das fachadas corporativas."
      },
      "Shadow Detective": {
        title: "Detetive das Sombras",
        description: "Um detetive com habilidades sobrenaturais resolve crimes no sombrio submundo. Cada caso revela um mistério mais profundo sobre a natureza do bem e do mal neste thriller noir."
      },
      "Royal Deception": {
        title: "Decepção Real",
        description: "Intrigas da corte e romance proibido em um reino de fantasia medieval. Suas escolhas determinarão o destino do reino e os corações daqueles que você encontrar."
      },
      "Autumn Reverie": {
        title: "Devaneio de Outono",
        description: "A história de Kaede Asakura, uma estudante quieta que se transfere para a Escola Secundária Maplewood durante a estação das folhas que mudam. Enquanto folhas douradas sussurram suavemente, ela descobre cartões postais misteriosos endereçados a ela. Cada postal sugere memórias esquecidas e promessas não ditas. Guie Kaede através de histórias ramificadas, forjando laços profundos com colegas de classe, desvendando um passado oculto e decidindo se abraça o calor da amizade ou se retira para a solidão do outono."
      },
      "Rebel's Twilight Confession": {
        title: "Confissão da Rebelde ao Crepúsculo",
        description: "Nos últimos momentos do crepúsculo, experimente um romance perigoso com a rebelde mais notória da escola. Nesta novela visual, suas escolhas sinceras determinarão se seu exterior áspero se desmorona e revela seu calor interior. Você conseguirá ganhar sua confiança antes que o sino final toque?"
      },
      "Seraph Dawn: Last Stand": {
        title: "Alvorada Serafim: Última Resistência",
        description: "Em um mundo devastado pela misteriosa ameaça do Câncer, você se torna um dos pilotos Serafim de elite—a última esperança da humanidade. Fique na pista molhada pela chuva ao amanhecer, segurando seu capacete enquanto o mecha imponente atrás de você se prepara para o combate. Suas escolhas moldarão a batalha contra probabilidades esmagadoras e revelarão a coragem escondida dentro de sua determinação."
      },
      "Seraph Twilight: Battle at Dusk": {
        title: "Crepúsculo Serafim: Batalha ao Anoitecer",
        description: "Em meio a uma paisagem urbana em ruínas ao crepúsculo, você se ergue como um piloto Serafim—a última linha de defesa da humanidade. As ruas molhadas pela chuva refletem anúncios holográficos de néon enquanto o mecha imponente atrás de você se prepara para uma missão final. Segure seu rifle firmemente e fortaleça sua determinação: esta noite, o destino do mundo está em suas mãos."
      },
      "Sunlit Pages: Literature Club Chronicles": {
        title: "Páginas Iluminadas pelo Sol: Crônicas do Clube de Literatura",
        description: "Junte-se ao Clube de Literatura e experimente momentos tocantes com quatro personalidades únicas que se conectam através de poesia, romances e sonhos compartilhados. Nesta novela visual, suas escolhas moldarão amizades, revelarão paixões ocultas e trarão calor para cada tarde brilhante na sala de aula."
      },
      "Pages of Connection: Clubroom Bonds": {
        title: "Páginas de Conexão: Laços da Sala do Clube",
        description: "Entre no santuário iluminado pelo sol do Clube de Literatura, onde histórias compartilhadas e sonhos sussurrados forjam laços inquebráveis. Enquanto você ajuda cada membro a encontrar sua voz—seja através de poesia, prosa ou conversa sincera—você descobrirá segredos ocultos e moldará o destino deste círculo próximo de amigos."
      },
      "Crimson Halo: Seraph's Edge": {
        title: "Halo Carmesim: Lâmina do Serafim",
        description: "Vestida com um traje tático elegante e empunhando uma lâmina radiante, a piloto Serafim emerge sob um halo vermelho ardente em meio a um campo de batalha distópico. Seu olhar inabalável e cabelo prateado flutuante sinalizam a determinação final da humanidade contra a escuridão que se aproxima. Cada escolha determinará se a esperança se acende ou desvanece em cinzas."
      }
    }
  },
  ru: {
    appName: "Центр Визуальных Новелл",
    home: "Главная",
    ranking: "Рейтинг",
    myPage: "Моя Страница",
    featured: "Рекомендуемое",
    popularNovels: "Популярные Новеллы",
    mostPopular: "Самое Популярное",
    weeklyRankings: "Недельные Рейтинги",
    membership: "Членство",
    points: "Очки",
    buyPoints: "Купить Очки",
    favorites: "Избранное",
    viewAll: "Показать Все",
    readingStats: "Статистика Чтения",
    novelsRead: "Прочитанные Новеллы",
    chapters: "Главы",
    readingTime: "Время Чтения",
    dayStreak: "Дни Подряд",
    quickActions: "Быстрые Действия",
    myLibrary: "Моя Библиотека",
    readingHistory: "История Чтения",
    settings: "Настройки",
    notifications: "Уведомления",
    darkMode: "Темный Режим",
    helpSupport: "Помощь и Поддержка",
    privacyPolicy: "Политика Конфиденциальности",
    comingSoon: "Скоро!",
    comingSoonMessage: "Эта функция находится в разработке. Следите за обновлениями!",
    gotIt: "Понятно!",
    language: "Язык",
    selectLanguage: "Выбрать Язык",
    items: {
      "Neon Dreams": {
        title: "Неоновые Сны",
        description: "В киберпанк-будущем хакер обнаруживает заговор, угрожающий человечеству. Через неоновые улицы и цифровые сети раскройте правду, скрытую за корпоративными фасадами."
      },
      "Shadow Detective": {
        title: "Теневой Детектив",
        description: "Детектив со сверхъестественными способностями раскрывает преступления в темном подземном мире. Каждое дело раскрывает более глубокую тайну о природе добра и зла в этом нуарном триллере."
      },
      "Royal Deception": {
        title: "Королевский Обман",
        description: "Придворные интриги и запретная романтика в средневековом фэнтезийном королевстве. Ваш выбор определит судьбу королевства и сердца тех, кого вы встретите."
      },
      "Autumn Reverie": {
        title: "Осенние Грезы",
        description: "История Каэде Асакуры, тихой студентки, которая переводится в старшую школу Мейплвуд в сезон смены листьев. Пока золотые листья мягко шелестят, она обнаруживает загадочные открытки, адресованные ей. Каждая открытка намекает на забытые воспоминания и невысказанные обещания. Ведите Каэде через разветвленные истории, создавая глубокие связи с одноклассниками, раскрывая скрытое прошлое и решая, принять ли тепло дружбы или отступить в одиночество осени."
      },
      "Rebel's Twilight Confession": {
        title: "Признание Бунтарки в Сумерках",
        description: "В последние моменты сумерек переживите опасный роман с самой печально известной бунтаркой школы. В этой визуальной новелле ваш искренний выбор определит, рухнет ли ее грубая внешность и раскроется ли внутреннее тепло. Сможете ли вы завоевать ее доверие до того, как прозвенит последний звонок?"
      },
      "Seraph Dawn: Last Stand": {
        title: "Рассвет Серафима: Последний Рубеж",
        description: "В мире, опустошенном загадочной угрозой Рака, вы становитесь одним из элитных пилотов Серафимов—последней надеждой человечества. Стойте на промокшей дождем взлетной полосе на рассвете, сжимая шлем, пока внушительный меха позади вас готовится к бою. Ваш выбор сформирует битву против подавляющих трудностей и раскроет мужество, скрытое в вашей решимости."
      },
      "Seraph Twilight: Battle at Dusk": {
        title: "Сумерки Серафима: Битва в Сумерках",
        description: "Среди рушащегося городского пейзажа в сумерках вы стоите как пилот Серафима—последняя линия защиты человечества. Промокшие дождем улицы отражают неоновую голографическую рекламу, пока внушительный меха позади вас готовится к финальной миссии. Крепко сожмите винтовку и укрепите решимость: сегодня ночью судьба мира в ваших руках."
      },
      "Sunlit Pages: Literature Club Chronicles": {
        title: "Солнечные Страницы: Хроники Литературного Клуба",
        description: "Присоединитесь к Литературному клубу и переживите трогательные моменты с четырьмя уникальными личностями, которые объединяются через поэзию, романы и общие мечты. В этой визуальной новелле ваш выбор сформирует дружбу, раскроет скрытые страсти и принесет тепло в каждый яркий послеобеденный час в классе."
      },
      "Pages of Connection: Clubroom Bonds": {
        title: "Страницы Связи: Узы Клубной Комнаты",
        description: "Войдите в освещенное солнцем святилище Литературного клуба, где общие истории и шепчущиеся мечты создают нерушимые узы. Помогая каждому участнику найти свой голос—через поэзию, прозу или искренний разговор—вы раскроете скрытые секреты и сформируете судьбу этого тесного круга друзей."
      },
      "Crimson Halo: Seraph's Edge": {
        title: "Алый Нимб: Грань Серафима",
        description: "Одетая в элегантный тактический костюм и размахивающая сияющим клинком, пилот Серафима появляется под горящим красным нимбом посреди антиутопического поля битвы. Ее непоколебимый взгляд и струящиеся серебряные волосы сигнализируют о финальной решимости человечества против надвигающейся тьмы. Каждый выбор определит, загорится ли надежда или превратится в пепел."
      }
    }
  },
  ar: {
    appName: "مركز الروايات المرئية",
    home: "الرئيسية",
    ranking: "التصنيف",
    myPage: "صفحتي",
    featured: "مميز",
    popularNovels: "الروايات الشائعة",
    mostPopular: "الأكثر شعبية",
    weeklyRankings: "التصنيفات الأسبوعية",
    membership: "العضوية",
    points: "النقاط",
    buyPoints: "شراء النقاط",
    favorites: "المفضلة",
    viewAll: "عرض الكل",
    readingStats: "إحصائيات القراءة",
    novelsRead: "الروايات المقروءة",
    chapters: "الفصول",
    readingTime: "وقت القراءة",
    dayStreak: "الأيام المتتالية",
    quickActions: "الإجراءات السريعة",
    myLibrary: "مكتبتي",
    readingHistory: "تاريخ القراءة",
    settings: "الإعدادات",
    notifications: "الإشعارات",
    darkMode: "الوضع المظلم",
    helpSupport: "المساعدة والدعم",
    privacyPolicy: "سياسة الخصوصية",
    comingSoon: "قريباً!",
    comingSoonMessage: "هذه الميزة قيد التطوير حالياً. ترقب التحديثات!",
    gotIt: "فهمت!",
    language: "اللغة",
    selectLanguage: "اختيار اللغة",
    items: {
      "Neon Dreams": {
        title: "أحلام النيون",
        description: "في مستقبل سايبربانك، يكتشف هاكر مؤامرة تهدد البشرية. من خلال الشوارع المضاءة بالنيون والشبكات الرقمية، اكتشف الحقيقة المخفية وراء واجهات الشركات."
      },
      "Shadow Detective": {
        title: "المحقق الظل",
        description: "محقق بقدرات خارقة للطبيعة يحل الجرائم في العالم السفلي المظلم. كل قضية تكشف لغزاً أعمق حول طبيعة الخير والشر في هذا الإثارة النوار."
      },
      "Royal Deception": {
        title: "الخداع الملكي",
        description: "مؤامرات البلاط والرومانسية المحرمة في مملكة خيالية من العصور الوسطى. اختياراتك ستحدد مصير المملكة وقلوب من تقابلهم."
      },
      "Autumn Reverie": {
        title: "أحلام الخريف",
        description: "قصة كايدي أساكورا، طالبة هادئة تنقل إلى مدرسة مابلوود الثانوية خلال موسم تغيير الأوراق. بينما تهمس الأوراق الذهبية بلطف، تكتشف بطاقات بريدية غامضة موجهة إليها. كل بطاقة بريدية تلمح إلى ذكريات منسية ووعود غير منطوقة. قد كايدي عبر قصص متشعبة، وكوّن روابط عميقة مع زملاء الصف، واكشف ماضياً مخفياً، وقرر ما إذا كنت ستحتضن دفء الصداقة أم تنسحب إلى وحدة الخريف."
      },
      "Rebel's Twilight Confession": {
        title: "اعتراف المتمردة عند الغسق",
        description: "في اللحظات الأخيرة من الغسق، اختبر رومانسية خطيرة مع أكثر المتمردات سيئة السمعة في المدرسة. في هذه الرواية المرئية، اختياراتك الصادقة ستحدد ما إذا كان مظهرها الخشن سينهار ويكشف عن دفئها الداخلي. هل يمكنك كسب ثقتها قبل أن يدق الجرس الأخير؟"
      },
      "Seraph Dawn: Last Stand": {
        title: "فجر السيرافيم: الموقف الأخير",
        description: "في عالم دمره تهديد السرطان الغامض، تصبح أحد طياري السيرافيم النخبة—آخر أمل للبشرية. قف على المدرج المبلل بالمطر عند الفجر، ممسكاً بخوذتك بينما يستعد الميكا المهيب خلفك للقتال. اختياراتك ستشكل المعركة ضد الصعاب الساحقة وتكشف الشجاعة المخفية في عزيمتك."
      },
      "Seraph Twilight: Battle at Dusk": {
        title: "غسق السيرافيم: معركة عند الغسق",
        description: "وسط منظر حضري متداعٍ عند الغسق، تقف كطيار سيرافيم—آخر خط دفاع للبشرية. الشوارع المبللة بالمطر تعكس إعلانات الهولوغرام النيون بينما يستعد الميكا المهيب خلفك لمهمة أخيرة. امسك بندقيتك بقوة وقوّ عزيمتك: هذه الليلة، مصير العالم في يديك."
      },
      "Sunlit Pages: Literature Club Chronicles": {
        title: "صفحات مشمسة: سجلات نادي الأدب",
        description: "انضم إلى نادي الأدب واختبر لحظات مؤثرة مع أربع شخصيات فريدة يترابطون من خلال الشعر والروايات والأحلام المشتركة. في هذه الرواية المرئية، اختياراتك ستشكل الصداقات وتكشف العواطف المخفية وتجلب الدفء لكل بعد ظهر مشرق في الفصل الدراسي."
      },
      "Pages of Connection: Clubroom Bonds": {
        title: "صفحات الاتصال: روابط غرفة النادي",
        description: "ادخل إلى ملاذ نادي الأدب المضاء بأشعة الشمس، حيث تكوّن القصص المشتركة والأحلام المهموسة روابط لا تنكسر. بينما تساعد كل عضو في العثور على صوته—سواء من خلال الشعر أو النثر أو المحادثة الصادقة—ستكشف أسراراً مخفية وتشكل مصير هذه الدائرة المتماسكة من الأصدقاء."
      },
      "Crimson Halo: Seraph's Edge": {
        title: "الهالة القرمزية: حافة السيرافيم",
        description: "مرتدية بذلة تكتيكية أنيقة وتلوح بنصل مشع، تظهر طيارة السيرافيم تحت هالة حمراء مشتعلة وسط ساحة معركة ديستوبية. نظرتها الثابتة وشعرها الفضي المتدفق يشيران إلى عزيمة البشرية الأخيرة ضد الظلام المقترب. كل اختيار سيحدد ما إذا كان الأمل سيشتعل أم يتحول إلى رماد."
      }
    }
  },
  hi: {
    appName: "विज़ुअल नॉवेल हब",
    home: "होम",
    ranking: "रैंकिंग",
    myPage: "मेरा पेज",
    featured: "विशेष",
    popularNovels: "लोकप्रिय उपन्यास",
    mostPopular: "सबसे लोकप्रिय",
    weeklyRankings: "साप्ताहिक रैंकिंग",
    membership: "सदस्यता",
    points: "अंक",
    buyPoints: "अंक खरीदें",
    favorites: "पसंदीदा",
    viewAll: "सभी देखें",
    readingStats: "पठन आंकड़े",
    novelsRead: "पढ़े गए उपन्यास",
    chapters: "अध्याय",
    readingTime: "पठन समय",
    dayStreak: "दिन की लकीर",
    quickActions: "त्वरित क्रियाएं",
    myLibrary: "मेरा पुस्तकालय",
    readingHistory: "पठन इतिहास",
    settings: "सेटिंग्स",
    notifications: "सूचनाएं",
    darkMode: "डार्क मोड",
    helpSupport: "सहायता और समर्थन",
    privacyPolicy: "गोपनीयता नीति",
    comingSoon: "जल्द आ रहा है!",
    comingSoonMessage: "यह सुविधा विकास में है। अपडेट के लिए बने रहें!",
    gotIt: "समझ गया!",
    language: "भाषा",
    selectLanguage: "भाषा चुनें",
    items: {
      "Neon Dreams": {
        title: "नियॉन सपने",
        description: "साइबरपंक भविष्य में, एक हैकर मानवता को धमकाने वाली साजिश की खोज करता है। नियॉन-प्रकाशित सड़कों और डिजिटल नेटवर्क के माध्यम से, कॉर्पोरेट मुखौटों के पीछे छुपे सच को उजागर करें।"
      },
      "Shadow Detective": {
        title: "छाया जासूस",
        description: "अलौकिक क्षमताओं वाला एक जासूस अंधेरी भूमिगत दुनिया में अपराध सुलझाता है। प्रत्येक मामला इस नॉयर शैली के थ्रिलर में अच्छाई और बुराई की प्रकृति के बारे में गहरी रहस्य को उजागर करता है।"
      },
      "Royal Deception": {
        title: "शाही धोखा",
        description: "मध्यकालीन फंतासी राज्य में दरबारी षड्यंत्र और निषिद्ध रोमांस। आपकी पसंद राज्य की नियति और उन लोगों के दिलों को निर्धारित करेगी जिनसे आप मिलते हैं।"
      },
      "Autumn Reverie": {
        title: "शरद ऋतु का सपना",
        description: "कायदे असाकुरा की कहानी, एक शांत छात्रा जो पत्तियों के बदलने के मौसम में मेपलवुड हाई स्कूल में स्थानांतरित होती है। जब सुनहरे पत्ते धीरे से सरसराते हैं, तो वह अपने नाम के रहस्यमय पोस्टकार्ड पाती है। प्रत्येक पोस्टकार्ड भूले हुए यादों और न कहे गए वादों का संकेत देता है। शाखित कहानियों के माध्यम से कायदे का मार्गदर्शन करें, सहपाठियों के साथ गहरे रिश्ते बनाएं, छुपे हुए अतीत को उजागर करें, और तय करें कि दोस्ती की गर्माहट को अपनाना है या शरद ऋतु के एकांत में वापस जाना है।"
      },
      "Rebel's Twilight Confession": {
        title: "विद्रोही की संध्या स्वीकारोक्ति",
        description: "संध्या के अंतिम क्षणों में, स्कूल की सबसे कुख्यात विद्रोही के साथ खतरनाक रोमांस का अनुभव करें। इस विज़ुअल नॉवेल में, आपकी ईमानदार पसंद तय करेगी कि क्या उसका कठोर बाहरी रूप टूटेगा और भीतरी गर्माहट प्रकट होगी। क्या आप अंतिम घंटी बजने से पहले उसका विश्वास जीत सकते हैं?"
      },
      "Seraph Dawn: Last Stand": {
        title: "सेराफ डॉन: अंतिम संघर्ष",
        description: "रहस्यमय कैंसर खतरे से तबाह हुई दुनिया में, आप एलीट सेराफ पायलटों में से एक बनते हैं—मानवता की अंतिम आशा। भोर में बारिश से भीगे रनवे पर खड़े होकर, अपना हेलमेट पकड़े हुए जबकि आपके पीछे विशाल मेका युद्ध की तैयारी कर रहा है। आपकी पसंद भारी बाधाओं के खिलाफ लड़ाई को आकार देगी और आपके दृढ़ संकल्प में छुपे साहस को प्रकट करेगी।"
      },
      "Seraph Twilight: Battle at Dusk": {
        title: "सेराफ संध्या: सांझ की लड़ाई",
        description: "संध्या में ढहते शहरी परिदृश्य के बीच, आप सेराफ पायलट के रूप में खड़े हैं—मानवता की अंतिम रक्षा पंक्ति। बारिश से भीगी सड़कें नियॉन होलो विज्ञापनों को दर्शाती हैं जबकि आपके पीछे विशाल मेका अंतिम मिशन की तैयारी कर रहा है। अपनी राइफल को मजबूती से पकड़ें और अपना संकल्प मजबूत करें: आज रात, दुनिया की नियति आपके हाथों में है।"
      },
      "Sunlit Pages: Literature Club Chronicles": {
        title: "धूप वाले पन्ने: साहित्य क्लब इतिहास",
        description: "साहित्य क्लब में शामिल हों और चार अनूठे व्यक्तित्वों के साथ दिल छूने वाले क्षणों का अनुभव करें जो कविता, उपन्यास और साझा सपनों के माध्यम से जुड़ते हैं। इस विज़ुअल नॉवेल में, आपकी पसंद दोस्ती को आकार देगी, छुपे हुए जुनून को प्रकट करेगी, और कक्षा में हर उज्ज्वल दोपहर में गर्माहट लाएगी।"
      },
      "Pages of Connection: Clubroom Bonds": {
        title: "संबंध के पन्ने: क्लब रूम के बंधन",
        description: "साहित्य क्लब के धूप से भरे अभयारण्य में कदम रखें, जहां साझा कहानियां और फुसफुसाए गए सपने अटूट बंधन बनाते हैं। जब आप प्रत्येक सदस्य को उनकी आवाज़ खोजने में मदद करते हैं—चाहे कविता के माध्यम से, गद्य के माध्यम से, या दिल से बातचीत के माध्यम से—आप छुपे हुए रहस्यों को उजागर करेंगे और दोस्तों के इस करीबी दायरे की नियति को आकार देंगे।"
      },
      "Crimson Halo: Seraph's Edge": {
        title: "क्रिमसन हेलो: सेराफ की धार",
        description: "सुरुचिपूर्ण सामरिक सूट पहने और चमकदार ब्लेड उठाए, सेराफ पायलट डिस्टोपियन युद्धक्षेत्र के बीच जलते लाल प्रभामंडल के नीचे प्रकट होता है। उसकी अडिग नज़र और बहते चांदी के बाल आने वाले अंधकार के खिलाफ मानवता के अंतिम संकल्प का संकेत देते हैं। हर पसंद तय करेगी कि आशा जलेगी या राख में बदल जाएगी।"
      }
    }
  },
  th: {
    appName: "ศูนย์นิยายภาพ",
    home: "หน้าแรก",
    ranking: "อันดับ",
    myPage: "หน้าของฉัน",
    featured: "แนะนำ",
    popularNovels: "นิยายยอดนิยม",
    mostPopular: "ยอดนิยมที่สุด",
    weeklyRankings: "อันดับรายสัปดาห์",
    membership: "สมาชิก",
    points: "คะแนน",
    buyPoints: "ซื้อคะแนน",
    favorites: "รายการโปรด",
    viewAll: "ดูทั้งหมด",
    readingStats: "สถิติการอ่าน",
    novelsRead: "นิยายที่อ่านแล้ว",
    chapters: "บท",
    readingTime: "เวลาอ่าน",
    dayStreak: "วันติดต่อกัน",
    quickActions: "การดำเนินการด่วน",
    myLibrary: "ห้องสมุดของฉัน",
    readingHistory: "ประวัติการอ่าน",
    settings: "การตั้งค่า",
    notifications: "การแจ้งเตือน",
    darkMode: "โหมดมืด",
    helpSupport: "ช่วยเหลือและสนับสนุน",
    privacyPolicy: "นโยบายความเป็นส่วนตัว",
    comingSoon: "เร็วๆ นี้!",
    comingSoonMessage: "คุณสมบัตินี้อยู่ระหว่างการพัฒนา โปรดติดตามการอัปเดต!",
    gotIt: "เข้าใจแล้ว!",
    language: "ภาษา",
    selectLanguage: "เลือกภาษา",
    items: {
      "Neon Dreams": {
        title: "ความฝันนีออน",
        description: "ในอนาคตไซเบอร์พังค์ แฮกเกอร์ค้นพบแผนการสมรู้ร่วมคิดที่คุกคามมนุษยชาติ ผ่านถนนที่ส่องแสงด้วยนีออนและเครือข่ายดิจิทัล เปิดเผยความจริงที่ซ่อนอยู่เบื้องหลังหน้ากากของบริษัท"
      },
      "Shadow Detective": {
        title: "นักสืบเงา",
        description: "นักสืบที่มีความสามารถเหนือธรรมชาติแก้ไขอาชญากรรมในโลกใต้ดินที่มืดมน แต่ละคดีเผยให้เห็นความลึกลับที่ลึกซึ้งยิ่งขึ้นเกี่ยวกับธรรมชาติของความดีและความชั่วในเรื่องระทึกขวัญสไตล์นัวร์นี้"
      },
      "Royal Deception": {
        title: "การหลอกลวงของราชวงศ์",
        description: "การสมรู้ร่วมคิดในราชสำนักและความรักที่ต้องห้ามในอาณาจักรแฟนตาซียุคกลาง ทางเลือกของคุณจะกำหนดชะตากรรมของอาณาจักรและหัวใจของผู้ที่คุณพบ"
      },
      "Autumn Reverie": {
        title: "ความฝันฤดูใบไม้ร่วง",
        description: "เรื่องราวของคาเอเดะ อาซากุระ นักเรียนเงียบๆ ที่ย้ายไปโรงเรียนมัธยมเมเปิลวูดในช่วงฤดูใบไม้เปลี่ยนสี ขณะที่ใบไม้สีทองกระซิบเบาๆ เธอค้นพบโปสการ์ดลึกลับที่ส่งมาให้เธอ โปสการ์ดแต่ละใบบอกเป็นนัยถึงความทรงจำที่ถูกลืมและคำสัญญาที่ไม่เคยพูด นำทางคาเอเดะผ่านเรื่องราวที่แตกแขนง สร้างสายสัมพันธ์อันลึกซึ้งกับเพื่อนร่วมชั้น เปิดเผยอดีตที่ซ่อนเร้น และตัดสินใจว่าจะโอบกอดความอบอุ่นของมิตรภาพหรือถอยกลับไปสู่ความเหงาของฤดูใบไม้ร่วง"
      },
      "Rebel's Twilight Confession": {
        title: "คำสารภาพของนักกบฏในยามค่ำคืน",
        description: "ในช่วงเวลาสุดท้ายของค่ำคืน สัมผัสความรักที่เสี่ยงอันตรายกับนักกบฏที่มีชื่อเสียงที่สุดของโรงเรียน ในนิยายภาพนี้ ทางเลือกที่จริงใจของคุณจะกำหนดว่าภายนอกที่หยาบกร้านของเธอจะพังทลายและเผยให้เห็นความอบอุ่นภายในหรือไม่ คุณจะชนะความไว้วางใจของเธอได้ก่อนที่ระฆังสุดท้ายจะดังหรือไม่?"
      },
      "Seraph Dawn: Last Stand": {
        title: "รุ่งอรุณเซราฟ: การยืนหยัดครั้งสุดท้าย",
        description: "ในโลกที่ถูกทำลายโดยภัยคุกคามแคนเซอร์ลึกลับ คุณกลายเป็นหนึ่งในนักบินเซราฟชั้นยอด—ความหวังสุดท้ายของมนุษยชาติ ยืนบนทางวิ่งที่เปียกฝนในยามรุ่งอรุณ กำมือหมวกนิรภัยขณะที่เมคาขนาดใหญ่เบื้องหลังคุณเตรียมพร้อมสำหรับการต่อสู้ ทางเลือกของคุณจะหล่อหลอมการต่อสู้กับอุปสรรคที่ท่วมท้นและเผยให้เห็นความกล้าหาญที่ซ่อนอยู่ในความมุ่งมั่นของคุณ"
      },
      "Seraph Twilight: Battle at Dusk": {
        title: "ค่ำคืนเซราฟ: การต่อสู้ยามพลบค่ำ",
        description: "ท่ามกลางภูมิทัศน์เมืองที่พังทลายในยามค่ำคืน คุณยืนในฐานะนักบินเซราฟ—แนวป้องกันสุดท้ายของมนุษยชาติ ถนนที่เปียกฝนสะท้อนโฆษณาโฮโลนีออนขณะที่เมคาขนาดใหญ่เบื้องหลังคุณเตรียมพร้อมสำหรับภารกิจสุดท้าย จับปืนไรเฟิลให้แน่นและเสริมความมุ่งมั่น: คืนนี้ชะตากรรมของโลกอยู่ในมือของคุณ"
      },
      "Sunlit Pages: Literature Club Chronicles": {
        title: "หน้ากระดาษแสงแดด: บันทึกชมรมวรรณกรรม",
        description: "เข้าร่วมชมรมวรรณกรรมและสัมผัสช่วงเวลาที่อบอุ่นใจกับบุคลิกภาพที่มีเอกลักษณ์สี่คนที่เชื่อมโยงกันผ่านบทกวี นิยาย และความฝันที่มีร่วมกัน ในนิยายภาพนี้ ทางเลือกของคุณจะหล่อหลอมมิตรภาพ เปิดเผยความหลงใหลที่ซ่อนเร้น และนำความอบอุ่นมาสู่ทุกบ่ายที่สดใสในห้องเรียน"
      },
      "Pages of Connection: Clubroom Bonds": {
        title: "หน้าแห่งการเชื่อมโยง: สายสัมพันธ์ห้องชมรม",
        description: "ก้าวเข้าสู่สถานที่ศักดิ์สิทธิ์ของชมรมวรรณกรรมที่แสงแดดส่องผ่าน ที่ซึ่งเรื่องราวที่แบ่งปันและความฝันที่กระซิบสร้างสายสัมพันธ์ที่ขาดไม่ได้ ขณะที่คุณช่วยให้สมาชิกแต่ละคนค้นหาเสียงของตน—ไม่ว่าจะผ่านบทกวี ร้อยแก้ว หรือการสนทนาที่จริงใจ—คุณจะเปิดเผยความลับที่ซ่อนเร้นและหล่อหลอมชะตากรรมของวงเพื่อนสนิทกลุ่มนี้"
      },
      "Crimson Halo: Seraph's Edge": {
        title: "ร่วงแสงสีแดงเข้ม: ขอบเขตเซราฟ",
        description: "สวมชุดทางยุทธวิธีที่หรูหราและถือดาบที่เปล่งแสง นักบินเซราฟปรากฏตัวใต้ร่วงแสงสีแดงที่ลุกโชนท่ามกลางสนามรบดิสโทเปีย สายตาที่มั่นคงและผมสีเงินที่ปลิวไสวของเธอส่งสัญญาณถึงความมุ่งมั่นสุดท้ายของมนุษยชาติต่อต้านความมืดมิดที่กำลังมาถึง ทุกทางเลือกจะกำหนดว่าความหวังจะลุกโชนหรือกลายเป็นเถ้าถ่าน"
      }
    }
  },
  vi: {
    appName: "Trung Tâm Tiểu Thuyết Hình Ảnh",
    home: "Trang Chủ",
    ranking: "Xếp Hạng",
    myPage: "Trang Của Tôi",
    featured: "Nổi Bật",
    popularNovels: "Tiểu Thuyết Phổ Biến",
    mostPopular: "Phổ Biến Nhất",
    weeklyRankings: "Xếp Hạng Tuần",
    membership: "Thành Viên",
    points: "Điểm",
    buyPoints: "Mua Điểm",
    favorites: "Yêu Thích",
    viewAll: "Xem Tất Cả",
    readingStats: "Thống Kê Đọc",
    novelsRead: "Tiểu Thuyết Đã Đọc",
    chapters: "Chương",
    readingTime: "Thời Gian Đọc",
    dayStreak: "Ngày Liên Tiếp",
    quickActions: "Hành Động Nhanh",
    myLibrary: "Thư Viện Của Tôi",
    readingHistory: "Lịch Sử Đọc",
    settings: "Cài Đặt",
    notifications: "Thông Báo",
    darkMode: "Chế Độ Tối",
    helpSupport: "Trợ Giúp & Hỗ Trợ",
    privacyPolicy: "Chính Sách Bảo Mật",
    comingSoon: "Sắp Ra Mắt!",
    comingSoonMessage: "Tính năng này đang được phát triển. Hãy theo dõi các cập nhật!",
    gotIt: "Hiểu rồi!",
    language: "Ngôn Ngữ",
    selectLanguage: "Chọn Ngôn Ngữ",
    items: {
      "Neon Dreams": {
        title: "Giấc Mơ Neon",
        description: "Trong tương lai cyberpunk, một hacker phát hiện âm mưu đe dọa nhân loại. Qua những con phố được chiếu sáng bằng neon và mạng lưới kỹ thuật số, hãy khám phá sự thật ẩn giấu đằng sau những mặt tiền công ty."
      },
      "Shadow Detective": {
        title: "Thám Tử Bóng Tối",
        description: "Một thám tử có khả năng siêu nhiên giải quyết tội phạm trong thế giới ngầm tối tăm. Mỗi vụ án tiết lộ một bí ẩn sâu sắc hơn về bản chất của thiện và ác trong bộ phim kinh dị phong cách noir này."
      },
      "Royal Deception": {
        title: "Lừa Dối Hoàng Gia",
        description: "Âm mưu cung đình và tình yêu bị cấm trong một vương quốc fantasy thời trung cổ. Những lựa chọn của bạn sẽ quyết định số phận của vương quốc và trái tim của những người bạn gặp."
      },
      "Autumn Reverie": {
        title: "Mộng Mơ Mùa Thu",
        description: "Câu chuyện về Kaede Asakura, một học sinh yên tĩnh chuyển đến trường trung học Maplewood trong mùa lá thay màu. Khi những chiếc lá vàng thì thầm nhẹ nhàng, cô khám phá những tấm bưu thiếp bí ẩn được gửi cho cô. Mỗi tấm bưu thiếp ám chỉ những ký ức bị lãng quên và những lời hứa chưa được nói ra. Hướng dẫn Kaede qua những câu chuyện phân nhánh, tạo dựng mối liên kết sâu sắc với các bạn cùng lớp, khám phá quá khứ ẩn giấu, và quyết định liệu có nên đón nhận sự ấm áp của tình bạn hay rút lui vào sự cô đơn của mùa thu."
      },
      "Rebel's Twilight Confession": {
        title: "Lời Thú Tội Của Kẻ Nổi Loạn Lúc Hoàng Hôn",
        description: "Trong những khoảnh khắc cuối của hoàng hôn, trải nghiệm một cuộc tình lãng mạn nguy hiểm với kẻ nổi loạn khét tiếng nhất của trường. Trong tiểu thuyết hình ảnh này, những lựa chọn chân thành của bạn sẽ quyết định liệu vẻ ngoài thô ráp của cô ấy có sụp đổ và tiết lộ sự ấm áp bên trong hay không. Bạn có thể giành được sự tin tưởng của cô ấy trước khi tiếng chuông cuối cùng vang lên không?"
      },
      "Seraph Dawn: Last Stand": {
        title: "Bình Minh Seraph: Trận Chiến Cuối Cùng",
        description: "Trong một thế giới bị tàn phá bởi mối đe dọa Cancer bí ẩn, bạn trở thành một trong những phi công Seraph ưu tú—niềm hy vọng cuối cùng của nhân loại. Đứng trên đường băng ướt mưa lúc bình minh, nắm chặt mũ bảo hiểm trong khi chiếc mecha khổng lồ phía sau bạn chuẩn bị chiến đấu. Những lựa chọn của bạn sẽ định hình cuộc chiến chống lại những khó khăn áp đảo và tiết lộ lòng dũng cảm ẩn giấu trong quyết tâm của bạn."
      },
      "Seraph Twilight: Battle at Dusk": {
        title: "Hoàng Hôn Seraph: Trận Chiến Lúc Chạng Vạng",
        description: "Giữa cảnh quan thành phố đang sụp đổ lúc hoàng hôn, bạn đứng như một phi công Seraph—tuyến phòng thủ cuối cùng của nhân loại. Những con phố ướt mưa phản chiếu quảng cáo holo neon trong khi chiếc mecha khổng lồ phía sau bạn chuẩn bị cho nhiệm vụ cuối cùng. Nắm chặt súng trường và tăng cường quyết tâm: đêm nay, số phận của thế giới nằm trong tay bạn."
      },
      "Sunlit Pages: Literature Club Chronicles": {
        title: "Những Trang Ánh Nắng: Biên Niên Sử Câu Lạc Bộ Văn Học",
        description: "Tham gia Câu lạc bộ Văn học và trải nghiệm những khoảnh khắc cảm động với bốn nhân vật độc đáo kết nối qua thơ ca, tiểu thuyết và những giấc mơ chung. Trong tiểu thuyết hình ảnh này, những lựa chọn của bạn sẽ định hình tình bạn, tiết lộ những đam mê ẩn giấu và mang lại sự ấm áp cho mỗi buổi chiều tươi sáng trong lớp học."
      },
      "Pages of Connection: Clubroom Bonds": {
        title: "Những Trang Kết Nối: Mối Liên Kết Phòng Câu Lạc Bộ",
        description: "Bước vào thánh đường được ánh nắng chiếu rọi của Câu lạc bộ Văn học, nơi những câu chuyện được chia sẻ và những giấc mơ thì thầm tạo nên những mối liên kết không thể phá vỡ. Khi bạn giúp từng thành viên tìm thấy tiếng nói của họ—dù qua thơ ca, văn xuôi hay cuộc trò chuyện chân thành—bạn sẽ khám phá những bí mật ẩn giấu và định hình số phận của vòng tròn bạn bè thân thiết này."
      },
      "Crimson Halo: Seraph's Edge": {
        title: "Hào Quang Đỏ Thẫm: Lưỡi Kiếm Seraph",
        description: "Mặc bộ đồ chiến thuật thanh lịch và vung thanh kiếm rực rỡ, phi công Seraph xuất hiện dưới hào quang đỏ cháy giữa chiến trường dystopian. Ánh mắt kiên định và mái tóc bạc bay phấp phới của cô báo hiệu quyết tâm cuối cùng của nhân loại chống lại bóng tối đang đến gần. Mỗi lựa chọn sẽ quyết định liệu hy vọng có bùng cháy hay tan thành tro bụi."
      }
    }
  },
  it: {
    appName: "Centro Romanzi Visivi",
    home: "Home",
    ranking: "Classifica",
    myPage: "La Mia Pagina",
    featured: "In Evidenza",
    popularNovels: "Romanzi Popolari",
    mostPopular: "Più Popolare",
    weeklyRankings: "Classifiche Settimanali",
    membership: "Abbonamento",
    points: "Punti",
    buyPoints: "Acquista Punti",
    favorites: "Preferiti",
    viewAll: "Vedi Tutti",
    readingStats: "Statistiche di Lettura",
    novelsRead: "Romanzi Letti",
    chapters: "Capitoli",
    readingTime: "Tempo di Lettura",
    dayStreak: "Giorni Consecutivi",
    quickActions: "Azioni Rapide",
    myLibrary: "La Mia Biblioteca",
    readingHistory: "Cronologia Lettura",
    settings: "Impostazioni",
    notifications: "Notifiche",
    darkMode: "Modalità Scura",
    helpSupport: "Aiuto e Supporto",
    privacyPolicy: "Politica Privacy",
    comingSoon: "Prossimamente!",
    comingSoonMessage: "Questa funzionalità è in sviluppo. Resta sintonizzato per gli aggiornamenti!",
    gotIt: "Capito!",
    language: "Lingua",
    selectLanguage: "Seleziona Lingua",
    items: {
      "Neon Dreams": {
        title: "Sogni al Neon",
        description: "In un futuro cyberpunk, un hacker scopre una cospirazione che minaccia l'umanità. Attraverso strade illuminate al neon e reti digitali, scopri la verità nascosta dietro le facciate aziendali."
      },
      "Shadow Detective": {
        title: "Detective delle Ombre",
        description: "Un detective con abilità soprannaturali risolve crimini nel mondo sotterraneo oscuro. Ogni caso rivela un mistero più profondo sulla natura del bene e del male in questo thriller noir."
      },
      "Royal Deception": {
        title: "Inganno Reale",
        description: "Cospirazione di corte e romanticismo proibito in un regno fantasy medievale. Le tue scelte determineranno il destino del regno e i cuori di coloro che incontri."
      },
      "Autumn Reverie": {
        title: "Sogno d'Autunno",
        description: "La storia di Kaede Asakura, una studentessa tranquilla che si trasferisce alla Maplewood High School durante la stagione del cambio delle foglie. Mentre le foglie dorate sussurrano dolcemente, scopre cartoline misteriose indirizzate a lei. Ogni cartolina allude a ricordi dimenticati e promesse non dette. Guida Kaede attraverso storie ramificate, forma legami profondi con i compagni di classe, scopri un passato nascosto e decidi se abbracciare il calore dell'amicizia o ritirarsi nella solitudine autunnale."
      },
      "Rebel's Twilight Confession": {
        title: "Confessione del Ribelle al Crepuscolo",
        description: "Nei momenti finali del crepuscolo, vivi un romanticismo pericoloso con la ribelle più famigerata della scuola. In questa visual novel, le tue scelte sincere determineranno se il suo esteriore ruvido crollerà e rivelerà il calore interiore. Puoi guadagnare la sua fiducia prima che suoni l'ultima campana?"
      },
      "Seraph Dawn: Last Stand": {
        title: "Alba del Serafino: Ultima Resistenza",
        description: "In un mondo devastato dalla misteriosa minaccia del Cancro, diventi uno dei piloti Seraph d'élite—l'ultima speranza dell'umanità. In piedi su una pista bagnata dalla pioggia all'alba, stringendo il casco mentre il gigantesco mecha dietro di te si prepara per la battaglia. Le tue scelte plasmeranno la lotta contro le probabilità schiaccianti e riveleranno il coraggio nascosto nella tua determinazione."
      },
      "Seraph Twilight: Battle at Dusk": {
        title: "Crepuscolo del Serafino: Battaglia al Tramonto",
        description: "In mezzo a un paesaggio urbano in rovina al crepuscolo, stai come pilota Seraph—l'ultima linea di difesa dell'umanità. Le strade bagnate dalla pioggia riflettono pubblicità olografiche al neon mentre il gigantesco mecha dietro di te si prepara per la missione finale. Afferra saldamente il fucile e rafforza la tua determinazione: stanotte, il destino del mondo è nelle tue mani."
      },
      "Sunlit Pages: Literature Club Chronicles": {
        title: "Pagine Illuminate dal Sole: Cronache del Club Letterario",
        description: "Unisciti al Club Letterario e vivi momenti toccanti con quattro personalità uniche che si legano attraverso poesia, romanzi e sogni condivisi. In questa visual novel, le tue scelte plasmeranno le amicizie, riveleranno passioni nascoste e porteranno calore a ogni pomeriggio luminoso in classe."
      },
      "Pages of Connection: Clubroom Bonds": {
        title: "Pagine di Connessione: Legami della Stanza del Club",
        description: "Entra nel santuario baciato dal sole del Club Letterario, dove storie condivise e sogni sussurrati forgiano legami indissolubili. Mentre aiuti ogni membro a trovare la propria voce—che sia attraverso la poesia, la prosa o conversazioni sincere—scoprirai segreti nascosti e plasmerai il destino di questa cerchia ristretta di amici."
      },
      "Crimson Halo: Seraph's Edge": {
        title: "Alone Cremisi: Il Limite del Serafino",
        description: "Indossando una tuta tattica elegante e brandendo una lama radiosa, il pilota Seraph emerge sotto un alone cremisi fiammeggiante in mezzo a un campo di battaglia distopico. Il suo sguardo fermo e i capelli argentati fluttuanti segnalano la determinazione finale dell'umanità contro l'oscurità incombente. Ogni scelta determinerà se la speranza si accenderà o si trasformerà in cenere."
      }
    }
  },
  tr: {
    appName: "Görsel Roman Merkezi",
    home: "Ana Sayfa",
    ranking: "Sıralama",
    myPage: "Sayfam",
    featured: "Öne Çıkan",
    popularNovels: "Popüler Romanlar",
    mostPopular: "En Popüler",
    weeklyRankings: "Haftalık Sıralamalar",
    membership: "Üyelik",
    points: "Puan",
    buyPoints: "Puan Satın Al",
    favorites: "Favoriler",
    viewAll: "Tümünü Gör",
    readingStats: "Okuma İstatistikleri",
    novelsRead: "Okunan Romanlar",
    chapters: "Bölümler",
    readingTime: "Okuma Süresi",
    dayStreak: "Gün Serisi",
    quickActions: "Hızlı İşlemler",
    myLibrary: "Kütüphanem",
    readingHistory: "Okuma Geçmişi",
    settings: "Ayarlar",
    notifications: "Bildirimler",
    darkMode: "Karanlık Mod",
    helpSupport: "Yardım ve Destek",
    privacyPolicy: "Gizlilik Politikası",
    comingSoon: "Yakında!",
    comingSoonMessage: "Bu özellik geliştirme aşamasında. Güncellemeler için takipte kalın!",
    gotIt: "Anladım!",
    language: "Dil",
    selectLanguage: "Dil Seç",
    items: {
      "Neon Dreams": {
        title: "Neon Rüyalar",
        description: "Siberpunk geleceğinde, bir hacker insanlığı tehdit eden bir komployu keşfeder. Neon ışıklı sokaklar ve dijital ağlar arasında, kurumsal maskelerin arkasında gizlenen gerçeği ortaya çıkarın."
      },
      "Shadow Detective": {
        title: "Gölge Dedektifi",
        description: "Doğaüstü yetenekleri olan bir dedektif, karanlık yeraltı dünyasında suçları çözer. Her vaka, bu noir gerilim türündeki iyilik ve kötülüğün doğası hakkında daha derin bir gizemi ortaya çıkarır."
      },
      "Royal Deception": {
        title: "Kraliyet Aldatmacası",
        description: "Ortaçağ fantezi krallığında saray entrikası ve yasak aşk. Seçimleriniz krallığın kaderini ve karşılaştığınız kişilerin kalpsini belirleyecek."
      },
      "Autumn Reverie": {
        title: "Sonbahar Hayali",
        description: "Yaprakların değişim mevsiminde Maplewood Lisesi'ne transfer olan sessiz öğrenci Kaede Asakura'nın hikayesi. Altın yapraklar usulca fısıldarken, kendisine gönderilen gizemli kartpostallar keşfeder. Her kartpostal unutulmuş anıları ve söylenmemiş sözleri ima eder. Kaede'yi dallanan hikayeler boyunca yönlendir, sınıf arkadaşlarıyla derin bağlar kur, gizli bir geçmişi ortaya çıkar ve dostluğun sıcaklığını kucaklamaya mı yoksa sonbahar yalnızlığına mı çekilmeye karar ver."
      },
      "Rebel's Twilight Confession": {
        title: "İsyancının Alacakaranlık İtirafı",
        description: "Alacakaranlığın son anlarında, okulun en ünlü isyancısıyla tehlikeli bir aşk yaşayın. Bu görsel romanda, samimi seçimleriniz onun sert dış görünüşünün çöküp içindeki sıcaklığı ortaya çıkarıp çıkarmayacağını belirleyecek. Son zil çalmadan önce güvenini kazanabilecek misin?"
      },
      "Seraph Dawn: Last Stand": {
        title: "Seraf Şafağı: Son Duruş",
        description: "Gizemli Kanser tehdidi tarafından harap edilmiş bir dünyada, elit Seraph pilotlarından biri olursunuz—insanlığın son umudu. Şafakta yağmurlu pistte durarak, arkanda dev mecha savaşa hazırlanırken kaskınızı kavrayın. Seçimleriniz ezici zorluklara karşı mücadeleyi şekillendirecek ve kararlılığınızda gizli cesareti ortaya çıkaracak."
      },
      "Seraph Twilight: Battle at Dusk": {
        title: "Seraf Alacakaranlığı: Akşam Savaşı",
        description: "Alacakaranlıkta çöken şehir manzarası ortasında, Seraph pilotu olarak duruyorsunuz—insanlığın son savunma hattı. Yağmurlu sokaklar neon holo reklamları yansıtırken arkamızda dev mecha son görev için hazırlanıyor. Tüfeğinizi sıkıca kavrayın ve kararlılığınızı güçlendirin: bu gece dünyanın kaderi ellerinizde."
      },
      "Sunlit Pages: Literature Club Chronicles": {
        title: "Güneşli Sayfalar: Edebiyat Kulübü Kayıtları",
        description: "Edebiyat Kulübü'ne katılın ve şiir, roman ve ortak hayaller aracılığıyla bağ kuran dört benzersiz kişilikle dokunaklı anlar yaşayın. Bu görsel romanda, seçimleriniz dostlukları şekillendirecek, gizli tutkuları ortaya çıkaracak ve sınıftaki her parlak öğleden sonraya sıcaklık getirecek."
      },
      "Pages of Connection: Clubroom Bonds": {
        title: "Bağlantı Sayfaları: Kulüp Odası Bağları",
        description: "Paylaşılan hikayelerin ve fısıldanan hayallerin kopmaz bağlar kurduğu Edebiyat Kulübü'nün güneşli kutsal alanına adım atın. Her üyenin sesini bulmasına yardım ederken—şiir, düzyazı veya samimi sohbet yoluyla—gizli sırları keşfedecek ve bu yakın arkadaş çembersinin kaderini şekillendireceksiniz."
      },
      "Crimson Halo: Seraph's Edge": {
        title: "Kızıl Hale: Seraf'ın Sınırı",
        description: "Zarif taktik giysi giymiş ve parlayan kılıç sallayan Seraph pilotu, distopyan savaş alanı ortasında alevli kızıl hale altında ortaya çıkıyor. Kararlı bakışları ve dalgalanan gümüş saçları, yaklaşan karanlığa karşı insanlığın son kararlılığının işareti. Her seçim umudun alevleneceğini mi yoksa küle dönüşeceğini mi belirleyecek."
      }
    }
  }
};

export const getTranslation = (key: string, lang: string = 'en'): string => {
  const translation = translations[lang as keyof typeof translations];
  if (!translation) {
    const enValue = translations.en[key as keyof typeof translations.en];
    return typeof enValue === 'string' ? enValue : key;
  }
  const value = translation[key as keyof typeof translation];
  if (typeof value === 'string') return value;
  const enValue = translations.en[key as keyof typeof translations.en];
  return typeof enValue === 'string' ? enValue : key;
};

export const getItemTranslation = (originalTitle: string, field: 'title' | 'description', lang: string = 'en'): string => {
  // If it's English, return the original title for title field or empty for description
  if (lang === 'en') {
    return field === 'title' ? originalTitle : '';
  }
  
  // Get the translation for the specified language
  const langTranslation = translations[lang as keyof typeof translations];
  if (langTranslation && 'items' in langTranslation && langTranslation.items) {
    const items = langTranslation.items as any;
    const itemKey = originalTitle as keyof typeof items;
    if (items[itemKey] && items[itemKey][field]) {
      return items[itemKey][field];
    }
  }
  
  // Fallback to original title for title field, empty for description
  return field === 'title' ? originalTitle : '';
};