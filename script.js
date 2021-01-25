// Play Quiz script Temporary
var questionNumber = 1;
var numberOfGoodAnswer = 0;
var allQuestion = [0, 1, 2, 3]; // A changer
var nombreRandom = getRandomInt(0, (allQuestion.length - 1));
// Jimmy1
function Refresh() {
    document.location.reload();
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
//Permet de récupèrer les informations dans le json
function Quiz(reponse) {
    fetch("quiz.json")
        .then(function (response) {
        return response.json();
    })
        .then(function (data) {
        //Start the Game 
        console.log(" Nombre choisie dans le tabeaux " + allQuestion[nombreRandom]);
        if (reponse == 5) {
            startTheGame(reponse, data, nombreRandom, allQuestion);
            return 1;
        }
        //Verifie la validité des réponses
        checkWin(reponse, data, nombreRandom, allQuestion);
        //Check if it is the last question
        if (checkFin(reponse, data)) {
            return 1;
        }
        //Check if the answer is valid
        allQuestion.splice(nombreRandom, 1);
        nombreRandom = getRandomInt(0, (allQuestion.length - 1));
        document.getElementById("Question").innerHTML = data[allQuestion[nombreRandom]].question;
        for (var i = 0; i < 4; i++) {
            var emplacement = i + 1;
            document.getElementById(emplacement.toString()).innerHTML = data[allQuestion[nombreRandom]].reponses[0].Propositions[i];
        }
        questionNumber++;
    });
}
function startTheGame(reponse, data, nombreRandom, allQuestion) {
    console.log("Start of the quiz");
    document.getElementById("start").style.display = "none";
    document.getElementById("content").style.display = "initial";
    document.getElementById("Question").innerHTML = data[allQuestion[nombreRandom]].question;
    for (var i = 0; i < 4; i++) {
        var emplacement = i + 1;
        document.getElementById(emplacement.toString()).innerHTML = data[allQuestion[nombreRandom]].reponses[0].Propositions[i];
    }
}
function checkWin(reponse, data, nombreRandom, allQuestion) {
    //Reponse donnee par l'utilisateur
    var additionBonneReponseDonnee = null;
    //Reponse demander par la question
    var addtionBonneReponseQuestion = null;
    //Calcul en ajoutant dans la variable chaque valeur du tableau puis comparaison de la somme entre les deux tableaux 
    for (var i = 0; i < reponse.length; i++) {
        additionBonneReponseDonnee += reponse[i];
    }
    for (var i = 0; i < data[allQuestion[nombreRandom]].reponses[0].ReponsesVraie.length; i++) {
        addtionBonneReponseQuestion += data[allQuestion[nombreRandom]].reponses[0].ReponsesVraie[i];
    }
    // Détermine si les réponses sont bonnes
    if ((additionBonneReponseDonnee == addtionBonneReponseQuestion) && additionBonneReponseDonnee != null) {
        console.log(additionBonneReponseDonnee);
        console.log("Meme taille");
        document.getElementById("reponsebonne").style.display = "table";
        document.getElementById("reponsebonne").style.backgroundColor = "Green";
        document.getElementById("valiationreponse").innerHTML = "Bonne Réponse(s)";
        console.log("Bravo !!  1+");
        numberOfGoodAnswer++;
        return 1;
    }
    else {
        document.getElementById("reponsebonne").style.display = "table";
        document.getElementById("reponsebonne").style.backgroundColor = "Red";
        document.getElementById("valiationreponse").innerHTML = "Mauvaise Réponse(s)";
        console.log("Mauvaise Réponse !");
        console.log("Pas la meme taille");
        return 0;
    }
}
// Vérifie si c'est la derniere question et change en fonction
function checkFin(reponse, data) {
    if (questionNumber === data.length) {
        console.log(numberOfGoodAnswer);
        console.log("Finie !");
        document.getElementById("ecranFin").style.display = "initial";
        document.getElementById("nombreDeReponse").innerHTML += numberOfGoodAnswer;
        document.getElementById("content").style.display = "none";
        return 1;
    }
}
var reponseM = [];
function multipleReponse(nombreChoisie) {
    for (var i = 0; i < 4; i++) {
        if (reponseM[i] == nombreChoisie) {
            reponseM.splice(i, 1);
            console.log("Dans le tableau il y a " + reponseM);
            document.getElementById((nombreChoisie + 1).toString()).style.border = "none";
            return 0;
        }
    }
    reponseM.push(nombreChoisie);
    document.getElementById((nombreChoisie + 1).toString()).style.border = "solid 4px black";
    console.log("Dans le tableau il y a " + reponseM);
}
function validation() {
    for (var i = 1; i <= 4; i++) {
        document.getElementById(i.toString()).style.border = "none";
    }
    Quiz(reponseM);
    reponseM = [];
}
//Animation HTML
var btn = document.getElementById("hamburger");
var nav = document.getElementById("leftHeader");
btn.addEventListener("click", function () {
    nav.classList.toggle("active");
    btn.classList.toggle("active");
});
