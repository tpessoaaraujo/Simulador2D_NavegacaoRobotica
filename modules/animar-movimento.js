import { mapa, ctx } from '../javascript/config.js';
import { renderizarCena } from '../javascript/renderizar-cena.js';

// Função para animar o movimento do agente robótico
export function animarMovimentoRobo(caminho, passoAtual, renderizador, mostrarObjetivo, callback) {
    if (passoAtual < caminho.length) {
        // Atualiza a posição do agente no mapa
        mapa.agentePosicao.linha = caminho[passoAtual].linha;
        mapa.agentePosicao.coluna = caminho[passoAtual].coluna;
        // Renderiza a cena atualizada
        renderizarCena(caminho, mostrarObjetivo);
        // Chama a função novamente para o próximo passo após um pequeno atraso definido
        setTimeout(() => {
            requestAnimationFrame(() => animarMovimentoRobo(caminho, passoAtual + 1, renderizador, mostrarObjetivo, callback));
        }, 100);
        // Chama a função de callback quando o agente chega ao objetivo
    } else {
        console.log("O agente robótica chegou ao objetivo!");
        renderizador(caminho, false);
        setTimeout(callback, 2000);
    }
}