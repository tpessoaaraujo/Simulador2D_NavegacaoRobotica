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
let mostrarObjetivo = true;

function renderizarCena(caminhoFinal = []) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    desenharGrade();
    desenharObstaculos();
    
    for (let i = 0; i < closedSet.length; i++) desenharNo(closedSet[i], 'red'); 
    for (let i = 0; i < openSet.length; i++) desenharNo(openSet[i], 'blue'); 
    for (let i = 0; i < caminhoFinal.length; i++) desenharNo(caminhoFinal[i], 'green');

    if (mostrarObjetivo) {
        desenharObjetivo();
    }

    desenharAgente();
}

function animarMovimentoRobo(caminho, passoAtual) {
    if (passoAtual < caminho.length) {
        // Atualiza as coordenadas do robô para o próximo passo do caminho
        agentePosicao.linha = caminho[passoAtual].linha;
        agentePosicao.coluna = caminho[passoAtual].coluna;
        
        // Renderiza a cena com a nova posição
        renderizarCena(caminho);
        
        // Define o atraso do movimento (200ms por passo, ajuste como preferir)
        setTimeout(() => {
            requestAnimationFrame(() => animarMovimentoRobo(caminho, passoAtual + 1));
        }, 200);
        
    } else {
        // Quando o passoAtual for igual ao tamanho do caminho, ele chegou ao fim
        console.log("Nham nham! O robô comeu o objetivo!");
        mostrarObjetivo = false; // Desativa a renderização do objetivo
        renderizarCena(caminho); // Renderiza uma última vez para a bolinha sumir
    }
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
            animarMovimentoRobo(caminho, 0); // Inicia a animação do movimento do robô
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
        return;
    }

    // Renderiza o estado atual do pensamento da IA
    renderizarCena();

    // Se a busca não terminou, pede ao navegador para rodar o próximo frame
    if (!buscaConcluida) {
        setTimeout(() => {
            requestAnimationFrame(loopPrincipal);
        }, 150)
    }
}

// 3. Dá a partida no motor do robô!
loopPrincipal();