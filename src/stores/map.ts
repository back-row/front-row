import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMapStore = defineStore('map', () => {
  const map = ref({
    id: 1,
    isQuiz: false,
    quizId: 0,
    endLocationX: 0,
    endLocationY: 0,
    tutorialId: 0,
    atEnd: false
  });

  const setMap = (newMap: Map) => {
    map.value = newMap;
  };
  return { map };
});
