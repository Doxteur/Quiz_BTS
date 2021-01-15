// Play Quiz script Temporary
let questionNumber: number = 1;
let numberOfGoodAnswer = 0;
// Jimmy1

function Quiz(reponse?): any {
    
    
    fetch("quiz.json")
    .then(response => response.json())
    .then(data => {
            console.log(data[questionNumber -1].reponses[0].ReponsesVraie);

            if (reponse == 5) {
                console.log(questionNumber);
                console.log("Start of the quiz");
                document.getElementById("start").style.display = "none";
                document.getElementById("content").style.display = "initial";
                document.getElementById("titreQuestion").innerHTML = data[0].nom;
                document.getElementById("Question").innerHTML = data[0].question;
                for (let i = 0; i < 4; i++) {
                    let emplacement: number = i + 1;
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
            document.getElementById("start").style.display = "none";
            document.getElementById("content").style.display = "initial";
            document.getElementById("titreQuestion").innerHTML = data[questionNumber].nom;
            document.getElementById("Question").innerHTML = data[questionNumber].question;

            for (let i = 0; i < 4; i++) {
                let emplacement: number = i + 1;

                document.getElementById(emplacement.toString()).innerHTML = data[questionNumber].reponses[0].Propositions[i];
            }
            if (questionNumber + 1 === data.length) {
                console.log(numberOfGoodAnswer);
                console.log("Finie !");
                return;
            }
            questionNumber++;



        });

}