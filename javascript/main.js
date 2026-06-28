import { mapa, ctx, canvas } from './config.js';
import { gridMemoria, openSet, closedSet, heuristicaManhattan, obterVizinhosValidos, inicializarIA } from './algoritmo-ia.js';
import { animarMovimentoRobo } from '../modules/animar-movimento.js';
import {renderizarCena} from './renderizar-cena.js'

let buscaConcluida = false;
let mostrarObjetivo = true;
let noObjetivo = gridMemoria[mapa.objetivoPosicao.linha][mapa.objetivoPosicao.coluna];

function reiniciarSimulacao() {
    mapa.atualizar();
    inicializarIA();
    noObjetivo = gridMemoria[mapa.objetivoPosicao.linha][mapa.objetivoPosicao.coluna];
    buscaConcluida = false;
    mostrarObjetivo = true;
    console.log("Reiniciando a aplicação... Novo mapa e posições gerados aleatoriamente!");
    loopPrincipal();
}

function loopPrincipal() {
    if (openSet.length > 0) {
        let menorIndice = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[menorIndice].f) {
                menorIndice = i;
            }
        }
        let noAtual = openSet[menorIndice];
        if (noAtual === noObjetivo) {
            buscaConcluida = true;
            console.log("Caminho encontrado! Iniciando a locomoção do agente robótico...");
            let caminho = [];
            let temp = noAtual;
            while (temp.pai) {
                caminho.push(temp);
                temp = temp.pai;
            }
            caminho.reverse();
            animarMovimentoRobo(caminho, 0, renderizarCena, mostrarObjetivo, reiniciarSimulacao);
            return;
        }
        const indexOpen = openSet.indexOf(noAtual);
        if (indexOpen > -1) {
            openSet.splice(indexOpen, 1); 
        }
        closedSet.push(noAtual);
        let vizinhos = obterVizinhosValidos(noAtual);
        for (let i = 0; i < vizinhos.length; i++) {
            let vizinho = vizinhos[i];
            if (!closedSet.includes(vizinho)) {
                let tempG = noAtual.g + 1; 
                let encontrouCaminhoMelhor = false;
                if (openSet.includes(vizinho)) {
                    if (tempG < vizinho.g) {
                        vizinho.g = tempG;
                        encontrouCaminhoMelhor = true;
                    }
                } else {
                    vizinho.g = tempG;
                    openSet.push(vizinho);
                    encontrouCaminhoMelhor = true;
                }
                if (encontrouCaminhoMelhor) {
                    vizinho.h = heuristicaManhattan(vizinho, noObjetivo);
                    vizinho.f = vizinho.g + vizinho.h;
                    vizinho.pai = noAtual;
                }
            }
        }
    } else {
        console.log("Sem solução. O agente robótico está preso!");
        buscaConcluida = true;
        renderizarCena();
        setTimeout(reiniciarSimulacao, 2000);
        return;
    }
    renderizarCena();
    if (!buscaConcluida) {
        setTimeout(() => {
            requestAnimationFrame(loopPrincipal);
        }, 100)
    }
}

loopPrincipal();