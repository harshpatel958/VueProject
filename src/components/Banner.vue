<template>
  <section class="h-screen relative overflow-hidden mt-20 md:mt-15">
    <div class="slider-container w-full h-full relative">
      <div
        class="slider-track flex h-full transition-transform duration-[600ms]"
        :style="{ transform: `translateX(-${currentSlide * 33.333333}%)`, width: '300%' }"
      >

        <div
          class="slider-item relative flex items-center justify-center"
          :class="{ active: currentSlide === 0 }"
          style="width: 33.333333%; height: 100%; flex-shrink: 0;"
        >
          <div class="banner-image house-of-w-bg absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat">
            <img 
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&h=800&fit=crop" 
              alt="Premium Interior Facades" 
              draggable="false"
              class="w-full h-full object-cover"
              @error="handleImageError"
            >
          </div>
          <div class="slider-item-text-wrapper absolute left-[60px] bottom-[30px] md:left-[30px] md:bottom-[80px] text-white z-[2]">
            <div class="slider-item-text mb-10">
              <div class="brand-logo mb-5">
                <img 
                  src="../assets/images/hous 1.png" 
                  alt="Metalia Logo" 
                  class="h-10 w-auto mb-1"
                />
              </div>
              <div class="tagline text-[40px] nunito-light text-white mb-2.5" style="color: white;">
                Premium Interior<br> Facades
              </div>

            </div>
          </div>
        </div>


        <div
          class="slider-item relative flex items-center justify-center"
          :class="{ active: currentSlide === 1 }"
          style="width: 33.333333%; height: 100%; flex-shrink: 0;"
        >
          <div class="banner-image colour-coats-bg absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat">
            <img 
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop" 
              alt="Signature Surface Elegance" 
              draggable="false"
              class="w-full h-full object-cover"
              @error="handleImageError"
            >
          </div>
          <div class="slider-item-text-wrapper absolute left-[60px] bottom-[30px] md:left-[30px] md:bottom-[80px] text-white z-[2]">
            <div class="slider-item-text mb-10">
              <div class="brand-logo mb-5">
                <img 
                  src="../assets/images/hous 1.png" 
                  alt="Metalia Logo" 
                  class="h-10 w-auto mb-1"
                />
              </div>
              
              <div class="tagline text-[40px] font-light nunito-light mb-2.5" style="color: white;">
                Signature Surface <br>Elegance
              </div>
            </div>
          </div>
        </div>

   
        <div
          class="slider-item relative flex items-center justify-center"
          :class="{ active: currentSlide === 2 }"
          style="width:33.33%; height: 100%; flex-shrink: 0;"
        >
          <div class="banner-image metalia-bg absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat">
            <img 
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop" 
              alt="Premium Exterior Facades" 
              draggable="false"
              class="w-full h-full object-cover"
              @error="handleImageError"
            >
          </div>
          <div class="slider-item-text-wrapper absolute left-[60px] bottom-[30px] md:left-[30px] md:bottom-[80px] text-white z-[2]">
            <div class="slider-item-text mb-10">
              <div class="brand-logo mb-5">
                <img 
                  src="../assets/images/hous 1.png" 
                  alt="Metalia Logo" 
                  class="h-10 w-auto mb-1"
                />
              </div>
              <div class="tagline text-[40px] nunito-light text-white mb-2.5" style="color: white;">
                Premium Exterior <br>Facades
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="slider-arrow-container-main bottom-[30px]">
        <div 
          class="btn top-[50px] px-[18px] py-[8px] rounded-[100px] nunito-mh text-[16px] cursor-pointer transition-all duration-300 inline-block justify-center"
          @click="scrollToProducts"
        >
          Explore Products
        </div>
      </div>


      <div class="slider-arrow-container absolute right-10 bottom-[60px] md:right-5 flex z-[3]">
  
        <button 
          class="slider-arrow w-[24px] h-[24px] min-w-[50px] flex items-center justify-center cursor-pointer transition-all duration-300 flex-shrink-0"
          @click="previousSlide"
        >
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.1417 37.6383C19.5217 37.6383 19.9017 37.4983 20.2017 37.1983C20.7817 36.6183 20.7817 35.6583 20.2017 35.0783L9.1217 23.9983L20.2017 12.9183C20.7817 12.3383 20.7817 11.3783 20.2017 10.7983C19.6217 10.2183 18.6617 10.2183 18.0817 10.7983L5.9417 22.9383C5.3617 23.5183 5.3617 24.4783 5.9417 25.0583L18.0817 37.1983C18.3817 37.4983 18.7617 37.6383 19.1417 37.6383Z" fill="white"></path>
            <path d="M7.34 25.5H41C41.82 25.5 42.5 24.82 42.5 24C42.5 23.18 41.82 22.5 41 22.5H7.34C6.52 22.5 5.84 23.18 5.84 24C5.84 24.82 6.52 25.5 7.34 25.5Z" fill="white"></path>
          </svg>
        </button>


        <button 
          class="slider-arrow w-[24px] h-[24px] min-w-[50px] flex items-center justify-center cursor-pointer transition-all duration-300 flex-shrink-0"
          @click="nextSlide"
        >
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.8583 37.6383C28.4783 37.6383 28.0983 37.4983 27.7983 37.1983C27.2183 36.6183 27.2183 35.6583 27.7983 35.0783L38.8783 23.9983L27.7983 12.9183C27.2183 12.3383 27.2183 11.3783 27.7983 10.7983C28.3783 10.2183 29.3383 10.2183 29.9183 10.7983L42.0583 22.9383C42.6383 23.5183 42.6383 24.4783 42.0583 25.0583L29.9183 37.1983C29.6183 37.4983 29.2383 37.6383 28.8583 37.6383Z" fill="white"></path>
            <path d="M40.66 25.5H7C6.18 25.5 5.5 24.82 5.5 24C5.5 23.18 6.18 22.5 7 22.5H40.66C41.48 22.5 42.16 23.18 42.16 24C42.16 24.82 41.48 25.5 40.66 25.5Z" fill="white"></path>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    activeCategory: {
      type: String,
      default: 'metalia'
    }
  },
  data() {
    return {
      currentSlide: 2,        
      autoPlayInterval: null, 
      autoPlaySpeed: 5000     
    }
  },
  watch: {
    activeCategory(newCategory) {
      this.updateSlideForCategory(newCategory)
    }
  },
  mounted() {
    this.updateSlideForCategory(this.activeCategory)
    this.startAutoPlay() 
  },
  beforeUnmount() {
    this.stopAutoPlay() 
  },
  methods: {
    updateSlideForCategory(category) {
      const categoryMap = {
        'house-of-w': 0,
        'colour-coats': 1,
        'metalia': 2,
        'fiamarc': 0
      }
      this.currentSlide = categoryMap[category] || 0
    },
    previousSlide() {
      this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : 2
      this.updateCategoryFromSlide()
    },
    nextSlide() {
      this.currentSlide = this.currentSlide < 2 ? this.currentSlide + 1 : 0
      this.updateCategoryFromSlide()
    },
    updateCategoryFromSlide() {
      const slideMap = {
        0: 'house-of-w',
        1: 'colour-coats',
        2: 'metalia'
      }
      this.$emit('category-change', slideMap[this.currentSlide])
    },
    scrollToProducts() {
      this.$emit('scroll-to-products')
    },
    handleImageError(event) {
      event.target.style.display = 'none'
    },


    startAutoPlay() {
      this.stopAutoPlay() // Clear previous timer if any
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide()
      }, this.autoPlaySpeed)
    },
    stopAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval)
        this.autoPlayInterval = null
      }
    }
  }
}
</script>

<style scoped>
.slider-track {
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}


.slider-item img {
  transform: scale(1.2);
  transition: transform 1.2s ease;
  will-change: transform;
}

.slider-item.active img {
  transform: scale(1);
}

.tagline {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
}

.slider-item.active .tagline {
  opacity: 1;
  transform: translateY(0);
}

.tagline-border {
  display: block;
  height: 2px;
  background: white;
  width: 0; /* start from 0 */
  margin: 15px auto 0;
  transition: width 0.8s ease; /* smooth width growth */
}



.slider-item.active .tagline-border {
  width: 60px;
  animation: slideFadeIn 0.8s forwards; 
}

@keyframes slideFadeIn {
  0% {
    transform: translateY(5px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}



.house-of-w-bg,
.colour-coats-bg,
.metalia-bg {
  background: transparent !important;
}

.btn {
  letter-spacing: 1px;
  color: white;
  background-color: #00000099;
  transition: all 0.3s ease;
}
.btn:hover {
  color: black;
  background-color: white;
}

.tagline::after {
  content: '';
  display: block;
  width: 60px;
  height: 2px;
  background: white;
  margin-top: 15px;

}

.slider-arrow-container-main {
  position: absolute;
  left: 60%;
  display: flex;
  flex-direction: row;
}

.slider-arrow-container {
  position: absolute;
  right: 40px;
  display: flex;
  z-index: 3;
}

.slider-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.slider-arrow:hover {
  transform: scale(1.1);
}

.slider-arrow svg {
  width: 50px;
  height: 50px;
}

@media (max-width: 768px) {
  .banner-section {
    margin-top: 60px;
    touch-action: pan-y;
  }
  .slider-arrow-container {
    right: 20px !important;
  }
  .slider-arrow {
    width: 40px !important;
    height: 40px !important;
  }
}
</style>
