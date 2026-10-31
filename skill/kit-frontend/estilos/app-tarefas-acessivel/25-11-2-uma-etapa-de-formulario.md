### 11.2 Uma etapa de formulário

```html
<div class="ui-screen">
  <header class="ui-topbar">
    <div class="ui-topbar__start">
      <span class="ui-brand ui-brand--desktop">
        <span class="ui-brand__mark" aria-hidden="true">AP</span>
        <span class="ui-brand__name">Aplicativo</span>
      </span>
      <a class="ui-topbtn" href="/explorar">← Voltar</a>
    </div>
    <nav class="ui-tabbar ui-tabbar--top" aria-label="Menu principal">
      <a class="ui-tab" href="/inicio"><span class="ui-tab__pill" aria-hidden="true">⌂</span>Início</a>
      <a class="ui-tab ui-tab--active" href="/explorar" aria-current="true"><span class="ui-tab__pill" aria-hidden="true">◇</span>Explorar</a>
      <a class="ui-tab" href="/acompanhar"><span class="ui-tab__pill" aria-hidden="true">✓</span>Acompanhar</a>
      <a class="ui-tab" href="/conta"><span class="ui-tab__pill" aria-hidden="true">○</span>Conta</a>
    </nav>
    <div class="ui-topbar__end"><button class="ui-topbtn ui-topbtn--listen" type="button">Ouvir</button></div>
  </header>
  <main class="ui-main ui-main--wide" aria-labelledby="step-title">
    <div class="ui-steps">
      <span class="ui-steps__bar ui-steps__bar--on" aria-hidden="true"></span>
      <span class="ui-steps__bar ui-steps__bar--on" aria-hidden="true"></span>
      <span class="ui-steps__bar" aria-hidden="true"></span>
      <span class="ui-steps__label">Passo 2 de 3</span>
    </div>
    <h1 class="ui-title" id="step-title">Quando você prefere participar?</h1>
    <p class="ui-lead">Escolha uma opção.</p>
    <fieldset class="ui-fieldset">
      <legend class="ui-sr-only">Horário de participação</legend>
      <div class="ui-options">
        <label class="ui-option">
          <input class="ui-option__input" type="radio" name="horario" value="manha" checked>
          <span class="ui-option__text">De manhã<span class="ui-option__sub">Antes do almoço</span></span>
          <span class="ui-option__check" aria-hidden="true">✓</span>
        </label>
        <label class="ui-option">
          <input class="ui-option__input" type="radio" name="horario" value="tarde">
          <span class="ui-option__text">De tarde</span>
          <span class="ui-option__check" aria-hidden="true">✓</span>
        </label>
      </div>
    </fieldset>
  </main>
  <div class="ui-footer ui-footer--wide">
    <div class="ui-footer__inner"><button class="ui-btn ui-btn--primary" type="button">Continuar</button></div>
  </div>
</div>
```

Os exemplos apresentam a composição visual. O agente deve implementar os controladores e a semântica de formulário pertinente, além de substituir os símbolos de navegação pelos SVGs da família escolhida.
