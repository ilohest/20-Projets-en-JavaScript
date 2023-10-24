const btnInscription = document.querySelector('.btn-inscription');
const btnConnection = document.querySelector('.btn-connection');
const btnDeco = document.querySelector('.btn-deconnection');

const formInscription = document.querySelector('.form-inscription');
const emailInscription = document.querySelector('.email-inscription');
const mdpInscription = document.querySelector('.mdp-inscription');

const formConnection = document.querySelector('.form-connection');
const emailConnection = document.querySelector('.email-connection')
const mdpConnection = document.querySelector('.mdp-connection');

//Apparirion des popup inscription/connection

btnInscription.addEventListener('click', () => {
    if(formConnection.classList.contains('apparition')){
        formConnection.classList.remove('apparition')
    }
    formInscription.classList.toggle('apparition');  

    formInscription.reset(); // vider les champs

    if(messageErreur.classList.contains('apparaitre')){
        messageErreur.classList.remove('apparaitre')
    }

})

btnConnection.addEventListener('click', () => {
    if(formInscription.classList.contains('apparition')){
        formInscription.classList.remove('apparition')
    }
    formConnection.classList.toggle('apparition');
})

// Inscription

const messageErreur = document.querySelector('.message-erreur');
//console.log(messageErreur);

formInscription.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailValeur = emailInscription.value;
    const mdpValeur = mdpInscription.value;
    
    auth.createUserWithEmailAndPassword(emailValeur, mdpValeur)
        .then(cred => { //then crée une promesse qui va se résoudre en loguant les informations de ce qu'on vient de faire (cred) càd l'utilisateur qui vient de se créer un compte
            console.log("Inscrit", cred);
            formInscription.reset(); //pareil que faire des chaines de caract vides sur les input
            formInscription.classList.toggle('apparition');
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                // Afficher un message à l'utilisateur indiquant que l'adresse e-mail est déjà utilisée.
                //console.log(error.code);
                messageErreur.classList.add('apparaitre');
            }
        });
});

// Déconnection

btnDeco.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log("Déconecté")
    }) // then: promesse retournée après la déconnection pour faire des actions (montrer un mezssage à l'utilisateur etc)
})

// Connection

formConnection.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailValeur = emailConnection.value;
    const mdpValeur = mdpConnection.value;

    auth.signInWithEmailAndPassword(emailValeur, mdpValeur).then(cred => { //then crée une promesse qui va se résoudre en loguant les informations de ce qu'on vient de faire (cred) càd l'utilisateur qui vient de se créer un compte
        console.log("Connecté", cred.user);
        formConnection.reset(); //cleaner les input - pareil que faire des chaines de caract vides sur les input
        formConnection.classList.toggle('apparition'); //faire disparaitre le popup
    })
})

// Gérer le contenu

const h1 = document.querySelector('h1');
const info = document.querySelector('.info');
const user = document.querySelector('.user');

auth.onAuthStateChanged(utilisateur => { //onAuthSC permet de voir si un utilisateur est connecté ou pas - le paramètre de la fonction, 'utilisateur' représente le state de la fonction qui voirn si connecté ou pas 
    if(utilisateur){ // si utilisateur connecté
        info.innerText = "Voici le contenu privé"
        h1.innerText = "Vous voilà de retour ! :)"
        user.innerHTML = "Connecté via l'email " + utilisateur.email;
    } 
    else {
        console.log('Utilisateur déconnecté')
        info.innerText = "Contenu public."
        h1.innerText = "Bienvenue, inscrivez-vous ou connectez-vous."
        
    }
})

// Afficher mot de passe

const oeilMdpI = document.querySelector('.oeilMdpI');
const oeilMdpC = document.querySelector('.oeilMdpC');

//console.log(oeilMdpI);

oeilMdpI.addEventListener('click', () => {
    if (mdpInscription.type === "password") {
        mdpInscription.type = "text";
    } else {
        mdpInscription.type = "password";
    }
});

oeilMdpC.addEventListener('click', () => {
    if (mdpConnection.type === "password") {
        mdpConnection.type = "text";
    } else {
        mdpConnection.type = "password";
    }
});