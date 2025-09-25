<template>
  <div class="dropdown-menu" v-if="isVisible">
    <div class="dropdown-content">
      <div class="dropdown-section">
        <h4>ISVEA</h4>
        <ul>
          <li>Asma Klozet</li>
          <li>Asma Klozet Alfa</li>
          <li>White Mialauce Manta Monoblok Lavabo</li>
          <li>Black Mialauce Manta Monoblok Lavabo</li>
          <li>Rena Tezgah Ustu Lavabo</li>
          <li>Rena Monoblok Lavabo</li>
        </ul>
      </div>

      <div class="dropdown-section">
        <h4>IDEVIT <span class="arrow">›</span></h4>
        <ul>
          <li>Olympia</li>
          <li>O+P Solutions</li>
          <li>Wellness</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDropdown',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  z-index: 999;
  padding: 40px 0;
}

.dropdown-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  gap: 80px;
}

.dropdown-section {
  flex: 1;
}

.dropdown-section h4 {
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.arrow {
  color: #999;
  font-size: 18px;
}

.dropdown-section ul {
  list-style: none;
  padding: 0;
}

.dropdown-section li {
  padding: 8px 0;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.dropdown-section li:hover {
  color: #000;
}
</style>