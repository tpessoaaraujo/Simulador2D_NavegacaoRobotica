// algoritmo-ia.js
import No from '../class/no.js';
import { mapa } from './config.js';

// Inicializa a memória
export let gridMemoria = [];
export let openSet = [];
export let closedSet = [];

export function inicializarIA() {
    gridMemoria = [];
    openSet = [];
    closedSet = [];

    for (let i = 0; i < mapa.linhas; i++) {
        gridMemoria[i] = [];
        for (let j = 0; j < mapa.colunas; j++) {
            gridMemoria[i][j] = new No(i, j);
        }
    }
    const noInicio = gridMemoria[mapa.agentePosicao.linha][mapa.agentePosicao.coluna];
    openSet.push(noInicio);
}

inicializarIA();

export function heuristicaManhattan(noAtual, noObjetivo) {
    const distanciaX = Math.abs(noAtual.coluna - noObjetivo.coluna);
    const distanciaY = Math.abs(noAtual.linha - noObjetivo.linha);
    return distanciaX + distanciaY;
}

export function obterVizinhosValidos(noAtual) {
    const vizinhos = [];
    const direcoes = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    for (let i = 0; i < direcoes.length; i++) {
        const novaLinha = noAtual.linha + direcoes[i][0];
        const novaColuna = noAtual.coluna + direcoes[i][1];

        const dentroDoGrid = novaLinha >= 0 && novaLinha < mapa.linhas && novaColuna >= 0 && novaColuna < mapa.colunas;

        if (dentroDoGrid && mapa.matriz[novaLinha][novaColuna] === 0) {
            vizinhos.push(gridMemoria[novaLinha][novaColuna]);
        }
    }
    return vizinhos;
}