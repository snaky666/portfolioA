
-- ===============================================
-- Supabase Database Setup for Aiieras Recipe Website
-- ===============================================

-- 1. إنشاء جدول الوصفات (recipes)
CREATE TABLE IF NOT EXISTS recipes (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  cat TEXT NOT NULL,
  img TEXT NOT NULL,
  date TEXT NOT NULL,
  favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. إنشاء جدول رسائل التواصل (contact_messages)
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ===============================================
-- Row Level Security (RLS) Policies
-- ===============================================

-- تفعيل RLS للجداول
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- سياسات القراءة (SELECT) - السماح للجميع بالقراءة
CREATE POLICY "Enable read access for all users" ON recipes
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON contact_messages
  FOR SELECT USING (true);

-- سياسات الإضافة (INSERT) - السماح للجميع بالإضافة
CREATE POLICY "Enable insert for all users" ON recipes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for all users" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- سياسات التحديث (UPDATE) - السماح للجميع بالتحديث
CREATE POLICY "Enable update for all users" ON recipes
  FOR UPDATE USING (true);

-- سياسات الحذف (DELETE) - السماح للجميع بالحذف
CREATE POLICY "Enable delete for all users" ON recipes
  FOR DELETE USING (true);

-- ===============================================
-- إضافة بيانات تجريبية (اختياري)
-- ===============================================

-- يمكنك إلغاء التعليق عن هذا القسم لإضافة بيانات تجريبية
/*
INSERT INTO recipes (title, cat, img, date, favorite) VALUES
  ('Vegetable Couscous with Fresh Herbs', 'main', 'assets/recipe1.jpg', 'October 15, 2025', true),
  ('Almond Honey Baklava', 'dessert', 'assets/recipe2.jpg', 'October 12, 2025', true),
  ('Quick Greek Salad', 'quick', 'assets/recipe3.jpg', 'October 10, 2025', false),
  ('Vegan Plant-Based Burger', 'vegan', 'assets/recipe4.jpg', 'October 8, 2025', true),
  ('Warm Lentil Soup Bowl', 'main', 'assets/recipe5.jpg', 'October 5, 2025', false),
  ('Healthy Veggie Tacos', 'vegan', 'assets/recipe1.jpg', 'October 3, 2025', false),
  ('Rich Chocolate Cake', 'dessert', 'assets/recipe2.jpg', 'September 28, 2025', false),
  ('Fresh Tomato Pasta', 'quick', 'assets/recipe3.jpg', 'September 25, 2025', false),
  ('Mediterranean Bowl', 'main', 'assets/recipe4.jpg', 'September 20, 2025', false),
  ('Strawberry Shortcake', 'dessert', 'assets/recipe5.jpg', 'September 15, 2025', false),
  ('Quinoa Buddha Bowl', 'vegan', 'assets/recipe1.jpg', 'September 10, 2025', false),
  ('Caprese Sandwich', 'quick', 'assets/recipe2.jpg', 'September 5, 2025', false);
*/
