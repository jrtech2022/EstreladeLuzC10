/**
 * Script de redirecionamento otimizado
 * Redireciona automaticamente após 3 segundos
 */

(function() {
    'use strict';
    
    const REDIRECT_URL = 'Estreladeluz.html';
    const REDIRECT_DELAY = 3000; // 3 segundos
    
    // Função de redirecionamento
    function redirect() {
        window.location.href = REDIRECT_URL;
    }
    
    // Redireciona após o delay
    setTimeout(redirect, REDIRECT_DELAY);
    
    // Adiciona evento de clique no link manual
    document.addEventListener('DOMContentLoaded', function() {
        const redirectLink = document.querySelector('.redirect-link a');
        if (redirectLink) {
            redirectLink.addEventListener('click', function(e) {
                e.preventDefault();
                redirect();
            });
        }
    });
})();

