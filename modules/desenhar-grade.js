import { ctx, canvas, mapa } from '../javascript/config.js';

// Função para desenhar a grade
export function desenharGrade() {
    // Define a cor e a largura da linha da grade
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    // Desenha as linhas verticais da grade
    for (let x = 0; x <= canvas.width; x += mapa.tamanhoCelula) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    // Desenha as linhas horizontais da grade
    for (let y = 0; y <= canvas.height; y += mapa.tamanhoCelula) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}