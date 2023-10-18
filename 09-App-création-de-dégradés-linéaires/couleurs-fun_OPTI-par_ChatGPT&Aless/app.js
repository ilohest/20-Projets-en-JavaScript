const fond = document.body;
const containerCouleurs = document.querySelector('.container-couleurs');
const span = document.querySelector('span');
const inputRange = document.querySelector('.inp-range');
const linearBtn = document.getElementById('linear');
const radialBtn = document.getElementById('radial');
const btnShuffle = document.querySelector(".shuffle");
const btns = document.querySelectorAll('button');


let valCouleurs = ['#BA5370','#F4E2D8'];
let inclinaison = 45;
let rayon = 50; 
let index = 2;

initInputs(valCouleurs);

function initInputs(colors) {
  containerCouleurs.innerHTML = "";
  colors.forEach((color, i) => {
    addInput(color, i+1);
  });
}

function addInput(color, idx) {
  const inp = document.createElement('input');
  inp.value = color;
  inp.style.background = color;
  inp.setAttribute('data-index', idx);
  inp.classList.add('inp-couleur');
  inp.addEventListener('input', MAJColors);
  containerCouleurs.appendChild(inp);
}

function setGradient(type) {
  if (type === 'linear') {
    fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
  } else if (type === 'radial') {
    let gradientString = 'radial-gradient(circle at center';
    const colorStep = 100 / (valCouleurs.length - 1);
    for (let i = 0; i < valCouleurs.length; i++) {
      gradientString += `, ${valCouleurs[i]} ${(colorStep * i) + Number(rayon)}%`;
    }
    gradientString += ')';
    fond.style.background = gradientString;
  }
}

inputRange.addEventListener('input', (e) => {
  const type = fond.classList.contains('linear') ? 'linear' : 'radial';
  inclinaison = type === 'linear' ? e.target.value * 3.6 : rayon = e.target.value;
  setGradient(type, valCouleurs);
});

linearBtn.addEventListener('change', () => {
  fond.classList.add('linear');
  fond.classList.remove('radial');
  setGradient('linear', valCouleurs);
});

radialBtn.addEventListener('change', () => {
  fond.classList.add('radial');
  fond.classList.remove('linear');
  setGradient('radial', valCouleurs);
});

btns.forEach(btn => {
  btn.addEventListener('click', rajouteEnleve);
});

function rajouteEnleve(e) {
  span.innerText = '';
  const allInputs = document.querySelectorAll(".inp-couleur");

  // Add a color
  if (e.target.className === "plus") {
    if (allInputs.length >= 9) {
      return;
    }
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    valCouleurs.push(randomColor);
    addInput(randomColor, ++index);
  }
  // Remove a color
  else if (e.target.className === "moins") {
    if (valCouleurs.length <= 2) {
      span.innerText = 'Il faut au moins deux couleurs';
      return;
    }
    valCouleurs.pop();
    allInputs[allInputs.length - 1].remove();
    index--;
  }
  
  // Update the background
  setGradient(fond.classList.contains('linear') ? 'linear' : 'radial');
}

function MAJColors(e) {
  const idx = e.target.getAttribute('data-index') - 1;
  valCouleurs[idx] = e.target.value.toUpperCase();
  setGradient(fond.classList.contains('linear') ? 'linear' : 'radial');
}

btnShuffle.addEventListener("click", () => {
  valCouleurs = valCouleurs.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);
  initInputs(valCouleurs);
  setGradient(fond.classList.contains('linear') ? 'linear' : 'radial');
});

