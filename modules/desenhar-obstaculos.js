import { ctx, mapa } from '../javascript/config.js';

export function desenharObstaculos() {
    ctx.fillStyle = '#34495e';
    for (let linha = 0; linha < mapa.linhas; linha++) {
        for (let coluna = 0; coluna < mapa.colunas; coluna++) {
            if (mapa.matriz[linha][coluna] === 1) {
                const x = coluna * mapa.tamanhoCelula;
                const y = linha * mapa.tamanhoCelula;
                ctx.fillRect(x, y, mapa.tamanhoCelula, mapa.tamanhoCelula);
            }
        }
    }
}