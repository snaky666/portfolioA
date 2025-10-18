// script.js — recipes, search, favorites
document.addEventListener('DOMContentLoaded', ()=>{

  const defaultRecipes = [
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

  // Load recipes from localStorage if admin added any
  const adminRecipes = JSON.parse(localStorage.getItem('admin_recipes') || '[]');
  const recipes = [...defaultRecipes, ...adminRecipes];

  const recipesGrid = document.getElementById('recipesGrid');
  const favoritesGrid = document.getElementById('favoritesGrid');

  function renderSimpleRecipes(recList, container){
    if(!container) return;
    container.innerHTML = '';
    recList.forEach(r=>{
      const card = document.createElement('article');
      card.className = 'recipe-simple-card';
      card.innerHTML = `
        <div class="recipe-simple-image">
          <img src="${r.img}" alt="${r.title}" loading="lazy" />
        </div>
        <h4 class="recipe-simple-title">${r.title}</h4>
        <p class="recipe-simple-date">${r.date}</p>
      `;
      container.appendChild(card);
    });
  }

  // initial setup for recipes page
  if(recipesGrid) {
    renderSimpleRecipes(recipes, recipesGrid);
  }

  if(favoritesGrid) {
    const favoriteRecipes = recipes.filter(r => r.favorite);
    renderSimpleRecipes(favoriteRecipes, favoritesGrid);
  }

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

  // Admin panel access - triple click on logo
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
