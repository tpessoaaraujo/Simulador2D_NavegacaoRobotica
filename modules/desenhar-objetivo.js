import { ctx, tamanhoCelula, agentePosicao } from '../javascript/config.js';

// Definimos a posição do objetivo no grid
let objetivoPosicao = { linha: 8, coluna: 8 };

// Desenhamos o objetivo no canvas
export function desenharObjetivo() {
    const x = objetivoPosicao.coluna * tamanhoCelula + tamanhoCelula / 2;
    const y = objetivoPosicao.linha * tamanhoCelula + tamanhoCelula / 2;
    const raio = 15;

    ctx.beginPath();
    ctx.arc(x, y, raio, 0, Math.PI * 2);
    ctx.fillStyle = '#2ecc71';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 5, 0,Math.PI * 2);
    ctx.fillStyle = '#ffff';
    ctx.fill();
}