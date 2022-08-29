export default {
    namespaced: true,

    state: () => {
        // user: { }
    },

    mutations: {
        /**
         * @param {*} state 
         * @param {*} user (payload)
         */
        STORE_USER(state, user) {
            state.user = user;
        },
    },

    actions: {},
};