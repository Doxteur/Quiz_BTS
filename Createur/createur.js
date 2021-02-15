function showQuestion() {
    fetch("quiz.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            data.themes.forEach(function(element) {
                var newDiv = document.createElement("div");
                var tempName = element.idtheme;
                tempName = tempName.toString();
                console.log(tempName);
                $(newDiv).appendTo("#allQuestion").addClass(tempName);
                $("." + tempName).append("<h1>" + element.theme + "</h1>");
                element.Questions.forEach(function(themeElement) {
                    // document.getElementById("allQuestion").appendChild(newDiv).classList.add(element.nom);
                    //Affichage Question
                    $("." + tempName).append("<h1>" + themeElement.question + "</h1>");
                    for (var i = 0; i < themeElement.reponses.Propositions.length; i++) {
                        $("." + tempName).append("<h2>" + themeElement.reponses.Propositions[i] + "</h2>");
                    }
                    $("." + tempName).append("</br>");
                    for (var j = 0; j < themeElement.reponses.ReponsesVraie.length; j++) {
                        $("." + tempName).append("<h1> La bonne réponse est : <span>" + themeElement.reponses.Propositions[themeElement.reponses.ReponsesVraie[j]] + " </span></h1>");
                    }
                    $("." + tempName).append("</br>");
                    //
                    // $("." + element.nom).append("</br>");
                    // $("." + element.nom).append("<h3> La bonne réponse est : </h3>")
                    // $("." + element.nom).append("</br>");
                    // for (let i = 0; i < element.reponses.ReponsesVraie.length; i++) {
                    //     $("." + element.nom).append("<h2>" + element.reponses.Propositions[element.reponses.ReponsesVraie[i]])
                    // }
                    // console.log(element.nom);
                    // console.log(element.reponses.ReponsesVraie)
                });
            });
        });
}
//Auto compile tsc *.ts --watch
//Animation HTML
var btn = document.getElementById("hamburger");
var nav = document.getElementById("leftHeader");
btn.addEventListener("click", function() {
    nav.classList.toggle("active");
    btn.classList.toggle("active");
});
//Click on theme -> display all question on theme
function displayQuest() {
    console.log("Check DisplayQuest");
}


function connect() {
    let password = document.getElementById("valueInput").value;
    if (password == "Caramel" || password == "caramel") {
        showQuestion();
    } else {
        document.getElementById("wrongPassword").style.display = "initial"
    }
}