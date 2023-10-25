const inputsCouleur = document.querySelectorAll('.inp-couleur');
const inputRange = document.querySelector('.inp-range');
const btns = document.querySelectorAll('button');
const fond = document.body;
const containerCouleurs = document.querySelector('.container-couleurs');
const span = document.querySelector('span');
const btnShuffle = document.querySelector(".shuffle");
const linearBtn = document.getElementById('linear');
const radialBtn = document.getElementById('radial');


// Initialisation

let valCouleurs = ['#BA5370','#F4E2D8'];
let inclinaison = 45;
let rayon = 50; 
let index = 3; //représente le data-index de l'input couleur
let type = 'linear';
let codeCSSLineaire = "";
let codeCSSRadial = "";

inputsCouleur[0].value = valCouleurs[0];
inputsCouleur[1].value = valCouleurs[1];

inputsCouleur[0].style.background = valCouleurs[0];
inputsCouleur[1].style.background = valCouleurs[1];

fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})` // pareil que `linear-gradient(${inclinaison}deg, ${valCouleurs[0]}, ${valCouleurs[1]})` car valCouleurs contient des chaines de caract séparées par des virgules, ce qui correspond aux arguments qu'il faut mettre dansla fonction css linear-gradient :)
//fond.style.backgroundSize= "50px 50px"; /* Taille des cases du quadrillage */
//fond.style.backgroundRepeat= "repeat";
// On écoute le slider pour définir le fond à partir de l'inclinaison ou du rayon

inputRange.addEventListener('input', (e) => {
  if(fond.classList.contains('linear')) {
    inclinaison = e.target.value * 3.6;
    fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
    //console.log('inputRange.addEventListener if linear - "inclinaison" : ' + inclinaison)
    codeCSSLineaire = `background: linear-gradient(${inclinaison}deg, ${valCouleurs});`;
  }
  else if(fond.classList.contains('radial')) {
    rayon = e.target.value;
    let gradientString = 'radial-gradient(circle at center';
    const colorStep = 100 / (valCouleurs.length - 1);
    for (let i = 0; i < valCouleurs.length; i++) {
      gradientString += `, ${valCouleurs[i]} ${(colorStep * i) + Number(rayon)}%`;
    }
    gradientString += ')';
    fond.style.background = gradientString;
    codeCSSRadial = `background: ${gradientString};`;
  }
});

// Choix gradient radial ou linéaire

linearBtn.addEventListener('click', () => {
  type = 'linear';
  //console.log('linearBtn ' + type)
  setGradient(type, valCouleurs);
  fond.classList.remove('radial');
  fond.classList.add('linear');
});

radialBtn.addEventListener('click', () => {
  type = 'radial';
  setGradient(type, valCouleurs);
  fond.classList.remove('linear');
  fond.classList.add('radial');
});

function setGradient(type, colors) {
    if(type === 'linear') {
        fond.style.background = `linear-gradient(${inclinaison}deg, ${colors})`;
        //console.log('setGradient if linear : ' + type, inclinaison, colors)
        codeCSSLineaire = `background: linear-gradient(${inclinaison}deg, ${colors});`;
        //console.log(codeCSSLineaire);
    }
    else if(type === 'radial') {

        let gradientString = 'radial-gradient(circle at center';
        const colorStep = 100 / (valCouleurs.length - 1);

        //console.log(valCouleurs.length);
        for (let i = 0; i < colors.length; i++) {
            //console.log("for gradient");
            gradientString += `, ${colors[i]} ${colorStep * i}%`;
            //console.log(type, colors, i, colorStep);
        }
        gradientString += ')';
        //console.log(gradientString);
        fond.style.background = gradientString;
        codeCSSRadial = `background: ${gradientString};`;
        //console.log(codeCSSRadial);
    }
}

// Rajout / supression de couleurs 

btns.forEach(btn => {
    btn.addEventListener('click', rajouteEnleve)
})

function rajouteEnleve(e){

    span.innerText = '';

    const allInputs = document.querySelectorAll(".inp-couleur");
    const randomColor = Math.floor(Math.random()*10000000).toString(16); // Math.floor retourne l'entier en dessous d'un nombre à virgule - Math.random retourne un nombre à virgule entre 0 et 0.999999999999999999 - *10000000 permet d'avoir un grand nombre de nombres aléatoires - toString(16):  pour convertir un nombre en chaîne de caractères en utilisant la base 16 (hexadécimal)
    
    // Rajout couleur 

    if(e.target.className === "plus"){

        if(allInputs.length > 8){ // on ne peut pas rajouter plus de 8 couleurs
            return;
        }

        // Création nouveaux inputs avec des nouvelles couleurs random
        const nvCouleur = document.createElement('input');
        nvCouleur.setAttribute('class', 'inp-couleur');
        nvCouleur.setAttribute('data-index', index);
        nvCouleur.setAttribute('maxlength', '7');
        nvCouleur.value = `#${randomColor.toUpperCase()}`;
        nvCouleur.style.background = `#${randomColor }`;
        containerCouleurs.appendChild(nvCouleur);
        nvCouleur.addEventListener('input', MAJColors);

        index++;
        
        // On rajoute les nouvelles couleurs dans le tableau valCouleurs
        valCouleurs.push(`#${randomColor.toUpperCase()}`);

        // MAJ du fond body avec le contenu  de valCouleurs (origine: bouton "plus")
        setGradient(fond.classList.contains('linear') ? 'linear' : 'radial', valCouleurs);
        // console.log(fond.classList);
        //console.log(valCouleurs.length);
    }
    
    // Supression couleur

    else if(e.target.className === "moins"){
        if(valCouleurs.length === 2){
            span.innerText = 'Il faut au moins deux couleurs';
            span.classList.add('animation');
            setTimeout(() => {
                span.classList.remove('animation');
            }, 1000);
        }
        else {
            valCouleurs.pop(); // on supprime la dernière couleur du tableau valCouleurs
            allInputs[allInputs.length - 1].remove();  //on supprime l'inpu qui correspond dans le DOM

            index--;

            // MAJ du fond body avec dernière couleur en moins (origine: bouton "moins")
            setGradient(fond.classList.contains('linear') ? 'linear' : 'radial', valCouleurs);
        }  
    }  
}

//Modification des couleurs des 2 inputs de base

inputsCouleur.forEach(inp => {
    inp.addEventListener('input', MAJColors);
})

function MAJColors(e){
    let indexEnCours = e.target.getAttribute('data-index');
    e.target.value = e.target.value.toUpperCase();
    valCouleurs[indexEnCours - 1] = e.target.value.toUpperCase();
    e.target.style.background = valCouleurs[indexEnCours - 1];

    // MAJ du fond body avec le contenu de valCouleurs (origine: input ajouté manuellement)
    setGradient(fond.classList.contains('linear') ? 'linear' : 'radial', valCouleurs);
}

// Couleurs aléatoires 

btnShuffle.addEventListener("click", () => {
    const inputs = document.querySelectorAll(".inp-couleur");
    for (i = 0; i < valCouleurs.length; i++) {
        valCouleurs[i] = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

        inputs[i].value = valCouleurs[i].toUpperCase();
        inputs[i].style.background = valCouleurs[i].toUpperCase();

        // MAJ du fond body avec le contenu  de valCouleurs (origine: bouton "shuffle")
        setGradient(fond.classList.contains('linear') ? 'linear' : 'radial', valCouleurs);
    }
});

// Copier code css dans le presse papier

function copyCSS() {
    let codeCSS = "";
    //console.log("copyCSS - 'type' : " + type);

    // Sélectionner le texte à copier
    if(type === 'linear') {
        codeCSS = codeCSSLineaire;
        //console.log("copyCSS if linear : " + codeCSS);
    }
    else if(type === 'radial') {
        codeCSS = codeCSSRadial;
        //console.log("copyCSS if radial : " + codeCSS);
    };

    // Créer un nouvel élément de texte temporaire pour y stocker le contenu à copier
    const elementTemporaire = document.createElement('textarea');
    elementTemporaire.value = codeCSS;
    console.log("copyCSS - 'codeCSS' : " + codeCSS);

    // Ajouter l'élément temporaire à la page
    document.body.appendChild(elementTemporaire);

    // Sélectionner le contenu de l'élément temporaire
    elementTemporaire.select();

    // Copier le texte sélectionné dans le presse-papiers
    document.execCommand('copy');

    // Supprimer l'élément temporaire de la page
    document.body.removeChild(elementTemporaire);

    // Modifier le texte du bouton
    const bouton = document.querySelector('.css-script');
    bouton.innerText = 'CSS copied to clipboard !';

    // Revenir au texte d'origine après 3 secondes (3000 millisecondes)
    setTimeout(function() {
        bouton.innerText = 'Copy CSS';
    }, 3000);
}

// Favicon avec couleurs aléatoires à chaque chargement de la page 

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  window.onload = function () {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const size = 64; // Taille de l'icône en pixels
    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2;

    const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = gradient;
    context.fill();

    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = canvas.toDataURL('image/x-icon');
    document.getElementsByTagName('head')[0].appendChild(link);
  };