import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMapStore = defineStore('map', () => {
  const map = ref({
    Id: 1,
    IsQuiz: false,
    QuizId: 0,
    EndLocationX: 0,
    EndLocationY: 0,
    tutorialId: 0,
    atEnd: false
  });

  const setMap = (newMap: Map) => {
    map.value = newMap;
  };
  return { map };
});
