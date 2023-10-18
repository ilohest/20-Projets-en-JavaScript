const cartes = document.querySelectorAll('.carte');
const scoreTot = document.querySelector('.score');
const boutons = document.querySelector("button");
const btnFacile = document.querySelector('.facile');
const btnDifficile = document.querySelector('.difficile');
const niveau = document.querySelector('.niveau');
const btnReset = document.querySelector('.reset')

let carteRetournee = false;
let premiereCarte, secondeCarte; // déclarées comme ça = undefined
let verouillage = false;
let compteur = 0;
let scoreMax = 9;

// Choisir le niveau

btnFacile.addEventListener('click', () => {
    scoreMax = 19;
    resetJeu();
    niveau.innerHTML = 'Facile';
});

btnDifficile.addEventListener('click', () => {
    scoreMax = 9;
    resetJeu();
    niveau.innerHTML = 'Difficile'; 
});

btnReset.addEventListener('click', () => {
    resetJeu();
});

// Reset jeu

function resetJeu() {
    compteur = 0;
    scoreTot.textContent = `${compteur} / ${scoreMax + 1}`;
    niveau.textContent = '';
    cartes.forEach(carte => {
        carte.childNodes[1].classList.remove('active');
    });
    aleatoire();
}

// Retourner la carte quand on clique dessus

cartes.forEach(carte => {
    carte.addEventListener('click', retourneCarte)
})

function retourneCarte(){

    if(verouillage || compteur > scoreMax) return; //if(verouillage===true){return;} - on n'exécute pas cette fonction si 2 cartes différentes sont retournées 

    this.childNodes[1].classList.toggle('active');
    //console.log(this.childNodes); // this fait référence à la carte (la div avec classe .carte) sur laquelle on vient de cliquer - childNode: retourne un tableau avec les noeuds enfants, les noeuds peuvent etre des éléments html, du texte (les retours à la ligne comptent), des commentaires  
    
    if(!carteRetournee){ /* si carteR est false, alors on exécute le code */
        carteRetournee = true; // vu que carteR sera true après ça, si on rappelle la fonction, ça va rien faire car condition du if sera pas remplie du coup 
        premiereCarte = this; //premièreCarte va prendre la valeur de la carte sur laquelle on a cliqué  
        return; // on sort de la fonction
    }

    carteRetournee = false; //fonctionne 1x/2: la seconde fois qu'on appelle fonction, le if ne sera pas exécuté et on exécute donc directement cette ligne
    secondeCarte = this;

    //console.log(premiereCarte, secondeCarte);

    correspondance();

    compteur++;
    //console.log(compteur);
    scoreTot.innerHTML = `${compteur} / ${scoreMax + 1}` ;
}

// Vérifier les cartes retournées 

function correspondance(){
    if(premiereCarte.getAttribute('data-attr') === secondeCarte.getAttribute('data-attr')){
        premiereCarte.removeEventListener ('click', retourneCarte);
        secondeCarte.removeEventListener ('click', retourneCarte);
    }
    else {
        verouillage = true;
        setTimeout(() => {
            premiereCarte.childNodes[1].classList.remove('active');
            secondeCarte.childNodes[1].classList.remove('active');
            verouillage = false; /* exécuté après 800ms */
        }, 700)
    }
}

// Distribuer les cartes de manière aléatoire

function aleatoire() {
    cartes.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12); //on retourne des entiers entre (0 et 0.99999) * 12 (l'arrondi se fait vers le bas avec floor)
        card.style.order = randomPos; // order: propriété des grid
    })
}
aleatoire();

