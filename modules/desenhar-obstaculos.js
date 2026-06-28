import { ctx, tamanhoCelula, agentePosicao } from '../javascript/config.js';

// Representação Matemática do Mapa (0 = livre, 1 = obstáculo)
export const mapaMatriz = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Linha 0
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0], // Linha 1 (Obstáculo simples)
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0], // Linha 2
    [0, 1, 1, 1, 0, 0, 0, 1, 0, 0], // Linha 3 (Muro em 'L')
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0], // Linha 4
    [0, 0, 0, 1, 0, 1, 1, 1, 1, 0], // Linha 5 (Bloqueio horizontal)
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Linha 6
    [0, 1, 1, 0, 0, 0, 1, 1, 0, 0], // Linha 7
    [0, 1, 1, 0, 0, 0, 1, 1, 0, 0], // Linha 8
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // Linha 9
];

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