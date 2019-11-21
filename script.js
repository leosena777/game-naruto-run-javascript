/* developed by Leandro sena */

// variaveis do game
var canvas;
var  ctx;
var  ALTURA = window.innerHeight;
var  LARGURA = window.innerWidth;
var  frames=0;
var maxPulos = 2;
var velocidade = 6;
var estadoAtual;

var estados = {
    jogar: 0,
    jogando: 1,
    perdeu: 2
}

// objetos

var chao = {
    y:550,
    altura:50,
    cor:"#e8da78",
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
    cor:"#ff9239",
    gravidade: 1.6,
    velocidade: 0,
    forcaDoPulo:23.5,
    qntPulos:0,
    atualizar: function(){
        this.velocidade+= this.gravidade;
        this.y += this.velocidade;
        
        if(this.y > chao.y - this.altura && estadoAtual != estados.perdeu ){
            this.y = chao.y - this.altura;
            this.qntPulos = 0;
            this.velocidade = 0;
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

obstaculos = {
    _obs: [],
    cores:["#ffbc1c","#ff85e1","#52a7ff"],
    tempoInsere: 0,
    auxTempoInsere:40,
    insere:function(){
        this._obs.push({
            x:LARGURA,
            largura:30 + Math.floor(20 * Math.random()),
            altura: 30 + Math.floor(120*Math.random()),
            cor: this.cores[Math.floor(this.cores.length * Math.random())]
        })

        this.tempoInsere = 40 + Math.floor(20*Math.random());
    },
    atualizar:function(){
        if(this.tempoInsere == 0){
            this.insere();
        }else{
            this.tempoInsere--;
        }

        for(var i = 0, tam = this._obs.length; i <tam;i++){
            var obs = this._obs[i];
            obs.x -= velocidade; 
            if( 
                bloco.x < obs.x + obs.largura 
                && bloco.x + bloco.largura >= obs.x
                && bloco.y + bloco.altura >= chao.y - obs.altura
            ){
                estadoAtual = estados.perdeu;
            }else if(obs.x <= -obs.largura ){
                this._obs.splice(i,1);
                tam--;
                i--;
            }
        }
    },
    limpar(){
        this._obs = [];
    },
    desenha: function(){
        for(var i = 0, tam = this._obs.length; i <tam;i++){
            var obs = this._obs[i];
            ctx.fillStyle = obs.cor;
            ctx.fillRect(obs.x, chao.y - obs.altura, obs.largura, obs.altura);
        }
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
    
    estadoAtual = estados.jogar;
    
    roda();
}

function clique(){
    if(estadoAtual == estados.jogando){
        bloco.pula();
    }else if(estadoAtual == estados.jogar){
        estadoAtual = estados.jogando;
    }else if(estadoAtual == estados.perdeu && bloco.y >= 2* ALTURA){
        estadoAtual = estados.jogar;
        bloco.y = 0;
        bloco.velocidade = 0;
    }
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
    if(estadoAtual == estados.jogando){
        obstaculos.atualizar();
    }else if(estadoAtual == estados.perdeu){
        obstaculos.limpar();
    }
}

function desenhar(){
    ctx.fillStyle = "#80eaff";
    ctx.fillRect(0,0,LARGURA,ALTURA);

    if(estadoAtual == estados.jogar){
        ctx.fillStyle = "#0f0";
        ctx.fillRect(LARGURA/2 -50, ALTURA/2 -50, 100,100);
    }else if(estadoAtual == estados.perdeu){
        ctx.fillStyle = "#f00";
        ctx.fillRect(LARGURA/2 -50, ALTURA/2 -50, 100,100);
    }else if(estadoAtual == estados.jogando){
        obstaculos.desenha();
     
    }
        chao.desenhar();   
        bloco.desenhar();
}

main(); 