<script setup lang="ts">
import { getUser } from '@/utility/utility'
import { getNumberOfMaps } from '@/utility/utility'

import { onMounted, ref } from 'vue';

const userLevel = ref(0)
const numberOfMaps = ref(0)

onMounted( () => {
    getUser().then( (obj) => userLevel.value = obj.userslevel)
    })

onMounted( () => {
    getNumberOfMaps().then( (obj) => numberOfMaps.value = parseInt(obj) )
})
</script>

<template>
    <div class="flex justify-center">
    <table class="table-fixed border-separate border-spacing-2 bg-[#E5E5E5] w-1/2 mt-32 rounded-lg p-10">
        <thead>
            <tr>
                <th>Level</th>
                <th></th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(number, index) in numberOfMaps" :key="number">
                <td class="text-center">{{ index + 1 + '.'}}</td>
                <td class="text-center"><button v-if="userLevel >= index + 1" class='w-16 h-6 rounded-lg text-white bg-[#408080] hover:animate-pulse'>Play</button></td>
                <td class="text-center" v-if="userLevel> index + 1">Completed</td>
                <td class="text-center" v-else-if="userLevel === index + 1">In progress</td>
                <td class="text-center" v-else>Not started</td>
            </tr>
        </tbody>
    </table>
    </div>    
</template>

<style scoped>
</style>