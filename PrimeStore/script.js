const canvas = document.getElementById("particles-canvas");
  const ctx = canvas.getContext("2d");
  let particlesArray;


  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
      }
    }
    draw() {
      ctx.fillStyle = 'rgba(255, 0, 0)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    particlesArray = [];
    for (let i = 0; i < 80; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(particle => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animate);
  }

  init();
  animate();

  // Bloqueia o scroll lateral por toque
  window.addEventListener('scroll', function () {
    if (window.scrollX !== 0) {
      window.scrollTo(0, window.scrollY);
    }
  });

function mostrar(id) {
  document.querySelectorAll('section').forEach(section => {
    section.classList.remove('ativo');
  });
  document.getElementById(id).classList.add('ativo');
}

// Seleciona input e select
const searchInput = document.getElementById("searchInput");
const categoriaSelect = document.getElementById("categoriaSelect");

// Adiciona evento de digitação
searchInput.addEventListener("input", filtrarProdutos);
categoriaSelect.addEventListener("change", filtrarProdutos);

function filtrarProdutos() {
  let texto = searchInput.value.toLowerCase();
  let categoria = categoriaSelect.value;
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    let titulo = card.querySelector("h4").innerText.toLowerCase();
    let tagCategoria = card.querySelector("p").innerText.toLowerCase();

    let mostrar = false;

    if (categoria === "geral") {
      mostrar = titulo.includes(texto);
    } else {
      mostrar = titulo.includes(texto) && tagCategoria.includes(categoria);
    }

    card.style.display = mostrar ? "flex" : "none";
  });
}