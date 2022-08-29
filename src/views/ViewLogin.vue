<template>
  <div class="min-w-max" style="height: 300px;">
    <LoginMenu />

    <ValidationObserver ref="loginForm" tag="form" @submit.stop.prevent="login">
      <div class="grid gap-2">
        <ValidationProvider v-slot="{ errors }" rules="required|email" name="E-mail">
          <div class="flex flex-col">
            <input v-model="email" type="text" placeholder="Digite seu email"
              class="bg-gray-900 placeholder-gray-700 text-gray-500 font-normal border border-gray-900 text-center py-2 focus:outline-none focus:border-gray-700">
            <div v-if="!!errors[0]" class="py-1 text-red-500 text-xs font-normal mb-2">{{
                errors[0]
            }}
            </div>
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" rules="required|string" name="Senha">
          <div class="flex flex-col">
            <input v-model="password" type="password" placeholder="Digite sua senha"
              class="bg-gray-900 placeholder-gray-700 text-gray-500 font-normal border border-gray-900 text-center py-2 focus:outline-none focus:border-gray-700">
            <div v-if="!!errors[0]" class="py-1 text-red-500 text-xs font-normal mb-2">{{
                errors[0]
            }}
            </div>
          </div>
        </ValidationProvider>

        <button type="submit"
          class="block bg-blue-900 hover:bg-blue-800 py-2 text-gray-400 hover:text-gray-100 text-xs">
          ENTRAR
        </button>

        <div class="text-center py-2">
          <router-link to="/login">
            Esquecia a senha
          </router-link>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import LoginMenu from '@/components/auth/LoginMenu';
import Cookie from 'js-cookie';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'ViewLogin',

  components: { LoginMenu, ValidationObserver, ValidationProvider },

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    async login() {
      // validate with vee-validate
      const validator = await this.$refs.loginForm.validate();

      if (!validator)
        return;

      const payload = {
        email: this.email,
        password: this.password
      };

      this.$axios.post('v1/login', payload).then((response) => {
        const token = `${response.data.token_type} ${response.data.access_token}`;
        const expires = new Date(new Date().getTime() + 60 * 60 * 1000);

        Cookie.set('_todolist_token', token, { expires: expires });

        this.$store.commit('user/STORE_USER', response.data.data);
      });
    },
  }
};
</script>