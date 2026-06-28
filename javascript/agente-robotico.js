import { ctx, tamanhoCelula } from './desenhar-grade.js';

// Definimos a posição inicial do agente no grid
let agentePosicao = { linha: 0, coluna: 0};

// Desenhamos o agente no canvas
export function agenteRobotico() {
    // Calculando a posição x e y no canvas para centralizar o agente na célula
    const x= agentePosicao.coluna * tamanhoCelula + tamanhoCelula / 2;
    const y= agentePosicao.linha * tamanhoCelula + tamanhoCelula / 2;

    // Raio do agente robótico
    const raio = 20;

    // Desenhando o agente como um círculo
    ctx.beginPath();
    ctx.arc(x, y, raio, 0, Math.PI * 2); // Círculo completo
    ctx.fillStyle = '#3498db'; // Cor do agente
    ctx.fill();
}