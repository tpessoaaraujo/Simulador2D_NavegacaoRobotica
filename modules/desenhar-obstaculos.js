import { ctx, tamanhoCelula, mapaMatriz } from '../javascript/config.js';

export function desenharObstaculos() {
    // Definindo a cor das paredes
    ctx.fillStyle = '#34495e';

    // Navegando por cada célula da matriz
    for (let linha = 0; linha < 10; linha++) {
        for (let coluna = 0; coluna < 10; coluna++) {

            // Se o valor na matriz for 1, desenha um obstáculo
            if (mapaMatriz[linha][coluna] === 1) {
                // Calculando a posição x e y no canvas
                const x = coluna * tamanhoCelula;
                const y = linha * tamanhoCelula;
                // Desenhando o quadrado preenchido (x, y, largura, altura)
                ctx.fillRect(x, y, tamanhoCelula, tamanhoCelula);
            }
        }
    }
}