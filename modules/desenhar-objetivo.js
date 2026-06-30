import { ctx, mapa } from '../javascript/config.js';

// Função para desenhar o objetivo
export function desenharObjetivo() {
    // Calcula as coordenadas x e y do centro da célula do objetivo
    const x = mapa.objetivoPosicao.coluna * mapa.tamanhoCelula + mapa.tamanhoCelula / 2;
    const y = mapa.objetivoPosicao.linha * mapa.tamanhoCelula + mapa.tamanhoCelula / 2;
    // Desenha o círculo representando o objetivo
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2); // Círculo completo de 15 pixels
    ctx.fillStyle = '#2ecc71'; // Cor do círculo externo
    ctx.fill(); // Preenche o círculo com a cor definida
    // Desenha um círculo menor no centro do objetivo (alvo)
    ctx.beginPath();
    ctx.arc(x, y, 5, 0,Math.PI * 2); // Cículo completo de 5 pixels
    ctx.fillStyle = '#ffff'; // Cor do círculo interno
    ctx.fill(); // Preenche o círculo com a cor definida
}