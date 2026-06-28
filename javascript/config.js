export const canvas = document.getElementById('mapa');
export const ctx = canvas.getContext('2d');
export const tamanhoCelula = 50;

export const agentePosicao = { linha: 2, coluna: 2 };
export const objetivoPosicao = { linha: 8, coluna: 8 };

function gerarMapaAleatorio() {
    const mapa = [];
    const linhas = 10;
    const colunas = 10;
    const chanceDeParede = 0.3; // 30% de chance de gerar uma parede

    for (let i = 0; i < linhas; i++) {
        let linhaAtual = [];
        for (let j = 0; j < colunas; j++) {
            if (Math.random() < chanceDeParede) {
                linhaAtual.push(1);
            } else {
                linhaAtual.push(0);
            }
        }
        mapa.push(linhaAtual);
    }
    // REGRA DE SEGURANÇA: Limpa a posição inicial e o objetivo
    // Isso garante que o robô não nasça dentro de uma parede e que o objetivo não seja um bloco de parede
    mapa[agentePosicao.linha][agentePosicao.coluna] = 0;
    mapa[objetivoPosicao.linha][objetivoPosicao.coluna] = 0;

    return mapa;
}

export let mapaMatriz = [];
export function atualizarMapa() {
    mapaMatriz = gerarMapaAleatorio();
}
atualizarMapa();