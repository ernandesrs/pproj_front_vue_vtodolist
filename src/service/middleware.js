/**
 * 
 * Este arquivo é responsável por ficar entre o acesso à uma rota e o processo
 * de renderização de view. Ele contém funções que aplica o processamento de
 * alguma lógica antes de renderizar uma view.
 * Algo como os middlewares do Laravel
 * 
 */

import Cookie from 'js-cookie';

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
        const token = Cookie.get("_todolist_token");

        if (token) {
            // redireciona para nova rota
            next({ name: 'index' });
        }

        // mantem rota atual
        next(); 
    },
};