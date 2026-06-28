import { ctx, canvas, mapa } from '../javascript/config.js';

export function desenharGrade() {
    // Definindo a cor e a largura da linha da grade
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;

    // Desenhando as linhas verticais
    for (let x = 0; x <= canvas.width; x += mapa.tamanhoCelula) {
        ctx.beginPath(); // Inicia um novo traço
        ctx.moveTo(x, 0); // Move para o ponto inicial da linha
        ctx.lineTo(x, canvas.height); // Desenha a linha até o ponto final
        ctx.stroke(); // Aplica o desenho na tela
    }

    // Desenhando as linhas horizontais
    for (let y = 0; y <= canvas.height; y += mapa.tamanhoCelula) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}