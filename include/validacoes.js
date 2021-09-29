var doValidaCPF_lib = function (cpf) {

    // Verifica se um número foi informado
    if (cpf == null || cpf == "") {
        return false;
    }

    // Elimina possivel mascara
    //cpf = preg_replace("/[^0-9]/", "", cpf);
    //cpf = str_pad(cpf, 11, '0', STR_PAD_LEFT);

    // Verifica se o numero de digitos informados é igual a 11
    if (cpf.length != 11) {
        return false;
    }
    // Verifica se nenhuma das sequências invalidas abaixo
    // foi digitada. Caso afirmativo, retorna falso
    else if (cpf == '00000000000' ||
        cpf == '11111111111' ||
        cpf == '22222222222' ||
        cpf == '33333333333' ||
        cpf == '44444444444' ||
        cpf == '55555555555' ||
        cpf == '66666666666' ||
        cpf == '77777777777' ||
        cpf == '88888888888' ||
        cpf == '99999999999') {
        return false;
        // Calcula os digitos verificadores para verificar se o
        // CPF é válido
    } else {

        for (var t = 9; t < 11; t++) {

            for (var d = 0, c = 0; c < t; c++) {
                d += cpf[c] * ((t + 1) - c);
            }
            d = ((10 * d) % 11) % 10;
            if (cpf[c] != d) {
                return false;
            }
        }
        return true;
    }
};

var doValidaCNPJ_lib = function (cnpj) {

    // Verifica se um número foi informado
    if (cnpj == null || cnpj == "") {
        return false;
    }

    // Elimina possivel mascara
    //$cnpj = preg_replace("/[^0-9]/", "", $cnpj);
    //$cnpj = str_pad($cnpj, 14, '0', STR_PAD_LEFT);

    // Verifica se o numero de digitos informados é igual a 14
    if ((cnpj.length) != 14) {
        return false;
    }

    // Verifica se nenhuma das sequências invalidas abaixo
    // foi digitada. Caso afirmativo, retorna falso
    else if (cnpj == '00000000000000' ||
        cnpj == '11111111111111' ||
        cnpj == '22222222222222' ||
        cnpj == '33333333333333' ||
        cnpj == '44444444444444' ||
        cnpj == '55555555555555' ||
        cnpj == '66666666666666' ||
        cnpj == '77777777777777' ||
        cnpj == '88888888888888' ||
        cnpj == '99999999999999') {
        return false;

        // Calcula os digitos verificadores para verificar se o
        // CNPJ é válido
    } else {

        var j = 5;
        var k = 6;
        var soma1 = 0;
        var soma2 = 0;

        for (var i = 0; i < 13; i++) {

            j = j == 1 ? 9 : j;
            k = k == 1 ? 9 : k;

            soma2 += (cnpj[i] * k);

            if (i < 12) {
                soma1 += (cnpj[i] * j);
            }

            k--;
            j--;
        }

        var digito1 = soma1 % 11 < 2 ? 0 : 11 - soma1 % 11;
        var digito2 = soma2 % 11 < 2 ? 0 : 11 - soma2 % 11;

        return ((cnpj[12] == digito1) && (cnpj[13] == digito2));

    }
}

var doProcuraElemento_lib = function(varAry, varElemento) {
    if (varAry.length > 0) {
        for(var i = 0; i < varAry.length; i++) {
            if(varAry[i] == varElemento) {
                break;
                return true;
            }
        }
    } else {
        return false;
    }
};

module.exports = {
    doValidaCPF_lib,
    doValidaCNPJ_lib,
    doProcuraElemento_lib
}