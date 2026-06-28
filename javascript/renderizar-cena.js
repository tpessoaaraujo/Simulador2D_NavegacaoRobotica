import { desenharGrade, canvas, ctx, tamanhoCelula } from './desenhar-grade.js';
import { gerarObstaculos } from './gerar-obstaculos.js';
import { agenteRobotico } from './agente-robotico.js';
import { desenharObjetivo } from './estado-objetivo.js';

function renderizarCena() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenharGrade();
    gerarObstaculos();
    agenteRobotico();
    desenharObjetivo();
}

renderizarCena();