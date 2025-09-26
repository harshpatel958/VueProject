<template>
  <section class="product-grid-page" role="main" :aria-label="`${pageTitle} `">
    <div class="product-grid-content">
      <!-- Header Section -->
      <header class="product-grid-header">
        <h1 class="product-grid-header-text">{{ pageTitle }}</h1>
       <h1 class="product-grid-header-subtext">Products</h1>
      </header>
      
      <!-- Loading State -->
      <div v-if="isLoading" class="loading-state" role="status" aria-label="Loading products">
        <div class="loading-spinner"></div>
        <p>Loading products...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="hasError" class="error-state" role="alert">
        <h2>Unable to load products</h2>
        <p>{{ errorMessage }}</p>
        <button @click="retryLoad" class="retry-button">Try Again</button>
      </div>

      <!-- Products Grid -->
      <div v-else class="product-grid-container" role="grid" :aria-label="`${products.length} products available`">
        <div
          v-for="(product, index) in products"
          :key="product.id || index"
          class="product-card"
          :class="{ 'product-card--loading': product.isLoading }"
          @click="handleProductClick(product)"
          @keydown.enter="handleProductClick(product)"
          @keydown.space.prevent="handleProductClick(product)"
          @mouseenter="handleProductHover(index)"
          @mouseleave="handleProductLeave(index)"
          role="gridcell"
          tabindex="0"
          :aria-label="`View ${product.title} product details`"
        >
          <!-- Product Image -->
          <div class="product-image" :style="{ backgroundImage: `url(${product.image})` }">
            <img 
              :src="product.image" 
              :alt="product.title" 
              draggable="false"
              @error="handleImageError($event, product)"
              @load="handleImageLoad($event, product)"
              loading="lazy"
              :style="{ opacity: product.imageLoaded ? 1 : 0 }"
            />
            
            <!-- Image Loading Placeholder -->
            <div v-if="!product.imageLoaded && !product.imageError" class="image-placeholder">
              <div class="placeholder-spinner"></div>
            </div>
            
            <!-- Image Error State -->
            <div v-if="product.imageError" class="image-error">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21,15 16,10 5,21"/>
              </svg>
              <span>Image unavailable</span>
            </div>
          </div>

          <!-- Product Overlay -->
          <div class="product-overlay">
            <div class="product-info">
              <h3 class="product-name nunito-light">{{ product.title }}</h3>
              <p v-if="product.description" class="product-description">{{ product.description }}</p>
            </div>
            <div class="product-arrow" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5.93974 13.78C5.81307 13.78 5.68641 13.7333 5.58641 13.6333C5.39307 13.44 5.39307 13.12 5.58641 12.9267L9.93307 8.58001C10.2531 8.26001 10.2531 7.74001 9.93307 7.42001L5.58641 3.07335C5.39307 2.88001 5.39307 2.56001 5.58641 2.36668C5.77974 2.17335 6.09974 2.17335 6.29307 2.36668L10.6397 6.71335C10.9797 7.05335 11.1731 7.51335 11.1731 8.00001C11.1731 8.48668 10.9864 8.94668 10.6397 9.28668L6.29307 13.6333C6.19307 13.7267 6.06641 13.78 5.93974 13.78Z" fill="#292D32"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!isLoading && !hasError && products.length === 0" class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
        <h2>No products available</h2>
        <p>There are currently no products in this category.</p>
      </div>
    </div>
  </section>
</template>

<script>
/**
 * Professional ProductGrid Component
 * Features:
 * - Responsive grid system for all devices
 * - Accessibility compliant (ARIA labels, keyboard navigation)
 * - Professional code structure with error handling
 * - Image loading states and error handling
 * - Performance optimized with lazy loading
 */

export default {
  name: 'ProductGrid',
  
  props: {
    /**
     * Page type/category for products
     * @type {String}
     * @required
     */
    pageType: {
      type: String,
      required: true,
      validator: (value) => ['house-of-w', 'colour-coats', 'metalia', 'fiamarc'].includes(value)
    }
  },

  data() {
    return {
      isLoading: false,
      hasError: false,
      errorMessage: '',
      hoveredIndex: -1
    }
  },

  computed: {
    /**
     * Page title based on page type
     * @returns {String}
     */
    pageTitle() {
      const titles = {
        'house-of-w': 'The House Of W',
        'colour-coats': 'Colour Coats',
        'metalia': 'Metalia',
        'fiamarc': 'Fiamarc'
      }
      return `${titles[this.pageType]} `
    },

    /**
     * Page subtitle
     * @returns {String}
     */
    pageSubtitle() {
      const subtitles = {
        'house-of-w': 'Premium Interior Facades',
        'colour-coats': 'Signature Surface Elegance',
        'metalia': 'Premium Exterior Facades',
        'fiamarc': 'Luxury Fireplace Solutions'
      }
      return subtitles[this.pageType] || 'Discover our premium collection'
    },

    /**
     * Products array with enhanced data
     * @returns {Array<Object>}
     */
    products() {
      return this.getProductsByType(this.pageType).map((product, index) => ({
        id: `${this.pageType}-${index}`,
        ...product,
        imageLoaded: false,
        imageError: false,
        isLoading: false
      }))
    }
  },

  watch: {
    /**
     * Watch for page type changes
     * @param {String} newType - New page type
     */
    pageType(newType) {
      this.loadProducts(newType)
    }
  },

  mounted() {
    this.loadProducts(this.pageType)
  },

  methods: {
    /**
     * Load products for the given type
     * @param {String} type - Product type
     */
    async loadProducts(type) {
      try {
        this.isLoading = true
        this.hasError = false
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // Validate products exist
        const products = this.getProductsByType(type)
        if (!products || products.length === 0) {
          throw new Error('No products found for this category')
        }
        
      } catch (error) {
        this.hasError = true
        this.errorMessage = error.message || 'Failed to load products'
        console.error('Product loading error:', error)
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Get products by type with enhanced data
     * @param {String} type - Product type
     * @returns {Array<Object>}
     */
    getProductsByType(type) {
      const productData = {
        'house-of-w': [
          { 
            image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop', 
            title: 'Red Vanity Lavabo Dolabi Siyah Lavabolu',
            description: 'Premium bathroom vanity with modern design'
          },
          { 
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', 
            title: 'Blue Vanity Lavabo Dolabi Siyah Lavabolu',
            description: 'Elegant blue vanity with contemporary styling'
          },
          { 
            image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop', 
            title: 'Asma Klozetler Alfa',
            description: 'Wall-mounted toilet with space-saving design'
          },
          { 
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', 
            title: 'Asma Klozet',
            description: 'Modern wall-hung toilet system'
          },
          { 
            image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop', 
            title: 'White Mialauce Manta Monoblok Lavabo',
            description: 'White monoblock washbasin with sleek design'
          },
          { 
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', 
            title: 'Black Mialauce Manta Monoblok Lavabo',
            description: 'Black monoblock washbasin for modern bathrooms'
          },
          { 
            image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop', 
            title: 'Rena Tezgah Ustu Lavobo',
            description: 'Countertop washbasin with premium finish'
          },
          { 
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', 
            title: 'Rena Monoblok Lavobo',
            description: 'Monoblock washbasin with integrated design'
          }
        ],
        'colour-coats': [
          { 
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop', 
            title: 'Desert Dune Grain',
            description: 'Natural desert-inspired texture finish'
          },
          { 
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop', 
            title: 'Urban Slate Grain',
            description: 'Modern urban slate texture coating'
          },
          { 
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop', 
            title: 'Velato Mist',
            description: 'Soft misty finish for elegant surfaces'
          },
          { 
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop', 
            title: 'Mineral Spark',
            description: 'Sparkling mineral texture coating'
          },
          { 
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop', 
            title: 'Rivedil Craquelèe',
            description: 'Classic crackle finish texture'
          },
          { 
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop', 
            title: 'Rivedil Silk Paint',
            description: 'Silky smooth paint finish'
          }
        ],
        'metalia': [
          { 
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', 
            title: 'Aluminium Profile',
            description: 'Lightweight aluminum profile system'
          },
          { 
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', 
            title: 'Coin Matrix',
            description: 'Decorative coin matrix pattern'
          },
          { 
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', 
            title: 'Steel Profile',
            description: 'Durable steel profile construction'
          },
          { 
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', 
            title: 'Copper Matrix',
            description: 'Premium copper matrix design'
          }
        ],
        'fiamarc': [
          { 
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', 
            title: 'Modern Fireplace',
            description: 'Contemporary fireplace design'
          },
          { 
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', 
            title: 'Classic Fireplace',
            description: 'Traditional fireplace with modern features'
          },
          { 
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', 
            title: 'Contemporary Fireplace',
            description: 'Sleek contemporary fireplace solution'
          },
          { 
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', 
            title: 'Luxury Fireplace',
            description: 'Premium luxury fireplace system'
          }
        ]
      }

      return productData[type] || []
    },

    /**
     * Handle product click
     * @param {Object} product - Product object
     */
    handleProductClick(product) {
      this.$emit('product-click', product)
      // TODO: Navigate to product detail page
      console.log('Product clicked:', product.title)
    },

    /**
     * Handle product hover
     * @param {Number} index - Product index
     */
    handleProductHover(index) {
      this.hoveredIndex = index
    },

    /**
     * Handle product leave
     * @param {Number} index - Product index
     */
    handleProductLeave(index) {
      if (this.hoveredIndex === index) {
        this.hoveredIndex = -1
      }
    },

    /**
     * Handle image load success
     * @param {Event} event - Load event
     * @param {Object} product - Product object
     */
    handleImageLoad(event, product) {
      product.imageLoaded = true
      product.imageError = false
    },

    /**
     * Handle image load error
     * @param {Event} event - Error event
     * @param {Object} product - Product object
     */
    handleImageError(event, product) {
      product.imageLoaded = false
      product.imageError = true
      
      // Fallback to background color
      const img = event.target
      const parent = img.parentElement
      if (parent) {
        parent.style.backgroundImage = 'none'
        parent.style.backgroundColor = '#f0f0f0'
      }
    },

    /**
     * Retry loading products
     */
    retryLoad() {
      this.loadProducts(this.pageType)
    }
  }
}
</script>

<style scoped>
/* ===== BASE STYLES ===== */
.product-grid-page {
  min-height: 100vh;
  background: #fff;
  padding: 40px 0;
}

.product-grid-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.product-grid-header {
  margin-bottom: 40px;
  text-align: left; /* Remove center alignment */
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align text to the left */
}


.product-grid-header-text {
  font-size: 42px;

  color: #000;
  margin: 0 0 10px 0;
  position: relative;
}

.product-grid-header-subtext {
  font-size: 42px;

  color: #000;
  margin: 0 0 10px 0;
  position: relative;
}

.product-grid-header-subtext::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 30%;
  transform: translateX(-50%);
  width: 100px;
  height: 2px;
  background: #000;
}

.product-grid-subtitle {
  font-size: 18px;
  font-weight: 300;
  color: #666;
  margin: 0;
  margin-top: 20px;
}

/* ===== LOADING STATE ===== */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #666;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* ===== ERROR STATE ===== */
.error-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.error-state h2 {
  color: #dc3545;
  margin-bottom: 10px;
}

.retry-button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.retry-button:hover {
  background: #0056b3;
}

/* ===== EMPTY STATE ===== */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.empty-state svg {
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-state h2 {
  margin-bottom: 10px;
}

/* ===== PRODUCT GRID ===== */
.product-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.product-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.product-card:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

/* ===== PRODUCT IMAGE ===== */
.product-image {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f0f0f0;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
}

.placeholder-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #e9ecef;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.image-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  color: #6c757d;
}

.image-error svg {
  margin-bottom: 8px;
  opacity: 0.5;
}

.image-error span {
  font-size: 12px;
  text-align: center;
}

/* ===== PRODUCT OVERLAY ===== */
.product-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 20px;
  transform: translateY(100%);
  opacity: 0;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-card:hover .product-overlay {
  transform: translateY(0);
  opacity: 1;
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 4px 0;
  color: white;
}

.product-description {
  font-size: 12px;
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
}

.product-arrow {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.product-card:hover .product-arrow {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

/* ===== RESPONSIVE DESIGN ===== */

/* Tablet Landscape (1024px and down) */
@media (max-width: 1024px) {
  .product-grid-content {
    padding: 0 30px;
  }

  .product-grid-container {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
  }
}

/* Tablet Portrait (768px and down) */
@media (max-width: 768px) {
  .product-grid-page {
    padding: 30px 0;
  }

  .product-grid-content {
    padding: 0 20px;
  }

  .product-grid-header-text {
    font-size: 36px;
  }

  .product-grid-subtitle {
    font-size: 16px;
  }

  .product-grid-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .product-image {
    height: 200px;
  }
}

/* Mobile Landscape (640px and down) */
@media (max-width: 640px) {
  .product-grid-page {
    padding: 20px 0;
  }

  .product-grid-content {
    padding: 0 15px;
  }

  .product-grid-header-text {
    font-size: 28px;
  }

  .product-grid-subtitle {
    font-size: 14px;
  }

  .product-image {
    height: 180px;
  }

  .product-overlay {
    padding: 15px;
  }

  .product-name {
    font-size: 14px;
  }

  .product-description {
    font-size: 11px;
  }
}

/* Mobile Portrait (480px and down) */
@media (max-width: 480px) {
  .product-grid-content {
    padding: 0 10px;
  }

  .product-grid-header-text {
    font-size: 24px;
  }

  .product-grid-subtitle {
    font-size: 13px;
  }

  .product-image {
    height: 160px;
  }

  .product-overlay {
    padding: 12px;
  }

  .product-name {
    font-size: 13px;
  }

  .product-description {
    font-size: 10px;
  }

  .product-arrow {
    width: 28px;
    height: 28px;
  }
}

/* Small Mobile (360px and down) */
@media (max-width: 360px) {
  .product-grid-header-text {
    font-size: 20px;
  }

  .product-image {
    height: 140px;
  }

  .product-overlay {
    padding: 10px;
  }
}

/* ===== ACCESSIBILITY IMPROVEMENTS ===== */

/* High contrast mode support */
@media (prefers-contrast: high) {
  .product-card {
    border: 2px solid #000;
  }

  .product-overlay {
    background: rgba(0, 0, 0, 0.9);
  }

  .product-name {
    color: #fff;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .product-card,
  .product-image img,
  .product-overlay,
  .product-arrow {
    transition: none;
  }

  .product-card:hover {
    transform: none;
  }

  .product-card:hover .product-image img {
    transform: none;
  }

  .loading-spinner,
  .placeholder-spinner {
    animation: none;
  }
}

/* Focus visible for better keyboard navigation */
.product-card:focus-visible {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}
</style>