// main.js
import { agentePosicao, objetivoPosicao } from './config.js';
import { gridMemoria, openSet, closedSet, heuristicaManhattan, obterVizinhosValidos } from './algoritmo-ia.js';

// Importe suas funções de desenho aqui
import { desenharGrade } from '../modules/desenhar-grade.js';
import { desenharObstaculos } from '../modules/desenhar-obstaculos.js';
import { desenharObjetivo } from '../modules/desenhar-objetivo.js';
import { desenharAgente } from '../modules/desenhar-agente.js';
import { desenharNo } from '../modules/desenhar-no.js';
import { ctx, canvas } from '../javascript/config.js';

const noInicio = gridMemoria[agentePosicao.linha][agentePosicao.coluna];
const noObjetivo = gridMemoria[objetivoPosicao.linha][objetivoPosicao.coluna];

openSet.push(noInicio);
let buscaConcluida = false;

function renderizarCena(caminhoFinal = []) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    desenharGrade();
    desenharObstaculos();

    for (let i = 0; i < closedSet.length; i++) desenharNo(closedSet[i], '#ffbaba'); 
    for (let i = 0; i < openSet.length; i++) desenharNo(openSet[i], '#baffc9'); 
    for (let i = 0; i < caminhoFinal.length; i++) desenharNo(caminhoFinal[i], '#ffdfba');

    desenharObjetivo();
    desenharAgente();
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
            console.log("Objetivo alcançado!");
            
            // Refaz o caminho de volta usando os "pais"
            let caminho = [];
            let temp = noAtual;
            while (temp.pai) {
                caminho.push(temp);
                temp = temp.pai;
            }
            
            // Renderiza a tela uma última vez mostrando o caminho vitorioso
            renderizarCena(caminho);
            return; // Encerra a animação
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
        return;
    }

    // Renderiza o estado atual do pensamento da IA
    renderizarCena();

    // Se a busca não terminou, pede ao navegador para rodar o próximo frame
    if (!buscaConcluida) {
        requestAnimationFrame(loopPrincipal);
    }
}

// 3. Dá a partida no motor do robô!
loopPrincipal();