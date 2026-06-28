import { desenharObstaculos } from '../modules/desenhar-obstaculos.js';
import { desenharObjetivo } from '../modules/desenhar-objetivo.js';
import { desenharAgente } from '../modules/desenhar-agente.js';
import { desenharNo } from '../modules/desenhar-no.js';
import { desenharGrade } from '../modules/desenhar-grade.js';
import { mapa, ctx, canvas } from './config.js';
import { closedSet, openSet } from './algoritmo-ia.js';

export function renderizarCena(caminhoFinal = [], mostrarObjetivo = true) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    desenharGrade();
    for (let i = 0; i < closedSet.length; i++) desenharNo(closedSet[i], 'red'); 
    for (let i = 0; i < openSet.length; i++) desenharNo(openSet[i], 'blue'); 
    for (let i = 0; i < caminhoFinal.length; i++) desenharNo(caminhoFinal[i], 'green');
    desenharObstaculos();
    if (mostrarObjetivo) {
        desenharObjetivo();
    }
    desenharAgente();
}