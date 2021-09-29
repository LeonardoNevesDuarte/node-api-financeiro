const objStdMessages = require('../include/std_messages_api');
const objValidacoes = require('../include/validacoes');


var funMain = function (json_obj_entrada) {
    var result;
    var json_output;
    var strSeparador;

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

                    if (json_obj_entrada["param"][0] != "") {
                        //Executa o codigo da API

                        var ary = [];

                        for (var i = 0; i < (json_obj_entrada["param"]).length; i++) {
                            if (objValidacoes.doValidaCNPJ_lib(json_obj_entrada["param"][i])) {
                                ary.push(1);
                            } else {
                                ary.push(0);
                            }
                        }
                        i = null;

                        var strResult = "[";
                        var strSeparador = "";

                        for (var i = 0; i < (ary).length; i++) {
                            strResult = strResult + strSeparador + ary[i];
                            (i == 0 ? strSeparador = "," : true);
                        }
                        i = null;
                        strSeparador = null;
                        ary = null;
                        strResult = strResult + "]";

                        json_output = objStdMessages.stdMessages[0].replace('__RESULT__', strResult);
                        strResult = null;

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


module.exports = {
    doValidaCNPJ: funMain
}