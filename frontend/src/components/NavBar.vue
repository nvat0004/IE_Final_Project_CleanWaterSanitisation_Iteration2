<template>
  <nav class="navbar-wrapper">
    <div class="navbar-container">
      <div class="navbar-brand" @click.prevent="$router.push('/')" role="button" tabindex="0" @keydown.enter="$router.push('/')" @keydown.space.prevent="$router.push('/')">
        <Avatar 
          v-if="logoUrl" 
          :image="logoUrl" 
          size="normal" 
          shape="circle"
          class="brand-logo"
          aria-label="Logo"
        />
        <span class="brand-text">Safe Water & Sanitisation Insights</span>
      </div>
      
      <div class="navbar-actions">
        <Button 
          label="Home" 
          icon="pi pi-home" 
          severity="secondary" 
          outlined 
          size="small"
          @click="$router.push('/')"
          aria-label="Navigate to Home page"
        />
        <Button 
          label="Education" 
          icon="pi pi-book" 
          severity="secondary" 
          outlined 
          size="small"
          @click="$router.push('/education')"
          aria-label="Navigate to Education page"
        />
      </div>
    </div>
  </nav>
</template>


<script setup lang="ts">
import logo from '@/assets/logo.png';
const logoUrl = logo;
</script>

<style scoped>
.navbar-wrapper {
  background: white;
  border-bottom: 1px solid #e9ecef;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 56px;
  margin: 0;
  padding: 0;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: opacity 0.2s ease;
  padding: 0;
  border-radius: 0.25rem;
  height: auto;
}

.navbar-brand:hover {
  opacity: 0.8;
}

.navbar-brand:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

.brand-logo {
  flex-shrink: 0;
  width: 32px !important;
  height: 32px !important;
}

.brand-text {
  font-weight: 700;
  font-size: 1.1rem;
  color: #2c3e50;
  white-space: nowrap;
  letter-spacing: -0.025em;
}

.navbar-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

/* Override PrimeVue button styles for compact navbar */
.navbar-actions :deep(.p-button) {
  padding: 0.375rem 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
  height: 32px;
  min-width: auto;
  color: #495057;
  border-color: #dee2e6;
  transition: all 0.2s ease;
}

.navbar-actions :deep(.p-button:hover) {
  color: #007bff;
  border-color: #007bff;
  background-color: rgba(0, 123, 255, 0.1);
}

.navbar-actions :deep(.p-button .p-button-label) {
  font-size: 0.9rem;
  font-weight: 500;
  color: inherit;
}

.navbar-actions :deep(.p-button .p-button-icon) {
  font-size: 0.9rem;
  margin-right: 0.25rem;
  color: inherit;
}

/* Override PrimeVue Avatar styles */
.brand-logo :deep(.p-avatar) {
  width: 32px !important;
  height: 32px !important;
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar-container {
    padding: 0 0.75rem;
  }
  
  .brand-text {
    font-size: 1rem;
    font-weight: 600;
  }
  
  .navbar-actions {
    gap: 0.25rem;
  }
  
  .navbar-actions :deep(.p-button) {
    padding: 0.25rem 0.5rem;
    font-size: 0.85rem;
    font-weight: 500;
    height: 28px;
  }
}

@media (max-width: 576px) {
  .brand-text {
    display: none;
  }
  
  .navbar-brand {
    gap: 0.25rem;
  }
  
  .navbar-actions {
    gap: 0.25rem;
  }
  
  .navbar-actions :deep(.p-button) {
    padding: 0.25rem 0.4rem;
    font-size: 0.8rem;
    font-weight: 500;
    height: 26px;
  }
  
  .navbar-actions :deep(.p-button .p-button-label) {
    display: none;
  }
  
  .navbar-actions :deep(.p-button .p-button-icon) {
    margin-right: 0;
    font-size: 0.8rem;
  }
}

/* Accessibility improvements */
.navbar-brand:focus-visible {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

/* Smooth transitions */
.navbar-brand,
.navbar-actions button {
  transition: all 0.2s ease;
}
</style>