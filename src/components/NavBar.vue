<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Menu from 'primevue/menu';
import DarkmodeButton from '@/components/DarkmodeButton.vue';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { usePlayerStore } from '@/stores/player';

const userStore = useUserStore();
const playerStore = usePlayerStore();

const menu = ref();

const items2 =  ref([
  {
    items: [
      {
        label: 'Hem',
        route: '/'
      },
      {
        label: 'Spela',
        route: '/level'
      },
      {
        label: 'Topplista',
        route: '/highscore'
      },
      {
        label: 'Om',
        route: '/about'
      }
    ]
  }
]);

const items = ref([
  {
    items: [
      {
        label: 'Home',
        route: '/'
      },
      {
        label: 'Play',
        route: '/level'
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
  <nav
    class="flex items-center dark:border-none dark:bg-blackBackRow dark:text-greenBackRow shadow-gray-700 shadow-md text-center h-10"
  >
    <button
      class="ml-3 w-10 md:hidden"
      type="button"
      label="Toggle"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2.0"
        stroke="currentColor"
        class="w-10"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
    <div class="hidden md:flex ml-4 flex-row gap-3 items-center w-1/3">
      <router-link :to="'/'">{{$t('home')}}</router-link>
      <router-link
        @click="playerStore.playerPosition.atEnd = false"
        :to="'/level'"
        v-show="userStore.user.id !== 0"
        >{{$t('play')}}</router-link
      >
      <router-link class="flex flex-shrink-0" :to="'/highscore'">{{$t('highScore')}}</router-link>
      <router-link :to="'/about'">{{$t('aboutNav')}}</router-link>
    </div>

    <Menu
      class="flex flex-col items-center justify-center bg-whiteBackRow border-2 border-black shadow-lg shadow-black dark:bg-blackBackRow h-52 w-32 rounded-md"
      ref="menu"
      id="overlay_menu"
      :model="$i18n.locale.match('se') ? items2 : items"
      :popup="true"
    >
      <template #item="{ label, item, props }">
        <router-link v-if="item.route" v-slot="routerProps" :to="item.route" custom>
          <a :href="routerProps.href" v-bind="props.action">
            <span class="p-2 text-greenBackRow text-lg" v-bind="props.label">{{ label }}</span>
          </a>
        </router-link>
      </template>
    </Menu>
    <router-link to="/" class="m-0 w-1/3 dark:text-whiteBackRow"> <h2>Back Row</h2></router-link>
    <div class="loginUser flex flex-row justify-end w-1/3 mr-2">
      <p
        v-show="userStore.user.id === 0"
        class="w-fit px-2 cursor-pointer hover:text-2xl underline underline-offset-2"
        @click="$emit('toggleLogin')"
      >
        {{$t('login')}}
      </p>
      <p
        v-show="userStore.user.id === 0"
        class="w-fit mr-3 cursor-pointer hover:text-2xl underline underline-offset-2"
        @click="$emit('toggleSignUp')"
      >
        {{$t('signUp')}}
      </p>
      <p
        v-show="userStore.user.id !== 0"
        class="w-fit cursor-pointer mr-3 hover:text-2xl underline underline-offset-2"
        @click="$emit('toggleUserModal')"
      >
        {{ userStore.user.name }}
      </p>
        <div class="locale-changer">
    <select v-model="$i18n.locale" class="dark:bg-grayDarkBackRow">
      <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
    </select>
  </div>
    </div>
    <DarkmodeButton />
  </nav>
</template>

<style scoped></style>
