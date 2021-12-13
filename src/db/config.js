const sqlite3 = require("sqlite3");
const { open } = require("sqlite");//vai dentro do sqlite e busca somente a função open

module.exports = () => 
    open({//Sempre abre a conexão
        filename: './src/db/rocketq.sqlite', //caminho do BD será guardado na pasta db
        //rocketq= nome do BD

        //driver é quem comanda o banco de dados
        driver: sqlite3.Database,
});
