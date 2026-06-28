// algoritmo-ia.js
import No from '../class/no.js';
import { mapaMatriz } from './config.js';

// Inicializa a memória
export const gridMemoria = [];
for (let i = 0; i < 10; i++) {
    gridMemoria[i] = [];
    for (let j = 0; j < 10; j++) {
        gridMemoria[i][j] = new No(i, j);
    }
}

export let openSet = [];
export let closedSet = [];

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

        const dentroDoGrid = novaLinha >= 0 && novaLinha < 10 && novaColuna >= 0 && novaColuna < 10;

        if (dentroDoGrid && mapaMatriz[novaLinha][novaColuna] === 0) {
            vizinhos.push(gridMemoria[novaLinha][novaColuna]);
        }
    }
    return vizinhos;
}