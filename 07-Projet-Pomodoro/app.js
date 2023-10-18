const affichageT = document.querySelector('.affichageT');
const affichageP = document.querySelector('.affichageP');
const btnStart = document.querySelector('.b1');
const btnPause = document.querySelector('.b2');
const btnReset = document.querySelector('.b3');
const cycles = document.querySelector('h2');
const fond = document.body;
const blocTravail = document.querySelector('.travail');
const blocPause = document.querySelector('.pause');
const petitT = document.querySelector('.b4');
const grandT = document.querySelector('.b5');
const petitB = document.querySelector('.b6');
const grandB = document.querySelector('.b7');

let tempsTravail = 1800;
let tempsRepos = 300;
let nbCycles = 0;
let pause = false;
let checkInterval = false;

cycles.innerText = `Nombre de cycles : ${nbCycles}`;
affichageT.innerText = `${(Math.trunc(tempsTravail / 60) < 10) ? `0${Math.trunc(tempsTravail / 60)}` : Math.trunc(tempsTravail / 60)} : ${(tempsTravail % 60 < 10) ? `0${tempsTravail % 60}` : tempsTravail % 60}`;
affichageP.innerText = `${(Math.trunc(tempsRepos / 60) < 10) ? `0${Math.trunc(tempsRepos / 60)}` : Math.trunc(tempsRepos / 60)} : ${(tempsRepos % 60 < 10) ? `0${tempsRepos % 60}` : tempsRepos % 60}`;

petitT.addEventListener('click', () => {
    tempsTravail = 1800;
    affichageT.innerText = `${(Math.trunc(tempsTravail / 60) < 10) ? `0${Math.trunc(tempsTravail / 60)}` : Math.trunc(tempsTravail / 60)} : ${(tempsTravail % 60 < 10) ? `0${tempsTravail % 60}` : tempsTravail % 60}`;
})
grandT.addEventListener('click', () => {
    tempsTravail = 3600;  
    affichageT.innerText = `${(Math.trunc(tempsTravail / 60) < 10) ? `0${Math.trunc(tempsTravail / 60)}` : Math.trunc(tempsTravail / 60)} : ${(tempsTravail % 60 < 10) ? `0${tempsTravail % 60}` : tempsTravail % 60}`;
})
petitB.addEventListener('click', () => {
    tempsRepos = 300;  
    affichageP.innerText = `${(Math.trunc(tempsRepos / 60) < 10) ? `0${Math.trunc(tempsRepos / 60)}` : Math.trunc(tempsRepos / 60)} : ${(tempsRepos % 60 < 10) ? `0${tempsRepos % 60}` : tempsRepos % 60}`;
})
grandB.addEventListener('click', () => {
    tempsRepos = 600;  
    affichageP.innerText = `${(Math.trunc(tempsRepos / 60) < 10) ? `0${Math.trunc(tempsRepos / 60)}` : Math.trunc(tempsRepos / 60)} : ${(tempsRepos % 60 < 10) ? `0${tempsRepos % 60}` : tempsRepos % 60}`;
})




// Start

btnStart.addEventListener('click', () => {

    if(checkInterval === false){ // pr empecher de spamer en clickant plusieurs fis de suite sur start
        checkInterval = !checkInterval;
        
        tempsTravail--;
        affichageT.innerText = `${(Math.trunc(tempsTravail / 60) < 10) ? `0${Math.trunc(tempsTravail / 60)}` : Math.trunc(tempsTravail / 60)} : ${(tempsTravail % 60 < 10) ? `0${tempsTravail % 60}` : tempsTravail % 60}`;
        fond.style.background = `linear-gradient(to right, #70e1f5, #ffd194)`;
        blocTravail.style.border = `5px solid #df7c3a`;
        blocPause.style.border = `2px solid #df7c3a`;

        let timer = setInterval(() => { // l'ordre des conditions est important ici
            if(pause === false && tempsTravail > 0) {
                tempsTravail--;
                affichageT.innerText = `${(Math.trunc(tempsTravail / 60) < 10) ? `0${Math.trunc(tempsTravail / 60)}` : Math.trunc(tempsTravail / 60)} : ${(tempsTravail % 60 < 10) ? `0${tempsTravail % 60}` : tempsTravail % 60}`;
                fond.style.background = `linear-gradient(to right, #70e1f5, #ffd194)`;
                blocTravail.style.border = `5px solid #df7c3a`;
                blocPause.style.border = `2px solid #df7c3a`;
            }
            else if (pause === false && tempsRepos === 0 && tempsTravail === 0) {
                tempsTravail = 1800;
                tempsRepos = 300;
                nbCycles++;
                affichageT.innerText = `${(Math.trunc(tempsTravail / 60) < 10) ? `0${Math.trunc(tempsTravail / 60)}` : Math.trunc(tempsTravail / 60)} : ${(tempsTravail % 60 < 10) ? `0${tempsTravail % 60}` : tempsTravail % 60}`;
                affichageP.innerText = `${(Math.trunc(tempsRepos / 60) < 10) ? `0${Math.trunc(tempsRepos / 60)}` : Math.trunc(tempsRepos / 60)} : ${(tempsRepos % 60 < 10) ? `0${tempsRepos % 60}` : tempsRepos % 60}`;
                cycles.innerText = `Nombre de cycles : ${nbCycles}`;
                fond.style.background = `linear-gradient(to right, #70e1f5, #ffd194)`;
                blocTravail.style.border = `5px solid #df7c3a`;
                blocPause.style.border = `2px solid #df7c3a`;
            }
            else if (pause === false && tempsTravail === 0){
                tempsRepos--;
                affichageP.innerText = `${(Math.trunc(tempsRepos / 60) < 10) ? `0${Math.trunc(tempsRepos / 60)}` : Math.trunc(tempsRepos / 60)} : ${(tempsRepos % 60 < 10) ? `0${tempsRepos % 60}` : tempsRepos % 60}`;
                fond.style.background = `linear-gradient(to right, #c4123f, #684ff1)`;
                blocTravail.style.border = `2px solid #df7c3a`;
                blocPause.style.border = `5px solid #df7c3a`;
            }
        }, 1000);

        // Reset

        btnReset.addEventListener('click', () => {
            clearInterval(timer);
            checkInterval = false; // checkInterval est true quand le timer est en cours, et si il est sur truc, on peut pas lancer le tompteur en double 
            tempsTravail = 1800;
            tempsRepos = 300;
            nbCycles = 0;
            affichageT.innerText = `${(Math.trunc(tempsTravail / 60) < 10) ? `0${Math.trunc(tempsTravail / 60)}` : Math.trunc(tempsTravail / 60)} : ${(tempsTravail % 60 < 10) ? `0${tempsTravail % 60}` : tempsTravail % 60}`;
            affichageP.innerText = `${(Math.trunc(tempsRepos / 60) < 10) ? `0${Math.trunc(tempsRepos / 60)}` : Math.trunc(tempsRepos / 60)} : ${(tempsRepos % 60 < 10) ? `0${tempsRepos % 60}` : tempsRepos % 60}`;
            cycles.innerText = `Nombre de cycles : ${nbCycles}`;
            fond.style.background = `linear-gradient(to right, #70e1f5, #ffd194)`;
            blocTravail.style.border = `5px solid #df7c3a`;
            blocPause.style.border = `2px solid #df7c3a`;
        });
    }
    else {
        return;
    }
});

// Pause

btnPause.addEventListener('click', () => {

    if(pause === false){
        btnPause.innerText = "Play"
    }
    else if(pause === true){
        btnPause.innerText = "Pause"
    }
    pause = !pause;
});






