<template>
    <div>
        <MainHeader />

        <div class="px-5 py-10">
            <RouterView />
        </div>
    </div>
</template>

<script>
import MainHeader from '@/components/partials/MainHeader';

export default {
    name: 'LayoutDefault',

    components: { MainHeader },

    data() {
        return {};
    },

    methods: {},
};
</script>