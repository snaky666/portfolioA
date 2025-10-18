
// supabase-config.js
// استيراد Supabase من CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.0/+esm';

// بيانات الاتصال بـ Supabase
const supabaseUrl = 'https://cwrtirkgsfvqmexeatfu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3cnRpcmtnc2Z2cW1leGVhdGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NjQzNzUsImV4cCI6MjA3NjE0MDM3NX0.YaZE1opSSpA95lm7fGT3ZilhXo9eI9eZK5Q-Q15sUEs';

// التحقق من وجود مفاتيح صحيحة
const hasValidKeys = supabaseUrl !== 'YOUR_SUPABASE_URL' && 
                     supabaseKey !== 'YOUR_SUPABASE_ANON_KEY' &&
                     supabaseUrl.includes('supabase.co');

// إنشاء عميل Supabase فقط إذا كانت المفاتيح صحيحة
export const supabase = hasValidKeys ? createClient(supabaseUrl, supabaseKey) : null;

// دالة للتحقق من توفر Supabase
export function isSupabaseAvailable() {
  return supabase !== null && hasValidKeys;
}

// اختبار الاتصال
export async function testConnection() {
  if (!supabase || !hasValidKeys) {
    console.error('❌ Supabase غير متصل - المفاتيح غير صحيحة');
    return false;
  }
  
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ خطأ في الاتصال بـ Supabase:', error.message);
      console.error('تفاصيل الخطأ:', error);
      return false;
    }
    
    console.log('✅ Supabase متصل بنجاح!');
    return true;
  } catch (err) {
    console.error('❌ فشل الاتصال بـ Supabase:', err.message);
    console.error('تفاصيل:', err);
    return false;
  }
}

// تصدير البيانات الافتراضية للاستخدام عند عدم توفر Supabase
export const defaultRecipes = [
  {id:1, title:'Vegetable Couscous with Fresh Herbs', cat:'main', img:'assets/recipe1.jpg', date:'October 15, 2025', favorite: true},
  {id:2, title:'Almond Honey Baklava', cat:'dessert', img:'assets/recipe2.jpg', date:'October 12, 2025', favorite: true},
  {id:3, title:'Quick Greek Salad', cat:'quick', img:'assets/recipe3.jpg', date:'October 10, 2025', favorite: false},
  {id:4, title:'Vegan Plant-Based Burger', cat:'vegan', img:'assets/recipe4.jpg', date:'October 8, 2025', favorite: true},
  {id:5, title:'Warm Lentil Soup Bowl', cat:'main', img:'assets/recipe5.jpg', date:'October 5, 2025', favorite: false},
  {id:6, title:'Healthy Veggie Tacos', cat:'vegan', img:'assets/recipe1.jpg', date:'October 3, 2025', favorite: false},
  {id:7, title:'Rich Chocolate Cake', cat:'dessert', img:'assets/recipe2.jpg', date:'September 28, 2025', favorite: false},
  {id:8, title:'Fresh Tomato Pasta', cat:'quick', img:'assets/recipe3.jpg', date:'September 25, 2025', favorite: false},
  {id:9, title:'Mediterranean Bowl', cat:'main', img:'assets/recipe4.jpg', date:'September 20, 2025', favorite: false},
  {id:10, title:'Strawberry Shortcake', cat:'dessert', img:'assets/recipe5.jpg', date:'September 15, 2025', favorite: false},
  {id:11, title:'Quinoa Buddha Bowl', cat:'vegan', img:'assets/recipe1.jpg', date:'September 10, 2025', favorite: false},
  {id:12, title:'Caprese Sandwich', cat:'quick', img:'assets/recipe2.jpg', date:'September 5, 2025', favorite: false}
];
