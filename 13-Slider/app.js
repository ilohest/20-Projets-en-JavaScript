const imgs = document.querySelectorAll('.slides img');
const btnGauche = document.querySelector('.left');
const btnDroite = document.querySelector('.right');
const btnsCercles = document.querySelectorAll('.cercle');

let index = 0;

//Slider avec bouton de droite
btnDroite.addEventListener('click', imageSuivante);

function imageSuivante () {
    if(index < imgs.length-1) {
        imgs[index].classList.remove('active-slide');
        index++;
        imgs[index].classList.add('active-slide');
    }
    else if (index === imgs.length-1) {
        imgs[index].classList.remove('active-slide');
        index = 0;
        imgs[index].classList.add('active-slide');
    }
    for(i = 0 ; i < btnsCercles.length; i++){
        if(btnsCercles[i].getAttribute('data-clic')-1 === index){
            btnsCercles[i].classList.add('active-cercle');
        }
        else {
            btnsCercles[i].classList.remove('active-cercle');
        }
    }
    this.classList.add('active-cercle');
}

//Slider avec bouton de gauche
btnGauche.addEventListener('click', imagePrecedente);

function imagePrecedente () {
    if(index > 0) {
        imgs[index].classList.remove('active-slide');
        index--;
        imgs[index].classList.add('active-slide');
    }
    else if (index === 0) {
        imgs[index].classList.remove('active-slide');
        index = imgs.length-1;
        imgs[index].classList.add('active-slide');
    }
    for(i = 0 ; i < btnsCercles.length; i++){
        if(btnsCercles[i].getAttribute('data-clic')-1 === index){
            btnsCercles[i].classList.add('active-cercle');
        }
        else {
            btnsCercles[i].classList.remove('active-cercle');
        }
    }
}

//Slider avec les touches directionnelles
document.addEventListener('keydown', keyPressed);

function keyPressed(e){
    if(e.keyCode === 37) { //touche gauche du pavé directionnel
        imagePrecedente();
    }
    else if(e.keyCode === 39) {
        imageSuivante();
    }
}

//Slider avec les boutons en bas + mettre leur aspect à jour 
btnsCercles.forEach(cercle => {
    cercle.addEventListener('click', function() {
        //MAJ de l'aspect du nouton
        for(i = 0 ; i < btnsCercles.length; i++){
            btnsCercles[i].classList.remove('active-cercle');
        }
        this.classList.add('active-cercle'); //this = contexte appelant de la méthode addEventListener, doit etre utilisé via une fonction classique (les focntions fléchées font appel au contexte englobant, pas au contexte appelant)
    
        //changement de photo
        imgs[index].classList.remove('active-slide');
        index = this.getAttribute('data-clic') -1;
        imgs[index].classList.add('active-slide');
    })
})