<script setup lang="ts"></script>

<template>
  <div class="flex flex-col items-center">
    <header class="text-3xl text-center md:text-7xl dark:text-whiteBackRow m-8">About Us</header>
    <div class="flex container bg-whiteBackRow shadow-lg shadow-black w-4/5 rounded-2xl">
      <p class="p-4 text-center md:text-xl md:p-24 md:py-10">
        {{ $t('about') }}
      </p>
    </div>
    <div class="flex flex-wrap justify-evenly m-10 w-4/5">
      <div class="mb-2">
        <img class="h-32 w-32 rounded-full" src="../../assets/about/head1.png" alt="blue" />
        <p class="text-center bg-whiteBackRow shadow-lg shadow-black p-1 rounded-md mt-4">Oliver</p>
      </div>
      <div class="mb-2">
        <img class="h-32 w-32 rounded-full" src="../../assets/about/head2.png" alt="blue" />
        <p class="text-center bg-whiteBackRow p-1 shadow-lg shadow-black rounded-md mt-4">Robert</p>
      </div>
      <div class="mb-2">
        <img class="h-32 w-32 rounded-full" src="../../assets/about/head3.png" alt="blue" />
        <p class="text-center bg-whiteBackRow p-1 shadow-lg shadow-black rounded-md mt-4">
          Fredrik
        </p>
      </div>
      <div class="mb-2">
        <img class="h-32 w-32 rounded-full" src="../../assets/about/head4.png" alt="blue" />
        <p class="text-center bg-whiteBackRow p-1 shadow-lg shadow-black rounded-md mt-4">Julia</p>
      </div>
      <div class="mb-2">
        <img class="h-32 w-32 rounded-full" src="../../assets/about/head5.png" alt="blue" />
        <p class="text-center bg-whiteBackRow p-1 shadow-lg shadow-black rounded-md mt-4">Henrik</p>
      </div>
    </div>
  </div>
</template>

<style></style>
