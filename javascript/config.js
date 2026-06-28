import Grid from '../class/grid.js';

export const canvas = document.getElementById('mapa');
export const ctx = canvas.getContext('2d');

export const mapa = new Grid(30, 30, 50); // 10 linhas, 10 colunas, tamanho da célula 50px

mapa.atualizar();

canvas.width = mapa.colunas * mapa.tamanhoCelula;
canvas.height = mapa.linhas * mapa.tamanhoCelula;