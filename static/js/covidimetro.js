$(function(){
    $.getJSON("https://raw.githubusercontent.com/lfkopp/dash_covid_v2/master/data/covidimetro.json",
     function(data){  
      var valor = data['value'];


FusionCharts.ready(function () {
  var cSatScoreChart = new FusionCharts({
    type: 'angulargauge',
    renderAt: 'covidimetro',
    width: '900',
    height: '370',
    dataFormat: 'json',
    dataSource: {
      chart: {
        exportEnabled:1,
        gaugeStartAngle: "180",
        gaugeEndAngle: "10",
        majorTMHeight: "25",
        caption: "Covidímetro UFRJ",
        subcaption: "Fator R0 de Transmissão da COVID-19 no RJ",
        lowerlimit: "0",
        upperlimit: "2.5",
        showvalue: "2.5",
        numbersuffix: "",
        theme: "fusion",
        adjustTM: "0",
        majorTMNumber: "11",
        placeTicksInside: "0",
        placeValuesInside: "0",
        tickValueDecimals: "2",
        forceTickValueDecimals: "1",
        valueFontSize: "60",
        valueFontBold: "1",
        pivotBorderColor: "#333333",
        pivotBorderAlpha: "100",
        pivotRadius: "15"
      },
      colorrange: {
        color: [
          { minvalue: "0", maxvalue: ".5", code: "#006633" },
          { minvalue: ".5", maxvalue: ".9", code: "#33dd33" },
          { minvalue: "0.9", maxvalue: "1.2", code: "#dddd33" },
          { minvalue: "1.2", maxvalue: "1.65", code: "#ffbb66" },
          { minvalue: "1.65", maxvalue: "2", code: "#ee0000" },
          { minvalue: "2", maxvalue: "2.5", code: "#663399" }
        ]
      },
      "dials": {
        "dial": [{
          value: valor,
          tooltext: "R0",
          color: "#000000",
          valueX: "360",
          valueY: "300",
        }]
      },
      "trendPoints": {

        "point": [
          {
            "startValue": "2",
            "endValue": "2.5",
            "color": "#0075c2",
            "radius": "225",
            "innerRadius": "60"
          }
        ]
      },
      "annotations": {

        "autoscale": "1",
        "showBelow": "0",
        "groups": [{
          "id": "arcs",
          "items": [
            { "id": "national-cs-bg", "type": "rectangle", "x": "6", "y": "6", "tox": "210", "toy": "26", "fillcolor": "#006633" },
            { "id": "national-cs-text", "type": "Text", "color": "#ffffff", "label": "Risco Muito Baixo", "fontSize": "12", "align": "left", "x": "9", "y": "16" },
            { "id": "national-cs-bg", "type": "rectangle", "x": "6", "y": "26", "tox": "210", "toy": "46", "fillcolor": "#33dd33" },
            { "id": "national-cs-text", "type": "Text", "color": "#ffffff", "label": "Risco Baixo", "fontSize": "12", "align": "left", "x": "9", "y": "36" },
            { "id": "national-cs-bg", "type": "rectangle", "x": "6", "y": "46", "tox": "210", "toy": "66", "fillcolor": "#dddd33" },
            { "id": "national-cs-text", "type": "Text", "color": "#ffffff", "label": "Risco Moderado", "fontSize": "12", "align": "left", "x": "9", "y": "56" },
            { "id": "national-cs-bg", "type": "rectangle", "x": "6", "y": "66", "tox": "210", "toy": "86", "fillcolor": "#ffbb66" },
            { "id": "national-cs-text", "type": "Text", "color": "#ffffff", "label": "Risco Alto", "fontSize": "12", "align": "left", "x": "9", "y": "76" },
            { "id": "national-cs-bg", "type": "rectangle", "x": "6", "y": "86", "tox": "210", "toy": "106", "fillcolor": "#ee0000" },
            { "id": "national-cs-text", "type": "Text", "color": "#ffffff", "label": "Risco Muito Alto", "fontSize": "12", "align": "left", "x": "9", "y": "96" },
            { "id": "national-cs-bg", "type": "rectangle", "x": "6", "y": "106", "tox": "210", "toy": "126", "fillcolor": "#0075c2" },
            { "id": "national-cs-text", "type": "Text", "color": "#ffffff", "label": "Isolamento Social Necessário", "fontSize": "12", "align": "left", "x": "9", "y": "116" },
            { "id": "national-cs-text", "type": "Text", "color": "#000000", "label": "Produzido por Labnet (http://labnet.nce.ufrj.br)", "fontSize": "12", "align": "left", "x": "590", "y": "340" },
            { "id": "national-cs-text", "type": "Text", "color": "#000000", "label": "contato: kopp@labnet.nce.ufrj.br", "fontSize": "12", "align": "left", "x": "590", "y": "360" },
          ]
        }]
      }
    }
  }).render();
});
}
    );
  })();


