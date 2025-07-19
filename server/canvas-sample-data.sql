-- Canvas Items 샘플 데이터 삽입 스크립트
-- 캔버스 기능을 위한 10개의 샘플 아이템

INSERT INTO items (title, description, image, tags, rating, view_count, like_count, featured, canvas, created_at) VALUES
(
  'Digital Art Canvas: Sunset Dreams',
  'Create stunning sunset landscapes with our interactive canvas tools. Perfect for beginners and professionals alike.',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=832&h=1216&fit=crop',
  '["Art", "Canvas", "Digital", "Landscape"]',
  '4.8',
  1250,
  89,
  true,
  true,
  NOW()
),
(
  'Fantasy Character Designer',
  'Design epic fantasy characters with our comprehensive canvas system. Includes armor, weapons, and magical effects.',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=832&h=1216&fit=crop',
  '["Fantasy", "Character", "Canvas", "RPG"]',
  '4.9',
  2100,
  156,
  false,
  true,
  NOW()
),
(
  'Abstract Pattern Studio',
  'Explore geometric patterns and abstract art creation with our advanced canvas tools and color palettes.',
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=832&h=1216&fit=crop',
  '["Abstract", "Pattern", "Canvas", "Modern"]',
  '4.6',
  890,
  67,
  false,
  true,
  NOW()
),
(
  'Anime Portrait Creator',
  'Create beautiful anime-style portraits with customizable features, expressions, and backgrounds.',
  'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=832&h=1216&fit=crop',
  '["Anime", "Portrait", "Canvas", "Art"]',
  '4.7',
  1800,
  134,
  true,
  true,
  NOW()
),
(
  'Cyberpunk City Builder',
  'Design futuristic cyberpunk cityscapes with neon lights, flying cars, and towering skyscrapers.',
  'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=832&h=1216&fit=crop',
  '["Cyberpunk", "Sci-Fi", "Canvas", "Future"]',
  '4.8',
  1650,
  112,
  false,
  true,
  NOW()
),
(
  'Nature Scene Composer',
  'Craft peaceful nature scenes with forests, rivers, mountains, and wildlife using our canvas system.',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=832&h=1216&fit=crop',
  '["Nature", "Landscape", "Canvas", "Peaceful"]',
  '4.5',
  950,
  78,
  false,
  true,
  NOW()
),
(
  'Medieval Castle Designer',
  'Build magnificent medieval castles with towers, walls, moats, and surrounding villages.',
  'https://images.unsplash.com/photo-1520637836862-4d197d17c0a0?w=832&h=1216&fit=crop',
  '["Medieval", "Castle", "Canvas", "Historical"]',
  '4.7',
  1320,
  95,
  false,
  true,
  NOW()
),
(
  'Space Explorer Canvas',
  'Create cosmic adventures with planets, spaceships, alien worlds, and stellar phenomena.',
  'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=832&h=1216&fit=crop',
  '["Space", "Sci-Fi", "Canvas", "Adventure"]',
  '4.9',
  2250,
  167,
  true,
  true,
  NOW()
),
(
  'Steampunk Workshop',
  'Design intricate steampunk machines, airships, and Victorian-era inventions with brass and gears.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=832&h=1216&fit=crop',
  '["Steampunk", "Mechanical", "Canvas", "Victorian"]',
  '4.6',
  1100,
  85,
  false,
  true,
  NOW()
),
(
  'Magical Forest Creator',
  'Build enchanted forests with mystical creatures, glowing plants, and hidden fairy villages.',
  'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=832&h=1216&fit=crop',
  '["Magic", "Fantasy", "Canvas", "Forest"]',
  '4.8',
  1450,
  103,
  false,
  true,
  NOW()
);
