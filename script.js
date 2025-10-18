// script.js — recipes, search, favorites
document.addEventListener('DOMContentLoaded', ()=>{

  const recipes = [
    {id:1, title:'Vegetable Couscous', cat:'main', img:'assets/recipe1.jpg', desc:'A traditional Maghrebi dish with fresh vegetables.'},
    {id:2, title:'Almond Baklava', cat:'dessert', img:'assets/recipe2.jpg', desc:'Crispy pastry layered with honey and almonds.'},
    {id:3, title:'Quick Greek Salad', cat:'quick', img:'assets/recipe3.jpg', desc:'A refreshing and easy-to-make salad.'},
    {id:4, title:'Vegan Burger', cat:'vegan', img:'assets/recipe4.jpg', desc:'A healthy burger with a smoky flavor.'},
    {id:5, title:'Lentil Soup', cat:'main', img:'assets/recipe5.jpg', desc:'A warm and nutritious soup.'},
    {id:6, title:'Veggie Tacos', cat:'vegan', img:'assets/recipe1.jpg', desc:'Healthy Mexican tacos with vegetables.'},
    {id:7, title:'Chocolate Cake', cat:'dessert', img:'assets/recipe2.jpg', desc:'Rich dark chocolate cake.'},
    {id:8, title:'Tomato Pasta', cat:'quick', img:'assets/recipe3.jpg', desc:'Quick pasta with fresh tomato sauce.'}
  ];

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
        <p class="muted">${r.desc}</p>
        <div class="meta">
          <span>${r.cat}</span>
          <button class="icon-like" data-id="${r.id}" aria-label="save" style="background:${isFav?'var(--beige)':'transparent'};color:${isFav?'white':'inherit'}">♥</button>
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
  function saveFavorites(arr){ localStorage.setItem('fav_recipes', JSON.stringify(arr)); }

  function applyFilters(){
    if(!searchInput || !filterSelect) return;
    const q = searchInput.value.trim().toLowerCase();
    const f = filterSelect.value;
    const filtered = recipes.filter(r=>{
      const matchesQ = r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q);
      const matchesF = (f === 'all') || (r.cat === f);
      return matchesQ && matchesF;
    });
    render(filtered);
  }

  // initial setup
  if(recipesGrid) render(recipes);

  if(searchInput) searchInput.addEventListener('input', applyFilters);
  if(filterSelect) filterSelect.addEventListener('change', applyFilters);

  // contact form demo
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      alert('Message sent! (Demo)');
      contactForm.reset();
    });
  }

  // mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const mainNav = document.getElementById('mainNav');
  if(menuBtn && mainNav){
    menuBtn.addEventListener('click', ()=> {
      mainNav.classList.toggle('mobile-active');
    });
    // close menu when clicking on a link
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('mobile-active');
      });
    });
  }

});
