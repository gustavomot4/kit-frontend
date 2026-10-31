## 11. Exemplo de composição sem framework

O exemplo usa as classes e tokens deste documento. Insira os dois blocos CSS em um arquivo de estilos ou em `<style>`. Os SVGs são espaços reservados: substitua-os pelos desenhos Phosphor Duotone apropriados, mantendo o caráter decorativo. Rotas e eventos devem ser conectados ao produto.

### 11.1 Catálogo

```html
<div class="ui-screen">
  <header class="ui-topbar">
    <div class="ui-topbar__start">
      <span class="ui-brand">
        <span class="ui-brand__mark" aria-hidden="true">AP</span>
        <span class="ui-brand__name">Aplicativo</span>
      </span>
    </div>
    <nav class="ui-tabbar ui-tabbar--top" aria-label="Menu principal">
      <a class="ui-tab" href="/inicio"><span class="ui-tab__pill" aria-hidden="true">⌂</span>Início</a>
      <a class="ui-tab ui-tab--active" href="/explorar" aria-current="page"><span class="ui-tab__pill" aria-hidden="true">◇</span>Explorar</a>
      <a class="ui-tab" href="/acompanhar"><span class="ui-tab__pill" aria-hidden="true">✓</span>Acompanhar</a>
      <a class="ui-tab" href="/conta"><span class="ui-tab__pill" aria-hidden="true">○</span>Conta</a>
    </nav>
    <div class="ui-topbar__end"><button class="ui-topbtn ui-topbtn--listen" type="button">Ouvir</button></div>
  </header>
  <main class="ui-main ui-main--wide" aria-labelledby="catalog-title">
    <h1 class="ui-title" id="catalog-title">Explorar atividades</h1>
    <div class="ui-catalog">
      <div class="ui-search" role="search">
        <label class="ui-sr-only" for="busca">Buscar atividade</label>
        <input class="ui-search__input" id="busca" type="search" placeholder="Buscar atividade">
      </div>
      <div class="ui-catalog__body">
        <section class="ui-catalog__filters" aria-labelledby="filter-title">
          <h2 class="ui-section__title" id="filter-title">Filtrar atividades</h2>
          <div class="ui-chips" role="group" aria-label="Filtros">
            <button class="ui-chip" type="button" aria-pressed="true">✓ Perto de mim</button>
            <button class="ui-chip" type="button" aria-pressed="false">Nesta semana</button>
          </div>
        </section>
        <section class="ui-catalog__results" aria-label="Resultados">
          <p class="ui-catalog__summary" role="status">Página 1 · Atividades 1 a 1</p>
          <ul class="ui-list">
            <li class="ui-catalog-item">
              <article class="ui-card ui-card--pad">
                <div class="ui-card__head">
                  <span class="ui-icon ui-icon--cat-2" aria-hidden="true">
                    <svg viewBox="0 0 48 48" focusable="false"><path d="M8 14h32v24H8z" fill="currentColor" opacity=".2"/><path d="M8 14h32v24H8zM16 10v8M32 10v8M8 23h32" fill="none" stroke="currentColor" stroke-width="2"/></svg>
                  </span>
                  <div class="ui-card__headtext">
                    <h2 class="ui-card__title"><a class="ui-card__link" href="/atividades/oficina">Oficina de fotografia</a></h2>
                    <p class="ui-card__sub">Espaço Horizonte · exemplo fictício</p>
                    <div class="ui-card__badge"><span class="ui-badge ui-badge--info">Inscrições abertas</span></div>
                  </div>
                </div>
                <ul class="ui-facts"><li class="ui-fact">Sábado, às 10h</li><li class="ui-fact">Unidade Centro</li></ul>
              </article>
            </li>
          </ul>
          <nav class="ui-catalog__pagination" aria-label="Páginas de atividades">
            <button class="ui-btn ui-btn--secondary ui-btn--inline" type="button" disabled>Anterior</button>
            <span>Página 1</span>
            <button class="ui-btn ui-btn--secondary ui-btn--inline" type="button" disabled>Próxima</button>
          </nav>
        </section>
      </div>
    </div>
  </main>
  <nav class="ui-tabbar ui-tabbar--bottom" aria-label="Menu principal">
    <a class="ui-tab" href="/inicio"><span class="ui-tab__pill" aria-hidden="true">⌂</span>Início</a>
    <a class="ui-tab ui-tab--active" href="/explorar" aria-current="page"><span class="ui-tab__pill" aria-hidden="true">◇</span>Explorar</a>
    <a class="ui-tab" href="/acompanhar"><span class="ui-tab__pill" aria-hidden="true">✓</span>Acompanhar</a>
    <a class="ui-tab" href="/conta"><span class="ui-tab__pill" aria-hidden="true">○</span>Conta</a>
  </nav>
</div>
```
