function showQuestion() {
    fetch("quiz.json")
        .then(function (response) {
        return response.json();
    })
        .then(function (data) {
        data.forEach(function (element) {
            var newDiv = document.createElement("div");
            var newText = document.createElement("h1");
            document.getElementById("allQuestion").appendChild(newDiv).classList.add(element.nom);
            document.getElementsByClassName(element.nom)[0].textContent += element.reponses[0].Propositions;
            document.getElementsByClassName(element.nom)[0].textContent += element.reponses[0].ReponsesVraie;
            console.log(element.nom);
        });
    });
}
showQuestion();
//Auto compile tsc *.ts --watch
