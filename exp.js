


function speak(){
    let text = document.querySelector("#speechText").textContent;
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

