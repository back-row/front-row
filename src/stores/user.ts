import { defineStore } from 'pinia';
import { ref } from 'vue';

type DbUser = {
  usersid: number;
  usersname: string;
  usersemail: string;
  userstotalscore: number;
  userslevel: number;
  usersimage: string;
};

export const useUserStore = defineStore('user', () => {
  const user = ref({
    id: 0,
    name: '',
    email: '',
    score: 0,
    level: 0,
    avatar: ''
  });

  async function getUserFromDb(id: number) {
    try {
      const response = await fetch('http://localhost:8000/users/' + id);
      const data = await response.json();
      setUser(data);
      console.log('user', data);
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
    user.value.avatar = newUser.usersimage;
  };
  return { user, getUserFromDb };
});
