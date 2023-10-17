import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import type { argv0 } from 'process';

const userStore = useUserStore();

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
    score: 100,
    //TODO: add this to db
    startLocationX: 0,
    startLocationY: 0,
    mapJSON: 'mapOne'
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

  async function updateMapScore(score: number, mapid: number) {
    try {
      await fetch('http://localhost:8000/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('Authorization')!
        },
        body: JSON.stringify({ map: mapid, score: score })
      });
    } catch (error) {
      console.log(error);
      console.log('Could not update score');
    }

    await userStore.updateUser();
  }

  return { map, getMapFromDb, updateMapScore };
});
