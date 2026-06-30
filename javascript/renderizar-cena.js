import { desenharObstaculos } from '../modules/desenhar-obstaculos.js';
import { desenharObjetivo } from '../modules/desenhar-objetivo.js';
import { desenharAgente } from '../modules/desenhar-agente.js';
import { desenharNo } from '../modules/desenhar-no.js';
import { desenharGrade } from '../modules/desenhar-grade.js';
import { mapa, ctx, canvas } from './config.js';
import { closedSet, openSet } from './algoritmo-ia.js';

// Função para renderizar a cena do simulador
export function renderizarCena(caminhoFinal = [], mostrarObjetivo = true) {
    // Limpa o canvas antes de desenhar a nova cena
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    desenharGrade();
    // Desenha os nós do caminho fechado
    for (let i = 0; i < closedSet.length; i++) desenharNo(closedSet[i], 'red'); 
    // Desenha os nós do caminho aberto
    for (let i = 0; i < openSet.length; i++) desenharNo(openSet[i], 'blue'); 
    // Desenha o caminho final encontrado
    for (let i = 0; i < caminhoFinal.length; i++) desenharNo(caminhoFinal[i], 'green');
    desenharObstaculos();
    // Desenha o objetivo se a flag mostrarObjetivo estiver ativada
    if (mostrarObjetivo) desenharObjetivo();
    desenharAgente();
}