import { ctx, mapa } from '../javascript/config.js';

export function desenharObstaculos() {
    // Definindo a cor das paredes
    ctx.fillStyle = '#34495e';

    // Navegando por cada célula da matriz
    for (let linha = 0; linha < mapa.linhas; linha++) {
        for (let coluna = 0; coluna < mapa.colunas; coluna++) {

            // Se o valor na matriz for 1, desenha um obstáculo
            if (mapa.matriz[linha][coluna] === 1) {
                // Calculando a posição x e y no canvas
                const x = coluna * mapa.tamanhoCelula;
                const y = linha * mapa.tamanhoCelula;
                // Desenhando o quadrado preenchido (x, y, largura, altura)
                ctx.fillRect(x, y, mapa.tamanhoCelula, mapa.tamanhoCelula);
            }
        }
    }
}