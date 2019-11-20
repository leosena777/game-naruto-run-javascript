/* developed by Leandro sena */

// variaveis do game
var canvas;
var  ctx;
var  ALTURA = window.innerHeight;
var  LARGURA = window.innerWidth;
var  frames=0;


function main(){
    if(LARGURA >=500){
        LARGURA = 600;
        ALTURA  = 600;
    }


    canvas = document.createElement("canvas");
    canvas.width = LARGURA;
    canvas.height = ALTURA;
    canvas.style.border = "1px solid #000";

    ctx = canvas.getContext("2d");
    document.addEventListener("mousedown", clique);
    document.body.appendChild(canvas);
    roda();
}

function clique(event){
    alert("click")
}

function roda(){
    console.log('running...')
    atualizar();
    desenhar();

    window.requestAnimationFrame(roda);
}


function atualizar(){
    frames++;
}

function desenhar(){
    ctx.fillStyle = "#50beff";
    ctx.fillRect(0,0,LARGURA,ALTURA);
}

main(); 