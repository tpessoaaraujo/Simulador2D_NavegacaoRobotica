import { ctx, mapa } from '../javascript/config.js';

// Desenhamos o agente no canvas
export function desenharAgente() {
    // Calculando a posição x e y no canvas para centralizar o agente na célula
    const x= mapa.agentePosicao.coluna * mapa.tamanhoCelula + mapa.tamanhoCelula / 2;
    const y= mapa.agentePosicao.linha * mapa.tamanhoCelula + mapa.tamanhoCelula / 2;

    // Raio do agente robótico
    const raio = 20;

    // Desenhando o agente como um círculo
    ctx.beginPath();
    ctx.arc(x, y, raio, 0, Math.PI * 2); // Círculo completo
    ctx.fillStyle = '#3498db'; // Cor do agente
    ctx.fill();
}