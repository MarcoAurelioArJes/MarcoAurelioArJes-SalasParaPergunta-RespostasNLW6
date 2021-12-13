const Database = require("../db/config");

module.exports = {
    async create(req, res){
        const db = await Database();
        const password = req.body.password
        let roomId = "";
        let isRoom = true;

        while(isRoom){
            /* Cria o número da sala */
            for(var i = 0; i < 6; i++){
                roomId += Math.floor(Math.random() * 10)//números de 0 a 9 se quisessemos 5 seria * 5
                
                //roomId += Math.floor(Math.random() * 10).toString()
            }

            /* Verifica se esse número já existe */
            const roomsExistIds = await db.all(`select id from rooms`);
            isRoom = roomsExistIds.some(roomsExistId => roomsExistId === roomId);
            
            if(!isRoom){

                /* Insere o número da sala */
                await db.run(`insert into rooms (
                    id, 
                    password
                ) values (
                    ${parseInt(roomId)},
                    ${password}
                )`);
            }
        }
    
        await db.close();

        res.redirect(`/room/${roomId}`);
    },
    
    async open(req, res) {
        const db = await Database();
        const roomId = req.params.room;
        const questions = await db.all(`select * from questions where salas = ${roomId} and read = 0`);
        const questionsRead = await db.all(`select * from questions where salas = ${roomId} and read = 1`);
        let isNoQuestions;
        
        if (questions.length == 0) {
            if (questionsRead.length == 0) {
                isNoQuestions = true;
            };
        };

        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions});
    },

    enter(req, res) {
        const roomId = req.body.roomId;

        res.redirect(`/room/${roomId}`);
    }
};