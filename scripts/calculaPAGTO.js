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
                        //n = numero de periodos
                        //i = taxa de juros

                        var v = json_obj_entrada["param"][0];
                        var i = json_obj_entrada["param"][1];
                        var n = json_obj_entrada["param"][2];

                        var strResult = (v) * (((i / 100) * Math.pow((1 + (i / 100)), n)) / (Math.pow((1 + (i / 100)), n) - 1));

                        json_output = objStdMessages.stdMessages[0].replace('__RESULT__', strResult);

                        v = null;
                        i = null;
                        n = null;

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
    doCalculaPAGTO: funMain
}