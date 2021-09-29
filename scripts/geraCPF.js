const objStdMessages = require('../include/std_messages_api');
const objValidacoes = require('../include/validacoes');

var funMain = function (json_obj_entrada) {
    var result;
    var json_output;
    var strSeparador;

    console.log("Parametros de entrada: " + JSON.stringify(json_obj_entrada));

    if ((json_obj_entrada.length) < 2) {
        json_output = objStdMessages.stdMessages[3];
    } else {

        if (json_obj_entrada["authKey"] == null || json_obj_entrada["param"] == null) {
            json_output = objStdMessages.stdMessages[3];
        } else {

            if (json_obj_entrada["authKey"] != null) {
                //Verifica a permissao de uso
                //Como eh publica, todos podem usar
                if (true) {

                    if (json_obj_entrada["param"][0] != "" && json_obj_entrada["param"][0] != 0 && Number.isInteger(json_obj_entrada["param"][0])) {
                        //Executa o codigo da API
                        if (Math.round(json_obj_entrada["param"][0]) <= 100) {

                            var ary = [];

                            for (var i = 0; i < Math.round(json_obj_entrada["param"][0]); i++) {
                                ary.push(geraNovoCPFValido(ary));
                            }
                            i = null;

                            result = "[";
                            strSeparador = "";
                            for (var i = 0; i < (ary.length); i++) {
                                result = result + strSeparador + '"' + ary[i] + '"';
                                (i == 0 ? strSeparador = "," : true);
                            }
                            i = null;
                            strSeparador = null;
                            ary = null;
                            result = result + "]";

                            json_output = objStdMessages.stdMessages[0].replace('__RESULT__',result);

                            result = null;
                        } else {
                            //server error
                            json_output = objStdMessages.stdMessages[1].replace('__RESULT__', '"Qtd de elementos maior que o limite permitido"');
                        }
                    } else {
                        //Server error
                        json_output = objStdMessages.stdMessages[1].replace('__RESULT__', '{}');
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

var geraNovoCPFValido = function (aryValores) {
    var blnTentaGerarCPF = true;

    while (blnTentaGerarCPF) {
        var auxNovoCPF = geraCPF();
        if (objValidacoes.doValidaCPF_lib(auxNovoCPF)) {

            if (objValidacoes.doProcuraElemento_lib(aryValores, auxNovoCPF)) {
                blnTentaGerarCPF = true;
            } else {
                blnTentaGerarCPF = false;
            }
        }
    }
    blnTentaGerarCPF = null;
    return auxNovoCPF;
}

var geraCPF = function() {

    var auxCPF = "";
    var dv1 = "";
    var dv2 = "";

    //Gerando radical do CPF
    for (var a = 0; a < 9; a++) {
        auxCPF = auxCPF + Math.floor(Math.random() * 10);
    }

    //Calculado DV1
    var auxDV1 = 0;
    var auxMult = 10;

    for (var a = 0; a < 9; a++) {
        auxDV1 = auxDV1 + (auxCPF[a] * auxMult);
        auxMult--;
    }
    auxMult = null;

    var auxRestoDV1 = auxDV1 % 11;

    if (auxRestoDV1 < 2) {
        dv1 = 0;
    } else {
        dv1 = 11 - auxRestoDV1;
    }

    auxRestoDV1 = null;
    auxDV1 = null;

    auxCPF = auxCPF + dv1;

    //Calculado DV2
    var auxDV2 = 0;
    var auxMult = 11;
    for (var a = 0; a < 10; a++) {
        auxDV2 = auxDV2 + (auxCPF[a] * auxMult);
        auxMult--;
    }
    auxMult = null;

    var auxRestoDV2 = auxDV2 % 11;

    if (auxRestoDV2 < 2) {
        dv2 = 0;
    } else {
        dv2 = 11 - auxRestoDV2;
    }
    auxRestoDV2 = null;
    auxDV2 = null;

    auxCPF = auxCPF + dv2;

    a = null;
    dv1 = null;
    dv2 = null;

    return auxCPF;
    
    auxCPF = null;
}

module.exports = {
    doGeraCPF: funMain
}