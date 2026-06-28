import { mapa, ctx } from '../javascript/config.js';
import { renderizarCena } from '../javascript/renderizar-cena.js';

export function animarMovimentoRobo(caminho, passoAtual, renderizador, mostrarObjetivo, callback) {
    if (passoAtual < caminho.length) {
        // Atualiza as coordenadas do robô para o próximo passo do caminho
        mapa.agentePosicao.linha = caminho[passoAtual].linha;
        mapa.agentePosicao.coluna = caminho[passoAtual].coluna;
        
        // Renderiza a cena com a nova posição
        renderizarCena(caminho, mostrarObjetivo);
        
        // Define o atraso do movimento (200ms por passo, ajuste como preferir)
        setTimeout(() => {
            requestAnimationFrame(() => animarMovimentoRobo(caminho, passoAtual + 1, renderizador, mostrarObjetivo, callback));
        }, 100);
    
    } else {
        console.log("Nham nham! O robô comeu o objetivo!");
        renderizador(caminho, false);
        setTimeout(callback, 2000);
    }
}