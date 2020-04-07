'use strict';

const Engine = require("rules-js");

/**
 * Classe de regras
 * @see https://github.com/bluealba/rules-js#usage-example
 */
class BRules {

    constructor(definitions, bancoObj) {
        
        this.bancoObj = bancoObj;
        this._engine = new Engine();
        this._engine.closures.add("calculateTotalPrice", (fact, context) => {
            console.log('calculateTotalPrice');
            //Desconto no valor do boleto
            fact.totalDiscount = 0;
            if (fact.pgtoType == 1) {
                fact.totalDiscount = parseFloat((fact.totalPrice * 0.10).toFixed(2));
            } 
            fact.totalPrice = parseFloat((fact.totalPrice - fact.totalDiscount).toFixed(2));
            return fact;
        });

        this._engine.closures.add("calculateItemPrice", (fact, context) => {
            console.log('calculateItemPrice');
            var valorTotal = 0.0;
            fact.items.forEach(el => {
                var query = `SELECT produto, pf0 as preco FROM produto WHERE id=${el.codigo}`;
                var rowPreco = this.bancoObj.consulta(query);        
                el.valorUnitario = rowPreco[0].preco;
                el.valor = parseFloat((el.valorUnitario * el.quantidade).toFixed(2));
                valorTotal += el.valor;
                el.nome = rowPreco[0].produto;
            }) ;
            fact.totalItems = valorTotal;
            fact.totalPrice = fact.totalItems;
            return fact;
        });
        
        this._engine.closures.add("always", (fact, context) => {
            console.log('always');
            return true;
        });        
        
        this._engine.add(definitions);

    }

    calcular(order)  {
        return this._engine.process("process-orders", order);
    }

}

module.exports = BRules;
