<script setup lang='ts'>
import { RouterLink } from 'vue-router';
import Menu from 'primevue/menu';
import { ref } from 'vue';

const menu = ref();
const items = ref([
  {
    items: [
      {
        label: 'Home',
        route: '/'
      },
      {
        label: 'Play',
        route: '/game'
      },
      {
        label: 'High score',
        route: '/highscore'
      },
      {
        label: 'About',
        route: '/about'
      }
    ]
  }
]);

const toggle = (event: any) => {
  menu.value.toggle(event);
};
</script>

<template>
  <nav class='flex items-center bg-[#0A0F14] text-[#408080] text-center h-10'>
    <button
      class='ml-3'
      type='button'
      label='Toggle'
      @click='toggle'
      aria-haspopup='true'
      aria-controls='overlay_menu'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke-width='2.0'
        stroke='currentColor'
        class='w-10'
      >
        <path
          stroke-linecap='round'
          stroke-linejoin='round'
          d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
        />
      </svg>
    </button>
    <Menu class="flex flex-col items-center justify-center bg-black h-52 w-32 rounded-md" ref='menu' id='overlay_menu' :model='items' :popup='true'>
      <template #item='{ label, item, props }'>
        <router-link v-if='item.route' v-slot='routerProps' :to='item.route' custom>
          <a :href='routerProps.href' v-bind='props.action'>
            <span class="p-2 text-[#408080] text-lg" v-bind='props.label'>{{ label }}</span>
          </a>
        </router-link>
      </template>
    </Menu>
    <h2 class='m-0 w-full text-white'>Back Row</h2>
    <p>Login</p>
    <p class='w-20'>Sign up</p>
  </nav>
</template>

<style scoped></style>
