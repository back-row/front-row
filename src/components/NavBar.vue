<script setup lang='ts'>

import { RouterLink } from 'vue-router';
import Menu from 'primevue/menu';
import IconHamburger from '@/components/icons/IconHamburger.vue';
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
        label: 'Game',
        route: '/game'
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
  <nav>
    <div>
      <Button type="button" label="Toggle" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"><IconHamburger/> Menu</button>
      <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
        <template #item="{ label, item, props }">
          <router-link v-if="item.route" v-slot="routerProps" :to="item.route" custom>
            <a :href="routerProps.href" v-bind="props.action">
              <span v-bind="props.label">{{ label }}</span>
            </a>
          </router-link>
        </template>
      </Menu>
    </div>
  <h2>Back Row</h2>
  </nav>

</template>

<style scoped>
h2{
  margin: 0px;
}

nav{
  align-items: center;
  display: flex;
  flex-direction: row;
  border: 2px black solid;
  height: 30px;
}

</style>