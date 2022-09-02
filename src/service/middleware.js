/**
 * 
 * Este arquivo é responsável por ficar entre o acesso à uma rota e o processo
 * de renderização de view. Ele contém funções que aplica o processamento de
 * alguma lógica antes de renderizar uma view.
 * Algo como os middlewares do Laravel
 * 
 */

import Cookie from '@/service/cookie';
import axios from 'axios';

export default {
    /**
     * Realiza o redirecionamento do usuário para área logada(rota index)
     * caso haja no cookie um token de autenticação e o usuário esteja acessando
     * uma view para usuários não logados.
     * 
     * @param {*} to 
     * @param {*} from 
     * @param {*} next 
     */
    redirectIfAuthenticated(to, from, next) {
        const token = Cookie.getToken();
        let route;

        if (token) {
            route = { name: 'index' };
        }

        // redireciona para rota definida
        next(route);
    },

    /**
     * Realiza o redirecionamento do usuário para login(rota login)
     * caso não haja no cookie um token de autenticação e o usuário esteja acessando
     * uma view para usuários logados.
     * @param {*} to 
     * @param {*} from 
     * @param {*} next 
     */
    redirectIfUnauthenticated(to, from, next) {
        const token = Cookie.getToken();
        let route;

        if (!token) {
            route = { name: 'login' };
        }

        axios.get("v1/me").catch(() => {
            Cookie.deleteToken();
            route = { name: 'login' };
        });

        // redireciona para rota definida
        next(route);
    }
};