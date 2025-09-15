<template>
<nav class="navbar navbar-expand-lg bg-white border-bottom sticky-top">
<div class="container">
<a class="navbar-brand d-flex align-items-center gap-2" @click.prevent="$router.push('/')">
<img v-if="logoUrl" :src="logoUrl" alt="Logo" class="logo-img" />
<span class="fw-semibold">Safe Water & Sanitisation Insights</span>
</a>
<div class="ms-auto d-flex gap-2">
<button class="btn btn-outline-secondary btn-sm" @click="$router.push('/')">Home</button>
<button class="btn btn-outline-secondary btn-sm" @click="$router.push('/education')">Education</button>
</div>
</div>
</nav>
</template>


<script setup lang="ts">
import logo from '@/assets/logo.png';
const logoUrl = logo;
</script>