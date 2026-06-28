export const canvas = document.getElementById('mapa');
export const ctx = canvas.getContext('2d');
export const tamanhoCelula = 50;

export const agentePosicao = { linha: 0, coluna: 0 };
export const objetivoPosicao = { linha: 0, coluna: 0 };
export let mapaMatriz = [];

function sortearPosicoes() {
    // Sorteia a posição do agente
    agentePosicao.linha = Math.floor(Math.random() * 10);
    agentePosicao.coluna = Math.floor(Math.random() * 10);

    // Sorteia a posição do objetivo, garantindo que não seja a mesma do agente
    let linhaObjetivo, colunaObjetivo;
    do {
        linhaObjetivo = Math.floor(Math.random() * 10);
        colunaObjetivo = Math.floor(Math.random() * 10);
    } while (linhaObjetivo === agentePosicao.linha && colunaObjetivo === agentePosicao.coluna);

    objetivoPosicao.linha = linhaObjetivo;
    objetivoPosicao.coluna = colunaObjetivo;
}

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

export function atualizarMapa() {
    sortearPosicoes();
    mapaMatriz = gerarMapaAleatorio();
}
atualizarMapa();