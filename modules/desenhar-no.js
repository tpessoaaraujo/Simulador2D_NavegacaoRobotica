import { ctx, mapa } from '../javascript/config.js';

// Função para desenhar os nós
export function desenharNo(no, cor) {
    // Calcula as coordenadas x e y da célula com base na linha e coluna do nó
    const x = no.coluna * mapa.tamanhoCelula;
    const y = no.linha * mapa.tamanhoCelula;
    ctx.fillStyle = cor;
    ctx.fillRect(x, y, mapa.tamanhoCelula, mapa.tamanhoCelula);
    ctx.strokeStyle = '#e0e0e0';
    ctx.strokeRect(x, y, mapa.tamanhoCelula, mapa.tamanhoCelula);
}