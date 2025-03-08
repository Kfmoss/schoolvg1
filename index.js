
let eksempel1 = document.querySelector("#myCallbackButton1")
const tittle = "the problem"



eksempel1.addEventListener("click", function () {
    alert("Dette er eksempel 1 Callback");

});



let tall = [2, 4, 6, 8];

tall.forEach(function (verdi) {
    console.log(verdi); // Skriver ut: 2, 4, 6, 8
});


let colors=["white", "blue", "orange", "green"];

colors.forEach(verdi => console.log(verdi));



let personer = [
    { navn: "Ole", alder: 25 },
    { navn: "Lise", alder: 30 },
    { navn: "Kari", alder: 28 }
];

personer.forEach(person => {
    console.log(`${person.navn} er ${person.alder} år.`);
});


