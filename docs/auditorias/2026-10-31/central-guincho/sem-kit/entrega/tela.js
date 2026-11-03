/* Central de atendimento BR-381: lógica da tela.
   Sem biblioteca e sem servidor. Os dados vêm de dados.js.
   Teste: abrir tela.html?avanco=20 empurra o relógio 20 minutos à frente. */
(function () {
  'use strict';

  var D = window.DADOS;
  var MIN = 60000;

  /* Regras de tempo e de percurso (ajuste aqui) */
  var MIN_POR_KM = 0.75;      /* 80 km/h com o guincho vazio */
  var MIN_POR_KM_CARGA = 0.9; /* guincho carregado */
  var SAIDA_PATIO = 2;        /* minutos para sair do pátio */
  var KM_VIRADA = 3;          /* km a mais quando o guincho está virado para o lado errado */
  var KM_RETORNO = 6;         /* km a mais quando a chamada está na pista oposta */
  var DESCARGA = 6;           /* minutos para descarregar no destino */
  var APERTADO = 10;          /* sobra abaixo disso = "apertado" */
  var SERVICO_MIN = { prancha: 30, pesado: 45 }; /* tempo no local até liberar */

  var avancoMin = 0;
  try {
    var q = new URLSearchParams(location.search).get('avanco');
    if (q) avancoMin = Number(q) || 0;
  } catch (e) { /* sem URLSearchParams */ }
  function agora() { return Date.now() + avancoMin * MIN; }

  /* Estado vivo: cópia dos dados de exemplo */
  var S = {
    trucks: D.guinchos.map(clone),
    calls: D.chamadas.map(clone),
    hoje: { total: D.hoje.total, noPrazo: D.hoje.noPrazo },
    sel: null,
    undo: null,
    avisos: [],
    seq: 1
  };
  /* os horários de dados.js foram gerados com Date.now(); o avanço de teste desloca o relógio, não os dados */

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function truck(id) { for (var i = 0; i < S.trucks.length; i++) if (S.trucks[i].id === id) return S.trucks[i]; return null; }
  function call(id) { for (var i = 0; i < S.calls.length; i++) if (S.calls[i].id === id) return S.calls[i]; return null; }

  /* ---------- formatação ---------- */
  function hora(ts) {
    var d = new Date(ts);
    return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }
  function mmss(min) {
    var s = Math.max(0, Math.round(Math.abs(min) * 60));
    if (s >= 6000) return Math.floor(s / 3600) + 'h' + String(Math.floor(s % 3600 / 60)).padStart(2, '0');
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }
  function dur(min) {
    var m = Math.max(0, Math.round(min));
    if (m < 60) return m + ' min';
    var h = Math.floor(m / 60), r = m % 60;
    return h + ' h' + (r ? ' ' + String(r).padStart(2, '0') + ' min' : '');
  }
  function kmTxt(km) { return Math.round(km) + ' km'; }
  function doPrazo(c) { return c.tipo === 'seguradora' ? 'do prazo' : 'da meta'; }
  function rel(c, sobra) {
    var n = Math.round(Math.abs(sobra));
    var p = doPrazo(c);
    if (sobra >= 0) return n === 0 ? 'na hora ' + p : n + ' min antes ' + p;
    return n + ' min depois ' + p;
  }
  function seta(h) { return h === 'BH' ? '▶' : h === 'SP' ? '◀' : ''; }
  function sentidoNome(h) { return h === 'BH' ? 'sentido Belo Horizonte' : h === 'SP' ? 'sentido São Paulo' : 'parado'; }

  function lugar(km) {
    var P = D.rodovia.pontos, best = P[0], i;
    for (i = 0; i < P.length; i++) if (Math.abs(P[i].km - km) < Math.abs(best.km - km)) best = P[i];
    if (Math.abs(best.km - km) <= 12) return 'perto de ' + best.nome;
    var a = P[0], b = P[P.length - 1];
    for (i = 0; i < P.length; i++) if (P[i].km <= km) a = P[i];
    for (i = P.length - 1; i >= 0; i--) if (P[i].km >= km) b = P[i];
    return 'entre ' + a.nome + ' e ' + b.nome;
  }
  function patioMaisPerto(km) {
    var best = D.rodovia.patios[0];
    D.rodovia.patios.forEach(function (p) { if (Math.abs(p.km - km) < Math.abs(best.km - km)) best = p; });
    return best;
  }

  /* ---------- posição e percurso ---------- */
  function posKm(t, now) {
    var r = t.rota;
    if (r) {
      var f = clamp((now - r.partiuEm) / (r.chegadaEm - r.partiuEm), 0, 1);
      return r.origemKm + (r.destKm - r.origemKm) * f;
    }
    return t.km;
  }
  function virado(t) {
    if (t.rota && t.rota.destKm !== t.rota.origemKm) return t.rota.destKm > t.rota.origemKm ? 'BH' : 'SP';
    return t.head || null;
  }
  function disponivel(t) { return t.status === 'livre' || t.status === 'retornando'; }
  function serve(t, c) { return t.tipo === c.guincho; }

  /* Quanto falta (km e minutos) para um guincho disponível chegar à chamada.
     Em rodovia dividida o guincho só atravessa no retorno: virado para o lado errado
     ou chamada na pista oposta soma km. */
  function percurso(t, c, now) {
    var p = posKm(t, now);
    var dist = Math.abs(c.km - p);
    var ir = c.km >= p ? 'BH' : 'SP';
    var h = virado(t);
    var extra = 0;
    if (dist > 0.5) {
      if (h && h !== ir) extra += KM_VIRADA;
      if (c.sentido !== ir) extra += KM_RETORNO;
    }
    var km = dist + extra;
    var min = km * MIN_POR_KM + (t.status === 'livre' ? SAIDA_PATIO : 0);
    return { km: km, dist: dist, retorno: extra > 0, min: min, chegadaEm: now + min * MIN };
  }

  function candidatos(c, now) {
    var out = [];
    S.trucks.forEach(function (t) {
      if (!disponivel(t) || !serve(t, c) || t.id === c.truck) return;
      var r = percurso(t, c, now);
      r.t = t;
      out.push(r);
    });
    out.sort(function (a, b) { return a.min - b.min; });
    return out;
  }

  /* Guincho carregado que vai ficar livre perto: quando estaria na chamada se esperasse */
  function futuro(t, c, now) {
    if (t.status !== 'reboque' || !serve(t, c)) return null;
    var livreEm = t.rota.chegadaEm + DESCARGA * MIN;
    var falso = { status: 'livre', km: t.rota.destKm, head: null, tipo: t.tipo };
    var r = percurso(falso, c, livreEm);
    r.t = t;
    r.livreEm = livreEm;
    return r;
  }

  /* ---------- derivação (tudo que a tela mostra sai daqui) ---------- */
  function nivelDe(restante, sobra) {
    if (restante <= 0) return 'estourou';
    if (sobra === null || sobra < 0) return 'estoura';
    if (sobra < APERTADO) return 'apertado';
    return 'ok';
  }
  var NIVEL_TXT = { ok: 'No prazo', apertado: 'Apertado', estoura: 'Vai estourar', estourou: 'Estourou' };

  function infoChamada(c, now) {
    var prazoEm = c.abertaEm + c.prazoMin * MIN;
    var restante = (prazoEm - now) / MIN;
    var gasto = (now - c.abertaEm) / MIN;
    var cands = candidatos(c, now);
    var melhor = null, chegadaEm = null, atual = null;
    if (c.status === 'aguardando') {
      melhor = cands[0] || null;
      if (melhor) chegadaEm = melhor.chegadaEm;
    } else if (c.status === 'acaminho') {
      var t = truck(c.truck);
      atual = t;
      chegadaEm = t.rota.chegadaEm;
      /* só vale sugerir troca se for claramente mais rápido */
      melhor = cands.filter(function (x) { return x.chegadaEm < chegadaEm - 2 * MIN; })[0] || null;
    }
    var sobra = chegadaEm === null ? null : (prazoEm - chegadaEm) / MIN;
    var etaMin = chegadaEm === null ? null : (chegadaEm - now) / MIN;
    var alt = null;
    if (c.status === 'aguardando') {
      S.trucks.forEach(function (t2) {
        var f = futuro(t2, c, now);
        if (f && (!alt || f.chegadaEm < alt.chegadaEm)) alt = f;
      });
      if (alt && melhor && alt.chegadaEm > melhor.chegadaEm - 2 * MIN) alt = null;
    }
    return {
      c: c, prazoEm: prazoEm, restante: restante, gasto: gasto, cands: cands,
      melhor: melhor, atual: atual, chegadaEm: chegadaEm, etaMin: etaMin, sobra: sobra,
      nivel: nivelDe(restante, sobra), alt: alt
    };
  }

  function derivar(now) {
    var ag = [], ac = [];
    S.calls.forEach(function (c) {
      if (c.status === 'aguardando') ag.push(infoChamada(c, now));
      else if (c.status === 'acaminho') ac.push(infoChamada(c, now));
    });
    ag.sort(function (a, b) { return a.prazoEm - b.prazoEm; });
    ac.sort(function (a, b) { return (a.sobra - b.sobra) || (a.prazoEm - b.prazoEm); });

    /* um mesmo guincho sendo o "mais perto" de várias chamadas */
    var dono = {};
    ag.forEach(function (i) { if (i.melhor) (dono[i.melhor.t.id] = dono[i.melhor.t.id] || []).push(i.c.id); });
    ag.forEach(function (i) {
      i.tambem = i.melhor ? dono[i.melhor.t.id].filter(function (id) { return id !== i.c.id; }) : [];
    });

    var todas = ag.concat(ac);
    if (!todas.some(function (i) { return i.c.id === S.sel; })) S.sel = todas.length ? todas[0].c.id : null;
    var sel = null;
    todas.forEach(function (i) { if (i.c.id === S.sel) sel = i; });

    var livres = S.trucks.filter(disponivel).length;
    var vaoEstourar = todas.filter(function (i) { return i.nivel === 'estoura' || i.nivel === 'estourou'; }).length;
    return { now: now, ag: ag, ac: ac, todas: todas, sel: sel, livres: livres, vaoEstourar: vaoEstourar };
  }

  /* ---------- andamento do tempo (chegadas, liberações) ---------- */
  function avancar(now) {
    S.trucks.forEach(function (t) {
      if (t.status === 'acaminho' && now >= t.rota.chegadaEm) {
        var c = call(t.chamada);
        var chegou = t.rota.chegadaEm;
        t.km = t.rota.destKm;
        t.head = t.rota.destKm >= t.rota.origemKm ? 'BH' : 'SP';
        t.status = 'nolocal';
        t.chegouEm = chegou;
        t.liberaEm = chegou + SERVICO_MIN[t.tipo] * MIN;
        t.rota = null;
        if (c) {
          c.status = 'nolocal';
          c.chegouEm = chegou;
          var prazoEm = c.abertaEm + c.prazoMin * MIN;
          S.hoje.total += 1;
          var atraso = (chegou - prazoEm) / MIN;
          if (atraso <= 0) S.hoje.noPrazo += 1;
          aviso(t.id + ' chegou na chamada #' + c.id + (atraso <= 0 ? ', dentro ' + doPrazo(c) + '.' : ', ' + Math.round(atraso) + ' min depois ' + doPrazo(c) + '.'),
            atraso <= 0 ? 'ok' : 'alerta', false);
        }
      } else if (t.status === 'nolocal' && now >= t.liberaEm) {
        var pat = patioMaisPerto(t.km);
        var d = Math.abs(pat.km - t.km);
        var c2 = call(t.chamada);
        if (c2) c2.status = 'concluida';
        t.status = 'reboque';
        t.servico = { carga: c2 ? c2.veiculo : 'veículo', destino: pat.nome };
        t.rota = { origemKm: t.km, destKm: pat.km, partiuEm: t.liberaEm, chegadaEm: t.liberaEm + d * MIN_POR_KM_CARGA * MIN };
        t.chamada = null;
      } else if (t.status === 'reboque' && now >= t.rota.chegadaEm + DESCARGA * MIN) {
        t.status = 'livre';
        t.km = t.rota.destKm;
        t.head = null;
        t.nota = t.servico && t.servico.destino ? t.servico.destino : 'Pátio';
        t.rota = null;
        t.servico = null;
      } else if (t.status === 'retornando' && now >= t.rota.chegadaEm) {
        t.status = 'livre';
        t.km = t.rota.destKm;
        t.head = null;
        t.nota = t.servico && t.servico.destino ? t.servico.destino : 'Pátio';
        t.rota = null;
        t.servico = null;
      }
    });
    S.avisos = S.avisos.filter(function (a) { return a.ate > now; });
    if (S.undo && S.undo.ate <= now) S.undo = null;
  }

  function aviso(texto, tipo, comDesfazer) {
    S.avisos.push({ id: S.seq++, texto: texto, tipo: tipo || 'ok', desfazer: !!comDesfazer, ate: agora() + (comDesfazer ? 12000 : 9000) });
  }

  /* ---------- ações ---------- */
  function despachar(callId, truckId) {
    var now = agora();
    var c = call(callId), t = truck(truckId);
    if (!c || !t || !disponivel(t) || !serve(t, c)) return;
    var velho = c.status === 'acaminho' && c.truck ? truck(c.truck) : null;
    var antes = {
      call: clone(c),
      trucks: [clone(t)].concat(velho ? [clone(velho)] : [])
    };
    var r = percurso(t, c, now);
    var estavaLivre = t.status === 'livre';
    var p0 = posKm(t, now);

    if (velho) {
      var pv = posKm(velho, now);
      var pat = patioMaisPerto(pv);
      velho.status = 'retornando';
      velho.km = pv;
      velho.head = null;
      velho.chamada = null;
      velho.servico = { destino: pat.nome };
      velho.rota = { origemKm: pv, destKm: pat.km, partiuEm: now, chegadaEm: now + Math.abs(pat.km - pv) * MIN_POR_KM * MIN };
    }

    t.status = 'acaminho';
    t.chamada = c.id;
    t.servico = null;
    t.nota = '';
    t.rota = {
      origemKm: p0,
      destKm: c.km,
      partiuEm: now + (estavaLivre ? SAIDA_PATIO * MIN : 0),
      chegadaEm: r.chegadaEm
    };
    c.status = 'acaminho';
    c.truck = t.id;

    var prazoEm = c.abertaEm + c.prazoMin * MIN;
    var sobra = (r.chegadaEm - prazoEm) / MIN;
    S.undo = { antes: antes, ate: now + 12000 };
    var txt = (velho ? t.id + ' no lugar de ' + velho.id + ' na chamada #' + c.id : t.id + ' enviado para a chamada #' + c.id) +
      '. Chega às ' + hora(r.chegadaEm) + (sobra <= 0 ? ', ' + rel(c, -sobra) + '.' : ', ' + rel(c, -sobra) + '.');
    aviso(txt, sobra > 0 ? 'alerta' : 'ok', true);

    /* depois de enviar, já deixa marcada a próxima chamada que precisa de guincho */
    var d = derivar(now);
    if (d.ag.length) S.sel = d.ag[0].c.id;
    render();
  }

  function desfazer() {
    if (!S.undo) return;
    var a = S.undo.antes;
    var c = call(a.call.id);
    Object.keys(c).forEach(function (k) { delete c[k]; });
    Object.assign(c, a.call);
    a.trucks.forEach(function (snap) {
      var t = truck(snap.id);
      Object.keys(t).forEach(function (k) { delete t[k]; });
      Object.assign(t, snap);
    });
    S.undo = null;
    S.avisos = S.avisos.filter(function (x) { return !x.desfazer; });
    S.sel = c.id;
    aviso('Envio desfeito. A chamada #' + c.id + ' voltou para a fila.', 'ok', false);
    render();
  }

  function selecionar(id) { S.sel = id; render(); }

  /* ---------- peças de HTML ---------- */
  function chipNivel(c, nivel) {
    var txt = nivel === 'estourou' ? 'Estourou' : NIVEL_TXT[nivel];
    return '<span class="chip-nivel">' + txt + '</span>';
  }
  function tagTipo(c) {
    return '<span class="tag tag-' + c.tipo + '">' + (c.tipo === 'seguradora' ? esc(c.cliente) : 'Particular') + '</span>';
  }
  function tagGuincho(c) {
    return '<span class="tag tag-g">' + (c.guincho === 'pesado' ? 'Pesado' : 'Prancha') + '</span>';
  }

  function barra(i, now) {
    var c = i.c;
    var pctGasto = clamp(i.gasto / c.prazoMin * 100, 0, 100);
    var marca = '';
    if (i.etaMin !== null) {
      var pm = (i.gasto + i.etaMin) / c.prazoMin * 100;
      var fora = pm > 100;
      marca = '<i class="marca' + (fora ? ' fora' : '') + '" style="left:' + clamp(pm, 0, 100).toFixed(1) + '%"></i>';
    }
    return '<span class="barra" aria-hidden="true"><i class="enche" style="width:' + pctGasto.toFixed(1) + '%"></i>' + marca + '</span>';
  }

  function contagem(i) {
    var estourou = i.restante <= 0;
    return '<span class="conta"><b>' + mmss(i.restante) + '</b><small>' + (estourou ? 'estourou há' : 'restam') + '</small></span>';
  }

  function ariaChamada(i, sel, extra) {
    var c = i.c;
    return 'Chamada ' + c.id + ', ' + NIVEL_TXT[i.nivel] + ', ' + (i.restante > 0 ? 'restam ' + mmss(i.restante) : 'estourou há ' + mmss(i.restante)) +
      ', km ' + c.km + ' ' + sentidoNome(c.sentido) + '. ' + (extra || '') + (sel ? ' Selecionada.' : '');
  }
  function abreCard(i, sel, classe, extra) {
    var c = i.c;
    return '<li data-key="c' + c.id + '" class="chamada ' + classe + ' lvl-' + i.nivel + (sel ? ' sel' : '') + '">' +
      '<button type="button" class="card" data-acao="sel" data-call="' + c.id + '" aria-pressed="' + sel + '" aria-label="' + esc(ariaChamada(i, sel, extra)) + '">';
  }

  /* Esperando guincho: sempre cartão completo */
  function cardAguardando(i, d) {
    var c = i.c;
    var sel = S.sel === c.id;
    var l3;
    if (i.melhor) {
      var m = i.melhor;
      l3 = '<span class="l3"><span><span class="rot">Mais perto</span> <b>' + m.t.id + '</b> · ' + kmTxt(m.km) + ' · chega em <b>' + dur(m.min) + '</b> (' + hora(m.chegadaEm) + ')' +
        (i.tambem.length ? '<span class="tambem"> · disputado com a #' + i.tambem.join(', #') + '</span>' : '') +
        '</span><span class="rel">' + rel(c, i.sobra) + '</span></span>';
    } else {
      l3 = '<span class="l3"><span><span class="rel">Nenhum guincho livre ' + (c.guincho === 'pesado' ? 'pesado' : 'prancha') + '</span>' +
        (i.alt ? '<span class="tambem"> · ' + i.alt.t.id + ' libera em ' + dur((i.alt.livreEm - d.now) / MIN) + '</span>' : '') + '</span></span>';
    }
    return abreCard(i, sel, 'completa') +
      '<span class="card-in">' + contagem(i) + '<span class="corpo">' +
      '<span class="l1">' + chipNivel(c, i.nivel) + '<span class="num">#' + c.id + '</span>' + tagTipo(c) + tagGuincho(c) + '</span>' +
      '<span class="l2"><span class="onde">km ' + c.km + ' · ' + c.sentido + '</span> <span class="perto">' + esc(lugar(c.km)) + '</span>' +
      '<span class="veic"> · ' + esc(c.veiculo) + '<span class="prob">, ' + esc(c.problema.toLowerCase()) + '</span></span></span>' +
      l3 + barra(i, d.now) + '</span></span></button></li>';
  }

  /* Guincho a caminho: com risco vira cartão; no prazo vira uma linha só */
  function cardACaminho(i, d) {
    var c = i.c;
    var sel = S.sel === c.id;
    var t = i.atual;
    var saindo = t.rota.partiuEm > d.now;
    var extra = 'Guincho ' + t.id + ' a caminho, chega às ' + hora(i.chegadaEm) + ', ' + rel(c, i.sobra) + '.';
    var andamento = '<b>' + t.id + '</b> ' + (saindo ? 'saindo agora' : 'a caminho') + ' · chega às <b>' + hora(i.chegadaEm) + '</b> (em ' + dur(i.etaMin) + ')';

    if (i.nivel === 'ok') {
      return abreCard(i, sel, 'linha-ok', extra) +
        '<span class="card-in">' + contagem(i) + '<span class="corpo">' +
        '<span class="l1"><span class="num">#' + c.id + '</span>' + tagTipo(c) + '<span class="rel">' + rel(c, i.sobra) + '</span></span>' +
        '<span class="l2">' + andamento + ' · km ' + c.km + ' ' + c.sentido + '</span>' +
        '</span></span></button></li>';
    }
    var troca = i.melhor
      ? '<span class="l3"><span class="troca">' + i.melhor.t.id + ' chegaria em <b>' + dur(i.melhor.min) + '</b> (' + hora(i.melhor.chegadaEm) + '): dá para trocar</span></span>'
      : '';
    return abreCard(i, sel, 'compacta', extra) +
      '<span class="card-in">' + contagem(i) + '<span class="corpo">' +
      '<span class="l1">' + chipNivel(c, i.nivel) + '<span class="num">#' + c.id + '</span>' + tagTipo(c) + '<span class="rel">' + rel(c, i.sobra) + '</span></span>' +
      '<span class="l2">' + andamento + '</span>' +
      '<span class="l2 veic">km ' + c.km + ' ' + c.sentido + ' · ' + esc(c.veiculo) + '</span>' +
      troca + barra(i, d.now) + '</span></span></button></li>';
  }

  /* ---------- frota ---------- */
  var ST_TXT = { livre: 'Livre', retornando: 'Voltando', acaminho: 'A caminho', nolocal: 'No local', reboque: 'Levando', fora: 'Fora' };

  function situacao(t, now) {
    switch (t.status) {
      case 'livre': return t.nota || 'Livre';
      case 'retornando': return 'Vazio, voltando ao ' + esc(t.servico && t.servico.destino ? t.servico.destino : 'pátio');
      case 'acaminho':
        var c = call(t.chamada);
        return (t.rota.partiuEm > now ? 'Saindo para a #' : 'A caminho da #') + t.chamada + ' · chega às ' + hora(t.rota.chegadaEm);
      case 'nolocal': return 'Na #' + t.chamada + ' há ' + dur((now - t.chegouEm) / MIN) + ' · libera em ~' + dur(Math.max(0, (t.liberaEm - now) / MIN));
      case 'reboque':
        var livreEm = t.rota.chegadaEm + DESCARGA * MIN;
        return (now >= t.rota.chegadaEm ? 'Descarregando em ' : 'Para ') + esc(t.servico.destino) +
          ' · livre em ' + dur(Math.max(0, (livreEm - now) / MIN));
      default: return esc(t.nota || 'Fora de serviço');
    }
  }

  function linhaFrota(t, ctx, grupo) {
    var now = ctx.now;
    var p = posKm(t, now);
    var h = virado(t);
    var cand = ctx.candPor[t.id] || null;
    var fut = ctx.futPor[t.id] || null;
    var incompat = ctx.sel && !serve(t, ctx.sel.c);
    var classes = 'linha st-' + t.status + (incompat ? ' incompat' : '') + (cand && cand.rank === 1 && ctx.rec ? ' rec' : '');
    var rank = '';
    var chega = '<span class="vazio">—</span>';
    var dist = '<span class="vazio">—</span>';
    var acao = '';
    var selc = ctx.sel ? ctx.sel.c : null;

    if (cand) {
      var sobraC = (ctx.sel.prazoEm - cand.chegadaEm) / MIN;
      var nv = nivelDe(ctx.sel.restante, sobraC);
      rank = '<span class="rank' + (cand.rank === 1 ? ' um' : '') + '">' + cand.rank + '</span>';
      dist = '<b>' + kmTxt(cand.km) + '</b>' + (cand.retorno ? '<small>com retorno</small>' : '');
      chega = '<span class="chega lvl-' + nv + '"><b>' + dur(cand.min) + '</b><small>às ' + hora(cand.chegadaEm) + ' · ' + rel(selc, sobraC) + '</small></span>';
      var trocar = selc.status === 'acaminho';
      var primario = cand.rank === 1 && (!trocar || ctx.sel.melhor);
      acao = '<button type="button" class="btn-env' + (primario ? ' primario' : '') + '" data-acao="enviar" data-call="' + selc.id + '" data-truck="' + t.id + '">' +
        (trocar ? 'Trocar' : 'Enviar') + '<span class="sr"> ' + t.id + ' para a chamada ' + selc.id + '</span></button>';
    } else if (grupo === 'atual') {
      var sobraA = ctx.sel.sobra;
      rank = '<span class="rank atual" title="Já está indo">•</span>';
      dist = '<span class="vazio">—</span>';
      chega = '<span class="chega lvl-' + ctx.sel.nivel + '"><b>' + dur(ctx.sel.etaMin) + '</b><small>às ' + hora(ctx.sel.chegadaEm) + ' · ' + rel(selc, sobraA) + '</small></span>';
      acao = '<span class="ja">Já a caminho</span>';
    } else if (fut && !incompat && ctx.sel.alt && ctx.sel.alt.t.id === t.id) {
      var sobraF = (ctx.sel.prazoEm - fut.chegadaEm) / MIN;
      dist = '<span class="vazio">depois de livre</span>';
      chega = '<span class="chega previsto"><b>' + dur((fut.chegadaEm - now) / MIN) + '</b><small>às ' + hora(fut.chegadaEm) + ' · ' + rel(selc, sobraF) + '</small></span>';
      acao = '<span class="ja">Ocupado</span>';
    } else if (!incompat && selc && t.status !== 'fora' && !disponivel(t)) {
      acao = '<span class="ja">Ocupado</span>';
    } else if (incompat) {
      acao = '<span class="ja">Tipo não serve</span>';
    }

    var tipoTxt = t.tipo === 'pesado' ? 'Pesado' : 'Prancha';
    var onde = t.status === 'fora' ? '<span class="vazio">—</span>' :
      '<b>km ' + Math.round(p) + '</b>' + (h ? '<small>' + seta(h) + ' ' + h + '</small>' : '<small>pátio</small>');
    var aria = t.id + ', ' + tipoTxt + ', ' + ST_TXT[t.status];

    return '<tr data-key="t' + t.id + '" class="' + classes + '">' +
      '<td class="col-rank">' + rank + '</td>' +
      '<td class="col-guincho"><b class="cod">' + t.id + '</b><span class="mot">' + tipoTxt + '<span class="mot-nome"> · ' + esc(t.motorista) + '</span></span></td>' +
      '<td class="col-sit"><div class="sit-in"><span class="chip-st st-' + t.status + '">' + ST_TXT[t.status] + '</span><span class="sit-txt">' + situacao(t, now) + '</span></div></td>' +
      '<td class="col-onde">' + onde + '</td>' +
      '<td class="col-dist">' + dist + '</td>' +
      '<td class="col-chega">' + chega + '</td>' +
      '<td class="col-acao">' + acao + '</td></tr>';
  }

  function tabelaFrota(d) {
    var now = d.now;
    var sel = d.sel;
    var ctx = { now: now, sel: sel, candPor: {}, futPor: {}, rec: false };
    var grupos = [];
    var usados = {};

    if (sel) {
      sel.cands.forEach(function (x, idx) { x.rank = idx + 1; ctx.candPor[x.t.id] = x; });
      ctx.rec = !!sel.melhor;
      S.trucks.forEach(function (t) { var f = futuro(t, sel.c, now); if (f) ctx.futPor[t.id] = f; });
    }

    function pega(filtro, ordena) {
      var l = S.trucks.filter(function (t) { return !usados[t.id] && filtro(t); });
      if (ordena) l.sort(ordena);
      l.forEach(function (t) { usados[t.id] = true; });
      return l;
    }
    var porCod = function (a, b) { return a.id < b.id ? -1 : 1; };

    if (sel) {
      if (sel.c.status === 'acaminho') {
        var at = pega(function (t) { return t.id === sel.c.truck; });
        if (at.length) grupos.push({ nome: 'Já a caminho desta chamada', tipo: 'atual', l: at });
      }
      var pode = pega(function (t) { return !!ctx.candPor[t.id]; }, function (a, b) { return ctx.candPor[a.id].rank - ctx.candPor[b.id].rank; });
      if (pode.length) grupos.push({ nome: sel.c.status === 'acaminho' ? 'Podem assumir' : 'Podem ir agora, do mais rápido ao mais lento', tipo: 'pode', l: pode });
      var ocup = pega(function (t) { return serve(t, sel.c) && t.status !== 'fora' && !disponivel(t); }, function (a, b) {
        var fa = ctx.futPor[a.id], fb = ctx.futPor[b.id];
        if (fa && fb) return fa.chegadaEm - fb.chegadaEm;
        if (fa) return -1;
        if (fb) return 1;
        return porCod(a, b);
      });
      if (ocup.length) grupos.push({ nome: 'Ocupados', tipo: 'ocupados', l: ocup });
      var outro = pega(function (t) { return !serve(t, sel.c) && t.status !== 'fora'; }, porCod);
      if (outro.length) grupos.push({ nome: 'Tipo de guincho não serve para esta chamada', tipo: 'outro', l: outro });
      var fora1 = pega(function () { return true; }, porCod);
      if (fora1.length) grupos.push({ nome: 'Fora de serviço', tipo: 'fora', l: fora1 });
    } else {
      var li = pega(disponivel, porCod);
      if (li.length) grupos.push({ nome: 'Livres', tipo: 'pode', l: li });
      var oc = pega(function (t) { return t.status !== 'fora'; }, porCod);
      if (oc.length) grupos.push({ nome: 'Ocupados', tipo: 'ocupados', l: oc });
      var fo = pega(function () { return true; }, porCod);
      if (fo.length) grupos.push({ nome: 'Fora de serviço', tipo: 'fora', l: fo });
    }

    var h = '<table class="tab"><caption class="sr">Frota de guinchos' + (sel ? ', ordenada pelo que chega primeiro à chamada ' + sel.c.id : '') + '</caption>' +
      '<thead><tr><th class="col-rank"><span class="sr">Ordem</span></th><th class="col-guincho">Guincho</th><th class="col-sit">Situação</th><th class="col-onde">Onde está</th>' +
      '<th class="col-dist">Distância</th><th class="col-chega">Chega em</th><th class="col-acao"><span class="sr">Ação</span></th></tr></thead>';
    grupos.forEach(function (g) {
      h += '<tbody data-key="g-' + g.tipo + '"><tr class="grupo-linha"><th colspan="7" scope="colgroup">' + g.nome + ' <span class="n">' + g.l.length + '</span></th></tr>';
      g.l.forEach(function (t) { h += linhaFrota(t, ctx, g.tipo); });
      h += '</tbody>';
    });
    return h + '</table>';
  }

  /* ---------- faixa de despacho ---------- */
  function despachoHtml(d) {
    var i = d.sel;
    if (!i) {
      return '<p class="desp-vazio">Nenhuma chamada na fila agora. Quando entrar uma, ela aparece à esquerda e o guincho mais perto aparece aqui.</p>';
    }
    var c = i.c;
    var now = d.now;
    var trocar = c.status === 'acaminho';
    var h = '<div class="desp-topo lvl-' + i.nivel + '">';
    h += '<div class="desp-quem"><p class="desp-tit">' + (trocar ? 'Trocar o guincho da' : 'Despachar para a') + ' chamada <b>#' + c.id + '</b> · ' + esc(c.cliente) + '</p>' +
      '<p class="desp-sub">' + esc(c.veiculo) + ' (' + esc(c.placa) + ') · ' + esc(c.problema) + '</p>' +
      '<p class="desp-sub">km ' + c.km + ' ' + seta(c.sentido) + ' ' + c.sentido + ', ' + esc(lugar(c.km)) + ' · pede <b>' + (c.guincho === 'pesado' ? 'guincho pesado' : 'prancha') + '</b></p>' +
      '<p class="desp-sub contato">' + esc(c.contato) + ' · ' + esc(c.telefone) + (c.obs ? ' · ' + esc(c.obs) : '') + '</p></div>';
    h += '<div class="desp-tempo">' + chipNivel(c, i.nivel) + contagem(i) + '</div>';

    var botao = '';
    if (i.melhor) {
      var m = i.melhor;
      botao = '<button type="button" class="btn-grande" data-acao="enviar" data-call="' + c.id + '" data-truck="' + m.t.id + '">' +
        '<span class="bg-acao">' + (trocar ? 'Trocar por ' : 'Enviar ') + m.t.id + '</span><span class="bg-sub">chega em ' + dur(m.min) + ' · Enter</span></button>';
    } else if (trocar) {
      botao = '<p class="desp-sem">Nenhum guincho livre chega antes de ' + i.atual.id + '.</p>';
    } else {
      botao = '<p class="desp-sem">Sem guincho livre para enviar.</p>';
    }
    h += '<div class="desp-acao">' + botao + '</div></div>';

    /* texto que explica a situação */
    var aviso = '', cls = i.nivel;
    var cli = c.tipo === 'seguradora' ? 'a ' + c.cliente : 'o cliente';
    if (trocar) {
      if (i.nivel === 'estourou') {
        aviso = i.atual.id + ' vai chegar às ' + hora(i.chegadaEm) + ', ' + rel(c, i.sobra) + '. O prazo já passou: avise ' + cli + '.';
      } else if (i.sobra < 0) {
        aviso = i.atual.id + ' vai chegar às ' + hora(i.chegadaEm) + ', <b>' + rel(c, i.sobra) + '</b>. ' +
          (i.melhor ? i.melhor.t.id + ' chega às ' + hora(i.melhor.chegadaEm) + ' (' + rel(c, (i.prazoEm - i.melhor.chegadaEm) / MIN) + '). Trocar resolve.' : 'Nenhum outro guincho livre chega antes. Avise ' + cli + '.');
      } else {
        aviso = i.atual.id + ' vai chegar às ' + hora(i.chegadaEm) + ', ' + rel(c, i.sobra) + '.' + (i.melhor ? ' ' + i.melhor.t.id + ' chegaria antes, se quiser trocar.' : ' Não precisa mexer.');
      }
    } else if (i.melhor) {
      var m2 = i.melhor;
      if (i.nivel === 'estourou') {
        aviso = 'O prazo já passou. Mesmo enviando agora, ' + m2.t.id + ' chega às ' + hora(m2.chegadaEm) + '. Avise ' + cli + '.';
      } else if (i.sobra < 0) {
        aviso = 'Nenhum guincho livre chega a tempo. O mais perto, ' + m2.t.id + ', chega às ' + hora(m2.chegadaEm) + ', <b>' + rel(c, i.sobra) + '</b>. Avise ' + cli + ' agora.';
      } else if (i.sobra < APERTADO) {
        aviso = 'Apertado: ' + m2.t.id + ' chega às ' + hora(m2.chegadaEm) + ', só ' + rel(c, i.sobra) + '. Envie já.';
      } else {
        aviso = 'Enviando ' + m2.t.id + ' agora, chega às ' + hora(m2.chegadaEm) + ', ' + rel(c, i.sobra) + '.';
      }
      if (i.tambem && i.tambem.length) aviso += ' ' + m2.t.id + ' também é o mais perto da #' + i.tambem.join(', #') + ': decida qual vai primeiro.';
    } else {
      aviso = 'Nenhum guincho livre atende esta chamada (precisa de ' + (c.guincho === 'pesado' ? 'pesado' : 'prancha') + '). Avise ' + cli + ' do atraso.';
    }
    h += '<p class="desp-aviso lvl-' + cls + '"><span class="forma" aria-hidden="true"></span><span>' + aviso + '</span></p>';

    if (i.alt) {
      var a = i.alt;
      var sa = (i.prazoEm - a.chegadaEm) / MIN;
      h += '<p class="desp-alt"><b>Se esperar:</b> ' + a.t.id + ' (' + esc(a.t.motorista) + ') fica livre em ' + dur((a.livreEm - now) / MIN) + ' perto do km ' + Math.round(a.t.rota.destKm) +
        ' e chegaria às ' + hora(a.chegadaEm) + ', ' + rel(c, sa) + '. Ligue para o motorista se quiser reservar.</p>';
    }
    return h;
  }

  /* ---------- faixa da rodovia ---------- */
  function estradaHtml(d, W) {
    var K = D.rodovia.kmMax, PAD = 30;
    function x(km) { return PAD + (W - 2 * PAD) * clamp(km, 0, K) / K; }
    var now = d.now;
    var sel = d.sel;
    var recId = sel && sel.melhor && sel.cands.length ? sel.cands[0].t.id : null;

    var tr = S.trucks.map(function (t) {
      var h = virado(t);
      return { id: t.id, x: x(posKm(t, now)), w: h ? 60 : 46, t: t, h: h };
    });
    var cs = d.todas.map(function (i) { return { id: i.c.id, x: x(i.c.km), w: 62, i: i }; });

    function empilha(arr, max) {
      arr.sort(function (a, b) { return a.x - b.x; });
      var fim = [], rows = 0;
      arr.forEach(function (m) {
        var r = 0;
        while (r < fim.length && m.x - m.w / 2 < fim[r] + 3) r++;
        if (r >= max) r = max - 1;
        fim[r] = m.x + m.w / 2;
        m.row = r;
        rows = Math.max(rows, r + 1);
      });
      return Math.max(rows, 1);
    }
    var RH = 27;
    var rt = empilha(tr, 4), rc = empilha(cs, 3);
    var yEixo = rt * RH + 8;
    var altura = yEixo + 6 + 22 + rc * RH + 4;

    var h = '<div class="estrada-in" style="height:' + altura + 'px">';
    h += '<div class="eixo" style="top:' + yEixo + 'px;left:' + PAD + 'px;right:' + PAD + 'px"></div>';
    var marcos = D.rodovia.pontos.filter(function (p) { return p.mostrar !== false; });
    marcos.forEach(function (p, idx) {
      var cls = idx === 0 ? ' ini' : (idx === marcos.length - 1 ? ' fim' : '');
      h += '<span class="tique" style="left:' + x(p.km).toFixed(1) + 'px;top:' + (yEixo - 4) + 'px"></span>';
      h += '<span class="cidade' + cls + '" style="left:' + x(p.km).toFixed(1) + 'px;top:' + (yEixo + 9) + 'px">' + esc(p.nome) + '</span>';
    });
    D.rodovia.patios.forEach(function (p) {
      h += '<span class="patio" style="left:' + x(p.km).toFixed(1) + 'px;top:' + (yEixo - 2) + 'px" title="' + esc(p.nome) + '"></span>';
    });
    tr.forEach(function (m) {
      var t = m.t;
      var cl = 'mk tr st-' + t.status + (m.id === recId ? ' rec' : '');
      h += '<span data-key="m' + m.id + '" class="' + cl + '" style="left:' + m.x.toFixed(1) + 'px;top:' + (yEixo - 6 - (m.row + 1) * RH + 3) + 'px" title="' +
        esc(t.id + ' · ' + ST_TXT[t.status] + ' · km ' + Math.round(posKm(t, now)) + ' ' + sentidoNome(m.h)) + '">' + t.id + (m.h ? ' <i>' + seta(m.h) + '</i>' : '') + '</span>';
    });
    cs.forEach(function (m) {
      var i = m.i;
      var cl = 'mk ch lvl-' + i.nivel + (sel && sel.c.id === i.c.id ? ' sel' : '') + (i.c.status === 'acaminho' ? ' atendida' : '');
      h += '<span data-key="k' + m.id + '" class="' + cl + '" style="left:' + m.x.toFixed(1) + 'px;top:' + (yEixo + 6 + 22 + m.row * RH) + 'px" title="' +
        esc('Chamada #' + i.c.id + ' · km ' + i.c.km + ' ' + sentidoNome(i.c.sentido) + ' · ' + NIVEL_TXT[i.nivel]) + '">#' + i.c.id + '</span>';
    });
    return h + '</div>';
  }

  /* ---------- topo ---------- */
  function topoHtml(d) {
    var ag = d.ag.length;
    function kpi(cls, num, txt, sub) {
      return '<li class="kpi ' + cls + '"><b>' + num + '</b><span>' + txt + (sub ? '<small>' + sub + '</small>' : '') + '</span></li>';
    }
    function dois(longo, curto) { return '<span class="lg">' + longo + '</span><span class="sh">' + curto + '</span>'; }
    return kpi('', ag, dois('esperando guincho', 'esperando'), '') +
      kpi(d.vaoEstourar ? 'lvl-estoura' : '', d.vaoEstourar, dois('vão estourar o prazo', 'vão estourar'), d.vaoEstourar ? 'ou já estouraram' : 'nenhum agora') +
      kpi('', d.livres + '<i> de ' + S.trucks.length + '</i>', dois('guinchos livres', 'livres'), '') +
      kpi('', S.hoje.noPrazo + '<i> de ' + S.hoje.total + '</i>', dois('chegadas no prazo hoje', 'no prazo hoje'), Math.round(S.hoje.noPrazo / S.hoje.total * 100) + '%');
  }

  function resumoFrota() {
    var c = { livre: 0, retornando: 0, acaminho: 0, nolocal: 0, reboque: 0, fora: 0 };
    S.trucks.forEach(function (t) { c[t.status]++; });
    var livres = c.livre + c.retornando;
    var partes = [
      '<b>' + livres + '</b> livres', '<b>' + c.acaminho + '</b> a caminho', '<b>' + c.nolocal + '</b> no local',
      '<b>' + c.reboque + '</b> levando', '<b>' + c.fora + '</b> fora'
    ];
    return partes.join(' · ');
  }

  /* ---------- atualização do DOM sem perder foco nem clique ---------- */
  function sincAttrs(vivo, novo) {
    var i, a;
    for (i = vivo.attributes.length - 1; i >= 0; i--) {
      a = vivo.attributes[i];
      if (!novo.hasAttribute(a.name)) vivo.removeAttribute(a.name);
    }
    for (i = 0; i < novo.attributes.length; i++) {
      a = novo.attributes[i];
      if (vivo.getAttribute(a.name) !== a.value) vivo.setAttribute(a.name, a.value);
    }
  }
  function sincNo(vivo, novo) {
    if (vivo.nodeType === 3 || vivo.nodeType === 8) {
      if (vivo.nodeValue !== novo.nodeValue) vivo.nodeValue = novo.nodeValue;
      return;
    }
    sincAttrs(vivo, novo);
    sincFilhos(vivo, novo);
  }
  function sincFilhos(vivo, novo) {
    var novos = Array.prototype.slice.call(novo.childNodes);
    var velhos = Array.prototype.slice.call(vivo.childNodes);
    var porChave = {}, usados = [], ptr = 0, i;
    velhos.forEach(function (n) { if (n.nodeType === 1 && n.hasAttribute('data-key')) porChave[n.getAttribute('data-key')] = n; });
    novos.forEach(function (nn, pos) {
      var par = null;
      if (nn.nodeType === 1 && nn.hasAttribute('data-key')) {
        par = porChave[nn.getAttribute('data-key')] || null;
      } else {
        while (ptr < velhos.length) {
          var c = velhos[ptr++];
          if (usados.indexOf(c) >= 0) continue;
          if (c.nodeType === 1 && c.hasAttribute('data-key')) continue;
          if (c.nodeType === nn.nodeType && c.nodeName === nn.nodeName) { par = c; break; }
        }
      }
      if (par) {
        usados.push(par);
        sincNo(par, nn);
        if (vivo.childNodes[pos] !== par) vivo.insertBefore(par, vivo.childNodes[pos] || null);
      } else {
        vivo.insertBefore(nn, vivo.childNodes[pos] || null);
        usados.push(nn);
      }
    });
    velhos.forEach(function (n) { if (usados.indexOf(n) < 0 && n.parentNode === vivo) vivo.removeChild(n); });
  }
  function pintar(el, html) {
    var tpl = document.createElement('template');
    tpl.innerHTML = html;
    sincFilhos(el, tpl.content);
  }

  /* ---------- desenho geral ---------- */
  var el = {};

  function render() {
    var now = agora();
    avancar(now);
    var d = derivar(now);

    el.relogio.textContent = new Date(now).toLocaleTimeString('pt-BR');
    var hh = new Date(now).getHours();
    var turno = hh >= 6 && hh < 14 ? 'manhã' : hh >= 14 && hh < 22 ? 'tarde' : 'noite';
    el.turno.textContent = new Date(now).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' }) +
      ' · turno da ' + turno + ' · ' + D.atendentes.join(' e ');

    pintar(el.kpis, topoHtml(d));

    el.titAg.textContent = 'Esperando guincho (' + d.ag.length + ')';
    el.titAc.textContent = 'Guincho a caminho (' + d.ac.length + ')';
    pintar(el.listaAg, d.ag.length ? d.ag.map(function (i) { return cardAguardando(i, d); }).join('') :
      '<li class="lista-vazia" data-key="vazio">Nenhuma chamada esperando guincho.</li>');
    pintar(el.listaAc, d.ac.length ? d.ac.map(function (i) { return cardACaminho(i, d); }).join('') :
      '<li class="lista-vazia" data-key="vazio">Nenhum guincho a caminho.</li>');

    el.resumo.innerHTML = resumoFrota();
    pintar(el.despacho, despachoHtml(d));
    pintar(el.tabela, tabelaFrota(d));
    pintar(el.estrada, estradaHtml(d, el.estrada.clientWidth || 800));

    /* avisos (chegadas, envios, desfazer) */
    pintar(el.avisos, S.avisos.slice(-3).map(function (a) {
      return '<div data-key="a' + a.id + '" class="aviso ' + a.tipo + '"><span>' + esc(a.texto) + '</span>' +
        (a.desfazer ? '<button type="button" data-acao="desfazer">Desfazer</button>' : '') + '</div>';
    }).join(''));

    document.title = (d.vaoEstourar ? '(' + d.vaoEstourar + ') ' : '') + 'Central BR-381';
  }

  /* ---------- eventos ---------- */
  function aoClicar(ev) {
    var b = ev.target.closest('[data-acao]');
    if (!b) return;
    var a = b.getAttribute('data-acao');
    if (a === 'sel') selecionar(Number(b.getAttribute('data-call')));
    else if (a === 'enviar') despachar(Number(b.getAttribute('data-call')), b.getAttribute('data-truck'));
    else if (a === 'desfazer') desfazer();
  }

  function aoTeclar(ev) {
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
    var alvo = ev.target;
    var tag = alvo && alvo.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    var d = derivar(agora());
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
      if (!d.todas.length) return;
      ev.preventDefault();
      var pos = 0;
      d.todas.forEach(function (i, n) { if (i.c.id === S.sel) pos = n; });
      pos = clamp(pos + (ev.key === 'ArrowDown' ? 1 : -1), 0, d.todas.length - 1);
      S.sel = d.todas[pos].c.id;
      render();
      var card = document.querySelector('.card[data-call="' + S.sel + '"]');
      if (card) { card.focus({ preventScroll: true }); card.scrollIntoView({ block: 'nearest' }); }
    } else if (ev.key === 'Enter') {
      var emCard = alvo && alvo.classList && alvo.classList.contains('card');
      var emOutroBotao = alvo && (tag === 'BUTTON' || tag === 'A') && !emCard;
      if (emOutroBotao) return;
      if (emCard && Number(alvo.getAttribute('data-call')) !== S.sel) return; /* primeiro Enter só marca a chamada */
      if (d.sel && d.sel.melhor) {
        ev.preventDefault();
        despachar(d.sel.c.id, d.sel.melhor.t.id);
      }
    }
  }

  function aplicaTema(t) {
    if (t) document.documentElement.setAttribute('data-tema', t);
    else document.documentElement.removeAttribute('data-tema');
  }
  function temaAtual() {
    var t = document.documentElement.getAttribute('data-tema');
    if (t) return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro';
  }

  function iniciar() {
    el.relogio = document.getElementById('relogio');
    el.turno = document.getElementById('turno');
    el.kpis = document.getElementById('kpis');
    el.titAg = document.getElementById('tit-aguardando');
    el.titAc = document.getElementById('tit-acaminho');
    el.listaAg = document.getElementById('lista-aguardando');
    el.listaAc = document.getElementById('lista-acaminho');
    el.resumo = document.getElementById('resumo-frota');
    el.despacho = document.getElementById('despacho');
    el.tabela = document.getElementById('tabela-frota');
    el.estrada = document.getElementById('estrada');
    el.avisos = document.getElementById('avisos');

    try {
      var salvo = localStorage.getItem('tema-central');
      if (salvo === 'claro' || salvo === 'escuro') aplicaTema(salvo);
    } catch (e) { /* sem armazenamento: segue o sistema */ }
    var btnTema = document.getElementById('btn-tema');
    function rotuloTema() {
      var e = temaAtual() === 'escuro';
      btnTema.textContent = e ? 'Tema escuro' : 'Tema claro';
      btnTema.setAttribute('aria-label', 'Tema ' + (e ? 'escuro' : 'claro') + ' ligado. Trocar para o tema ' + (e ? 'claro' : 'escuro'));
    }
    rotuloTema();
    if (window.matchMedia) window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', rotuloTema);
    btnTema.addEventListener('click', function () {
      var novo = temaAtual() === 'escuro' ? 'claro' : 'escuro';
      aplicaTema(novo);
      rotuloTema();
      try { localStorage.setItem('tema-central', novo); } catch (e) { /* ignora */ }
    });

    var faixa = document.querySelector('.faixa');
    var btnFaixa = document.getElementById('btn-faixa');
    function recolhe(fechar) {
      faixa.classList.toggle('fechada', fechar);
      btnFaixa.setAttribute('aria-expanded', String(!fechar));
      btnFaixa.textContent = fechar ? 'Mostrar a rodovia' : 'Ocultar';
    }
    var fechadaSalva = null;
    try { fechadaSalva = localStorage.getItem('faixa-fechada'); } catch (e) { /* ignora */ }
    /* em tela baixa a faixa começa recolhida para dar lugar à lista de guinchos */
    recolhe(fechadaSalva === null ? window.innerHeight < 860 : fechadaSalva === '1');
    btnFaixa.addEventListener('click', function () {
      var fechar = !faixa.classList.contains('fechada');
      recolhe(fechar);
      try { localStorage.setItem('faixa-fechada', fechar ? '1' : '0'); } catch (e) { /* ignora */ }
      render();
    });

    document.addEventListener('click', aoClicar);
    document.addEventListener('keydown', aoTeclar);

    render();
    setInterval(render, 1000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
