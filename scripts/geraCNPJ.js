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
                                ary.push(geraNovoCNPJValido(ary));
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

                            json_output = objStdMessages.stdMessages[0].replace('__RESULT__', result);

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

     
var geraNovoCNPJValido = function (aryValores) {
    
    blnTentaGerarCNPJ = true;
    
    while (blnTentaGerarCNPJ) {
        
        var auxNovoCNPJ = geraCNPJ();
        if (objValidacoes.doValidaCNPJ_lib(auxNovoCNPJ)) {
        //if(true) {
            
            if (objValidacoes.doProcuraElemento_lib(aryValores, auxNovoCNPJ)) {
                blnTentaGerarCNPJ = true;
            } else {
                blnTentaGerarCNPJ = false;
            }
        } 
    }
    blnTentaGerarCNPJ = null;
    
    return auxNovoCNPJ;
    
}

function geraCNPJ() {
    
    var auxCNPJ = "";
    var dv1 = "";
    var dv2 = "";
    
    //Gerando radical do CNPJ
    for(var a = 0; a < 8; a++) {
        auxCNPJ = auxCNPJ + Math.floor(Math.random() * 10);
    }
    auxCNPJ = auxCNPJ + '0001';
        
    //Calculado DV1
    var auxDV1 = 0;
    var auxMult = 5;
     
    for(var a = 0; a < 12; a++) {
        auxDV1 = auxDV1+(auxCNPJ[a]*auxMult);
        if(auxMult == 2) {
            auxMult = 9;
        } else {
            auxMult--;
        }
    }
    auxMult = null;
    
    var auxRestoDV1 = auxDV1 % 11;
    var dv1;
    
    if(auxRestoDV1 < 2) {
        dv1 = 0;
    } else {
        dv1 = 11 - auxRestoDV1;
    }
    auxRestoDV1 = null;
    auxDV1 = null;
    
    auxCNPJ = auxCNPJ + dv1;
        
    //Calculado DV2
    var auxDV2 = 0;
    var auxMult = 6;
    for(var a = 0; a < 13; a++) {
        auxDV2 = auxDV2+(auxCNPJ[a]*auxMult);
        if(auxMult == 2) {
            auxMult = 9;
        } else {
            auxMult--;
        }
    }
    auxMult = null;
    
    var auxRestoDV2 = auxDV2 % 11;
    var dv2;
    
    if(auxRestoDV2 < 2) {
        dv2 = 0;
    } else {
        dv2 = 11 - auxRestoDV2;
    }
    auxRestoDV2 = null;
    auxDV2 = null;
    
    auxCNPJ = auxCNPJ + dv2;
 
    a = null;
    dv1 = null;
    dv2 = null;
    
    return auxCNPJ;
    
    auxCNPJ = null;
}


module.exports = {
    doGeraCNPJ: funMain
}