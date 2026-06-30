import Grid from '../class/grid.js';

// Configuração do canvas e do contexto de renderização
export const canvas = document.getElementById('mapa');
export const ctx = canvas.getContext('2d');
export const mapa = new Grid(15, 15, 50);

// Atualiza o tamanho do canvas com base nas dimensões do mapa
mapa.atualizar();
canvas.width = mapa.colunas * mapa.tamanhoCelula;
canvas.height = mapa.linhas * mapa.tamanhoCelula;