export default class Grid {
    constructor(linhas, colunas, tamanhoCelula) {
        this.linhas = linhas;
        this.colunas = colunas;
        this.tamanhoCelula = tamanhoCelula;
        this.matriz = [];
        this.agentePosicao = { linha: 0, coluna: 0 };
        this.objetivoPosicao = { linha: 0, coluna: 0 };
    }

    sortearPosicoes() {
        this.agentePosicao.linha = Math.floor(Math.random() * this.linhas);
        this.agentePosicao.coluna = Math.floor(Math.random() * this.colunas);
        let objLinha, objColuna;
        do {
            objLinha = Math.floor(Math.random() * this.linhas);
            objColuna = Math.floor(Math.random() * this.colunas);
        } while (objLinha === this.agentePosicao.linha && objColuna === this.agentePosicao.coluna);
        this.objetivoPosicao.linha = objLinha;
        this.objetivoPosicao.coluna = objColuna;
    }

    gerarMatriz() {
        this.matriz = [];
        const chanceDeParede = 0.3; 
        for (let i = 0; i < this.linhas; i++) {
            let linhaAtual = [];
            for (let j = 0; j < this.colunas; j++) {
                linhaAtual.push(Math.random() < chanceDeParede ? 1 : 0);
            }
            this.matriz.push(linhaAtual);
        }
        this.matriz[this.agentePosicao.linha][this.agentePosicao.coluna] = 0;
        this.matriz[this.objetivoPosicao.linha][this.objetivoPosicao.coluna] = 0;
    }

    atualizar() {
        this.sortearPosicoes();
        this.gerarMatriz();
    }
}