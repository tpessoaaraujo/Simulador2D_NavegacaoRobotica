import { ctx, mapa } from '../javascript/config.js';

export function desenharAgente() {
    const x= mapa.agentePosicao.coluna * mapa.tamanhoCelula + mapa.tamanhoCelula / 2;
    const y= mapa.agentePosicao.linha * mapa.tamanhoCelula + mapa.tamanhoCelula / 2;
    const raio = 20;
    ctx.beginPath();
    ctx.arc(x, y, raio, 0, Math.PI * 2);
    ctx.fillStyle = '#3498db';
    ctx.fill();
}