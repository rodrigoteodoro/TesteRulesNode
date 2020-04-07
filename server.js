'use strict';

var express = require('express');
const btsqlite = require('better-sqlite3');

var app = express();

/**
 * Interpretador de regras
 */
const BRules = require('./public/js/rules');

/**
 * Banco de dados
 */
const bancoModule = require('./public/js/banco');  

app.get('/list', function (req, res) {
  console.log('list');
  var retorno = {"retorno": "list"}
  res.end(JSON.stringify(retorno))
})


app.get('/calcular', function (req, res) {
  console.log('calcular');
  
  /**
   * pgtoType = 1: boleto, 2: cartao, etc...
   */
  let pgto = req.query.pgto;
  
  const order = {
    totalPrice : 0,
    pgtoType: pgto, 
    items : [
      { 
        codigo : 1, 
        quantidade: 10
      },
      { 
        codigo : 4, 
        quantidade: 1
      }

    ]
  };  

  /**
   * Path do banco de dados
   */
  var bancoObj = new bancoModule('./dados/produtos.db', btsqlite);
  
  /**
   * Path do arquivo JSON de Regras
   */
  const definitions = require("./dados/example-rules.json");  

  let bRules = new BRules(definitions, bancoObj);
  let orderP = bRules.calcular(order);
  orderP.then(
    res.end(JSON.stringify(order, null, "  "))
  );
})


var server = app.listen(5000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})

/**
 * Executar com reload
 * npx nodemon server.js
 * 
 */