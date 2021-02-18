//Itération 6

// Play Quiz script Temporary
var questionNumber = 1;
var numberOfGoodAnswer = 0;
let themeChoisie = 1;
var allQuestion = [];
var nombreRandom;
// Jimmy1
function Refresh() {
    document.location.reload();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function checkValideJson(data) {

    for (let j = 0; j < data.themes[themeChoisie].Questions.length; j++) {
        if (data.themes[themeChoisie].Questions[j].reponses.Propositions.length == 0 || data.themes[themeChoisie].Questions[j].reponses.ReponsesVraie.length == 0) {
            return 1;
        }
    }
}
//Permet de récupèrer les informations dans le json
function Quiz(reponse) {
    fetch("../quiz.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.themes[themeChoisie].nombreDeQuestionATirer != undefined) {
                $("#nombreQuestion").html("Question " + questionNumber + " / " + data.themes[themeChoisie].nombreDeQuestionATirer);
            } else {
                $("#nombreQuestion").html("Question " + questionNumber + " / " + data.themes[themeChoisie].Questions.length);
            }
            //Start the Game 
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
            nombreRandom = getRandomInt(0, (allQuestion.length));
            document.getElementById("Question").innerHTML = data.themes[themeChoisie].Questions[allQuestion[nombreRandom]].question;
            for (var i = 0; i < 4; i++) {
                var emplacement = i + 1;
                document.getElementById("l" + emplacement.toString()).innerHTML = data.themes[themeChoisie].Questions[allQuestion[nombreRandom]].reponses.Propositions[i];
            }

            questionNumber++;

            if (data.themes[themeChoisie].nombreDeQuestionATirer != undefined) {
                $("#nombreQuestion").html("Question " + questionNumber + " / " + data.themes[themeChoisie].nombreDeQuestionATirer);
            } else {
                $("#nombreQuestion").html("Question " + questionNumber + " / " + data.themes[themeChoisie].Questions.length);
            }
        });
}
// Quand l'utilisateur a choisie un theme
function chooseTheme(themeChoisiee) {
    fetch("../quiz.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            for (let i = 0; i < data.themes[themeChoisie].Questions.length; i++) {
                allQuestion.push(i);
            }
        });
    if (document.getElementById("themes").value == "default") {
        return;
    } else {
        themeChoisie = themeChoisiee;
        document.getElementById("themeSelector").style.display = "none"
        nombreRandom = getRandomInt(0, (allQuestion.length));
    }
    Quiz(5);
}

function checkThemeChoose() {
    chooseTheme(document.getElementById("themes").value);

}
// Affiche les themes à l'utilisateur
function showTheme() {

    document.getElementById("titreTheme").style.display = "initial"
    document.getElementById("hamburger").style.display = "initial"
    document.getElementById("container").style.display = "none";
    document.getElementById("themeSelector").style.display = "initial";

    document.body.style.backgroundColor = "#FFC122"
    fetch("../quiz.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            data.themes.forEach(function(element) {
                // var newDiv = document.createElement("div");
                // document.getElementById("theme").appendChild(newDiv).classList.add(element.idtheme);
                // $("." + element.idtheme).append("<h1 onclick=" + "chooseTheme(" + (element.idtheme - 1) + ")" + " > " + element.theme);
                $("#themes").append("<option value=" + (element.idtheme - 1) + ">" + element.theme);

            });

        })
}

function startTheGame(reponse, data, nombreRandom, allQuestion) {

    document.body.style.backgroundColor = "#FFC122"
    document.getElementById("container").style.display = "none";
    document.getElementById("hamburger").style.display = "initial";
    document.getElementById("content").style.display = "initial";
    document.getElementById("titreTheme").style.display = "none";

    document.getElementById("Question").innerHTML = data.themes[themeChoisie].Questions[allQuestion[nombreRandom]].question;
    for (var i = 0; i < data.themes[themeChoisie].Questions[allQuestion[nombreRandom]].reponses.Propositions.length; i++) {
        var emplacement = i + 1;
        document.getElementById("l" + emplacement.toString()).innerHTML = data.themes[themeChoisie].Questions[allQuestion[nombreRandom]].reponses.Propositions[i];
    }
    if (checkValideJson(data)) {
        $("#wrongJson").css("display", "initial");
        $("#content").css("display", "none");
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
    for (var i = 0; i < data.themes[themeChoisie].Questions[allQuestion[nombreRandom]].reponses.ReponsesVraie.length; i++) {
        addtionBonneReponseQuestion += data.themes[themeChoisie].Questions[allQuestion[nombreRandom]].reponses.ReponsesVraie[i];
    }

    // Détermine si les réponses sont bonnes
    if ((additionBonneReponseDonnee == addtionBonneReponseQuestion) && additionBonneReponseDonnee != null && reponse.length == data.themes[themeChoisie].Questions[allQuestion[nombreRandom]].reponses.ReponsesVraie.length) {
        // document.getElementById("reponsebonne").classList.toggle("anim");
        $("#reponsebonne").toggleClass("anim");
        setTimeout(function() {
            $("#reponsebonne").toggleClass("anim");
        }, 2500);
        document.getElementById("valiationreponse").innerHTML = "Bonne Réponse(s)";
        document.getElementById("reponsebonne").style.backgroundColor = "Green";

        numberOfGoodAnswer++;
        return 1;
    } else {
        $("#reponsebonne").toggleClass("anim");
        setTimeout(function() {
            $("#reponsebonne").toggleClass("anim");
        }, 2500);
        document.getElementById("reponsebonne").style.backgroundColor = "Red";
        document.getElementById("valiationreponse").innerHTML = "Mauvaise Réponse(s)";
        return 0;
    }
}
// Vérifie si c'est la derniere question et change en fonction
function checkFin(reponse, data) {
    if (questionNumber === data.themes[themeChoisie].nombreDeQuestionATirer || questionNumber == data.themes[themeChoisie].Questions.length) {
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
            document.getElementById(("l" + (nombreChoisie + 1)).toString()).style.border = "solid 4px transparent";
            document.getElementById(("l" + (nombreChoisie + 1)).toString()).style.backgroundColor = "white";

            return 0;
        }
    }
    reponseM.push(nombreChoisie);
    document.getElementById(("l" + (nombreChoisie + 1)).toString()).style.border = "solid 4px black";
    document.getElementById(("l" + (nombreChoisie + 1)).toString()).style.borderRadius = "50px";

    switch (nombreChoisie + 1) {
        case 1:
            document.getElementById(("l" + (nombreChoisie + 1)).toString()).style.backgroundColor = "#E94D4D";
            break;
        case 2:
            document.getElementById(("l" + (nombreChoisie + 1)).toString()).style.backgroundColor = "#4ACBDE";
            break;
        case 3:
            document.getElementById(("l" + (nombreChoisie + 1)).toString()).style.backgroundColor = "#E7DF27";
            break;
        case 4:
            document.getElementById(("l" + (nombreChoisie + 1)).toString()).style.backgroundColor = "#8211B8";
            break;
    }

    document.getElementById(("l" + (nombreChoisie + 1)).toString()).style.borderRadius = "50px";


}

function validation() {
    for (var i = 1; i <= 4; i++) {
        document.getElementById("l" + i.toString()).style.border = "solid 4px transparent";
        document.getElementById("l" + i.toString()).style.borderRadius = "50px";

        document.getElementById("l" + i.toString()).style.backgroundColor = "white";

    }
    Quiz(reponseM);
    reponseM = [];
}
//Animation HTML
var btn = document.getElementById("hamburger");
var nav = document.getElementById("leftHeader");
btn.addEventListener("click", function() {
    nav.classList.toggle("active");
    btn.classList.toggle("active");
});