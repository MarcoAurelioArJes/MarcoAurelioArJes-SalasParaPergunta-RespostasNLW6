import Modal from './modal.js'

const modal = Modal();

const modalTitle = document.querySelector('.modal h2');
const modalDescription = document.querySelector('.modal p');
const modalButton = document.querySelector('.modal button');

//Pegar todos os botões que existe com a classe check
const checkButtons = document.querySelectorAll(".actions a.check");

//Pegar todos os botões que existe com a classe delete
const deleteButton = document.querySelectorAll(".actions .delete");

checkButtons.forEach(button => {

    //Adicionar a escuta
    button.addEventListener("click", (events) => handleClick(events, true));//Com parâmetro
    //button.addEventListener("click", handleClick);//Sem parâmetro
})
//Pegar quando o marcar como lido for marcado

//Delete button
deleteButton.forEach(buttonDelete => {

    //Adicionando o evendo do botão
    buttonDelete.addEventListener("click", (events) => handleClick(events, false));
})

function handleClick(events, check = true) {
    events.preventDefault();
    const text = check ? "Marcar como lida" : "Excluir";
    const slug = check ? 'check' : 'delete';
    const roomId = document.querySelector('#room-id').dataset.id;
    const questionId = events.target.dataset.id;

    const form = document.querySelector('.modal form');
    form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`);

    modalTitle.innerHTML = `${text} esta pergunta`;
    modalDescription.innerHTML = `Tem certeza que você deseja ${text.toLowerCase()} essa pergunta?`;
    modalButton.innerHTML = `Sim, ${text.toLowerCase()}`;
    check ? modalButton.classList.remove('red') : modalButton.classList.add('red');

    modal.open();
}

/* querySelector = Pega o primeiro elemento de uma árvore pega o pai
   querySelectorAll = Pega a árvore e as sub-árvores que vier pela frente pai e filhos */ 