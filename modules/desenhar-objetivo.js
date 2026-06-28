import { ctx, tamanhoCelula, agentePosicao, objetivoPosicao } from '../javascript/config.js';

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