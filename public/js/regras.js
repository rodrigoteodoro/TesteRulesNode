module.exports = {
    desconto: function (codigo) {        
        var x = 20;
        return x
    },
    preco: function (banco, codigo) {        
        var valor = 0;
        var query = `SELECT pf0 as preco FROM produto WHERE id=${codigo}`;
        var rowPreco = banco.consulta(query);        
        valor = rowPreco[0].preco;
        return valor
    }
};