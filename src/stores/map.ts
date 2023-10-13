import { defineStore } from 'pinia';
import { ref } from 'vue';

type DbMap = {
  mapid: number;
  mapdifficulty: number;
  mapisquiz: boolean;
  mapquizid: number;
  mapendlocationx: number;
  mapendlocationy: number;
  maptutorialid: number;
};

export const useMapStore = defineStore('map', () => {
  const map = ref({
    id: 1,
    isQuiz: false,
    quizId: 0,
    endLocationX: 0,
    endLocationY: 0,
    tutorialId: 0,
    score: 100
  });

  async function getMapFromDb(id: number) {
    try {
      const response = await fetch('http://localhost:8000/map/' + id);
      setMap(await response.json());
    } catch (error) {
      console.log(error);
      console.log('Could not get map from db');
    }
  }

  const setMap = (newMap: DbMap) => {
    map.value.id = newMap.mapid;
    map.value.isQuiz = newMap.mapisquiz;
    map.value.quizId = newMap.mapquizid;
    map.value.endLocationX = newMap.mapendlocationx;
    map.value.endLocationY = newMap.mapendlocationy;
    map.value.tutorialId = newMap.maptutorialid;
  };
  return { map, getMapFromDb };
});
