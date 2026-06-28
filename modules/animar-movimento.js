import { mapa, ctx } from '../javascript/config.js';
import { renderizarCena } from '../javascript/renderizar-cena.js';

export function animarMovimentoRobo(caminho, passoAtual, renderizador, mostrarObjetivo, callback) {
    if (passoAtual < caminho.length) {
        mapa.agentePosicao.linha = caminho[passoAtual].linha;
        mapa.agentePosicao.coluna = caminho[passoAtual].coluna;
        renderizarCena(caminho, mostrarObjetivo);
        setTimeout(() => {
            requestAnimationFrame(() => animarMovimentoRobo(caminho, passoAtual + 1, renderizador, mostrarObjetivo, callback));
        }, 100);
    } else {
        console.log("O agente robótica chegou ao objetivo!");
        renderizador(caminho, false);
        setTimeout(callback, 2000);
    }
}