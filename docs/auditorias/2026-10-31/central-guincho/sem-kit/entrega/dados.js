/* DADOS DE EXEMPLO da central de guincho.
   Tudo aqui é inventado (nomes, placas, telefones, seguradoras, km).
   Os horários são relativos ao instante em que a tela abre: em(-41) = 41 minutos atrás.
   Para ligar a um sistema de verdade, troque este arquivo por uma carga real com o mesmo formato.

   Régua da rodovia: km 0 em Extrema, cresce rumo a Belo Horizonte (sentido "BH").
   Sentido "SP" é o contrário (km diminui). */
(function () {
  var MIN = 60000;
  var T0 = Date.now();
  function em(n) { return T0 + n * MIN; }

  window.DADOS = {
    rodovia: {
      nome: 'BR-381 Fernão Dias',
      kmMax: 470,
      pontos: [
        { km: 0, nome: 'Extrema' },
        { km: 28, nome: 'Camanducaia', mostrar: false },
        { km: 115, nome: 'Pouso Alegre' },
        { km: 190, nome: 'Varginha' },
        { km: 245, nome: 'Lavras' },
        { km: 325, nome: 'Oliveira' },
        { km: 440, nome: 'Igarapé', mostrar: false },
        { km: 470, nome: 'Contagem' }
      ],
      patios: [
        { km: 3, nome: 'Pátio Extrema' },
        { km: 112, nome: 'Pátio Pouso Alegre' },
        { km: 465, nome: 'Pátio Contagem' }
      ]
    },

    atendentes: ['Marcos', 'Joana'],

    /* Chegadas de hoje (já fechadas) antes de a tela abrir. */
    hoje: { total: 17, noPrazo: 15 },

    /* status: livre | retornando | acaminho | nolocal | reboque | fora
       head: sentido em que está virado ('BH', 'SP') ou null se parado no pátio
       rota: quando está em movimento (origemKm -> destKm) */
    guinchos: [
      { id: 'G01', tipo: 'prancha', motorista: 'Anderson', status: 'nolocal', km: 72, head: 'BH',
        chamada: 4862, chegouEm: em(-14), liberaEm: em(16) },

      { id: 'G02', tipo: 'prancha', motorista: 'Rogério', status: 'livre', km: 465, head: null,
        nota: 'Pátio Contagem' },

      { id: 'G03', tipo: 'prancha', motorista: 'Marcelo', status: 'livre', km: 112, head: null,
        nota: 'Pátio Pouso Alegre' },

      { id: 'G04', tipo: 'prancha', motorista: 'Wesley', status: 'acaminho', chamada: 4870,
        rota: { origemKm: 100, destKm: 60, partiuEm: em(-12), chegadaEm: em(18) } },

      { id: 'G05', tipo: 'prancha', motorista: 'Sandro', status: 'livre', km: 255, head: 'BH',
        nota: 'Parado no posto do km 255' },

      { id: 'G06', tipo: 'prancha', motorista: 'Valdir', status: 'reboque',
        servico: { carga: 'Corolla', destino: 'Pátio Contagem' },
        rota: { origemKm: 415, destKm: 465, partiuEm: em(-14), chegadaEm: em(31) } },

      { id: 'G07', tipo: 'prancha', motorista: 'Ítalo', status: 'retornando',
        servico: { destino: 'Pátio Pouso Alegre' },
        rota: { origemKm: 345, destKm: 112, partiuEm: em(-3), chegadaEm: em(172) } },

      { id: 'G08', tipo: 'prancha', motorista: 'Thiago', status: 'nolocal', km: 192, head: 'SP',
        chamada: 4866, chegouEm: em(-6), liberaEm: em(14) },

      { id: 'G09', tipo: 'prancha', motorista: 'Edson', status: 'acaminho', chamada: 4868,
        rota: { origemKm: 283, destKm: 334, partiuEm: em(-20), chegadaEm: em(18) } },

      { id: 'G10', tipo: 'prancha', motorista: 'Leandro', status: 'acaminho', chamada: 4869,
        rota: { origemKm: 395, destKm: 367, partiuEm: em(-9), chegadaEm: em(12) } },

      { id: 'G11', tipo: 'prancha', motorista: 'Cássio', status: 'acaminho', chamada: 4873,
        rota: { origemKm: 200, destKm: 240, partiuEm: em(-5), chegadaEm: em(25) } },

      { id: 'G12', tipo: 'pesado', motorista: 'Josué', status: 'reboque',
        servico: { carga: 'Carreta', destino: 'Oficina parceira (km 140)' },
        rota: { origemKm: 175, destKm: 140, partiuEm: em(-17), chegadaEm: em(14) } },

      { id: 'G13', tipo: 'pesado', motorista: 'Nelson', status: 'livre', km: 3, head: null,
        nota: 'Pátio Extrema' },

      { id: 'G14', tipo: 'pesado', motorista: 'Reinaldo', status: 'fora', km: 465, head: null,
        nota: 'Manutenção: troca de embreagem' }
    ],

    /* status: aguardando (sem guincho) | acaminho | nolocal
       guincho: 'prancha' (carro, SUV, moto) ou 'pesado' (caminhão, ônibus)
       tipo: 'seguradora' (prazo de contrato) ou 'particular' (meta interna) */
    chamadas: [
      { id: 4871, tipo: 'seguradora', cliente: 'Aurora Seguros', contato: 'Marta R.', telefone: '(35) 90000-1411',
        abertaEm: em(-41), prazoMin: 60, km: 238, sentido: 'SP', guincho: 'prancha',
        veiculo: 'Chevrolet Onix', placa: 'QWE4F12', problema: 'Não liga, pane mecânica',
        obs: 'Cliente no acostamento, com duas crianças.', status: 'aguardando' },

      { id: 4874, tipo: 'particular', cliente: 'Particular', contato: 'Carlos H.', telefone: '(35) 90000-2208',
        abertaEm: em(-29), prazoMin: 60, km: 96, sentido: 'BH', guincho: 'prancha',
        veiculo: 'VW Saveiro', placa: 'RTA8C55', problema: 'Pneu furado, sem estepe',
        obs: '', status: 'aguardando' },

      { id: 4876, tipo: 'seguradora', cliente: 'Mineira Seguros', contato: 'Paulo S.', telefone: '(31) 90000-3377',
        abertaEm: em(-13), prazoMin: 60, km: 441, sentido: 'SP', guincho: 'prancha',
        veiculo: 'Fiat Strada', placa: 'PUK2J90', problema: 'Colisão leve, sem vítimas',
        obs: 'Roda dianteira travada, não anda.', status: 'aguardando' },

      { id: 4877, tipo: 'seguradora', cliente: 'Vale Auto Seguros', contato: 'Motorista Jair', telefone: '(35) 90000-4590',
        abertaEm: em(-6), prazoMin: 60, km: 160, sentido: 'BH', guincho: 'pesado',
        veiculo: 'VW Constellation (caminhão)', placa: 'OLM6D31', problema: 'Cavalo mecânico quebrado',
        obs: 'Carregado, carga de bebidas. Precisa de guincho pesado.', status: 'aguardando' },

      { id: 4878, tipo: 'particular', cliente: 'Particular', contato: 'Fernanda L.', telefone: '(35) 90000-5126',
        abertaEm: em(-3), prazoMin: 60, km: 128, sentido: 'SP', guincho: 'prancha',
        veiculo: 'Hyundai HB20', placa: 'SGH1B47', problema: 'Bateria descarregada, não pega',
        obs: '', status: 'aguardando' },

      { id: 4868, tipo: 'seguradora', cliente: 'Mineira Seguros', contato: 'Renato T.', telefone: '(35) 90000-6643',
        abertaEm: em(-49), prazoMin: 60, km: 334, sentido: 'BH', guincho: 'prancha',
        veiculo: 'VW Gol', placa: 'NKB5E08', problema: 'Motor superaqueceu',
        obs: '', status: 'acaminho', truck: 'G09' },

      { id: 4869, tipo: 'seguradora', cliente: 'Aurora Seguros', contato: 'Luciana M.', telefone: '(31) 90000-7719',
        abertaEm: em(-40), prazoMin: 60, km: 367, sentido: 'SP', guincho: 'prancha',
        veiculo: 'Renault Kwid', placa: 'QZC3H66', problema: 'Pneu estourado',
        obs: '', status: 'acaminho', truck: 'G10' },

      { id: 4870, tipo: 'particular', cliente: 'Particular', contato: 'Roberto D.', telefone: '(35) 90000-8052',
        abertaEm: em(-28), prazoMin: 60, km: 60, sentido: 'SP', guincho: 'prancha',
        veiculo: 'Honda Civic', placa: 'PJD7A19', problema: 'Batida leve, radiador vazando',
        obs: '', status: 'acaminho', truck: 'G04' },

      { id: 4873, tipo: 'seguradora', cliente: 'Vale Auto Seguros', contato: 'Elaine C.', telefone: '(35) 90000-9264',
        abertaEm: em(-14), prazoMin: 60, km: 240, sentido: 'BH', guincho: 'prancha',
        veiculo: 'Jeep Compass', placa: 'RBV9G73', problema: 'Perde potência, luz de injeção',
        obs: '', status: 'acaminho', truck: 'G11' },

      /* Atendimentos em curso, só para a frota contar a história. */
      { id: 4862, tipo: 'seguradora', cliente: 'Mineira Seguros', abertaEm: em(-71), prazoMin: 60,
        km: 72, sentido: 'BH', guincho: 'prancha', veiculo: 'Toyota Etios', problema: 'Bateria',
        status: 'nolocal', truck: 'G01', chegouEm: em(-14) },
      { id: 4866, tipo: 'particular', cliente: 'Particular', abertaEm: em(-52), prazoMin: 60,
        km: 192, sentido: 'SP', guincho: 'prancha', veiculo: 'Ford Ka', problema: 'Colisão',
        status: 'nolocal', truck: 'G08', chegouEm: em(-6) }
    ]
  };
})();
