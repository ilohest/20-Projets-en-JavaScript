
import '@material/web/slider/slider.js';
import '@material/web/iconbutton/filled-icon-button.js';
import '@material/web/iconbutton/filled-tonal-icon-button.js';
import '@material/web/icon/icon.js';
import '@material/web/radio/radio.js';
import '@material/web/switch/switch.js';
import '@material/web/button/filled-button.js';
import '@material/web/textfield/filled-text-field.js';
import './style.css';


var inputsCouleur = document.querySelectorAll('.inp-couleur');
const regex = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
const radius = document.querySelector('.radius');
const tilt = document.querySelector('.tilt');
const btns = document.querySelectorAll('md-filled-icon-button');
const fond = document.body;
const containerCouleurs = document.querySelector('.container-couleurs');
const errorColorsNb = document.querySelector('.erreur-nb-couleurs');
const errorHexaCode = document.querySelector('.erreur-code-hexa');
const btnShuffle = document.querySelector(".shuffle");
const linearBtn = document.getElementById('linear');
const radialBtn = document.getElementById('radial');
const switchInput = document.getElementById('toggle');
const repetitionWidth = document.querySelector('.repetition-width');
const repetitionHeight = document.querySelector('.repetition-height');
const switchContainer = document.querySelector('.switch-container');
const widthInput = document.getElementById('repetition-width');
const heightInput = document.getElementById('repetition-height');
const colorPickers = document.querySelectorAll('.inp-color-picker');
const brush = document.querySelectorAll('.brush');
const boutonCSS = document.querySelector('.css-script');
const CSScodeContent = document.querySelector('.CSS-code-content');
const closeBtns = document.querySelectorAll('.close');

// Initialisation

let valCouleurs = ['#BA5370','#F4E2D8'];
let inclinaison = 45;
let rayon = 0;
let index = 3; //représente le data-index de l'input couleur
let type = 'linear';
let repeat = false;
let largeurRepetition = 50;
let hauteurRepetition = 50;
let codeCSSLineaire = "background: linear-gradient(45deg, #BA5370,#F4E2D8);";
let codeCSSRadial = "";

fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})` // pareil que `linear-gradient(${inclinaison}deg, ${valCouleurs[0]}, ${valCouleurs[1]})` car valCouleurs contient des chaines de caract séparées par des virgules, ce qui correspond aux arguments qu'il faut mettre dansla fonction css linear-gradient :)

inputsCouleur[0].value = valCouleurs[0];
inputsCouleur[1].value = valCouleurs[1];

// Colorer le bg de l'input

inputsCouleur[0].style.background = valCouleurs[0];
inputsCouleur[1].style.background = valCouleurs[1];

// Regex pour vérifier les input manuels de couleur

function checkHexValidity(input) {
    errorHexaCode.innerText = '';
    if (!regex.test(input)) {
        errorHexaCode.innerText = `The hexadecimal code ${input} is invalid.`;
    }
}

// inputsCouleur.forEach(input => {
//      console.log('au chargement de la page : '+ input.value); // Affiche la valeur de chaque input dans la console
// });

inputsCouleur.forEach(input => {  // Vérification à chaque modification de l'input
    input.addEventListener('input', () => {
        checkHexValidity(input.value);
    });
});

// On écoute le input range pour définir le fond à partir de l'inclinaison ou du rayon

tilt.addEventListener('input', (e) => {
    if(fond.classList.contains('linear')) {
        if(repeat) {
            inclinaison = e.target.value * 3.6;
            fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
            fond.style.backgroundSize= `${largeurRepetition}px ${hauteurRepetition}px`;
            fond.style.backgroundRepeat= "repeat";

            codeCSSLineaire = `background: linear-gradient(${inclinaison}deg, ${valCouleurs}) 0% 0% / ${largeurRepetition}px ${hauteurRepetition}px repeat;`;
            CSScodeContent.setAttribute('value', `background: linear-gradient(${inclinaison}deg, ${valCouleurs}) 0% 0% / ${largeurRepetition}px ${hauteurRepetition}px repeat;`);
        } else {
            inclinaison = e.target.value * 3.6;
            fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
            //console.log('inputRange.addEventListener if linear - "inclinaison" : ' + inclinaison)
            codeCSSLineaire = `background: linear-gradient(${inclinaison}deg, ${valCouleurs});`;
            CSScodeContent.setAttribute('value', `background: linear-gradient(${inclinaison}deg, ${valCouleurs});`);
        }
    }
});

radius.addEventListener('input', (e) => {
    if(fond.classList.contains('radial')) {
        if(repeat)  {
            rayon = e.target.value;
            let gradientString = 'radial-gradient(circle at center';
            const colorStep = 100 / (valCouleurs.length - 1);
            for (let i = 0; i < valCouleurs.length; i++) {
                gradientString += `, ${valCouleurs[i]} ${(colorStep * i) + Number(rayon)}%`;
            }
            gradientString += ')';
            fond.style.background = gradientString;
            fond.style.backgroundSize= `${largeurRepetition}px ${hauteurRepetition}px`;
            fond.style.backgroundRepeat= "repeat";

            codeCSSRadial = `background: ${gradientString} 0% 0% / ${largeurRepetition}px ${hauteurRepetition}px repeat;`;
            CSScodeContent.setAttribute('value',  `background: ${gradientString} 0% 0% / ${largeurRepetition}px ${hauteurRepetition}px repeat;`);

        } else {
            rayon = e.target.value;
            //console.log('radius.addEventListener : '+ rayon);
            let gradientString = 'radial-gradient(circle at center';
            const colorStep = 100 / (valCouleurs.length - 1);
            for (let i = 0; i < valCouleurs.length; i++) {
                gradientString += `, ${valCouleurs[i]} ${(colorStep * i) + Number(rayon)}%`;
            }
            gradientString += ')';
            fond.style.background = gradientString;
            codeCSSRadial = `background: ${gradientString};`;
            CSScodeContent.setAttribute('value', `background: ${gradientString};`);
        }

    }
});

// Choix gradient radial ou linéaire

tilt.disabled = false;
radius.disabled = true;

linearBtn.addEventListener('click', () => {
    tilt.disabled = false;
    radius.disabled = true;

    type = 'linear';
    //console.log('linearBtn ' + type)
    setGradient(type, valCouleurs, largeurRepetition, hauteurRepetition);
    fond.classList.remove('radial');
    fond.classList.add('linear');
});

radialBtn.addEventListener('click', () => {
    tilt.disabled = true;
    radius.disabled = false;

    //console.log('radialBtn addEventListener : '+ rayon);
    type = 'radial';
    setGradient(type, valCouleurs, largeurRepetition, hauteurRepetition);
    fond.classList.remove('linear');
    fond.classList.add('radial');
});

function setGradient(type, colors, largeurRepetition, hauteurRepetition) {
    if(type === 'linear') {
        if(repeat) {
            fond.style.background = `linear-gradient(${inclinaison}deg, ${colors})`;
            fond.style.backgroundSize= `${largeurRepetition}px ${hauteurRepetition}px`;
            fond.style.backgroundRepeat= "repeat";

            codeCSSLineaire = `background: linear-gradient(${inclinaison}deg, ${colors}) 0% 0% / ${largeurRepetition}px ${hauteurRepetition}px repeat;`;
            CSScodeContent.setAttribute('value',  `background: linear-gradient(${inclinaison}deg, ${colors}) 0% 0% / ${largeurRepetition}px ${hauteurRepetition}px repeat;`);
            
        } else {
            fond.style.background = `linear-gradient(${inclinaison}deg, ${colors})`;
            //console.log('setGradient if linear : ' + type, inclinaison, colors)
            codeCSSLineaire = `background: linear-gradient(${inclinaison}deg, ${colors});`;
            CSScodeContent.setAttribute('value',  `background: linear-gradient(${inclinaison}deg, ${colors});`);
            //console.log(codeCSSLineaire);
        }
    }
    else if(type === 'radial') {
        if(repeat) {
            let gradientString = 'radial-gradient(circle at center';
            const colorStep = 100 / (valCouleurs.length - 1);

            //console.log(valCouleurs.length);
            for (let i = 0; i < colors.length; i++) {
                //console.log("for gradient");
                gradientString += `, ${colors[i]} ${(colorStep * i) + Number(rayon)}%`;
                //console.log(type, colors, i, colorStep);
            }
            gradientString += ')';
            //console.log(gradientString);
            fond.style.background = gradientString;
            fond.style.backgroundSize= `${largeurRepetition}px ${hauteurRepetition}px`;
            fond.style.backgroundRepeat= "repeat";

            codeCSSRadial = `background: ${gradientString} 0% 0% / ${largeurRepetition}px ${hauteurRepetition}px repeat;`;
            CSScodeContent.setAttribute('value', `background: ${gradientString} 0% 0% / ${largeurRepetition}px ${hauteurRepetition}px repeat;`);
            //console.log(codeCSSRadial);

        } else {
            let gradientString = 'radial-gradient(circle at center';
            const colorStep = 100 / (valCouleurs.length - 1);

            //console.log(valCouleurs.length);
            for (let i = 0; i < colors.length; i++) {
                //console.log("for gradient");
                gradientString += `, ${colors[i]} ${(colorStep * i) + Number(rayon)}%`;
                //console.log(type, colors, i, colorStep);
            }
            gradientString += ')';
            //console.log(gradientString);
            fond.style.background = gradientString;

            codeCSSRadial = `background: ${gradientString};`;
            CSScodeContent.setAttribute('value', `background: ${gradientString};`);
            //console.log(codeCSSRadial);
        }
    }
}

// Générer une couleur en code hexadécimal aléatoire

function generateRandomHexColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16); // Math.floor retourne l'entier en dessous d'un nombre à virgule - Math.random retourne un nombre à virgule entre 0 et 0.999999999999999999 - *10000000 permet d'avoir un grand nombre de nombres aléatoires - toString(16):  pour convertir un nombre en chaîne de caractères en utilisant la base 16 (hexadécimal)
    return '#' + '0'.repeat(6 - randomColor.length) + randomColor; // rajoute des 0 si on n'a pas 6 caractères
}

// Rajout / supression de couleurs

btns.forEach(btn => {
    btn.addEventListener('click', rajouteEnleve)
})

function rajouteEnleve(e){
    errorColorsNb.innerText = '';
    // const allInputs = document.querySelectorAll(".inp-couleur");
    const closeContainer = document.querySelectorAll('.close-container');

    // Rajout couleur

    if(e.target.className === "plus"){

        if(valCouleurs.length > 9){ // on ne peut pas rajouter plus de 8 couleurs
            return;
        }

        // Création de l'élément input texte (leftInput)
        const nvCouleur = document.createElement('input');
        nvCouleur.setAttribute('class', 'inp-couleur leftInput');
        nvCouleur.setAttribute('type', 'text');
        nvCouleur.setAttribute('data-index', index);
        nvCouleur.setAttribute('maxlength', '7');
        nvCouleur.value = `${generateRandomHexColor().toUpperCase()}`;
        nvCouleur.style.background = nvCouleur.value;
        // Déterminer la couleur du texte en fonction du BG de l'input texte
        const rgb = hexToRgb(nvCouleur.value); // on transforme code hexa de l'input texte en rgb
        const textColor = isColorLight(rgb.r, rgb.g, rgb.b) ? '#000' : '#fff'; // on détermine la couleur du texte de l'input texte en fonction du contraste true / false
        nvCouleur.style.color = textColor; // changer la couleur du texte 

        // Création de md-icon-button avec le pinceau (color-picker-trigger)
        const mdIconButton = document.createElement('md-icon-button');
        mdIconButton.setAttribute('class', 'color-picker-trigger rightInput');
        
        const mdIcon = document.createElement('md-icon');
        mdIcon.setAttribute('class', 'brush');
        mdIcon.style.color = textColor; // changer la couleur du pinceau
        mdIcon.textContent = 'brush';
        mdIconButton.appendChild(mdIcon);

        // Création de l'input color (inp-color-picker)
        const nvColorPicker = document.createElement('input');
        nvColorPicker.setAttribute('class', 'inp-color-picker');
        nvColorPicker.setAttribute('type', 'color');
        nvColorPicker.value = nvCouleur.value ;

        // Création du bouton close (md-filled-tonal-icon-button)
        const nvCloseBtn = document.createElement('md-filled-tonal-icon-button');
        nvCloseBtn.setAttribute('class', 'close');
        nvCloseBtn.innerHTML = `<md-icon>close</md-icon>`;

        // Création de l'élément div (input-container)
        const divInputContainer = document.createElement('div');
        divInputContainer.setAttribute('class', 'input-container');

        // Création de l'élément div (close-container)
        const divCloseContainer = document.createElement('div');
        divCloseContainer.setAttribute('class', 'close-container');
        divCloseContainer.setAttribute('data-index', index);

        // Ajout des éléments à la div conteneur parent
        divInputContainer.appendChild(nvCouleur);
        divInputContainer.appendChild(mdIconButton);
        divInputContainer.appendChild(nvColorPicker);

        divCloseContainer.appendChild(divInputContainer);
        divCloseContainer.appendChild(nvCloseBtn);

        // Ajout du conteneur au conteneur principal (container-couleurs)
        containerCouleurs.appendChild(divCloseContainer);

        // Ajout de l'écouteur d'événements à l'élément input texte
        nvCouleur.addEventListener('input', MAJColors);

        // On remet à jour colorPickers qui permet d'écouter les nouveaux éléments ajoutés
        const colorPickers = document.querySelectorAll('.inp-color-picker');
        colorPickers.forEach(colorPicker => {
            colorPicker.addEventListener('click', function (e) {
                const inpCouleur = this.parentElement.querySelector('.inp-couleur');
                const inpColorPicker = this.parentElement.querySelector('.inp-color-picker');
                inpColorPicker.addEventListener('input', function () {
                    inpCouleur.value = inpColorPicker.value.toUpperCase(); //MAJ du texte dans l'input texte
                    inpCouleur.style.background = inpCouleur.value; // MAJ du BG de l'input texte
                    MAJColorPicker(e); // MAJ du BG du body quand le color picker change

                    // Déterminer la couleur du texte en fonction du BG de l'input texte quand on uitlise color picker
                    const rgb = hexToRgb(inpCouleur.value); // on transforme code hexa de l'input texte en rgb
                    const textColor = isColorLight(rgb.r, rgb.g, rgb.b) ? '#000' : '#fff'; // on détermine la couleur du texte de l'input texte en fonction du contraste true / false
                    inpCouleur.style.color = textColor; // changer la couleur du texte 
                    mdIcon.style.color = textColor; //  changer la couleur du pinceau 
                });
            });
        });

        index++;

        // On rajoute les nouvelles couleurs dans le tableau valCouleurs
        valCouleurs.push(`${nvCouleur.value}`);

        // MAJ du fond body avec le contenu  de valCouleurs (origine: bouton "plus")
        setGradient(fond.classList.contains('linear') ? 'linear' : 'radial', valCouleurs, largeurRepetition, hauteurRepetition);

        // On check le regex du dernier input qu'on a rajotué
        inputsCouleur[inputsCouleur.length - 1].addEventListener('input', () => {
            checkHexValidity(inputsCouleur[inputsCouleur.length - 1].value);
        });
        // inputsCouleur.forEach(input => {
        //     console.log('function rajouteEnleve plus : '+ input.value);
        // });
    }

    // Supression denière couleur avec le bouton -

    else if(e.target.className === "moins"){
        if(valCouleurs.length === 2){
            errorColorsNb.innerText = 'At least 2 colors needed.';
        }
        else {  
            valCouleurs.pop(); // on supprime la dernière couleur du tableau valCouleurs
            closeContainer[closeContainer.length - 1].remove();  //on supprime dans le DOM la dernière div qui contient les inputs ajoutés avec le bouton + 

            index--;

            // MAJ du fond body avec dernière couleur en moins (origine: bouton "moins")
            setGradient(fond.classList.contains('linear') ? 'linear' : 'radial', valCouleurs, largeurRepetition, hauteurRepetition);
        }
    }
}

// Supression couleur choisie avec bouton x

closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener('click', SupressionCouleur);
});

function SupressionCouleur(e) {
    console.log('SupressionCouleur : '+ closeBtns.length);
    if(valCouleurs.length === 2){
        errorColorsNb.innerText = 'At least 2 colors needed.';
    }
    else {  
        const closeContainerf = e.target.parentElement;
        console.log('SupressionCouleur :  '+ closeContainerf);
        let indexEnCours = closeContainerf.getAttribute('data-index');

        valCouleurs.splice(1, indexEnCours - 1); // on supprime la couleur du tableau valCouleurs
        closeContainerf.remove();  //on supprime dans le DOM la div qui contient la couleur qu'on veut supprimer 
        setGradient(fond.classList.contains('linear') ? 'linear' : 'radial', valCouleurs, largeurRepetition, hauteurRepetition);
        //mettre à jour visuel code css et copy code css
    }
}

// Modification manuelle des couleurs via les inputs

inputsCouleur.forEach(inp => {
    inp.addEventListener('input', MAJColors);
});

function MAJColors(e){
    let indexEnCours = e.target.getAttribute('data-index');
    e.target.value = e.target.value.toUpperCase();
    valCouleurs[indexEnCours - 1] = e.target.value.toUpperCase();
    e.target.style.background = valCouleurs[indexEnCours - 1];
    const brush = this.parentElement.querySelector('md-icon');

    // Déterminer la couleur du texte en fonction du BG de l'input texte
    if (e.target.value.length === 4 || e.target.value.length === 7){ // on ne prend que les codes hexa valides (avec # + 3 ou 6 caractères)
        const rgb = hexToRgb(e.target.value.substring(1)); // on transforme code hexa de l'input texte en rgb + on supprime le #
        const textColor = isColorLight(rgb.r, rgb.g, rgb.b) ? '#000' : '#fff'; // on détermine la couleur du texte de l'input texte en fonction du contraste true / false
        e.target.style.color = textColor; // changer la couleur du texte
        brush.style.color = textColor; // changer la couleur du pinceau
    }

    // Vérification de la validité du code hexa via fonction qui check via un regex
    checkHexValidity(valCouleurs[indexEnCours - 1]);
    //console.log('MAJColor - valCouleurs : ' + typeof valCouleurs + ' - indexEnCours : ' + indexEnCours + ' - valCouleurs[indexEnCours] : ' + valCouleurs[indexEnCours-1]);

    // MAJ du fond body avec le contenu de valCouleurs (origine: input ajouté manuellement)
    setGradient(fond.classList.contains('linear') ? 'linear' : 'radial', valCouleurs, largeurRepetition, hauteurRepetition);
}

// Couleurs aléatoires

btnShuffle.addEventListener("click", () => {
    const inputs = document.querySelectorAll(".inp-couleur");
    const inpColorPicker = document.querySelectorAll('.inp-color-picker');
    const brush = document.querySelectorAll('.brush');

    for (let i = 0; i < valCouleurs.length; i++) {
        valCouleurs[i] =  `${generateRandomHexColor()}`;;

        inputs[i].value = valCouleurs[i].toUpperCase();
        inputs[i].style.background = valCouleurs[i];

        // Déterminer la couleur du texte en fonction du BG de l'input texte
        const rgb = hexToRgb(valCouleurs[i]); // on transforme code hexa de l'input texte en rgb
        const textColor = isColorLight(rgb.r, rgb.g, rgb.b) ? '#000' : '#fff'; // on détermine la couleur du texte de l'input texte en fonction du contraste true / false
        inputs[i].style.color = textColor; // changer la couleur du texte
        brush[i].style.color = textColor; // changer la couleur du pinceau
        
        inpColorPicker[i].value = inputs[i].value; // Pour que le color picker soit déjà sur la couleur de l'input texte

        errorHexaCode.innerText = '';

        // MAJ du fond body avec le contenu  de valCouleurs (origine: bouton "shuffle")
        setGradient(fond.classList.contains('linear') ? 'linear' : 'radial', valCouleurs, largeurRepetition, hauteurRepetition);
    }
});

// Switch sur l'input pour choisir si bg répété ou non

widthInput.disabled = true; //par défaut quand la page charge: inputs grisés car la case repeat est pas checkée
heightInput.disabled = true;

switchInput.addEventListener('change', () => {
    if(switchInput.selected) {
        //console.log("Checkbox cochée.");
        repeat = true;
        switchContainer.classList.add('repetition');
        setGradient(type, valCouleurs, largeurRepetition, hauteurRepetition);
        widthInput.disabled = false;
        heightInput.disabled = false;
    } else {
        //console.log("Checkbox décochée.");
        repeat = false;
        switchContainer.classList.remove('repetition');
        setGradient(type, valCouleurs, largeurRepetition, hauteurRepetition);
        widthInput.disabled = true;
        heightInput.disabled = true;
    }
});

// On écoute le input range pour définir largeur et hauteur des répétitions
repetitionWidth.addEventListener('input', (e) => {
    largeurRepetition = e.target.value;
    setGradient(type, valCouleurs, largeurRepetition, hauteurRepetition);
});

repetitionHeight.addEventListener('input', (e) => {
    hauteurRepetition = e.target.value;
    //console.log('repetitionHeight.addEventListener : '+ hauteurRepetition);
    setGradient(type, valCouleurs, largeurRepetition, hauteurRepetition);
});

// Copier code css dans le presse papier

boutonCSS.addEventListener('click', copyCSS);

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
    //console.log("copyCSS - 'codeCSS' : " + codeCSS);

    // Ajouter l'élément temporaire à la page
    document.body.appendChild(elementTemporaire);

    // Sélectionner le contenu de l'élément temporaire
    elementTemporaire.select();

    // Copier le texte sélectionné dans le presse-papiers
    document.execCommand('copy');

    // Supprimer l'élément temporaire de la page
    document.body.removeChild(elementTemporaire);

    // Modifier le texte du bouton
    boutonCSS.innerHTML = `CSS code copied to clipboard <md-icon class="copy-icon" slot="icon">done</md-icon>`;

    // Revenir au texte d'origine après 3 secondes (3000 millisecondes)
    setTimeout(function() {
        boutonCSS.innerHTML = `CSS code <md-icon class="copy-icon" slot="icon">content_copy</md-icon>`;
    }, 2000);
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

// Color picker

colorPickers.forEach(colorPicker => {
    colorPicker.addEventListener('click', function (e) {
        const inpCouleur = this.parentElement.querySelector('.inp-couleur');
        const inpColorPicker = this.parentElement.querySelector('.inp-color-picker');
        const brush = this.parentElement.querySelector('md-icon');

        inpColorPicker.value = inpCouleur.value; // Pour que le color picker soit déjà sur la couleur de l'input texte

        // Écouter les changements dans l'input color et mettre à jour l'input texte
        inpColorPicker.addEventListener('input', function () {
            inpCouleur.value = inpColorPicker.value.toUpperCase(); //MAJ du texte dans l'input texte
            inpCouleur.style.background = inpCouleur.value; // MAJ du BG de l'input texte
            MAJColorPicker(e); // MAJ du BG du body quand le color picker change

            // Déterminer la couleur du texte en fonction du BG de l'input texte quand on uitlise color picker
            const rgb = hexToRgb(inpCouleur.value); // on transforme code hexa de l'input texte en rgb
            const textColor = isColorLight(rgb.r, rgb.g, rgb.b) ? '#000' : '#fff'; // on détermine la couleur du texte de l'input texte en fonction du contraste true / false
            inpCouleur.style.color = textColor; // changer la couleur du texte 
            brush.style.color = textColor; // changer la couleur du pinceau 
        });
    });
});

//MAJ du bg du body en fonction de la valeur de color picker

function MAJColorPicker(event) {
    //const selectedColor = event.target.value;
    const parentDiv = event.target.parentElement;
    const inputText = parentDiv.querySelector('.inp-couleur');
    let indexEnCours = inputText.getAttribute('data-index');
    //console.log(`La couleur sélectionnée est : ${selectedColor}`);

    valCouleurs[indexEnCours - 1] = event.target.value.toUpperCase();

    // MAJ du fond body avec le contenu de valCouleurs (origine: input du color picker)
    setGradient(fond.classList.contains('linear') ? 'linear' : 'radial', valCouleurs, largeurRepetition, hauteurRepetition);
};

// Déterminer la couleur du texte & pinceau en fonction du BG de l'input texte au chargement de la page

inputsCouleur.forEach(inputCouleur => {
    const rgb = hexToRgb(inputCouleur.value); // on transforme code hexa de l'input texte en rgb
    const textColor = isColorLight(rgb.r, rgb.g, rgb.b) ? '#000' : '#fff'; // on détermine la couleur du texte de l'input texte en fonction du contraste true / false

    inputCouleur.style.color = textColor; // changer la couleur du texte
    brush.style.color = textColor; // changer la couleur du pinceau 
});

// Convertir Hexa to RGB : sort un objet avec 3 valeurs pour r g b
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
        return {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        };
    }

    // Vérification pour les codes hexadécimaux abrégés de 3 caractères
    result = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex);
    if (result) {
        return {
            r: parseInt(result[1] + result[1], 16),
            g: parseInt(result[2] + result[2], 16),
            b: parseInt(result[3] + result[3], 16)
        };
    }

    return null;
}

// Fonction qui sort true ou false selon le contraste
function isColorLight(r, g, b) {
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186;
}