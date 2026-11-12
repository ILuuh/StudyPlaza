const caminhoImagens = new URL("../../assets/img/", import.meta.url);

const imagens = {
  cartoonBianca: "CartoonBianca.png",
  cartoonLuiz: "CartoonLuiz.png",
  elfaChat: "Elfa-chat.png",
  elfaEstudando: "ElfaEstudando.png",
  elfaEstudando2: "ElfaEstudando2.png",
  icone: "icon-7797704_1280.png",
  iconeSvg: "icon.svg",
  logoFundoRoxa: "Logo_Fundo_Roxa.png",
  logoRoxa: "logo_roxa.png",
  logo: "Logo.svg",
  lupa: "lupa-.svg",
  lupaMais: "lupa+.svg",
};

function carregarImagem(idElemento, nomeArquivo, textoAlternativo = "") {
  const imagem = document.getElementById(idElemento);

  // Se o elemento não existir nesta página, não faz nada.
  if (!imagem) return;

  imagem.src = new URL(nomeArquivo, caminhoImagens).href;
  imagem.alt = textoAlternativo;

  imagem.onerror = () => {
    console.error(`Não foi possível carregar a imagem: ${nomeArquivo}`);
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const elementos = [
    ["cartoon-bianca", imagens.cartoonBianca, "Cartoon da Bianca"],
    ["cartoon-luiz", imagens.cartoonLuiz, "Cartoon do Luiz"],
    ["elfa-chat", imagens.elfaChat, "Elfa do chat"],
    ["elfa-estudando", imagens.elfaEstudando, "Elfa estudando"],
    ["elfa-estudando-2", imagens.elfaEstudando2, "Elfa estudando"],
    ["icone", imagens.icone, "Ícone"],
    ["icone-svg", imagens.iconeSvg, "Ícone"],
    ["logo-fundo-roxa", imagens.logoFundoRoxa, "Logo com fundo roxo"],
    ["logo-roxa", imagens.logoRoxa, "Logo roxa"],
    ["logo", imagens.logo, "Logo Study Plaza"],
    ["lupa-menos", imagens.lupa, "Diminuir fonte"],
    ["lupa-mais", imagens.lupaMais, "Aumentar fonte"],
  ];

  elementos.forEach(([id, arquivo, alt]) => {
    carregarImagem(id, arquivo, alt);
  });
});
