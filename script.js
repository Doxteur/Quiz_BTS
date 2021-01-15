// Play Quiz script Temporary
let questionNumber = 0;

// Jimmy1

function Quiz(reponse) {

    console.log(questionNumber);
    fetch("quiz.json")
        .then(response => response.json())
        .then(data => {


            if (reponse == data[questionNumber].reponses[0].ReponsesVraie) {
                console.log("Bravo !!  1+");
                Quiz();
                return 1;

            } else if (reponse != undefined || null) {
                console.log("Mauvaise Réponse !");

            }

            document.getElementById("start").style.display = "none";
            document.getElementById("content").style.display = "initial";
            document.getElementById("titreQuestion").innerHTML = data[questionNumber].nom;
            document.getElementById("Question").innerHTML = data[questionNumber].question;

            for (let i = 0; i < 4; i++) {
                document.getElementById(i + 1).innerHTML = data[questionNumber].reponses[0].Propositions[i];
            }

            questionNumber++;
        });
}