const audioPlayer = document.querySelector('audio');

audioPlayer.addEventListener('play', () => {
    const contexteAudio = new AudioContext();
    const src = contexteAudio.createMediaElementSource(audioPlayer);  // la méthode createM.E.S. crée ue source à parite de notre source audio et qu'on va pouvoir manipuler
    const analyseur = contexteAudio.createAnalyser();

    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    src.connect(analyseur);
    analyseur.connect(contexteAudio.destination); 

    analyseur.fftSize = 1024;

    const frequencesAudio = analyseur.frequencyBinCount;
    //console.log(frequencesAudio);

    const tableauFrequences = new Uint8Array(frequencesAudio);

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const largeurBarre = (WIDTH / tableauFrequences.length) + 2; // +2 car pas assez d'aigus dans ce son et du coup on voit pas ces aigus représentés sur la droite 
    let hauteurBarre;
    let x;

    function retourneBarres(){
        requestAnimationFrame(retourneBarres)
        x = 0;
        analyseur.getByteFrequencyData(tableauFrequences);

        ctx.fillStyle = "#000";
        ctx.fillRect(0,0,WIDTH,HEIGHT);

        for(let i = 0; i <frequencesAudio; i++) {
            hauteurBarre = tableauFrequences[i];

            let r = 250;
            let g = 50;
            let b = i;

            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(x, HEIGHT, largeurBarre, -hauteurBarre); // -hauteurBarre comme ça les barres se créent de bas en haut - HEIGHT comme ça on a les barres en dessous (si 0, les barres sont au dessus de l'écran)

            x += largeurBarre + 1;
        }
    }

    retourneBarres(); 
})