const Database = require('../db/config');

module.exports = {
    async index(req, res){
        const db = await Database();
        const roomId = req.params.room;
        const questionId = req.params.question;
        const action = req.params.action;
        const password = req.body.password; //password é o name no input

        /* Verificar se a senha está correta
        sempre passar await quando for utilizar o db */
        const verifyRoom = await db.get(`select * from rooms where id = ${roomId}`);
        if(verifyRoom.password == password){
            if(action == "delete"){
                await db.run(`delete from questions where id = ${questionId}`);
            }else if(action == "check"){
                await db.run(`update questions set read = 1 where id = ${questionId}`);
            }
            
            res.redirect(`/room/${roomId}`);
        } else {
            res.render('passincorrect', {roomId: roomId});
        }
    },

    async create(req, res){
       const db = await Database();
       const questionId = req.body.question;
       const roomId = req.params.room;

       await db.run(`insert into questions(
           titulo, salas, read) values (
               "${questionId}",
               ${roomId},
               0
        )`);

        res.redirect(`/room/${roomId}`);
    }
}