// script.js — trilingual behavior, translations, recipes, search, favorites
document.addEventListener('DOMContentLoaded', ()=>{

  const i18n = {
    en: {
      nav_home: "Home",
      nav_recipes: "Recipes",
      nav_about: "About",
      nav_contact: "Contact",
      hero_title: "Welcome to Aiieras",
      hero_sub: "Easy recipes, beautiful photos, and kitchen tips to make cooking joyful.",
      btn_browse: "Browse Recipes",
      recipes_title: "Recipes",
      filter_all: "All categories",
      filter_main: "Main dishes",
      filter_dessert: "Desserts",
      filter_quick: "Quick",
      filter_vegan: "Vegan",
      about_title: "About the Author",
      about_p1: "Hi! I'm Madi — a cooking enthusiast collecting recipes from Arab and global kitchens with modern touches.",
      about_p2: "Follow me on Instagram and YouTube for more videos.",
      contact_title: "Contact Me",
      label_name: "Name",
      label_email: "Email",
      label_msg: "Message",
      btn_send: "Send",
      contact_alt: "Or send an email: contact@flavorya.example",
      footer_copy: "© 2025 Aiieras — All rights reserved"
    },
    fr: {
      nav_home: "Accueil",
      nav_recipes: "Recettes",
      nav_about: "À propos",
      nav_contact: "Contact",
      hero_title: "Bienvenue sur Aiieras",
      hero_sub: "Recettes simples, belles photos et conseils de cuisine pour rendre la cuisine agréable.",
      btn_browse: "Parcourir les recettes",
      recipes_title: "Recettes",
      filter_all: "Toutes les catégories",
      filter_main: "Plats principaux",
      filter_dessert: "Desserts",
      filter_quick: "Rapide",
      filter_vegan: "Végétalien",
      about_title: "À propos de l'auteur",
      about_p1: "Bonjour! Je suis Madi — passionné(e) de cuisine, je collecte des recettes arabes et internationales avec une touche moderne.",
      about_p2: "Suivez-moi sur Instagram et YouTube pour plus de vidéos.",
      contact_title: "Contactez-moi",
      label_name: "Nom",
      label_email: "Email",
      label_msg: "Message",
      btn_send: "Envoyer",
      contact_alt: "Ou envoyez un email : contact@flavorya.example",
      footer_copy: "© 2025 Aiieras — Tous droits réservés"
    },
    ar: {
      nav_home: "الرئيسية",
      nav_recipes: "وصفات",
      nav_about: "عنّي",
      nav_contact: "تواصل",
      hero_title: "نُسرّ بك في Aiieras",
      hero_sub: "وصفات سهلة، صور جذابة، ونصائح مطبخية تجعل الطبخ يوميًا ممتعًا.",
      btn_browse: "تصفح الوصفات",
      recipes_title: "الوصفات",
      filter_all: "كل الفئات",
      filter_main: "أطباق رئيسية",
      filter_dessert: "حلويات",
      filter_quick: "سريعة",
      filter_vegan: "نباتية",
      about_title: "عن المؤلفة",
      about_p1: "مرحبًا! أنا مذي — عاشقة الطبخ، أجمع وصفات من المطبخ العربي والعالمي مع لمسات عصرية.",
      about_p2: "تابعوني على إنستغرام ويوتيوب للمزيد من الفيديوهات.",
      contact_title: "تواصل معي",
      label_name: "الاسم",
      label_email: "البريد الإلكتروني",
      label_msg: "الرسالة",
      btn_send: "أرسل",
      contact_alt: "أو أرسل رسالة عبر البريد: contact@flavorya.example",
      footer_copy: "© 2025 Aiieras — جميع الحقوق محفوظة"
    }
  };

  // initial language
  let currentLang = localStorage.getItem('site_lang') || 'ar';

  const recipes = [
    {id:1, title:{ar:'كسكس بالخضار',en:'Vegetable Couscous',fr:'Couscous aux légumes'},cat:'main',img:'assets/recipe1.jpg',desc:{ar:'طبق مغاربي تقليدي مع خضار طازجة.',en:'A traditional Maghrebi dish with fresh vegetables.',fr:'Plat maghrébin traditionnel avec légumes frais.'}},
    {id:2, title:{ar:'بقلاوة باللوز',en:'Almond Baklava',fr:'Baklava aux amandes'},cat:'dessert',img:'assets/recipe2.jpg',desc:{ar:'حلوى مقرمشة بطبقات العسل واللوز.',en:'Crispy pastry layered with honey and almonds.',fr:'Pâtisserie croustillante aux couches de miel et amandes.'}},
    {id:3, title:{ar:'سلطة يونانية سريعة',en:'Quick Greek Salad',fr:'Salade grecque rapide'},cat:'quick',img:'assets/recipe3.jpg',desc:{ar:'سلطة منعشة وسهلة التحضير.',en:'A refreshing and easy-to-make salad.',fr:'Une salade rafraîchissante et facile à préparer.'}},
    {id:4, title:{ar:'برغر نباتي',en:'Vegan Burger',fr:'Burger végétalien'},cat:'vegan',img:'assets/recipe4.jpg',desc:{ar:'برغر صحي بنكهة مدخنة.',en:'A healthy burger with a smoky flavor.',fr:'Un burger sain avec une saveur fumée.'}},
    {id:5, title:{ar:'شوربة العدس',en:'Lentil Soup',fr:'Soupe de lentilles'},cat:'main',img:'assets/recipe5.jpg',desc:{ar:'شوربة دافئة ومغذية.',en:'A warm and nutritious soup.',fr:'Une soupe chaude et nutritive.'}},
    {id:6, title:{ar:'تاكو نباتي',en:'Veggie Tacos',fr:'Tacos végétariens'},cat:'vegan',img:'assets/recipe1.jpg',desc:{ar:'تاكو مكسيكي صحي بالخضار.',en:'Healthy Mexican tacos with vegetables.',fr:'Tacos mexicains sains aux légumes.'}},
    {id:7, title:{ar:'كيك الشوكولاتة',en:'Chocolate Cake',fr:'Gâteau au chocolat'},cat:'dessert',img:'assets/recipe2.jpg',desc:{ar:'كيك غني بالشوكولاتة الداكنة.',en:'Rich dark chocolate cake.',fr:'Gâteau riche au chocolat noir.'}},
    {id:8, title:{ar:'باستا بالطماطم',en:'Tomato Pasta',fr:'Pâtes à la tomate'},cat:'quick',img:'assets/recipe3.jpg',desc:{ar:'باستا سريعة بصلصة الطماطم الطازجة.',en:'Quick pasta with fresh tomato sauce.',fr:'Pâtes rapides à la sauce tomate fraîche.'}}
  ];

  const recipesGrid = document.getElementById('recipesGrid');
  const searchInput = document.getElementById('searchInput');
  const filterSelect = document.getElementById('filterSelect');

  function setDirection(lang){
    if(lang === 'ar'){
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      document.body.style.textAlign = 'right';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = (lang === 'en') ? 'en' : 'fr';
      document.body.style.textAlign = 'left';
    }
  }

  function localizeStatic(lang){
    // replace all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if(i18n[lang] && i18n[lang][key]) el.textContent = i18n[lang][key];
    });
    // placeholders for search input (only on recipes page)
    if(searchInput){
      const ph = searchInput.getAttribute('data-placeholder-'+lang) || '';
      searchInput.placeholder = ph;
    }
    // contact placeholders
    const cnameEl = document.getElementById('cname');
    const cemailEl = document.getElementById('cemail');
    const cmsgEl = document.getElementById('cmsg');
    if(cnameEl) cnameEl.placeholder = i18n[lang].label_name || '';
    if(cemailEl) cemailEl.placeholder = i18n[lang].label_email || '';
    if(cmsgEl) cmsgEl.placeholder = i18n[lang].label_msg || '';
  }

  function render(recList){
    recipesGrid.innerHTML = '';
    const favs = loadFavorites();
    recList.forEach(r=>{
      const card = document.createElement('article');
      card.className = 'card';
      const title = r.title[currentLang] || r.title['ar'];
      const desc = r.desc[currentLang] || r.desc['ar'];
      const isFav = favs.includes(r.id);
      card.innerHTML = `
        <img src="${r.img}" alt="${title}" loading="lazy" />
        <h4>${title}</h4>
        <p class="muted">${desc}</p>
        <div class="meta">
          <span>${r.cat}</span>
          <button class="icon-like" data-id="${r.id}" aria-label="save" style="background:${isFav?'var(--accent)':'transparent'};color:${isFav?'white':'inherit'}">♥</button>
        </div>
      `;
      recipesGrid.appendChild(card);
    });

    // attach like handlers
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
          btn.style.background = 'var(--accent)';
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
  function saveFavorites(arr){ localStorage.setItem('fav_recipes', JSON.stringify(arr)); }

  function applyFilters(){
    const q = searchInput.value.trim().toLowerCase();
    const f = filterSelect.value;
    const filtered = recipes.filter(r=>{
      const title = (r.title[currentLang]||r.title['ar']).toLowerCase();
      const desc = (r.desc[currentLang]||r.desc['ar']).toLowerCase();
      const matchesQ = title.includes(q) || desc.includes(q);
      const matchesF = (f === 'all') || (r.cat === f);
      return matchesQ && matchesF;
    });
    render(filtered);
  }

  // language switcher - single toggle button
  const langToggle = document.getElementById('langToggle');
  const languages = ['ar', 'en', 'fr'];
  const langLabels = {ar: 'AR', en: 'EN', fr: 'FR'};
  
  function updateLangButton(){
    langToggle.textContent = `🌐 ${langLabels[currentLang]}`;
  }
  
  langToggle.addEventListener('click', ()=>{
    const currentIndex = languages.indexOf(currentLang);
    const nextIndex = (currentIndex + 1) % languages.length;
    currentLang = languages[nextIndex];
    localStorage.setItem('site_lang', currentLang);
    setDirection(currentLang);
    localizeStatic(currentLang);
    applyFilters();
    updateLangButton();
  });

  // initial setup
  setDirection(currentLang);
  localizeStatic(currentLang);
  if(recipesGrid) render(recipes);
  updateLangButton();

  if(searchInput) searchInput.addEventListener('input', applyFilters);
  if(filterSelect) filterSelect.addEventListener('change', applyFilters);

  // contact form demo
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      alert(i18n[currentLang].btn_send + ' — (تجريبي).');
      contactForm.reset();
    });
  }

  // mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const mainNav = document.getElementById('mainNav');
  if(menuBtn && mainNav){
    menuBtn.addEventListener('click', ()=> {
      if(mainNav.style.display === 'flex'){ mainNav.style.display = ''; }
      else { mainNav.style.display = 'flex'; mainNav.style.flexDirection = 'column'; }
    });
  }

});
