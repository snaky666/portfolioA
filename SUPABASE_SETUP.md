
# إعداد Supabase للموقع

## الخطوات:

### 1. إنشاء حساب في Supabase
- اذهب إلى https://supabase.com
- أنشئ حساب جديد أو سجل دخول

### 2. إنشاء مشروع جديد
- اضغط على "New Project"
- اختر اسم للمشروع وكلمة مرور قوية
- اختر المنطقة الأقرب لك

### 3. إنشاء الجداول المطلوبة

#### جدول الوصفات (recipes):
```sql
CREATE TABLE recipes (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  cat TEXT NOT NULL,
  img TEXT NOT NULL,
  date TEXT NOT NULL,
  favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### جدول رسائل التواصل (contact_messages):
```sql
CREATE TABLE contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 4. الحصول على مفاتيح الـ API
- من لوحة تحكم Supabase، اذهب إلى Settings > API
- انسخ:
  - Project URL
  - anon public key

### 5. تحديث ملف supabase-config.js
استبدل القيم في الملف:
```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL'; // ضع الـ URL هنا
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'; // ضع الـ key هنا
```

### 6. إعداد سياسات الأمان (Row Level Security)
في Supabase، اذهب إلى Authentication > Policies وأضف:

للقراءة (SELECT):
```sql
CREATE POLICY "Enable read access for all users" ON recipes
FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON contact_messages
FOR SELECT USING (true);
```

للإضافة (INSERT):
```sql
CREATE POLICY "Enable insert for all users" ON recipes
FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for all users" ON contact_messages
FOR INSERT WITH CHECK (true);
```

## ملاحظات:
- السياسات الحالية تسمح للجميع بالقراءة والكتابة
- للإنتاج، يجب تقييد الصلاحيات وإضافة مصادقة حقيقية
- يمكنك إضافة المزيد من الحقول للجداول حسب احتياجك
