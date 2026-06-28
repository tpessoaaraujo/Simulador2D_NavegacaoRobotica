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
    
    console.log("Novo mapa e posições gerados! Reiniciando...");
    loopPrincipal();
}

function loopPrincipal() {
    // Se ainda há caminhos para explorar
    if (openSet.length > 0) {
        
        // 1. Encontra o nó no openSet com o menor custo 'f'
        let menorIndice = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[menorIndice].f) {
                menorIndice = i;
            }
        }
        
        let noAtual = openSet[menorIndice];

        // 2. Verifica se o robô chegou ao destino!
        if (noAtual === noObjetivo) {
            buscaConcluida = true;
            console.log("Caminho encontrado! Iniciando a locomoção...");
            
            // Refaz o caminho de volta usando os "pais"
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

        // 3. Move o noAtual do openSet para o closedSet manipulando os arrays diretamente
        const indexOpen = openSet.indexOf(noAtual);
        if (indexOpen > -1) {
        // Remove 1 item a partir da posição indexOpen (modifica o array original)
            openSet.splice(indexOpen, 1); 
        }
        // Adiciona ao closedSet (modifica o array original)
        closedSet.push(noAtual);

        // 4. Analisa os vizinhos do nó atual
        let vizinhos = obterVizinhosValidos(noAtual);
        
        for (let i = 0; i < vizinhos.length; i++) {
            let vizinho = vizinhos[i];

            // Ignora o vizinho se ele já foi avaliado
            if (!closedSet.includes(vizinho)) {
                
                // O custo de mover para um vizinho é sempre 1 no nosso grid
                let tempG = noAtual.g + 1; 
                let encontrouCaminhoMelhor = false;

                // Se o vizinho já foi descoberto antes, verificamos se este novo caminho é mais curto
                if (openSet.includes(vizinho)) {
                    if (tempG < vizinho.g) {
                        vizinho.g = tempG;
                        encontrouCaminhoMelhor = true;
                    }
                } else {
                    // Se é a primeira vez vendo este vizinho, adiciona ao openSet
                    vizinho.g = tempG;
                    openSet.push(vizinho);
                    encontrouCaminhoMelhor = true;
                }

                // Se encontramos um caminho novo ou mais eficiente, atualizamos a matemática
                if (encontrouCaminhoMelhor) {
                    vizinho.h = heuristicaManhattan(vizinho, noObjetivo);
                    vizinho.f = vizinho.g + vizinho.h;
                    vizinho.pai = noAtual; // Grava de onde viemos para refazer a rota no final
                }
            }
        }
        
    } else {
        // Se o openSet esvaziar e não acharmos o objetivo, o robô está preso
        console.log("Sem solução. O robô está preso!");
        buscaConcluida = true;
        renderizarCena();
        setTimeout(reiniciarSimulacao, 2000);
        return;
    }

    // Renderiza o estado atual do pensamento da IA
    renderizarCena();

    // Se a busca não terminou, pede ao navegador para rodar o próximo frame
    if (!buscaConcluida) {
        setTimeout(() => {
            requestAnimationFrame(loopPrincipal);
        }, 100)
    }
}

// 3. Dá a partida no motor do robô!
loopPrincipal();