<template>
  <section class="hero">
    <div class="hero-carousel">
      <div class="slide active">
        <div class="slide-image">
          <!-- Architectural facade pattern -->
          <div class="facade-pattern">
            <div class="geometric-grid">
              <div v-for="i in 36" :key="i" class="grid-item" :class="`item-${i}`">
                <div class="star-pattern"></div>
              </div>
            </div>
            <div class="wooden-panel">
              <div class="wood-slats">
                <div v-for="i in 20" :key="i" class="slat"></div>
              </div>
            </div>
            <div class="perforated-panel">
              <div class="dots-pattern">
                <div v-for="i in 200" :key="i" class="dot"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="slide-content">
          <div class="metalia-brand">
            <svg width="40" height="20" viewBox="0 0 40 20" fill="white">
              <path d="M2 2h36v16H2z"/>
              <text x="20" y="12" text-anchor="middle" fill="black" font-size="8" font-weight="bold">METALIA</text>
            </svg>
          </div>

          <h1 class="hero-title">
            Premium Exterior<br>
            Facades
          </h1>

          <button class="explore-btn">
            Explore Products
          </button>
        </div>
      </div>
    </div>

    <div class="carousel-controls">
      <button class="control-btn prev" @click="previousSlide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="control-btn next" @click="nextSlide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero',
  data() {
    return {
      isDragging: false,
      startX: 0,
      scrollLeft: 0
    }
  },
  mounted() {
    this.initDragScroll()
  },
  methods: {
    previousSlide() {
      console.log('Previous slide')
    },
    nextSlide() {
      console.log('Next slide')
    },
    initDragScroll() {
      const carousel = this.$el.querySelector('.hero-carousel')

      carousel.addEventListener('mousedown', (e) => {
        this.isDragging = true
        this.startX = e.pageX - carousel.offsetLeft
        this.scrollLeft = carousel.scrollLeft
        carousel.style.cursor = 'grabbing'
      })

      carousel.addEventListener('mouseleave', () => {
        this.isDragging = false
        carousel.style.cursor = 'grab'
      })

      carousel.addEventListener('mouseup', () => {
        this.isDragging = false
        carousel.style.cursor = 'grab'
      })

      carousel.addEventListener('mousemove', (e) => {
        if (!this.isDragging) return
        e.preventDefault()
        const x = e.pageX - carousel.offsetLeft
        const walk = (x - this.startX) * 2
        carousel.scrollLeft = this.scrollLeft - walk
      })
    }
  }
}
</script>

<style scoped>
.hero {
  height: 100vh;
  position: relative;
  overflow: hidden;
  margin-top: 80px;
}

.hero-carousel {
  width: 100%;
  height: 100%;
  cursor: grab;
  user-select: none;
}

.slide {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
}

.slide-image {
  flex: 1;
  height: 100%;
  background: #f5f5f5;
  position: relative;
  overflow: hidden;
}

.facade-pattern {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 300px 250px;
  gap: 20px;
  padding: 40px;
}

.geometric-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 2px;
  background: #e0e0e0;
}

.grid-item {
  background: #f0f0f0;
  position: relative;
  aspect-ratio: 1;
}

.star-pattern {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent 40%, #d0d0d0 40%, #d0d0d0 60%, transparent 60%),
              linear-gradient(-45deg, transparent 40%, #d0d0d0 40%, #d0d0d0 60%, transparent 60%);
  background-size: 100% 100%;
}

.grid-item:nth-child(odd) .star-pattern {
  background: #e8e8e8;
}

.wooden-panel {
  background: #8B4513;
  position: relative;
  border-radius: 8px;
}

.wood-slats {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px;
}

.slat {
  flex: 1;
  background: #A0522D;
  border-radius: 2px;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.2);
}

.slat:nth-child(even) {
  background: #8B4513;
}

.perforated-panel {
  background: #f8f8f8;
  position: relative;
  border-radius: 8px;
}

.dots-pattern {
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(10, 1fr);
  gap: 8px;
  padding: 15px;
  height: 100%;
}

.dot {
  width: 4px;
  height: 4px;
  background: #999;
  border-radius: 50%;
  opacity: 0.7;
}

.dot:nth-child(3n) {
  opacity: 0.4;
}

.slide-content {
  position: absolute;
  left: 60px;
  bottom: 120px;
  color: white;
  z-index: 2;
}

.metalia-brand {
  margin-bottom: 20px;
}

.hero-title {
  font-size: 48px;
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 40px;
  color: white;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.explore-btn {
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 12px 30px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.explore-btn:hover {
  background: white;
  color: #000;
}

.carousel-controls {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 3;
}

.control-btn {
  width: 50px;
  height: 50px;
  background: rgba(0,0,0,0.5);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: rgba(0,0,0,0.7);
}

/* Overlay for better text readability */
.slide::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%);
  z-index: 1;
}

@media (max-width: 768px) {
  .hero {
    margin-top: 60px;
  }

  .facade-pattern {
    grid-template-columns: 1fr;
    padding: 20px;
  }

  .slide-content {
    left: 30px;
    bottom: 80px;
  }

  .hero-title {
    font-size: 36px;
  }

  .carousel-controls {
    right: 20px;
  }

  .control-btn {
    width: 40px;
    height: 40px;
  }
}
</style>