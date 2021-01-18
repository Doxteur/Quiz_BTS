// Play Quiz script Temporary
var questionNumber:number = 1;
var numberOfGoodAnswer:number = 0;
// Jimmy1
function Refresh(){
    document.location.reload();

}
function Quiz(reponse) :any{
    fetch("quiz.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            if (reponse == 5) {
                console.log(questionNumber);
                console.log("Start of the quiz");
                document.getElementById("start").style.display = "none";
                document.getElementById("content").style.display = "initial";
                document.getElementById("titreQuestion").innerHTML = data[0].nom;
                document.getElementById("Question").innerHTML = data[0].question;
                for (var i = 0; i < 4; i++) {
                    var emplacement:number = i + 1;
                    document.getElementById(emplacement.toString()).innerHTML = data[0].reponses[0].Propositions[i];
                }
                return 1;
            }
            if (reponse == data[questionNumber - 1].reponses[0].ReponsesVraie) {
                console.log("Bravo !!  1+");
                numberOfGoodAnswer++;
            } else {
                console.log("Mauvaise Réponse !");
            }

            if (questionNumber === data.length) {
                console.log(numberOfGoodAnswer);
                console.log("Finie !");
                document.getElementById("ecranFin").style.display = "initial";
                document.getElementById("nombreDeReponse").innerHTML += numberOfGoodAnswer;

                document.getElementById("content").style.display = "none";

                return;
            }
            document.getElementById("titreQuestion").innerHTML = data[questionNumber].nom;
            document.getElementById("Question").innerHTML = data[questionNumber].question;
            for (var i = 0; i < 4; i++) {
                var emplacement:number = i + 1;
                document.getElementById(emplacement.toString()).innerHTML = data[questionNumber].reponses[0].Propositions[i];
            }
            questionNumber++;
        });
}