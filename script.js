/* developed by Leandro sena */

// variaveis do game
var canvas;
var  ctx;
var  ALTURA = window.innerHeight;
var  LARGURA = window.innerWidth;
var  frames=0;
var maxPulos = 3;

// objetos

var chao = {
    y:550,
    altura:50,
    cor:"#ffdf70",
    desenhar: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(0,this.y, LARGURA, this.altura);
    }
};

var bloco = {
    x:50,
    y:0,
    altura:50,
    largura:50,
    cor:"#ff4e4e",
    gravidade: 1.5,
    velocidade: 0,
    forcaDoPulo:20,
    qntPulos:0,
    atualizar: function(){
        this.velocidade+= this.gravidade;
        this.y += this.velocidade;
        
        if(this.y > chao.y - this.altura){
            this.y = chao.y - this.altura;
            this.qntPulos = 0;
        }
    },
    pula:function(){
        if(this.qntPulos < maxPulos){
            this.velocidade = -this.forcaDoPulo;
            this.qntPulos++;
        }
    },
    desenhar: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x,this.y,this.largura,this.altura);
    }
}


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
    bloco.pula();
}

function roda(){
    console.log('running...')
    atualizar();
    desenhar();

    window.requestAnimationFrame(roda);
}


function atualizar(){
    frames++;
    bloco.atualizar();
}

function desenhar(){
    ctx.fillStyle = "#50beff";
    ctx.fillRect(0,0,LARGURA,ALTURA);

    chao.desenhar();
    bloco.desenhar();
}

main(); 