  <template>
    <div id="app" class="app-container" 
        @wheel.prevent="handleScroll" 
        @touchstart="handleTouchStart" 
        @touchmove.prevent="handleTouchMove">

      <Header 
        :activeCategory="activeCategory" 
        @navigate="handleNavigation" 
      />

      <main class="main-content">
        <Banner 
          :activeCategory="activeCategory"
          @category-change="handleCategoryChange"
          @scroll-to-products="scrollToProducts"
          ref="banner"
        />
      </main>

    <div class="overlay" :class="{ 'overlay-visible': overlayVisible }">
  <div class="product-grid-wrapper">
    <ProductGrid :pageType="activeCategory" ref="productGrid" />
  </div>
</div>


    </div>
  </template>

  <script>
  import Header from './components/Header.vue'
  import Banner from './components/Banner.vue'
  import ProductGrid from './components/ProductGrid.vue'

  export default {
    name: 'App',
    components: { Header, Banner, ProductGrid },

    data() {
      return {
        activeCategory: 'house-of-w',
        overlayVisible: false,
        overlayAnimating: false,
        lastScrollY: 0,
        isLoading: false,
        lastTouchY: null,
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
          await this.$nextTick()
          window.addEventListener('resize', this.handleResize)
        } finally {
          this.isLoading = false
        }
      },

      handleNavigation(category) {
        if (this.isValidCategory(category)) {
          this.activeCategory = category
          this.scrollToTop()
        }
      },

      handleCategoryChange(category) {
        if (this.isValidCategory(category)) {
          this.activeCategory = category
        }
      },

  scrollToProducts() {
        this.overlayVisible = true
      },


      scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      },

      isValidCategory(category) {
        return this.categories.some(cat => cat.id === category)
      },

      cleanup() {
        window.removeEventListener('resize', this.handleResize)
        if (this.scrollDebounceTimer) clearTimeout(this.scrollDebounceTimer)
      },
  handleScroll(event) {
        if (this.scrollDebounceTimer) clearTimeout(this.scrollDebounceTimer)
        this.scrollDebounceTimer = setTimeout(() => {
          const deltaY = event.deltaY
          if (deltaY > 0 && !this.overlayVisible) {
            // scroll up → open overlay
            this.overlayVisible = true
          } else if (deltaY < 0 && this.overlayVisible) {
            // scroll down → close overlay
            this.overlayVisible = false
          }
        }, 16)
      },

      handleTouchStart(e) {
        this.lastTouchY = e.touches[0].clientY
      },

      handleTouchMove(e) {
        const touchY = e.touches[0].clientY
        const deltaY = this.lastTouchY - touchY
        if (deltaY < -50 && !this.overlayVisible) {
          this.overlayVisible = true
        } else if (deltaY > 50 && this.overlayVisible) {
          this.overlayVisible = false
        }
        this.lastTouchY = touchY
      }
    },

      overlayAnimationEnd() {
        this.overlayAnimating = false
      },

      handleResize() {
        // Optional: handle overlay sizing
      }
    }

  </script>

  <style>
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    scroll-behavior: smooth;
    background-color: #fff;
  }

  .app-container {
    position: relative;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Main Content */
  .main-content {
    min-height: calc(100vh - 80px);
    position: relative;
    z-index: 1;
  }
.product-grid-wrapper {
  animation: slideUp 0.8s forwards;
}

 .overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 100;
  transform: translateY(100%);
  opacity: 0;
  transition: transform 0.5s ease, opacity 0.5s ease;
  overflow-y: auto; /* allow scrolling inside overlay */
}


  .overlay-visible {
    transform: translateY(0);
    opacity: 1;
  }

  .product-grid-section {
    animation: slideUp 0.8s forwards;
  }

  @keyframes slideUp {
    0% { transform: translateY(5px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }


  /* Loading Spinner */
  .loading-indicator {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    background: rgba(255,255,255,0.9);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
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

  /* Scrollbar */
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #f1f1f1; }
  ::-webkit-scrollbar-thumb { background: #888; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #555; }
  * { scrollbar-width: thin; scrollbar-color: #888 #f1f1f1; }

  /* Responsive */
  @media (max-width: 768px) {
    .main-content { min-height: calc(100vh - 60px); }
  }
  </style>
