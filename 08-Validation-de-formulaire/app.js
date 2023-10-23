const inpUtilisateur = document.querySelector('.form-groupe:nth-child(1) input'); // idem de faire: const inpUtilisateur = document.getElementById('utilisateur');
const inpMail = document.querySelector('.form-groupe:nth-child(2) input');
const inpMdp = document.querySelector('.form-groupe:nth-child(3) input'); 
const inpConfMdp = document.querySelector('.form-groupe:nth-child(4) input'); 
const allImg = document.querySelectorAll('.icone-verif');
const allSpan = document.querySelectorAll('span');
const allLigne = document.querySelectorAll('.ligne div');
const oeilMdp = document.querySelector('.oeilMdp');
const oeilConfMdp = document.querySelector('.oeilConfMdp');


// Validation nom d'utilisateur

inpUtilisateur.addEventListener('input', (e) => {
    if(e.target.value.length >= 3) {
        allImg[0].style.display = 'inline';
        allImg[0].src = 'ressources/check.svg';
        allSpan[0].style.display = 'none';
    }
    else {
        allImg[0].style.display = "inline";
        allImg[0].src = "ressources/error.svg";
        allSpan[0].style.display = "inline";
    }
})

// Validation email

inpMail.addEventListener('input', (e) => {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(e.target.value.search(regexEmail) === 0) { //search permet de vérifier si une chaine de caractères match avec le paramètre uqi est dedans (ici le regexEmail) - si match, alors on aura = 0, si pas match, alors = -1
        allImg[1].style.display = 'inline';
        allImg[1].src = 'ressources/check.svg';
        allSpan[1].style.display = 'none';
    }
    else {
        allImg[1].style.display = "inline";
        allImg[1].src = "ressources/error.svg";
        allSpan[1].style.display = "inline";
    }
})

// Validation création mdp

const specialCar = /[^a-zA-Z0-9]/; // tout ce qui n'est pas ce qu'il y a après le ^
const alphabet = /[a-z]/i; //i = insensitive = insensible à la casse
const chiffres = /[0-9]/;

let valeurInp; // on le déclare ici comme ça il n'est pas que dans la portée du addEventListener
let objValidation = {
    symbole: 0,
    lettre: 0,
    chiffre: 0
};

inpMdp.addEventListener('input', (e) => {
    valeurInp = e.target.value;

    // quand on écrit un caractère

    if(valeurInp.search(specialCar) !== -1) { // -1 = pas de match - !== -1 = si il y a un match
        objValidation.symbole = 1;  
    }
    if(valeurInp.search(alphabet) !== -1) {
        objValidation.lettre = 1;  
    }
    if(valeurInp.search(chiffres) !== -1) {
        objValidation.chiffre = 1;  
    }
    //console.log(objValidation);

    // quand on efface un caractère

    if(e.inputType = 'deleteContentBackward'){ //quand on efface un caractère
        if(valeurInp.search(specialCar) === -1) { // === -1 = si pas de match
            objValidation.symbole = 0;  
        }
        if(valeurInp.search(alphabet) === -1) {
            objValidation.lettre = 0;  
        }
        if(valeurInp.search(chiffres) === -1) {
            objValidation.chiffre = 0;  
        }
    } 
    //console.log(objValidation);

    // Vérification si minimum 1 symbole, 1 lettre, 1 chiffre

    let testAll = 0; // doit etre déclaré dans le event listener sinon ça fonctionne pas 

    for(const property in objValidation){ // boucle for-in permet d'itérer au sein d'un objet 
        if(objValidation[property] > 0){
            testAll++;
        }
        if(testAll < 3){ //si il manque soit symbole/lettre/chiffre
            allImg[2].style.display = "inline";
            allImg[2].src = "ressources/error.svg";
            allSpan[2].style.display = "inline";
        }
        else {
            allImg[2].style.display = 'inline';
            allImg[2].src = 'ressources/check.svg';
            allSpan[2].style.display = 'none';
        }
    }

    // Vérification force mdp

    if(valeurInp.length > 0 && valeurInp.length <= 6){//entre 1 et 6 caractères
        allLigne[0].style.display = 'block';
        allLigne[1].style.display = 'none';
        allLigne[2].style.display = 'none';
    }  
    else if (valeurInp.length > 6 && valeurInp.length <= 9) {
        allLigne[0].style.display = 'block';
        allLigne[1].style.display = 'block';
        allLigne[2].style.display = 'none';
    }
    else if (valeurInp.length > 9) {
        allLigne[0].style.display = 'block';
        allLigne[1].style.display = 'block';
        allLigne[2].style.display = 'block';
    }
    else if (valeurInp.length === 0) {
        allLigne[0].style.display = 'none';
        allLigne[1].style.display = 'none';
        allLigne[2].style.display = 'none';
    }
})

// Validation confirmation mdp

inpConfMdp.addEventListener('input', (e) => {

    if(e.target.value.length === 0){
        allImg[3].style.display = "inline";
        allImg[3].src = "ressources/error.svg";
    }
    else if (e.target.value === valeurInp){
        allImg[3].style.display = "inline";
        allImg[3].src = "ressources/check.svg";
    }
    else {
        allImg[3].style.display = "inline";
        allImg[3].src = "ressources/error.svg";
    }
})

// Afficher mot de passe

oeilMdp.addEventListener('click', () => {
    if (inpMdp.type === "password") {
        inpMdp.type = "text";
    } else {
        inpMdp.type = "password";
    }
});

oeilConfMdp.addEventListener('click', () => {
    if (inpConfMdp.type === "password") {
        inpConfMdp.type = "text";
    } else {
        inpConfMdp.type = "password";
    }
});




console.log(inpMdp);