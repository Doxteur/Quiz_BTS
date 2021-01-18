// Play Quiz script Temporary
var questionNumber:number = 1;
var numberOfGoodAnswer:number = 0;
let allQuestion : number[] = [0,1,2,3];
let nombreRandom = getRandomInt(0,(allQuestion.length - 1))

// Jimmy1
function Refresh(){
    document.location.reload();

}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
function Quiz(reponse) :any{
    fetch("quiz.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            //Start the Game 
            console.log(" Nombre choisie dans le tabeaux " + allQuestion[nombreRandom]);
            
            if(reponse == 5){
                startTheGame(reponse,data,nombreRandom,allQuestion);
                return 1;
            }
            
            checkWin(reponse,data,nombreRandom,allQuestion);
            //Check if it is the last question
            if(checkFin(reponse,data)){
                return 1;
            }
            //Check if the answer is valid
            allQuestion.splice(nombreRandom,1);

            nombreRandom = getRandomInt(0,(allQuestion.length -1))

            document.getElementById("titreQuestion").innerHTML = data[allQuestion[nombreRandom]].nom;
            document.getElementById("Question").innerHTML = data[allQuestion[nombreRandom]].question;
            for (var i = 0; i < 4; i++) {
                var emplacement:number = i + 1;
                document.getElementById(emplacement.toString()).innerHTML = data[allQuestion[nombreRandom]].reponses[0].Propositions[i];
            }
            console.log(allQuestion)
            questionNumber++;
        });



}

function startTheGame(reponse,data,nombreRandom,allQuestion){

        console.log(questionNumber);
        console.log("Start of the quiz");
        document.getElementById("start").style.display = "none";
        document.getElementById("content").style.display = "initial";
        document.getElementById("titreQuestion").innerHTML = data[allQuestion[nombreRandom]].nom;
        document.getElementById("Question").innerHTML = data[allQuestion[nombreRandom]].question;
        for (var i = 0; i < 4; i++) {
            var emplacement:number = i + 1;
            document.getElementById(emplacement.toString()).innerHTML = data[allQuestion[nombreRandom]].reponses[0].Propositions[i];
        }

}

function checkWin(reponse, data , nombreRandom,allQuestion){
    if (reponse == data[allQuestion[nombreRandom]].reponses[0].ReponsesVraie) {
        console.log("Bravo !!  1+");
        numberOfGoodAnswer++;
    } else {
        console.log("Mauvaise Réponse !");
    }

}

function checkFin(reponse,data) : number{
    if (questionNumber === data.length) {
        console.log(numberOfGoodAnswer);
        console.log("Finie !");
        document.getElementById("ecranFin").style.display = "initial";
        document.getElementById("nombreDeReponse").innerHTML += numberOfGoodAnswer;
        document.getElementById("content").style.display = "none";
        return 1;
    }

}