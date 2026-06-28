import { ctx, tamanhoCelula, agentePosicao } from '../javascript/config.js';

export function desenharNo(no, cor) {
    const x = no.coluna * tamanhoCelula;
    const y = no.linha * tamanhoCelula;
    ctx.fillStyle = cor;
    ctx.fillRect(x, y, tamanhoCelula, tamanhoCelula);
    ctx.strokeStyle = '#e0e0e0';
    ctx.strokeRect(x, y, tamanhoCelula, tamanhoCelula);
}