export default class No {
    constructor(linha, coluna) {
        this.linha = linha;
        this.coluna = coluna;
        this.g = 0;
        this.h = 0;
        this.f = 0;
        this.pai = null;
    }
}