const telaLista = document.getElementById("tela-lista");
const telaDetalhes = document.getElementById("tela-detalhes");
const telaContato = document.getElementById("tela-contato");
const detalhesProduto = document.getElementById("detalhes-produto");

async function carregarPorCategoria(categoria) {
  const url = "../json/produtos.json";
  const resposta = await fetch(url);
  const dados = await resposta.json();
  let produtos = dados.produtos;

  if (categoria !== "todos") {
    produtos = produtos.filter(produto => produto.category === categoria);
  }

  telaLista.innerHTML = "";
  produtos.forEach(produto => {
    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = `
      <div class="card h-100" onclick="abrirDetalhes(${produto.id})">
        <img src="${produto.image}" class="card-img-top p-3" style="height:250px; object-fit:contain;">
        <div class="card-body">
          <h5 class="card-title">${produto.title}</h5>
          <p class="card-text">R$ ${produto.price.toFixed(2)}</p>
        </div>
      </div>
    `;
    telaLista.appendChild(card);
  });

  telaContato.classList.replace("show", "collapse");
  telaDetalhes.classList.replace("show", "collapse");
  telaLista.classList.replace("collapse", "show");
}

async function abrirDetalhes(id) {
  const resposta = await fetch("../json/produtos.json");
  const dados = await resposta.json();
  const p = dados.produtos.find(produto => produto.id === id);

  if (!p) {
    alert("Produto não encontrado.");
    return;
  }

  detalhesProduto.innerHTML = `
    <div class="row g-3">
      <div class="col-md-4 text-center">
        <img src="${p.image}" class="img-fluid" alt="${p.title}">
      </div>
      <div class="col-md-8">
        <h2>${p.title}</h2>
        <p><strong>Categoria:</strong> ${p.category}</p>
        <p><strong>Preço:</strong> R$ ${p.price.toFixed(2)}</p>
        <p><strong>Descrição:</strong> ${p.description}</p>
        <p><strong>Avaliação:</strong> ${p.rating.rate} ⭐ (${p.rating.count} avaliações)</p>
      </div>
    </div>
  `;

  telaLista.classList.replace("show", "collapse");
  telaContato.classList.replace("show", "collapse");
  telaDetalhes.classList.replace("collapse", "show");
}

function mostrarContato() {
  telaLista.classList.remove("show");
  telaLista.classList.add("collapse");

  telaDetalhes.classList.remove("show");
  telaDetalhes.classList.add("collapse");

  telaContato.classList.remove("collapse");
  telaContato.classList.add("show");
}

function voltar() {
  telaDetalhes.classList.remove("show");
  telaDetalhes.classList.add("collapse");

  telaContato.classList.remove("show");
  telaContato.classList.add("collapse");

  telaLista.classList.remove("collapse");
  telaLista.classList.add("show");
}

document.addEventListener("DOMContentLoaded", () => {
  carregarPorCategoria('todos');
});