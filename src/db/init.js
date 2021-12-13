const Database = require('./config')

const initDb = {
    //async é necessário para rodar await
    async init(){
        //await(significa esperar)= só roda a próxima linha caso a linha tenha terminado
        //toda a sua execuçãok
        const db = await Database();

        
        await db.exec(`
            create table rooms (
            id integer primary key,
            password text
        )`);
        
        
        await db.exec(`
            create table questions (
            id integer primary key autoincrement,
            titulo text,
            read int,
            salas int
        )`);

       await db.close();
    }
}

initDb.init();

