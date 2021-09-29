# node-api

## Índice
* [Informações gerais](#informações-gerais)
* [Dependências](#dependencias)
* [Gerador de CPF](#geraCPF)
* [Validador de CPF](#validaCPF)
* [Gerador de CNPJ](#geraCNPJ)
* [Validador de CNPJ](#validaCNPJ)
* [Setup](#setup)

## Informações Gerais
* Toda a biblioteca foi desenvolvida em Node.js com foco em cálculos financeiros
* Chamadas e saídas em formato JSON
* APIs para uso público

## Dependências
* Node module: express

## geraCPF
* Arquivo: geraCPF.js
* Gerador de CPFs válidos para uso em teste de aplicações
* URL: http://.../geraCPF
* Body => JSON
```
{ "authKey":"", "param": [#]} onde # é a quantidade de CPFs a serem gerados
```
* Method: GET
* Retorno:
```
{
    "statCode": "<status code>",
    "statMsg": "<status message>",
    "result": ["###########","###########"] onde ########### são CPFs gerados
}
```
* Os stat codes e messages podem ser vistos em include/std_messages_api.js

## validaCPF
* Arquivo: validaCPF.js
* Verificador de número de CPF
* URL: http://.../validaCPF
* Body => JSON
``` 
{ "authKey":"", "param": ["###########","###########"]} onde ########### são CPFs a serem validados
```
* Method: GET ou POST
* Retorno:
```
{
    "statCode": "<status code>",
    "statMsg": "<status message>",
    "result": [#,#] onde # = 0 para CPF inválido e 1 para CPF válido 
}
```
* Os stat codes e messages podem ser vistos em include/std_messages_api.js

## geraCNPJ
* Arquivo: geraCNPJ.js
* Gerador de CNPJs válidos para uso em teste de aplicações
* URL: http://.../geraCNPJ
* Body => JSON 
```
{ "authKey":"", "param": [#]} onde # é a quantidade de CNPJs a serem gerados
```
* Method: GET
* Retorno:
```
{
    "statCode": "<status code>",
    "statMsg": "<status message>",
    "result": "result": ["###########","###########"] onde ########### são CNPJss gerados
}
```
* Os stat codes e messages podem ser vistos em include/std_messages_api.js

## validaCNPJ
* Arquivo: validaCNPJ.js
* Validador de número de CNPJ
* URL: http://.../validaCNPJ
* Body => JSON
```
{ "authKey":"", "param": ["###########","###########"]} onde ########### são CNPJs a serem validados
```
* Method: GET ou POST
* Retorno:
```
{
    "statCode": "<status code>",
    "statMsg": "<status message>",
    "result": [#,#] onde # = 0 para CNPJ inválido e 1 para CNPJ válido 
}
```
* Os stat codes e messages podem ser vistos em include/std_messages_api.js

## Setup
* Basta copiar os arquivos para uma pasta e executar o node
* Por definição, o serviço é executado na porta 8080 do TCP/IP mas pode ser trocado pela edição do arquivo app.js na linha process.env.PORT
```
var port = process.env.PORT || 8080;
```