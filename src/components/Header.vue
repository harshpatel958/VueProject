<template>
  <header class="header" role="banner" :class="{ 'nav-expanded': hoveredCategory, 'sticky': isSticky }" @mouseleave="handleMouseLeaveHeader">
    <div class="nav-bar-top-section">
      <div class="left-nav">
        
        <nav class="nav-bar-section-category-wrapper" role="navigation" aria-label="Main navigation">
           <div class="logo" @click="goHome" role="button" tabindex="0" @keydown.enter="goHome">
          <img 
            src="https://allhome.foyr.com/assets/AllHomeLogo-baa2556c.png" 
            class="logo-img" 
            alt="All Home"
            loading="eager"
          >
        </div>
        <div 
          v-if="hoveredCategory" 
          class="dropdown-container"
          @mouseenter="maintainDropdown"
          
          @mouseleave="handleOverlayLeave"
            ref="dropdownMenu"
        >
          <div class="dropdown-menu fixed-dropdown">
            <div class="dropdown-content">
              <div class="dropdown-section">
                <div class="section-title nunito-mh">Explore Products</div>
                <div 
                  v-for="(item, index) in currentDropdownItems"
                  :key="item.id"
                  class="dropdown-item"
                    :class="{ 'has-sublist': item.subItems }"
                  :style="{ animationDelay: `${index * 0.05}s` }"
                  @click.stop="handleDropdownItemClick(item)"
                   @mouseenter="activeSubItem = item.id"
    @mouseleave="activeSubItem = null"
   
                  role="menuitem"
                  tabindex="0"
                >
                  <div class="item-content">
                    <div class="item-title nunito-mh">{{ item.title }}</div>
                     <span v-if="item.subItems" class="arrow-icon">›</span>
                  
                  </div>

                  <div 
      v-if="item.subItems && activeSubItem === item.id" 
      class="sublist-container"
    >
      <div 
        v-for="subItem in item.subItems" 
        :key="subItem.id"
        class="sublist-item"
        @click.stop="handleSubItemClick(subItem)"
      >
        {{ subItem.title }}
      </div>
    </div>
                </div>
              </div>
              
             
            </div>
          </div>
        </div>

        
          <div 
            v-for="category in navigationCategories"
            :key="category.id"
            class="nav-bar-section-category"
            :class="{ 
              selected: activeCategory === category.id,
              disabled: category.disabled 
            }"
            @click="handleCategoryClick(category)"
            @keydown.enter="handleCategoryClick(category)"
            @mouseenter="handleCategoryHover(category.id)"
            @mouseleave="handleCategoryLeave"
            :tabindex="category.disabled ? -1 : 0"
            role="button"
            :aria-label="`Navigate to ${category.label}`"
            :aria-current="activeCategory === category.id ? 'page' : null"
            :aria-expanded="hoveredCategory === category.id"
              :style="{ animationDelay: `${index * 0.3}s` }" 
          >
            <span class="category-text nunito-md">{{ category.label }}</span>
          </div>
          
          <div 
            class="search-icon-wrapper"
            @click="handleSearchClick"
            @keydown.enter="handleSearchClick"
            role="button"
            tabindex="0"
            aria-label="Search"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="44" 
              viewBox="0 0 16 44" 
              fill="none"
              aria-hidden="true"
            >
              <path 
                d="M14.7972 27.2012L10.9272 23.3312C11.6282 22.4022 12.0492 21.2502 12.0492 19.9992C12.0492 16.9392 9.56022 14.4492 6.49922 14.4492C3.43922 14.4492 0.949219 16.9392 0.949219 19.9992C0.949219 23.0602 3.43922 25.5492 6.49922 25.5492C7.75022 25.5492 8.90222 25.1282 9.83122 24.4272L13.7012 28.2972C13.8522 28.4482 14.0512 28.5252 14.2492 28.5252C14.4472 28.5252 14.6452 28.4492 14.7972 28.2972C15.1002 27.9942 15.1002 27.5042 14.7972 27.2012ZM2.04922 19.9992C2.04922 17.5452 4.04622 15.5492 6.49922 15.5492C8.95322 15.5492 10.9492 17.5462 10.9492 19.9992C10.9492 22.4522 8.95322 24.4492 6.49922 24.4492C4.04522 24.4492 2.04922 22.4532 2.04922 19.9992Z" 
                fill="black" 
                fill-opacity="0.8"
              />
            </svg>
          </div>
        </nav>
        
  
        
      </div>
    </div>

  </header>
</template>

<script>
export default {
  name: 'Header',

  props: {
    
    activeCategory: {
      type: String,
      default: 'house-of-w',
      validator: (value) => ['house-of-w', 'colour-coats', 'metalia', 'fiamarc', 'home'].includes(value)
    }
  },

  data() {
    return {
      showMobileMenu: false,
      hoveredCategory: null,
      hoverTimeout: null,
      isSticky: false,
      searchActive: false,
         activeSubItem: null,
searchQuery: '',
searchResults: [], 

      scrollThreshold: 50, 
      
    
      navigationCategories: [
        {
          id: 'house-of-w',
          label: 'THE HOUSE OF W',
          disabled: false,
          items: [
            {
              id: 'Explore products',
              title: 'ISVEA',
              description: 'Premium bathroom solutions',
              badge: 'Featured',
              subItems: [
          { id: 'isvea-vanity', title: 'Vanities' },
          { id: 'isvea-sinks', title: 'Sinks' },
          { id: 'isvea-showers', title: 'Showers' }
        ]
            },
            {
              id: 'idevit',
              title: 'IDEVIT',
              description: 'Innovative sanitaryware designs',
               subItems: [
          { id: 'olympia-basic', title: 'Basic Range' },
          { id: 'olympia-premium', title: 'Premium Range' }
        ]
            },
            {
              id: 'olympia',
              title: 'Olympia',
              description: 'Classic elegance for modern homes',
               subItems: [
          { id: 'olympia-basic', title: 'Basic Range' },
          { id: 'olympia-premium', title: 'Premium Range' }
        ]
            },
            {
              id: 'otp-solutions',
              title: 'O+P Solutions',
              description: 'Complete bathroom systems',
               subItems: [
          { id: 'olympia-basic', title: 'Basic Range' },
          { id: 'olympia-premium', title: 'Premium Range' },
                    { id: 'olympia-pr', title: 'Premium Range' }
        ]
            },
            {
              id: 'wellness',
              title: 'Wellness',
              description: 'Spa-inspired luxury products',
              badge: 'New',
               subItems: [
          { id: 'olympia-basic', title: 'Basic Range' },
          { id: 'olympia-premium', title: 'Premium Range' },

        ]
            }
          ]
        },
        {
          id: 'colour-coats',
          label: 'COLOUR COATS',
          disabled: false,
          items: [
            {
              id: 'interior-paints',
              title: 'Interior Paints',
              description: 'Premium wall finishes',
               subItems: [
          { id: 'olympia-basic', title: 'Coming Soon...' },
        
        ]
            },
            {
              id: 'exterior-paints',
              title: 'Exterior Paints',
              description: 'Weather-resistant coatings',
               subItems: [
          { id: 'olympia-basic', title: 'Coming Soon...' },
        
        ]
            },
            {
              id: 'specialty-finishes',
              title: 'Specialty Finishes',
              description: 'Textured and decorative paints',
              badge: 'Popular',
               subItems: [
          { id: 'olympia-basic', title: 'Coming Soon...' },
        
        ]
            },
            {
              id: 'primers',
              title: 'Primers & Base Coats',
              description: 'Professional preparation products',
               subItems: [
          { id: 'olympia-basic', title: 'Coming Soon...' },
        
        ]
            }
          ]
        },
        {
          id: 'metalia',
          label: 'METALIA',
          disabled: false,
          items: [
            {
              id: 'door-handles',
              title: 'Door Handles',
              description: 'Contemporary and classic designs',
               subItems: [
          { id: 'olympia-basic', title: 'Coming Soon...' },
        
        ]
            },
            {
              id: 'cabinet-hardware',
              title: 'Cabinet Hardware',
              description: 'Knobs, pulls, and hinges',
               subItems: [
          { id: 'olympia-basic', title: 'Coming Soon...' },
        
        ]
            },
            {
              id: 'bathroom-accessories',
              title: 'Bathroom Accessories',
              description: 'Towel bars, hooks, and holders',
               subItems: [
          { id: 'olympia-basic', title: 'Coming Soon...' },
        
        ]
            },
            {
              id: 'architectural-hardware',
              title: 'Architectural Hardware',
              description: 'Professional grade solutions',
              badge: 'Pro',
               subItems: [
          { id: 'olympia-basic', title: 'Coming Soon...' },
        
        ]
            }
          ]
        },
        {
          id: 'fiamarc',
          label: 'FIAMARC',
          disabled: true,
          items: [],

        },

        
         
      ]
    }
  },

  computed: {
   
    currentDropdownItems() {
      if (!this.hoveredCategory) return []
      const category = this.navigationCategories.find(cat => cat.id === this.hoveredCategory)
      return category ? category.items : []
    }
  },

  mounted() {
    this.addKeyboardListeners()
    this.addScrollListener()
  },

  beforeUnmount() {
    this.removeKeyboardListeners()
    this.removeScrollListener()
    this.clearHoverTimeout()
  },

  methods: {


    handleSubItemClick(subItem) {
    this.$emit('sub-item-select', subItem);
    this.hoveredCategory = null;
    this.activeSubItem = null;
  },
    
 handleMouseLeaveHeader(event) {
  const headerEl = this.$el;
  const dropdownEl = this.$refs.dropdownContainer;


  if (
    !headerEl.contains(event.relatedTarget) &&
    (!dropdownEl || !dropdownEl.contains(event.relatedTarget))
  ) {
    this.hoveredCategory = null;
  }
},

    addScrollListener() {
      this.scrollHandler = () => {
        this.isSticky = window.scrollY > this.scrollThreshold
      }
      window.addEventListener('scroll', this.scrollHandler)
    },

    
    removeScrollListener() {
      if (this.scrollHandler) {
        window.removeEventListener('scroll', this.scrollHandler)
      }
    },

   
    handleCategoryHover(categoryId) {
      this.clearHoverTimeout()
      
      const category = this.navigationCategories.find(cat => cat.id === categoryId)
      if (category && !category.disabled && category.items && category.items.length > 0) {
        this.hoveredCategory = categoryId
      }
    },

    
    handleCategoryLeave() {
      this.hoverTimeout = setTimeout(() => {
        this.hoveredCategory = null
      }, 100) 
    },

   
 handleOverlayLeave(event) {
  const dropdown = this.$refs.dropdownContainer;
  if (!dropdown) return;

  
  if (!dropdown.contains(event.relatedTarget)) {
  
  }
},



    maintainDropdown() {
      this.clearHoverTimeout()
    },

    
    clearHoverTimeout() {
      if (this.hoverTimeout) {
        clearTimeout(this.hoverTimeout)
        this.hoverTimeout = null
      }
    },

    
    handleDropdownItemClick(item) {
      this.$emit('dropdown-item-select', item)
    
    },

    handleCategoryClick(category) {
      if (category.disabled) return
      this.$emit('navigate', category.id)
      this.hoveredCategory = null
    },

    handleMobileCategoryClick(category) {
      if (category.disabled) return
      this.$emit('navigate', category.id)
      this.closeMobileMenu()
    },


    goHome() {
      this.$emit('navigate', 'home')
    },

  handleSearchClick() {
  this.searchActive = !this.searchActive;
  if (!this.searchActive) {
    this.searchQuery = '';
    this.searchResults = [];
  }
}
,

   
    closeMobileMenu() {
      this.showMobileMenu = false
    },

    
    addKeyboardListeners() {
      this.keyboardHandler = (event) => {
        if (event.key === 'Escape') {
          if (this.hoveredCategory) {
            this.hoveredCategory = null
          } else if (this.showMobileMenu) {
            this.closeMobileMenu()
          }
        }
      }
      document.addEventListener('keydown', this.keyboardHandler)
    },

    removeKeyboardListeners() {
      if (this.keyboardHandler) {
        document.removeEventListener('keydown', this.keyboardHandler)
      }
    }
  }

  
}


</script>

<style scoped>

.nav-bar-section-category-wrapper {
  opacity: 0;
  transform: translateX(-30px); 
  animation: slideIn 0.6s  cubic-bezier(0.25, 1, 0.5, 1) forwards; 
}

/* Style for dropdown items that have sublists */
.dropdown-item {
  position: relative;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid transparent;
  animation: slideDownList 0.6s ease-in;
}

.dropdown-item.has-sublist {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}



/* Arrow icon */
.arrow-icon {
  font-size: 14px;
  margin-left: 8px;
  color: #9CA3AF;
  transition: transform 0.3s ease;
}

.dropdown-item:hover .arrow-icon {
  transform: translateX(3px);
  color: #000;
}

/* Sublist container */
.sublist-container {
  position: absolute;
  left:25%; 

  width: 600px;
  z-index: 1001;

  height: auto;
   pointer-events: auto;
}

/* Make it visible on hover */
.dropdown-item:hover > .sublist-container {
  opacity: 1;
  pointer-events: auto;
}

/* Sublist items */
.sublist-item {
  padding: 8px 12px;
  font-size: 14px;
  color: #4b5563;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.sublist-item:hover {
  background-color: #f3f4f6;
  color: #000;
}

/* Animation */
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}



@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes slideDownList {
  from {
    transform: translateY(-80%);
  }
  to {
    transform: translateY(0);
  }
}


.header {
  position: fixed;   
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95); 
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  height: 50px; 
}


.header.nav-expanded {
   
  height: 300px; 
}

.nav-bar-top-section {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 40px;
  transition: height 0.3s ease;
}

.left-nav {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
}


.logo {
  cursor: pointer;
  margin-right: 60px;
  padding: 5px;
  transition: transform 0.2s ease;
  z-index: 1002;
}

.logo:hover {
  transform: scale(1.05);
}

.logo:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
  border-radius: 4px;
}

.logo-img {
  height: 16px;
  width: 70px;
  display: block;
}

.dropdown-container {
  position: absolute;
  left:25%; 
  top: 100%; 
  width: 600px;
  z-index: 1001;

  height: auto;
   pointer-events: auto;
}


.dropdown-menu {
  
  border-radius: 0;

  width: 100%;
  overflow: hidden;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.dropdown-content {
  display: flex;
  padding: 20px;

}

.dropdown-section {
  flex: 1;
  
}

.section-title {
  font-size: 14px;
  
  color: #000;

  margin-bottom: 10px;
  letter-spacing: 0.5px;
}

.dropdown-item {
padding: 5px;
  cursor: pointer;
  transition: color 0.2s ease;
  border-bottom: 1px solid transparent;
  animation: slideDownList 0.6s ease-in;
}

.dropdown-item:hover {
  color: #007bff;
}
.item-content{

  display: flex;
}
.item-title {
  font-size: 14px;
  font-weight: 600;
  color: #9CA3AF;
  

 
}
.item-title:hover{

  color: #000;
}
.item-description {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
}

.brands-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.brand-item {
  font-size: 14px;
  color: #1a1a1a;
  padding: 4px 0;
  cursor: pointer;
  transition: color 0.2s ease;
}

.brand-item:hover {
  color: #007bff;
}


.nav-bar-section-category-wrapper {
  display: flex;
  gap: 60px;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.nav-bar-section-category {
  cursor: pointer;
  padding: 8px 0;
  transition: all 0.3s ease;
  position: relative;
  border-radius: 4px;
}


.nav-bar-section-category.selected {
  text-decoration: none;
}

.nav-bar-section-category.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-bar-section-category:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

.category-text {
  font-size: 14px;
  color: #9CA3AF;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: color 0.3s ease;
}

.category-text:hover,
.nav-bar-section-category:hover:not(.disabled) .category-text {
  color: #000;
}

.nav-bar-section-category.disabled .category-text {
  color: #999;
}

/* ===== RIGHT ICONS STYLES ===== */
.nav-right-icons {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-icon-wrapper,
.hamburger-menu {
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.search-icon-wrapper:hover,
.hamburger-menu:hover {
  background-color: #f5f5f5;
}

.search-icon-wrapper:focus,
.hamburger-menu:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

/* ===== MOBILE MENU STYLES ===== */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding-top: 80px;
}

.mobile-menu-content {
  background: white;
  width: 280px;
  max-width: 90vw;
  height: calc(100vh - 80px);
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.mobile-nav {
  padding: 20px 0;
}

.mobile-nav-item {
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.mobile-nav-item:hover:not(.disabled) {
  background-color: #f8f9fa;
}

.mobile-nav-item.selected {
  background-color: #e9ecef;
  border-left: 4px solid #000;
}

.mobile-nav-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.mobile-category-text {
  font-size: 16px;
  font-weight: 400;
  color: #000;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* ===== RESPONSIVE DESIGN ===== */

/* Tablet Landscape (1024px and down) */
@media (max-width: 1024px) {
  .nav-bar-top-section {
    padding: 0 30px;
  }

  .logo {
    margin-right: 40px;
  }

  .nav-bar-section-category-wrapper {
    gap: 30px;
  }

  .dropdown-container {
    left: 100px;
    width: 500px;
  }
}

/* Tablet Portrait (768px and down) */
@media (max-width: 768px) {
  .nav-bar-top-section {
    height: 60px;
    padding: 0 20px;
  }

  .logo {
    margin-right: 30px;
  }

  .logo-img {
    height: 16px;
    width: 50px;
  }

  .nav-bar-section-category-wrapper {
    gap: 20px;
  }

  .category-text {
    font-size: 12px;
  }

  .dropdown-container {
    display: none; /* Hide dropdowns on tablet and below */
  }

  .nav-right-icons {
    gap: 10px;
  }

  .mobile-menu-overlay {
    padding-top: 60px;
  }

  .mobile-menu-content {
    height: calc(100vh - 60px);
  }
}

/* Mobile Landscape (640px and down) */
@media (max-width: 640px) {
  .nav-bar-section-category-wrapper {
    display: none; /* Hide desktop nav on mobile */
  }

  .nav-right-icons {
    gap: 8px;
  }

  .search-icon-wrapper,
  .hamburger-menu {
    padding: 6px;
  }
}

/* Mobile Portrait (480px and down) */
@media (max-width: 480px) {
  .nav-bar-top-section {
    padding: 0 15px;
  }

  .logo {
    margin-right: 20px;
  }

  .logo-img {
    height: 14px;
    width: 45px;
  }

  .nav-right-icons {
    gap: 6px;
  }

  .mobile-menu-content {
    width: 100%;
    max-width: none;
  }
}

/* Small Mobile (360px and down) */
@media (max-width: 360px) {
  .nav-bar-top-section {
    padding: 0 10px;
  }

  .logo {
    margin-right: 15px;
  }

  .logo-img {
    height: 12px;
    width: 40px;
  }
}

@media (prefers-contrast: high) {
  .header {
    border-bottom: 2px solid #000;
  }

  .nav-bar-section-category.selected {
    border-bottom: 3px solid #000;
  }

  .search-icon-wrapper:hover,
  .hamburger-menu:hover {
    background-color: #000;
    color: #fff;
  }

  .dropdown-menu {
    border: 2px solid #000;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .logo,
  .nav-bar-section-category,
  .search-icon-wrapper,
  .hamburger-menu,
  .dropdown-menu,
  .dropdown-item {
    transition: none;
    animation: none;
  }

  .nav-bar-section-category:hover:not(.disabled) {
    transform: none;
  }

  .dropdown-item {
    opacity: 1;
    transform: none;
  }
}

/* Focus visible for better keyboard navigation */
.nav-bar-section-category:focus-visible,
.logo:focus-visible,
.search-icon-wrapper:focus-visible,
.hamburger-menu:focus-visible,
.dropdown-item:focus-visible {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .dropdown-menu {
    background: #1a1a1a;
    border-color: #333;
  }

  .dropdown-item:hover {
    background-color: #2a2a2a;
  }

  .item-title {
    color: #fff;
  }

  .item-description {
    color: #ccc;
  }
}
</style>