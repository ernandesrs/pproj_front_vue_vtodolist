<template>
    <div>
        <h2 class="text-center text-gray-500 text-lg font-semibold py-4">
            Resetar a senha
        </h2>

        <div v-if="response.message"
            :class="`rounded-sm bg-${response.color}-100 p-4 mb-4`">
            <h3 :class="`text-sm leading-5 font-medium text-${response.color}-800`">
                {{  response.message  }}
            </h3>
        </div>

        <ValidationObserver ref="resetPasswordForm" tag="form"
            @submit.stop.prevent="resetPassword">
            <div class="grid gap-2">
                <ValidationProvider v-slot="{ errors }" rules="required|email"
                    name="E-mail">
                    <div class="flex flex-col">
                        <input v-model="email" type="text" placeholder="Digite seu email"
                            class="bg-gray-900 placeholder-gray-700 text-gray-500 font-normal border border-gray-900 text-center py-2 focus:outline-none focus:border-gray-700">
                        <div v-if="!!errors[0]"
                            class="py-1 text-red-500 text-xs font-normal mb-2">{{
                             errors[0] 
                            }}
                        </div>
                    </div>
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" rules="required" name="Senha">
                    <div class="flex flex-col">
                        <input v-model="password" type="password"
                            placeholder="Digite sua senha"
                            class="bg-gray-900 placeholder-gray-700 text-gray-500 font-normal border border-gray-900 text-center py-2 focus:outline-none focus:border-gray-700">
                        <div v-if="!!errors[0]"
                            class="py-1 text-red-500 text-xs font-normal mb-2">{{
                             errors[0] 
                            }}
                        </div>
                    </div>
                </ValidationProvider>

                <button type="submit" :disabled="spinner.reset_password"
                    class="flex justify-center items-center bg-blue-900 hover:bg-blue-800 py-2 text-gray-400 hover:text-gray-100 text-xs disabled:bg-blue-600">
                    <img v-if="spinner.reset_password" class="w-5 h-5 mr-2 animate-spin"
                        src="@/assets/img/spinner.svg" alt="">

                    ALTERAR SENHA
                </button>
            </div>
        </ValidationObserver>
    </div>
</template>

<script>

import { ValidationProvider, ValidationObserver } from 'vee-validate';
import messages from '@/utils/messages';

export default {
    name: 'ResetPasswordView',

    components: { ValidationProvider, ValidationObserver },

    data() {
        return {
            email: '',
            password: '',
            token: '',
            response: {
                color: '',
                message: '',
            },
            spinner: {
                reset_password: false,
            }
        };
    },

    beforeRouteEnter(to, from, next) {
        if (!to?.query?.token) {
            next({ name: 'login' });
        }

        next();
    },

    created() {
        this.token = this.$route?.query?.token || '';
    },

    methods: {
        async resetPassword() {
            const validator = await this.$refs.resetPasswordForm.validate();

            if (!validator) {
                return;
            }

            const payload = {
                email: this.email,
                password: this.password,
                token: this.token
            };

            this.resetResponse();
            this.spinner.reset_password = true;

            this.$axios.post("v1/reset-password", payload).then(() => {
                this.response.color = "green";
                this.response.message = "Senha alterada com sucesso!";

                this.resetForm();
            }).catch((e) => {
                const errorCode = e?.response?.data?.error || "ServerError";
                this.response.color = "red";
                this.response.message = messages[errorCode];
            }).finally(() => {
                this.spinner.reset_password = false;
            });
        },

        resetResponse() {
            this.response.color = '';
            this.response.message = '';
        },

        resetForm() {
            this.$refs.resetPasswordForm.reset();
            this.email = '';
            this.password = '';
            this.token = '';
        },
    },
};
</script>