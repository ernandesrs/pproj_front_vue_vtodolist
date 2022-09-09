<template>
    <header class="flex justify-between items-center px-5 bg-gray-900 text-gray-400">
        <h1 class="py-5 font-bold text-lg uppercase">
            Todo List
        </h1>

        <div>
            <router-link class="px-4 py-2" :to="{name: 'profile'}">
                Perfil
            </router-link>
            <router-link class="text-red-800 px-4 py-2" :to="{ name: 'logout' }">
                Sair
            </router-link>
        </div>
    </header>
</template>

<script>
export default {
    name: 'MainHeader'
};
</script>