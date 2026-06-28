import Grid from '../class/grid.js';

export const canvas = document.getElementById('mapa');
export const ctx = canvas.getContext('2d');
export const mapa = new Grid(15, 15, 50);

mapa.atualizar();
canvas.width = mapa.colunas * mapa.tamanhoCelula;
canvas.height = mapa.linhas * mapa.tamanhoCelula;