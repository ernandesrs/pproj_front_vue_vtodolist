<template>
  <div class="min-w-max" style="height: 300px;">
    <LoginMenu />

    <div class="grid gap-2">
      <input v-model="email" type="text" placeholder="Digite seu email"
        class="bg-gray-900 placeholder-gray-700 text-gray-500 font-normal border border-gray-900 text-center py-2 focus:outline-none focus:border-gray-700">

      <input v-model="password" type="password" placeholder="Digite sua senha"
        class="bg-gray-900 placeholder-gray-700 text-gray-500 font-normal border border-gray-900 text-center py-2 focus:outline-none focus:border-gray-700">

      <button @click.stop.prevent="login()"
        class="block bg-blue-900 hover:bg-blue-800 py-2 text-gray-400 hover:text-gray-100 text-xs">
        ENTRAR
      </button>

      <div class="text-center py-2">
        <router-link to="/login">
          Esquecia a senha
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import LoginMenu from '@/components/auth/LoginMenu';
import Cookie from 'js-cookie';

export default {
  name: 'ViewLogin',

  components: { LoginMenu },

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    login() {
      const payload = {
        email: this.email,
        password: this.password
      };

      this.$axios.post('v1/login', payload).then((response) => {
        const token = `${response.data.token_type} ${response.data.access_token}`;
        const expires = new Date(new Date().getTime() + 60 * 60 * 1000);

        Cookie.set('_todolist_token', token, { expires: expires });
      });
    },
  }
};
</script>