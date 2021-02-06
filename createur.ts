function showQuestion() {

    fetch("quiz.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            data.forEach(element => {
                let newDiv = document.createElement("div");
                let newText = document.createElement("h1");
                
                // document.getElementById("allQuestion").appendChild(newDiv).classList.add(element.nom);
                $(newDiv).appendTo("#allQuestion").addClass(element.nom)

                $("." + element.nom).append("<h1>" + element.question + "</h1>");
                $("." + element.nom).append("</br>");
                $("." + element.nom).append("<h2>" + element.reponses[0].Propositions + "</h2>")
                $("." + element.nom).append("</br>");

                $("." + element.nom).append("<h3> La bonne réponse est : </h3>")
                $("." + element.nom).append("</br>");
                for (let i = 0; i < element.reponses[0].ReponsesVraie.length; i++) {
                    $("." + element.nom).append("<h2>" + element.reponses[0].Propositions[element.reponses[0].ReponsesVraie[i]])
                }
                
                console.log(element.nom);
                console.log(element.reponses[0].ReponsesVraie)
            });
        });
}

showQuestion();


//Auto compile tsc *.ts --watch




//Animation HTML
var btn = document.getElementById("hamburger");
var nav = document.getElementById("leftHeader");
btn.addEventListener("click", function () {
    nav.classList.toggle("active");
    btn.classList.toggle("active");
});



//Click on theme -> display all question on theme

function displayQuest(){
    console.log("Check DisplayQuest");
}