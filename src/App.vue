<template>
  <div id="app" class="app-container">
    <!-- Header Component -->
    <Header 
      :activeCategory="activeCategory" 
      @navigate="handleNavigation" 
      
    />

    <!-- Main Content Area -->
    <main class="main-content" role="main">
      <!-- Banner Section -->
      <Banner 
        :activeCategory="activeCategory"
        @category-change="handleCategoryChange"
        @scroll-to-products="scrollToProducts"
        ref="banner"
      />

      <!-- Product Grid Section -->
       <div >
      

      <ProductGrid
        v-show="showProducts"
        :pageType="activeCategory"
        ref="productGrid"
        class="product-grid-section"
        :class="{ 'product-grid-section--visible': showProducts }"
      />
       </div>
    </main>

   
    <div v-if="isLoading" class="loading-indicator" role="status" aria-label="Loading">
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<script>

import Header from './components/Header.vue'
import Banner from './components/Banner.vue'
import ProductGrid from './components/ProductGrid.vue'

export default {
  name: 'App',
  
  components: {
    Header,
    Banner,
    ProductGrid
  },

  data() {
    return {
     
      activeCategory: 'house-of-w',
   
      showProducts: false,
      overlayProgress:100,
     
      scrollPosition: 0,
      overlayOpacity: 0,
      animateBox: false,
      
     
      isLoading: false,
      
   
      scrollDebounceTimer: null,
      
    
      categories: [
        { id: 'house-of-w', name: 'The House of W' },
        { id: 'colour-coats', name: 'Colour Coats' },
        { id: 'metalia', name: 'Metalia' },
        { id: 'fiamarc', name: 'Fiamarc' }
      ]
    }
  },

  computed: {
   
    currentCategory() {
      return this.categories.find(cat => cat.id === this.activeCategory) || null
    },

   
    bannerHeight() {
      return window.innerHeight - 80 // Account for header height
    }
  },

  mounted() {
    this.initializeApp()
  },

  beforeUnmount() {
    this.cleanup()
  },

  methods: {
    
    async initializeApp() {
      try {
        this.isLoading = true
        this.addScrollListener()
        this.addResizeListener()
        
     
        await this.$nextTick()
        this.updateProductsVisibility()
  
        if (this.scrollPosition > 100) {
          this.showProducts = true
        }
        
      } catch (error) {
        console.error('App initialization error:', error)
      } finally {
        this.isLoading = false
      }
    },

  
    handleNavigation(category) {
      if (this.isValidCategory(category)) {
        this.activeCategory = category
        this.scrollToTop()
  
        this.$nextTick(() => {
          this.showProducts = true
        })
      }
    },

   
    handleCategoryChange(category) {
      if (this.isValidCategory(category)) {
        this.activeCategory = category

        this.$nextTick(() => {
          this.showProducts = true
        })
      }
    },

   
    scrollToProducts() {
      this.showProducts = true
      this.$nextTick(() => {
        this.scrollToElement(this.$refs.productGrid?.$el)
      })
    },

   
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },

    scrollToElement(element) {
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    },

   
    addScrollListener() {
      window.addEventListener('scroll', this.handleScrollDebounced, { passive: true })
    },

   
    removeScrollListener() {
      window.removeEventListener('scroll', this.handleScrollDebounced)
    },

   
    addResizeListener() {
      window.addEventListener('resize', this.handleResize, { passive: true })
    },

   
    removeResizeListener() {
      window.removeEventListener('resize', this.handleResize)
    },

   
    handleScrollDebounced() {
      if (this.scrollDebounceTimer) {
        clearTimeout(this.scrollDebounceTimer)
      }
      
      this.scrollDebounceTimer = setTimeout(() => {
        this.handleScroll()
      }, 16) // ~60fps
    },

   
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      this.scrollPosition = scrollTop
      this.updateProductsVisibility()
      
      
      if (scrollTop > window.innerHeight * 0.8) {
        this.showProducts = true
      }
    },

    handleResize() {
      this.updateProductsVisibility()
    },

   
    updateProductsVisibility() {
      const scrollTop = this.scrollPosition
      const viewportHeight = window.innerHeight
      const threshold = this.bannerHeight * 0.2 

      if (scrollTop > threshold || scrollTop > viewportHeight * 0.8) {
        this.showProducts = true
      } 
    
      else if (scrollTop < 50) {
        this.showProducts = false
      }
     
    },

 
    isValidCategory(category) {
      return this.categories.some(cat => cat.id === category)
    },

  
    cleanup() {
      this.removeScrollListener()
      this.removeResizeListener()
      
      if (this.scrollDebounceTimer) {
        clearTimeout(this.scrollDebounceTimer)
        this.scrollDebounceTimer = null
      }
    }
  }
}
</script>

<style>

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}
.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 10;
  transform: translateY(100%);
  transition: transform 0.3s ease-out;
}
.transition-overlay--active {
  background-color: rgba(255,255,255,0.8);
}


.product-grid-section {
  opacity: 0;
  transform: translateY(50px);
}


.product-grid-section--visible {
  animation: slideUp 0.8s forwards;
}



body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #fff;
}


.app-container {
  min-height: 100vh;
  position: relative;
}

.main-content {
  position: relative;
  min-height: calc(100vh - 80px);
}

.loading-indicator {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


@keyframes slideUp {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animated-box.animate {
  animation: slideUp 1s forwards;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}


* {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}


@media (max-width: 1024px) {
  html {
    font-size: 15px;
  }
}


@media (max-width: 768px) {
  html {
    font-size: 14px;
  }

  .main-content {
    min-height: calc(100vh - 60px);
  }

  .loading-indicator {
    padding: 15px;
  }

  .loading-spinner {
    width: 30px;
    height: 30px;
    border-width: 3px;
  }
}


@media (max-width: 640px) {
  html {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  html {
    font-size: 12px;
  }

  .loading-indicator {
    padding: 10px;
    margin: 0 20px;
  }

  .loading-spinner {
    width: 25px;
    height: 25px;
    border-width: 2px;
  }
}

*:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 10000;
}

.skip-link:focus {
  top: 6px;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .product-grid-section {
    transition: none;
  }

  .loading-spinner {
    animation: none;
  }

  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}


@media (prefers-contrast: high) {
  .loading-indicator {
    background: #fff;
    border: 2px solid #000;
  }

  .loading-spinner {
    border-color: #000;
    border-top-color: #000;
  }
}


@media print {
  .header,
  .loading-indicator {
    display: none;
  }

  .main-content {
    min-height: auto;
  }

  .product-grid-section {
    opacity: 1;
    transform: none;
  }
}
</style>