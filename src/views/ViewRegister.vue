<template>
  <div class="min-w-max" style="height: 300px;">
    <LoginMenu />

    <div class="grid gap-2">
      <input type="text" placeholder="Digite seu email"
        class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 text-center py-2 focus:outline-none focus:border-gray-700">

      <input type="text" placeholder="Digite sua senha"
        class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 text-center py-2 focus:outline-none focus:border-gray-700">

      <button class="block bg-blue-900 hover:bg-blue-800 py-2 text-gray-400 hover:text-gray-100 text-xs">
        REGISTRAR
      </button>
    </div>
  </div>
</template>

<script>
import LoginMenu from '@/components/auth/LoginMenu';

export default {
  name: 'ViewLogin',

  components: { LoginMenu },

  data() {
    return {
    };
  },

  methods: {}
};
</script>