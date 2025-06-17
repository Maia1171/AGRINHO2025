// Definindo variáveis globais
let trator; // Agora é o nosso objeto trator
let plantas = []; // Corrigido: inicialização correta como array
let temperatura = 10;
let totalArvores = 0;

// Definição da classe Trator
class Trator {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocidade = 5;
    this.largura = 60;
    this.altura = 40;
  }

  atualizar() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.velocidade;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.velocidade;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.velocidade;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.velocidade;
    }

    // Limita o trator dentro da tela
    this.x = constrain(this.x, this.largura / 2, width - this.largura / 2);
    this.y = constrain(this.y, this.altura / 2, height - this.altura / 2);
  }

  mostrar() {
    push();
    translate(this.x, this.y);

    // Corpo do trator
    fill(150, 75, 0);
    rectMode(CENTER);
    rect(0, 0, this.largura, this.altura);

    // Cabine
    fill(100);
    rect(0, -this.altura / 2 - 10, this.largura * 0.6, this.altura * 0.5);

    // Rodas
    fill(50);
    circle(-this.largura / 3, this.altura / 2, 20);
    circle(this.largura / 3, this.altura / 2, 15);

    pop();
  }
}

// Classe Planta
class Planta {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tamanho = 10;
    this.cor = color(34, 139, 34);
  }

  mostrar() {
    fill(this.cor);
    rectMode(CENTER);
    rect(this.x, this.y, this.tamanho, this.tamanho * 2); // Tronco
    ellipse(this.x, this.y - this.tamanho, this.tamanho * 2, this.tamanho * 1.5); // Folhagem
    rectMode(CORNER);
  }
}

function setup() {
  createCanvas(600, 400);
  trator = new Trator(width / 2, height - 50);
}

function draw() {
  let corFundo = lerpColor(color(217, 112, 26), color(219, 239, 208),
    map(totalArvores, 0, 100, 0, 1));
  background(corFundo);

  mostrarInformacoes();

  temperatura += 0.01;

  trator.atualizar();
  trator.mostrar();

  verificarFimDeJogo();

  plantas.forEach((arvore) => arvore.mostrar());
}

function mostrarInformacoes() {
  textSize(16);
  fill(0);
  text(`Temperatura: ${temperatura.toFixed(1)}°C`, 10, 20);
  text(`Árvores Plantadas: ${totalArvores}`, 10, 40);
}

function verificarFimDeJogo() {
  // Ainda vazio — você pode adicionar condições como limite de árvores ou aumento de temperatura
}

function keyPressed() {
  if (key === ' ' && totalArvores < 100) {
    let novaPlanta = new Planta(trator.x, trator.y);
    plantas.push(novaPlanta);
    totalArvores++;
    console.log("Planta plantada! Total de árvores: " + totalArvores);
  }
}