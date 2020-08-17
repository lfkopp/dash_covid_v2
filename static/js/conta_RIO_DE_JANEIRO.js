
        $(function(){
          $.getJSON("https://raw.githubusercontent.com/lfkopp/dash_covid_v2/master/static/data/conta_RIO_DE_JANEIRO.json",
           function(data2){  
            var data = [];
            $.each( data2['diario'], function( key, val ) {
                data.push( {"label" : key,"value" : val}  );
                });
       
    
    const dataSource = {
      chart: {         exportEnabled:1,
        caption: "Numero de Casos no Estado do RJ",
        yaxisname: "Fator R0",
        anchorradius: "5",
        plottooltext: "Fator R0 na $label é <b>$dataValue</b>",
        showhovereffect: "1",
        showvalues: "0",
        numbersuffix: " ",
        theme: "fusion",
        dateformat: "mm/dd/yyyy",
        anchorbgcolor: "#72D7B2",
        palettecolors: "#72D7B2",
        yAxisMaxValue: "2.5",
        yAxisMinValue: "0"
      },
      data:data,
    
            "annotations": {
    
              "autoscale": "1",
              "showBelow": "0",
              "groups": [{
                "id": "arcs",
                "items": [
                  { "id": "national-cs-text", "type": "Text", "color": "#000000", "label": "Produzido por Labnet (http://labnet.nce.ufrj.br)", "fontSize": "12", "align": "left", "x": "540", "y": "290" },
                  { "id": "national-cs-text", "type": "Text", "color": "#000000", "label": "contato: kopp@labnet.nce.ufrj.br", "fontSize": "12", "align": "left", "x": "540", "y": "310" },
                ]
              }]
            },
    
    };
    
    FusionCharts.ready(function() {
      var myChart = new FusionCharts({
        type: "splinearea",
        renderAt: "conta_rio_de_janeiro",
        width: '900',
          height: '370',
    
        dataFormat: "json",
        dataSource
    }).render();
      });
    }
          );
        })();
    
      