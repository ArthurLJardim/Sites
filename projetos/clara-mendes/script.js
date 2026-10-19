(function () {
  const s = window.SITE;
  const $ = (seletor) => document.querySelector(seletor);
  const $$ = (seletor) => document.querySelectorAll(seletor);
  const esc = (texto) =>
    String(texto).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  document.documentElement.style.setProperty("--cor", s.cor);
  document.title = `${s.nome} | ${s.segmento} em ${s.cidade}`;
  $('meta[name="description"]').content = s.hero.subtitulo;

  const linkWhatsapp = `https://wa.me/${s.whatsapp}?text=${encodeURIComponent(s.mensagemWhatsapp)}`;
  $$("[data-whatsapp]").forEach((a) => (a.href = linkWhatsapp));

  $("[data-nome]").textContent = s.nome;
  // logo (opcional): imagem da marca exibida antes do nome no topo
  if (s.logo) {
    const logo = document.createElement("img");
    logo.src = s.logo;
    logo.alt = "";
    logo.className = "marca__logo";
    $("[data-nome]").prepend(logo);
  }
  $("[data-etiqueta]").textContent = `${s.segmento} em ${s.cidade}`;
  // hero.destaque (opcional): trecho do título que recebe ênfase visual
  const titulo = $("[data-hero-titulo]");
  if (s.hero.destaque && s.hero.titulo.includes(s.hero.destaque)) {
    titulo.innerHTML = esc(s.hero.titulo).replace(esc(s.hero.destaque), `<em>${esc(s.hero.destaque)}</em>`);
  } else {
    titulo.textContent = s.hero.titulo;
  }
  $("[data-hero-sub]").textContent = s.hero.subtitulo;
  $("[data-hero-botao]").textContent = s.hero.botao;
  $("[data-telefone]").textContent = s.telefone;
  $("[data-sobre-titulo]").textContent = s.sobre.titulo;
  $("[data-sobre-texto]").textContent = s.sobre.texto;
  $("[data-endereco]").textContent = s.endereco;
  // Seções opcionais: somem quando o cliente ainda não tem o conteúdo
  if (s.instagram) $("[data-instagram]").href = s.instagram;
  else $("[data-instagram]").hidden = true;
  if (!s.depoimentos.length) {
    $("#depoimentos").hidden = true;
    $('.menu a[href="#depoimentos"]').hidden = true;
  }
  // rt (opcional): responsável técnico, exigido na divulgação de clínicas de saúde
  $("[data-rodape]").textContent =
    `© ${new Date().getFullYear()} ${s.nome}. Todos os direitos reservados.` + (s.rt ? ` · ${s.rt}` : "");
  $("[data-mapa]").src = `https://www.google.com/maps?q=${encodeURIComponent(s.endereco)}&output=embed`;

  $("[data-destaques]").innerHTML = s.destaques
    .map((d) => `<li><strong>${esc(d.numero)}</strong><span>${esc(d.texto)}</span></li>`)
    .join("");

  $("[data-servicos]").innerHTML = s.servicos
    .map((x) => `<article class="cartao"><h3>${esc(x.titulo)}</h3><p>${esc(x.descricao)}</p></article>`)
    .join("");

  $("[data-diferenciais]").innerHTML = s.sobre.diferenciais.map((d) => `<li>${esc(d)}</li>`).join("");

  $("[data-depoimentos]").innerHTML = s.depoimentos
    .map((d) => `<figure class="cartao depoimento"><blockquote>${esc(d.texto)}</blockquote><figcaption>${esc(d.nome)}</figcaption></figure>`)
    .join("");

  $("[data-faq]").innerHTML = s.faq
    .map((f) => `<details class="faq"><summary>${esc(f.pergunta)}</summary><p>${esc(f.resposta)}</p></details>`)
    .join("");

  $("[data-horarios]").innerHTML = s.horarios
    .map((h) => `<div><dt>${esc(h.dias)}</dt><dd>${esc(h.horas)}</dd></div>`)
    .join("");
})();
