<template>
  <div class="mx-auto w-full md:w-3/5">
    <div class="mb-5">
      <h1 class="text-4xl text-gray-200">PERFIL</h1>
    </div>

    <div v-if="response.message" :class="`rounded-sm bg-${response.color}-100 p-4 mb-4`">
      <h3 :class="`text-sm leading-5 font-medium text-${response.color}-800`">
        {{ response.message }}
      </h3>
    </div>

    <ValidationObserver ref="profileForm" tag="form" @submit.stop.prevent="update">
      <div class="flex justify-center flex-wrap">

        <div class="mx-2 mb-5">
          <ValidationProvider v-slot="{errors}" rules="required" name="Nome" tag="div">
            <input v-model="firstName" type="text" class="border px-5 py-2 text-center"
              placeholder="Nome">
            <div v-if="!!errors[0]" class="text-red-500 text-sm mb-2">
              {{errors[0]}}
            </div>
          </ValidationProvider>
        </div>

        <div class="mx-2 mb-5">
          <input v-model="lastName" type="text" class="border px-5 py-2 text-center"
            placeholder="Sobrenome">
        </div>


        <div class="mx-2 mb-5">
          <ValidationProvider v-slot="{errors}" rules="required|email" name="Email"
            tag="div">
            <input v-model="email" type="email" class="border px-5 py-2 text-center"
              placeholder="Email">
            <div v-if="!!errors[0]" class="text-red-500 text-sm mb-2">
              {{errors[0]}}
            </div>
          </ValidationProvider>
        </div>

        <div class="mx-2 mb-5">
          <ValidationProvider v-slot="{errors}" rules="string" name="Senha" tag="div">
            <input v-model="password" type="password" class="border px-5 py-2 text-center"
              placeholder="Senha" autocomplete="new-password">
            <div v-if="!!errors[0]" class="text-red-500 text-sm mb-2">
              {{errors[0]}}
            </div>
          </ValidationProvider>
        </div>

        <div class="basis-full flex justify-center">
          <button type="submit" :disabled="spinner.update_user"
            class="flex justify-center items-center bg-blue-900 hover:bg-blue-800 px-5 py-2 text-gray-400 hover:text-gray-100 text-xs disabled:bg-blue-600">
            <img v-if="spinner.update_user" class="w-5 h-5 mr-2 animate-spin"
              src="@/assets/img/spinner.svg" alt="">

              Atualizar perfil
          </button>
        </div>

      </div>
    </ValidationObserver>

  </div>
</template>

<script>

import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { mapMutations, mapState } from 'vuex';
import messages from './../utils/messages';

export default {
  name: 'ProfileView',
  components: { ValidationObserver, ValidationProvider },

  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      response: {
        color: '',
        message: '',
      },
      spinner: {
        update_user: false
      }
    };
  },

  // mapeamento
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
  },

  created() {
    this.firstName = this.user.first_name;
    this.lastName = this.user.last_name;
    this.email = this.user.email;
  },

  methods: {
    ...mapMutations('user', ['STORE_USER']),

    async update() {
      const validator = await this.$refs.profileForm.validate();
      if (!validator) { return; }

      const payload = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
      };

      if (this.password) {
        payload.password = this.password;
      }

      this.spinner.update_user = true;
      this.$axios.put('v1/me', payload).then((response) => {
        this.response.color = 'green';
        this.response.message = 'Seus dados foram atualizados com sucesso';
      
        this.STORE_USER(response.data.data);
      }).catch((e) => {
        const errorCode = e?.response?.data?.error || 'ServerError';
        this.response.color = 'red';
        this.response.message = messages[errorCode];
      }).finally(() => {
        this.spinner.update_user = false;
      });
    },
  },
}
</script>
