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

  function setUser(newUser: DbUser) {
    user.value.id = newUser.usersid;
    user.value.name = newUser.usersname;
    user.value.email = newUser.usersemail;
    user.value.score = newUser.userstotalscore;
    user.value.level = newUser.userslevel;
    user.value.avatar = newUser.usersimage;
  }
  return { user, setUser };
});
