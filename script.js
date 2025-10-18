
// script.js — recipes, search, favorites with Supabase
import { supabase } from './supabase-config.js';

document.addEventListener('DOMContentLoaded', async ()=>{

  const defaultRecipes = [
    {title:'Vegetable Couscous with Fresh Herbs', cat:'main', img:'assets/recipe1.jpg', date:'October 15, 2025', favorite: true},
    {title:'Almond Honey Baklava', cat:'dessert', img:'assets/recipe2.jpg', date:'October 12, 2025', favorite: true},
    {title:'Quick Greek Salad', cat:'quick', img:'assets/recipe3.jpg', date:'October 10, 2025', favorite: false},
    {title:'Vegan Plant-Based Burger', cat:'vegan', img:'assets/recipe4.jpg', date:'October 8, 2025', favorite: true},
    {title:'Warm Lentil Soup Bowl', cat:'main', img:'assets/recipe5.jpg', date:'October 5, 2025', favorite: false},
    {title:'Healthy Veggie Tacos', cat:'vegan', img:'assets/recipe1.jpg', date:'October 3, 2025', favorite: false},
    {title:'Rich Chocolate Cake', cat:'dessert', img:'assets/recipe2.jpg', date:'September 28, 2025', favorite: false},
    {title:'Fresh Tomato Pasta', cat:'quick', img:'assets/recipe3.jpg', date:'September 25, 2025', favorite: false},
    {title:'Mediterranean Bowl', cat:'main', img:'assets/recipe4.jpg', date:'September 20, 2025', favorite: false},
    {title:'Strawberry Shortcake', cat:'dessert', img:'assets/recipe5.jpg', date:'September 15, 2025', favorite: false},
    {title:'Quinoa Buddha Bowl', cat:'vegan', img:'assets/recipe1.jpg', date:'September 10, 2025', favorite: false},
    {title:'Caprese Sandwich', cat:'quick', img:'assets/recipe2.jpg', date:'September 5, 2025', favorite: false}
  ];

  // Load recipes from Supabase
  let recipes = [];
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error loading recipes:', error);
      recipes = defaultRecipes;
    } else {
      recipes = data.length > 0 ? data : defaultRecipes;
    }
  } catch (err) {
    console.error('Supabase connection error:', err);
    recipes = defaultRecipes;
  }

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
    contactForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const name = document.getElementById('cname').value;
      const email = document.getElementById('cemail').value;
      const message = document.getElementById('cmsg').value;
      
      try {
        const { error } = await supabase
          .from('contact_messages')
          .insert([{ name, email, message }]);
        
        if (error) throw error;
        
        alert('Message sent successfully!');
        contactForm.reset();
      } catch (err) {
        console.error('Error sending message:', err);
        alert('Error sending message. Please try again.');
      }
    });
  }

  // mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const mainNav = document.getElementById('mainNav');
  if(menuBtn && mainNav){
    menuBtn.addEventListener('click', ()=> {
      mainNav.classList.toggle('mobile-active');
    });
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
