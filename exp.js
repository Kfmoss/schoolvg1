


function speak(){
    let text = document.querySelector("#speechText").textContent;
    console.log(text);
    const lyd = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(lyd);
}