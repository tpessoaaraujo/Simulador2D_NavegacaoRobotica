import { ctx, mapa } from '../javascript/config.js';

// Função para desenhar os obstáculos
export function desenharObstaculos() {
    // Cor dos obstáculos
    ctx.fillStyle = '#34495e';
    // Percorre uma a uma as linhas do mapa (matriz)
    for (let linha = 0; linha < mapa.linhas; linha++) {
        // Percorre uma a uma as colunas do mapa (matriz)
        for (let coluna = 0; coluna < mapa.colunas; coluna++) {
            // Verifica se a célula atual é um obstáculo (valor 1 na matriz)
            if (mapa.matriz[linha][coluna] === 1) {
                // Calcula as coordenadas x e y da célula com base na linha e coluna
                const x = coluna * mapa.tamanhoCelula;
                const y = linha * mapa.tamanhoCelula;
                // Desenha um retângulo preenchido representando o obstáculo
                ctx.fillRect(x, y, mapa.tamanhoCelula, mapa.tamanhoCelula);
            }
        }
    }
}