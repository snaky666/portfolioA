// script.js — recipes, search, favorites with optional Supabase support
import { supabase, isSupabaseAvailable, defaultRecipes } from './supabase-config.js';

document.addEventListener('DOMContentLoaded', async ()=>{

  // تحميل الوصفات من Supabase أو استخدام البيانات المحلية
  let recipes = [];
  
  if (isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.warn('خطأ في تحميل الوصفات من Supabase، استخدام البيانات المحلية:', error);
        recipes = defaultRecipes;
      } else {
        recipes = data.length > 0 ? data : defaultRecipes;
        console.log('✅ تم تحميل الوصفات من Supabase');
      }
    } catch (err) {
      console.warn('تعذر الاتصال بـ Supabase، استخدام البيانات المحلية:', err);
      recipes = defaultRecipes;
    }
  } else {
    console.log('📝 استخدام البيانات المحلية (Supabase غير متوفر)');
    recipes = defaultRecipes;
  }

  const recipesGrid = document.getElementById('recipesGrid');
  const searchInput = document.getElementById('searchInput');
  const filterSelect = document.getElementById('filterSelect');

  function render(recList){
    if(!recipesGrid) return;
    recipesGrid.innerHTML = '';
    const favs = loadFavorites();
    recList.forEach(r=>{
      const card = document.createElement('article');
      card.className = 'card';
      const isFav = favs.includes(r.id);
      card.innerHTML = `
        <img src="${r.img}" alt="${r.title}" loading="lazy" />
        <h4>${r.title}</h4>
        <p class="muted">${r.date || 'Traditional recipe'}</p>
        <div class="meta">
          <span>${r.cat}</span>
          <button class="icon-like" data-id="${r.id}" aria-label="save" style="background:${isFav?'var(--beige)':'transparent'};color:${isFav?'white':'inherit'}">♥</button>
        </div>
      `;
      recipesGrid.appendChild(card);
    });

    // إضافة أحداث زر الإعجاب
    document.querySelectorAll('.icon-like').forEach(btn=>{
      btn.addEventListener('click', (e)=>{
        const id = Number(btn.dataset.id);
        const favs = loadFavorites();
        if(favs.includes(id)){
          const idx = favs.indexOf(id); favs.splice(idx,1);
          btn.style.background = 'transparent';
          btn.style.color = 'inherit';
        } else {
          favs.push(id);
          btn.style.background = 'var(--beige)';
          btn.style.color = 'white';
        }
        saveFavorites(favs);
      });
    });
  }

  function loadFavorites(){
    try{
      return JSON.parse(localStorage.getItem('fav_recipes')||'[]');
    }catch(e){ return [];}
  }
  
  function saveFavorites(arr){ 
    localStorage.setItem('fav_recipes', JSON.stringify(arr)); 
  }

  function applyFilters(){
    if(!searchInput || !filterSelect) return;
    const q = searchInput.value.trim().toLowerCase();
    const f = filterSelect.value;
    const filtered = recipes.filter(r=>{
      const matchesQ = r.title.toLowerCase().includes(q) || (r.date && r.date.toLowerCase().includes(q));
      const matchesF = (f === 'all') || (r.cat === f);
      return matchesQ && matchesF;
    });
    render(filtered);
  }

  // إعداد أولي
  if(recipesGrid) render(recipes);

  if(searchInput) searchInput.addEventListener('input', applyFilters);
  if(filterSelect) filterSelect.addEventListener('change', applyFilters);

  // نموذج التواصل
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const name = document.getElementById('cname').value;
      const email = document.getElementById('cemail').value;
      const message = document.getElementById('cmsg').value;
      
      if (isSupabaseAvailable()) {
        try {
          const { error } = await supabase
            .from('contact_messages')
            .insert([{ name, email, message }]);
          
          if (error) throw error;
          
          alert('تم إرسال الرسالة بنجاح! ✅');
          contactForm.reset();
        } catch (err) {
          console.error('خطأ في إرسال الرسالة:', err);
          alert('حدث خطأ في الإرسال. يرجى المحاولة لاحقاً.');
        }
      } else {
        // عرض رسالة عندما Supabase غير متوفر
        alert(`تم استلام رسالتك! (وضع Demo)\n\nالاسم: ${name}\nالبريد: ${email}\n\nملاحظة: لحفظ الرسائل، قم بإعداد Supabase`);
        contactForm.reset();
      }
    });
  }

  // القائمة المحمولة
  const menuBtn = document.getElementById('menuBtn');
  const mainNav = document.getElementById('mainNav');
  if(menuBtn && mainNav){
    menuBtn.addEventListener('click', ()=> {
      mainNav.classList.toggle('mobile-active');
    });
    // إغلاق القائمة عند الضغط على أي رابط
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('mobile-active');
      });
    });
  }

  // الوصول للوحة الإدارة - نقر ثلاثي على الشعار
  const logo = document.querySelector('.logo');
  if(logo) {
    let clickCount = 0;
    let clickTimer = null;
    
    logo.addEventListener('click', (e) => {
      clickCount++;
      
      if(clickTimer) clearTimeout(clickTimer);
      
      if(clickCount === 3) {
        e.preventDefault();
        window.location.href = 'admin.html';
        clickCount = 0;
      }
      
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 500);
    });
  }

});
