const form = document.querySelector('form');
const liste = document.querySelector('ul');
const input = document.querySelector('form input');

let toutesLesTaches = [];

form.addEventListener('submit', e => {
    e.preventDefault();
    
    const text = input.value.trim(); // trim retire espaces avant et apres
    if(text !== ''){
        rajouterTache(text);
        input.value = ''; //on clear le champ de saisie
    }
});

function rajouterTache(text) {
    const todo = {
        text,
        id: Date.now() //la méthode Date.now() renvoir le nb de ms écoulées depuis 01.01.1970
    }
    afficherListe(todo);
};

function afficherListe(todo) { //on crée un item <li> qui va recevoir des enfants: input de type checkbox, du texte, un bouton qui contient une image + on ajoute <li> dans la liste <ul>
    const item = document.createElement('li');
    item.setAttribute('data-key', todo.id);

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.addEventListener('click', tacheFaite);
    item.appendChild(input);

    const txt = document.createElement('span');
    txt.innerText = todo.text;
    item.appendChild(txt);
    
    const btn = document.createElement('button');
    btn.addEventListener('click', supprimerTache);

    const img = document.createElement('img');
    img.setAttribute('src', 'ressources/close.png');
    btn.appendChild(img);
    item.appendChild(btn);

    liste.appendChild(item);
    toutesLesTaches.push(item);
};

function tacheFaite(e){
    e.target.parentNode.classList.toggle('finDeTache'); //la classe finDeTache dans CSS est atrtribuée à <li> et fait que le texte soit barré
}

function supprimerTache(e) {
    toutesLesTaches.forEach(el => {

        if(e.target.parentNode.getAttribute('data-key') === el.getAttribute('data-key')){ //e.target = le bouton et on regarde l'attribut data-key du parent du bouton qiu est li
            el.remove(); //on le remove du DOM
            toutesLesTaches = toutesLesTaches.filter(li => li.dataset.key !== el.dataset.key) //on le remove du tableau toutesLesTaches: on garde tous les li qui ont un id strictement différent de l'élément li qu'on vient de retirer 
        }
    })
}
