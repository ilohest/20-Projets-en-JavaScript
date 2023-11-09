var inputsCouleur = document.querySelectorAll('.inp-couleur');
const regex = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
const radius = document.querySelector('.radius');
const tilt = document.querySelector('.tilt');
const btns = document.querySelectorAll('button');
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
const inputContainer = document.querySelector('.input-container');
const leftInput = document.getElementById('leftInput');


// Initialisation

let valCouleurs = ['#BA5370','#F4E2D8'];
let inclinaison = 45;
let rayon = 0; 
let index = 3; //représente le data-index de l'input couleur
let type = 'linear';
let repeat = false; 
let largeurRepetition = 50;
let hauteurRepetition = 50;
let codeCSSLineaire = "";
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
        checkHexValidity(input);
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

            codeCSSLineaire = 
            `background: linear-gradient(${inclinaison}deg, ${valCouleurs});
            backgroundSize: ${largeurRepetition}px ${hauteurRepetition}px;
            backgroundRepeat: repeat;`;
        } else {
            inclinaison = e.target.value * 3.6;
            fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
            //console.log('inputRange.addEventListener if linear - "inclinaison" : ' + inclinaison)
            codeCSSLineaire = `background: linear-gradient(${inclinaison}deg, ${valCouleurs});`;
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

            codeCSSRadial = 
            `background: ${gradientString};
            backgroundSize: ${largeurRepetition}px ${hauteurRepetition}px;
            backgroundRepeat: repeat;`;
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

            codeCSSLineaire = 
            `background: linear-gradient(${inclinaison}deg, ${colors});
            backgroundSize: ${largeurRepetition}px ${hauteurRepetition}px;
            backgroundRepeat: repeat;`;
        } else {
            fond.style.background = `linear-gradient(${inclinaison}deg, ${colors})`;
            //console.log('setGradient if linear : ' + type, inclinaison, colors)
            codeCSSLineaire = `background: linear-gradient(${inclinaison}deg, ${colors});`;
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

            codeCSSRadial =
            `background: ${gradientString};
            backgroundSize: ${largeurRepetition}px ${hauteurRepetition}px;
            backgroundRepeat: repeat;`;
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
            //console.log(codeCSSRadial);
        }
    }
}

// Rajout / supression de couleurs 

btns.forEach(btn => {
    btn.addEventListener('click', rajouteEnleve)
})

function rajouteEnleve(e){
    errorColorsNb.innerText = '';
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
        nvCouleur.setAttribute('type', 'text');
        nvCouleur.setAttribute('data-index', index);
        nvCouleur.setAttribute('maxlength', '7');
        nvCouleur.value = `#${randomColor.toUpperCase()}`;
        nvCouleur.style.background = `#${randomColor }`;
        containerCouleurs.appendChild(nvCouleur);
        nvCouleur.addEventListener('input', MAJColors);

        index++;
        
        // On rajoute les nouvelles couleurs dans le tableau valCouleurs
        valCouleurs.push(`#${randomColor.toUpperCase()}`);
        // inputsCouleur = document.querySelectorAll(".inp-couleur");

        // MAJ du fond body avec le contenu  de valCouleurs (origine: bouton "plus")
        setGradient(fond.classList.contains('linear') ? 'linear' : 'radial', valCouleurs, largeurRepetition, hauteurRepetition);

        // On check le regex du dernier input qu'on a rajotué 
        inputsCouleur[inputsCouleur.length-1].addEventListener('input', () => { 
            checkHexValidity(inputsCouleur[inputsCouleur.length-1]);
        });
        // inputsCouleur.forEach(input => {
        //     console.log('function rajouteEnleve plus : '+ input.value); 
        // });
    }
    
    // Supression couleur

    else if(e.target.className === "moins"){
        if(valCouleurs.length === 2){
            errorColorsNb.innerText = 'At least 2 colors needed.';
        }
        else {
            valCouleurs.pop(); // on supprime la dernière couleur du tableau valCouleurs
            allInputs[allInputs.length - 1].remove();  //on supprime l'input qui correspond dans le DOM

            index--;

            // MAJ du fond body avec dernière couleur en moins (origine: bouton "moins")
            setGradient(fond.classList.contains('linear') ? 'linear' : 'radial', valCouleurs, largeurRepetition, hauteurRepetition);
        }  
    }  
}

//Modification manuelle des couleurs via les inputs

inputsCouleur.forEach(inp => {
    inp.addEventListener('input', MAJColors);
    //console.log(' inp.addEventListener '+ inp);
});


function MAJColors(e){
    let indexEnCours = e.target.getAttribute('data-index');
    e.target.value = e.target.value.toUpperCase();
    valCouleurs[indexEnCours - 1] = e.target.value.toUpperCase();
    e.target.style.background = valCouleurs[indexEnCours - 1];

    // Vérification de la validité du code hexa via fonction qui check via un regex 
    checkHexValidity(valCouleurs[indexEnCours - 1]);
    //console.log('MAJColor - valCouleurs : ' + typeof valCouleurs + ' - indexEnCours : ' + indexEnCours + ' - valCouleurs[indexEnCours] : ' + valCouleurs[indexEnCours-1]);

    // MAJ du fond body avec le contenu de valCouleurs (origine: input ajouté manuellement)
    setGradient(fond.classList.contains('linear') ? 'linear' : 'radial', valCouleurs, largeurRepetition, hauteurRepetition);
}

// Couleurs aléatoires 

btnShuffle.addEventListener("click", () => {
    const inputs = document.querySelectorAll(".inp-couleur");
    for (i = 0; i < valCouleurs.length; i++) {
        valCouleurs[i] = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

        inputs[i].value = valCouleurs[i].toUpperCase();
        inputs[i].style.background = valCouleurs[i].toUpperCase();

        errorHexaCode.innerText = '';

        // MAJ du fond body avec le contenu  de valCouleurs (origine: bouton "shuffle")
        setGradient(fond.classList.contains('linear') ? 'linear' : 'radial', valCouleurs, largeurRepetition, hauteurRepetition);
    }
});

// Switch sur l'input pour choisir si bg répété ou non

widthInput.disabled = true; //par défaut quand la page charge: inputs grisés car la case repeat est pas checkée
heightInput.disabled = true;

switchInput.addEventListener('change', () => {
    if(switchInput.checked) {
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

  // Color picker


//   inputsCouleur.forEach((input) => {
//     input.addEventListener('click', () => {
//       const colorPicker = document.createElement('input');
//       colorPicker.type = 'color';
//       colorPicker.oninput = (e) => {
//         input.value = e.target.value;
//         MAJColors(input.value);
//       };
//       colorPicker.click();
      
//     });
//   });
// const rightInput = document.querySelectorAll('.rightInput');
// const leftInputs = document.getElementById('leftInput');
// const colorPickers = document.querySelector('.color-picker');
let colorPickerVisible = false;

// colorPickers.forEach((colorPicker, index) => {
//     colorPicker.addEventListener('click', () => {
//         if (!colorPickerVisible) {
//             console.log('colorPicker.addEventListener : '+ leftInputs[index]);
//             colorPicker.value = leftInputs[index].value; // Pour que le color picker soit déjà sur la bonne couleur de l'input
//             colorPicker.oninput = (e) => {
//                 leftInputs[index].value = e.target.value;
//                 leftInputs[index].style.background = leftInputs[index].value;
//             };
            
//             colorPicker.click();
//             colorPickerVisible = true;
//             console.log('if (!colorPickerVisible) '+ colorPickerVisible);
//         } else {
//             colorPickerVisible = false;
//             console.log('else (!colorPickerVisible) '+ colorPickerVisible);
//         }
//     });
// });

// colorPickers.addEventListener('click', () => {
//         if (!colorPickerVisible) {
//             // colorPickers.value = leftInputs.value; // Pour que le color picker soit déjà sur la bonne couleur de l'input
//             colorPickers.oninput = (e) => { 
//                            console.log('colorPicker.addEventListener : '+ e);

//                 leftInputs.value = e.target.value;
//                 leftInputs.style.background = leftInputs.value;
//             };
            
//             colorPickers.style.display = 'block';
//             colorPickerVisible = true;
//             console.log('if (!colorPickerVisible) '+ colorPickerVisible);
//         } else {
//             colorPickers.style.display = 'none';
//             colorPickerVisible = false;
//             console.log('else (!colorPickerVisible) '+ colorPickerVisible);
//         }
//     });


  

 // valCouleurs[indexEnCours - 1] = e.target.value.toUpperCase()



//  let colorPickerVisible = false;
  let colorPicker;
 
  const rightInput = document.getElementById('rightInput');
 
  rightInput.addEventListener('click', () => {
    if (!colorPickerVisible) {
      colorPicker = document.createElement('input');
      colorPicker.type = 'color';
      colorPicker.value = leftInput.value;
      colorPicker.oninput = (e) => {
        leftInput.value = e.target.value;
        leftInput.style.background = leftInput.value;
        leftInput.addEventListener('input',MAJColors);
      };
      inputContainer.appendChild(colorPicker);
      colorPicker.click();
      colorPickerVisible = true;
      console.log('couleur  '+ inputsCouleur.values);
    } else {
        inputContainer.removeChild(colorPicker);
      colorPickerVisible = false;
    }
 });



