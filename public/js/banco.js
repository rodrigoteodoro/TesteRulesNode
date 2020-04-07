class Banco {

      //TODO Versionar o banco e as regras devem ser calculadas de acordo com a versão do banco. 

    constructor(dbPath, btsqlite) {

        console.log("constructor");
        this.cod = 1;
        this._dbpath = dbPath;
        this._db = btsqlite
        console.log("DB " + this._dbpath);        
    }

    buscarPreco(codigo) {
        console.log("buscarPreco " + this._dbpath);
        var db = new this._db(this._dbpath);
        const row = db.prepare('SELECT pf0 as preco FROM produto WHERE id=?').get(codigo);
        //console.log("row " + row);
        return row.preco
    }

    consulta(query) {
        console.log("consulta " + query);
        var db = new this._db(this._dbpath);
        const row = db.prepare(query).all();
        return row
    }

}

module.exports = Banco;