<template>
    <div class="w-screen h-screen flex items-center justify-center">
        <div class="w-full sm:w-1/3 xl:w-1/4 mx-auto px-6">
            <RouterView />
        </div>
    </div>
</template>

<script>
export default {
    name: 'LayoutAuth',

    data() {
        return {};
    },

    methods: {},
};
</script>