
let stopp = false;
function startStopp(){
    if (stopp == false){
        stopp = true;
        console.log("true")
    }else{
        stopp = false;
        console.log("false in any case")
    }

}

function speak(){
    startStopp();
    if (stopp == true){

        const speechElem = document.querySelector("#speechText");
        
    
        let text = speechElem.textContent.trim();
        // Split text into words and wrap each in a span
        const words = text.split(/(\s+)/); // keep spaces
        speechElem.innerHTML = words.map(w => w.trim() ? `<span class="tts-word">${w}</span>` : w).join("");
    
        const lyd = new SpeechSynthesisUtterance(text);
        lyd.lang = "nb-NO";
    
        let wordIndex = 0;
        const wordSpans = speechElem.querySelectorAll('.tts-word');
    
        lyd.onboundary = function(event) {
            if (event.name === 'word') {
                // Remove highlight from all
                wordSpans.forEach(span => span.style.background = '');
                // Highlight current word
                if (wordSpans[wordIndex]) {
                    wordSpans[wordIndex].style.background = 'yellow';
                }
                wordIndex++;
            }
        };
        lyd.onend = function() {
            wordSpans.forEach(span => span.style.background = '');
        };
        speechSynthesis.speak(lyd);
    }
  
}

function read_Tagg(){
    let text = document.querySelector(".tagger").textContent;
    console.log(text);
    const lyd = new SpeechSynthesisUtterance(text);
    lyd.lang = "nb-NO";
    speechSynthesis.speak(lyd);

}
function read_DOM(){
    let text = document.querySelector(".workflow_nettleser").textContent;
    console.log(text);
    const lyd = new SpeechSynthesisUtterance(text);
    lyd.lang = "nb-NO";
    speechSynthesis.speak(lyd);
}
function read_Fork_Dom(){
        let text = document.querySelector(".fork_dom").textContent;
    console.log(text);
    const lyd = new SpeechSynthesisUtterance(text);
    lyd.lang = "nb-NO";
    speechSynthesis.speak(lyd);

}
function read_git_intro(){
    let text = document.querySelector(".intro_git").textContent;
    console.log(text);
    const lyd = new SpeechSynthesisUtterance(text);
    lyd.lang = "nb-NO";
    speechSynthesis.speak(lyd);


}
function read_installGit(){
    let text = document.querySelector(".install_git").textContent;
    console.log(text);
    const lyd = new SpeechSynthesisUtterance(text);
    lyd.lang = "nb-NO";
    speechSynthesis.speak(lyd);

}
function read_installGitMac(){
    let text = document.querySelector(".install_git_mac").textContent;
    console.log(text);
    const lyd = new SpeechSynthesisUtterance(text);
    lyd.lang = "nb-NO";
    speechSynthesis.speak(lyd);

}
function read_oppgaver(){
    let text = document.querySelector(".HTMLoppgaver").textContent;
    console.log(text);
    const lyd = new SpeechSynthesisUtterance(text);
    lyd.lang = "nb-NO";
    speechSynthesis.speak(lyd);

}


function textToSpeech(){
    let text = document.querySelector(".grunnHTML").textContent;
    console.log(text);
    const lyd = new SpeechSynthesisUtterance(text);
    lyd.lang = "nb-NO";
    speechSynthesis.speak(lyd);
}



async function transUK(){
    let original_text = document.querySelector("#speechText").textContent;
    const res = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    body: JSON.stringify({
      q: original_text,
      source: "auto",
      target: "uk",
      format: "text"
    }),
    headers:{"Content-Type": "application/json" }
    });
    const data = await res.json();
    console.log(data);
    

}

