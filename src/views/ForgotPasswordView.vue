<template>
    <div>
        <h2 class="text-center text-gray-500 text-lg font-semibold py-4">Esquecia a senha
        </h2>

        <div v-if="response.message"
            :class="`rounded-sm bg-${response.color}-100 p-4 mb-4`">
            <h3 :class="`text-sm leading-5 font-medium text-${response.color}-800`">
                {{  response.message  }}
            </h3>
        </div>

        <ValidationObserver ref="forgotPasswordForm" tag="form"
            @submit.stop.prevent="forgotPassword">
            <div class="grid gap-2">
                <ValidationProvider v-slot="{ errors }" rules="required|email"
                    name="E-mail">
                    <div class="flex flex-col">
                        <input v-model="email" type="email" placeholder="Digite seu email"
                            class="bg-gray-900 placeholder-gray-700 text-gray-500 font-normal border border-gray-900 text-center py-2 focus:outline-none focus:border-gray-700">
                        <div v-if="!!errors[0]"
                            class="py-1 text-red-500 text-xs font-normal mb-2">{{
                             errors[0] 
                            }}
                        </div>
                    </div>
                </ValidationProvider>

                <button type="submit" :disabled="spinner.forgot_password"
                    class="flex justify-center items-center bg-blue-900 hover:bg-blue-800 py-2 text-gray-400 hover:text-gray-100 text-xs disabled:bg-blue-600">
                    <img v-if="spinner.forgot_password" class="w-5 h-5 mr-2 animate-spin"
                        src="@/assets/img/spinner.svg" alt="">

                    RECUPERAR SENHA
                </button>

                <div class="text-center py-2">
                    <router-link to="/login">
                        Login
                    </router-link>
                </div>
            </div>
        </ValidationObserver>
    </div>
</template>

<script>

import { ValidationObserver, ValidationProvider } from 'vee-validate';
import messages from '@/utils/messages';

export default {
    name: 'ForgotPasswordView',

    components: { ValidationObserver, ValidationProvider },

    data() {
        return {
            email: '',
            response: {
                color: '',
                message: '',
            },
            spinner: {
                forgot_password: false,
            }
        };
    },

    methods: {
        async forgotPassword() {
            const validator = await this.$refs.forgotPasswordForm.validate();

            if (!validator) {
                return;
            }

            const payload = {
                email: this.email,
            }

            this.$axios.post("v1/forgot-password", payload).then(() => {
                this.response.color = 'green';
                this.response.message = 'Enviamos um email com instruções de recuperação :D!';
            }).catch((e) => {
                const errorCode = e?.response?.data?.error || 'ServerError';
                this.response.color = 'red';
                this.response.message = messages[errorCode];
            });
        }
    },
}
</script>