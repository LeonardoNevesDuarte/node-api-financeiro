const objStdMessages = require('../include/std_messages_api');
const objValidacoes = require('../include/validacoes');

var funMain = function (json_obj_entrada) {
    var result;
    var json_output;

    console.log("Parametros de entrada: " + JSON.stringify(json_obj_entrada));

    if (json_obj_entrada.length < 2) {
        json_output = objStdMessages.stdMessages[3];
    } else {

        if (json_obj_entrada["authKey"] == null || json_obj_entrada["param"] == null) {
            json_output = objStdMessages.stdMessages[3];
        } else {

            if (json_obj_entrada["authKey"] != null) {
                //Verifica a permissao de uso
                //Como eh publica, todos podem usar
                if (true) {

                    if (json_obj_entrada["param"].length != 3) {
                        //Bad request
                        json_output = objStdMessages.stdMessages[4].replace('__RESULT__', '"Parametros invalidos. Utilizar: Valor Financiado, Tx. Juros, Periodos"');
                    } else {
                        //Executa o codigo da API
                        //Parametros esperados
                        //V = valor financiado
                        //i = taxa de juros
                        //n = numero de periodos

                        var v = json_obj_entrada["param"][0];
                        var i = json_obj_entrada["param"][1];
                        var n = json_obj_entrada["param"][2];   
                        
                        var aryResultado = [];
                        
                        var juros = v * (i / 100);
                        var pmt = (v / n) + juros;
                        var amort = (v / n);
                        var saldo = v - amort;

                        for (var a = 0; a < n; a++) {
                            //Colunas Mes / Prestacao / Amortizacao / Juros / Saldo Devedor
                            var aux = [(a + 1), pmt.toFixed(2), amort.toFixed(2), juros.toFixed(2), saldo.toFixed(2)];
                            aryResultado.push(aux);

                            juros = saldo * (i / 100);
                            saldo = saldo - amort;
                            pmt = amort + juros;

                        }
                        a = null;

                        var strSep = "";
                        var strResult = '[';

                        for (var a = 0; a < aryResultado.length; a++) {
                            strResult = strResult + strSep + "[" + aryResultado[a][0] + "," + aryResultado[a][1]+ "," + aryResultado[a][2] + "," + aryResultado[a][3] + "," + aryResultado[a][4] + "]";
                            if (a == 0) { strSep = ","; }
                        }
                        a = null;
                        strSep = null;
                        strResult = strResult +']';

                        json_output = objStdMessages.stdMessages[0].replace('__RESULT__', strResult);
                      
                        vp= null;
                        i = null;
                        n = null;
                        strResult = null;
                        juros = null;
                        pmt = null;
                        amort = null;
                        saldo = null;
                        aryResultado = null;
                       
                    } 
                } else {
                    //Forbidden
                    json_output = objStdMessages.stdMessages[2];
                }

            } else {
                //Forbidden
                json_output = objStdMessages.stdMessages[2];
            }

        }
    }
    return JSON.parse(json_output);
}    

module.exports = {
    doCalculaSAC: funMain
}