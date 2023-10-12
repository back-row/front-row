import { defineStore } from 'pinia';
import { ref } from 'vue';

type DbUser = {
  usersid: number;
  usersname: string;
  usersemail: string;
  userstotalscore: number;
  userslevel: number;
};

export const useUserStore = defineStore('user', () => {
  const user = ref({
    id: 0,
    name: '',
    email: '',
    score: 0,
    level: 0
  });

  async function getUserFromDb(id: number) {
    try {
      const response = await fetch('http://localhost:8000/users/' + id);
      setUser(await response.json());
    } catch (error) {
      console.log(error);
      console.log('Could not get user from db');
    }
  }

  const setUser = (newUser: DbUser) => {
    user.value.id = newUser.usersid;
    user.value.name = newUser.usersname;
    user.value.email = newUser.usersemail;
    user.value.score = newUser.userstotalscore;
    user.value.level = newUser.userslevel;
  };
  return { user, getUserFromDb };
});
