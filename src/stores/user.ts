import { defineStore } from 'pinia';
import { ref } from 'vue';

const backendUrl = import.meta.env.BACKEND_HOST || 'localhost:8000';

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
    avatar: 'boy1'
  });

  const userDTO = ref({
    id: user.value.id,
    name: user.value.name,
    email: user.value.email,
    level: user.value.level,
    avatar: user.value.avatar
  });

  function setUser(newUser: DbUser) {
    user.value.id = newUser.usersid;
    user.value.name = newUser.usersname;
    user.value.email = newUser.usersemail;
    user.value.score = newUser.userstotalscore;
    user.value.level = newUser.userslevel;
    user.value.avatar = newUser.usersimage;
  }

  function logout() {
    user.value.id = 0;
    user.value.name = '';
    user.value.email = '';
    user.value.score = 0;
    user.value.level = 0;
    user.value.avatar = '';
    localStorage.removeItem('Authorization');
  }

  async function updateUser() {
    try {
      userDTO.value.id = user.value.id;
      userDTO.value.name = user.value.name;
      userDTO.value.email = user.value.email;
      userDTO.value.level = user.value.level;
      userDTO.value.avatar = user.value.avatar;

      await fetch(`http://${backendUrl}/users`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('Authorization')!
        },
        body: JSON.stringify(userDTO.value)
      });
    } catch (error) {
      console.error('Failed to update user: ' + error);
    }
  }

  return { user, setUser, logout, updateUser };
});
