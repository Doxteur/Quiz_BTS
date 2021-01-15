// Play Quiz script Temporary
let questionNumber:number = 0;

// Jimmy1

function Quiz(reponse?) : any {

    console.log(questionNumber);
    fetch("quiz.json")
        .then(response => response.json())
        .then(data => {


            if (reponse == data[questionNumber].reponses[0].ReponsesVraie) {
                console.log("Bravo !!  1+");
                Quiz(reponse - 1);
                return 1;
            } else if (reponse != undefined || null) {
                console.log("Mauvaise Réponse !");
            }
            document.getElementById("start").style.display = "none";
            document.getElementById("content").style.display = "initial";
            document.getElementById("titreQuestion").innerHTML = data[questionNumber].nom;
            document.getElementById("Question").innerHTML = data[questionNumber].question;

            for (let i = 0; i < 4; i++) {
                let emplacement :number = i + 1;
               
                document.getElementById(emplacement.toString()).innerHTML = data[questionNumber].reponses[0].Propositions[i];
            }

            questionNumber++;

        });

}