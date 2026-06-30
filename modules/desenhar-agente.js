import { ctx, mapa } from '../javascript/config.js';

// Função para desenhar o agente robótico
export function desenharAgente() {
    // Calcula as coordenadas x e y do centro da célula onde o agente está localizado
    const x= mapa.agentePosicao.coluna * mapa.tamanhoCelula + mapa.tamanhoCelula / 2;
    const y= mapa.agentePosicao.linha * mapa.tamanhoCelula + mapa.tamanhoCelula / 2;
    // Desenha um círculo representando o agente
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2); // Desenha um círculo com raio de 20 pixels
    ctx.fillStyle = '#3498db'; // Define a cor de preenchimento do agente
    ctx.fill(); // Preenche o círculo com a cor definida
}