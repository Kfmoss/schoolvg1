


function speak(){
    let text = document.querySelector("#speechText").textContent;
    console.log(text);
    const lyd = new SpeechSynthesisUtterance(text);
    lyd.lang = "nb-NO";
    speechSynthesis.speak(lyd);
}