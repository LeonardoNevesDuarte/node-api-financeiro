var http = require('http');
var url = require('url');
var express = require('express');
const objGeraCPF = require('./scripts/geraCPF');
const objValidaCPF = require('./scripts/validaCPF');
const objGeraCNPJ = require('./scripts/geraCNPJ');
const objValidaCNPJ = require('./scripts/validaCNPJ');
const objCalculaVF = require('./scripts/calculaVF');
const objCalculaVP = require('./scripts/calculaVP');
const objCalculaPAGTO = require('./scripts/calculaPAGTO');
const objCalculaPRICE = require('./scripts/calculaPRICE');
const objCalculaSAC = require('./scripts/calculaSAC');

var app = express();
var port = process.env.PORT || 8080;


app.use(express.json());

app.use('/',function(req, res, next) {
    console.log('URL requisitada: '+ req.url);
    next();
});

console.log("Iniciando servico de APIs");

//Mapeamento das APIs
app.get('/geraCPF',function(req, res) {
    res.json(objGeraCPF.doGeraCPF(req.body));
});

app.get('/validaCPF', function (req, res) {
    res.json(objValidaCPF.doValidaCPF(req.body));
});

app.get('/geraCNPJ', function (req, res) {
    res.json(objGeraCNPJ.doGeraCNPJ(req.body));
});

app.get('/validaCNPJ', function (req, res) {
    res.json(objValidaCNPJ.doValidaCNPJ(req.body));
});

app.get('/calculaVF', function (req, res) {
    res.json(objCalculaVF.doCalculaVF(req.body));
});

app.get('/calculaVP', function (req, res) {
    res.json(objCalculaVP.doCalculaVP(req.body));
});

app.get('/calculaPAGTO', function (req, res) {
    res.json(objCalculaPAGTO.doCalculaPAGTO(req.body));
});

app.get('/calculaPRICE', function (req, res) {
    res.json(objCalculaPRICE.doCalculaPRICE(req.body));
});

app.get('/calculaSAC', function (req, res) {
    res.json(objCalculaSAC.doCalculaSAC(req.body));
});

app.listen(port);

console.log("Servico de APIs iniciado na porta " + port);