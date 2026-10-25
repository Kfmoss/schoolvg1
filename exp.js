const btsss = document.querySelector(".testingbtn");
if (btsss){
    btsss.addEventListener("click", speak);
}



let isReading = false;
let activeReadAloudButton = null;

function getNorwegianVoice() {
    const voices = speechSynthesis.getVoices();
    return voices.find(voice =>
        voice.lang.toLowerCase() === "nb-no" && voice.name.toLowerCase().includes("google")
    ) || voices.find(voice =>
        voice.lang.toLowerCase().startsWith("nb")
    );
}

function resetReadAloudButton(button) {
    button.textContent = "Les opp";
    button.setAttribute("aria-label", "Les opp");
    button.setAttribute("aria-pressed", "false");
    if (activeReadAloudButton === button) {
        activeReadAloudButton = null;
        isReading = false;
    }
}

function readAloud(button) {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
        button.textContent = "Opplesing er ikke tilgjengelig";
        button.setAttribute("aria-live", "polite");
        return;
    }

    if (activeReadAloudButton === button && isReading) {
        speechSynthesis.cancel();
        resetReadAloudButton(button);
        return;
    }

    if (isReading) {
        speechSynthesis.cancel();
        if (activeReadAloudButton) {
            resetReadAloudButton(activeReadAloudButton);
        } else {
            isReading = false;
        }
    }

    const content = button.closest("[data-speech-content]");
    if (!content) {
        console.error("Les opp-knappen mangler en data-speech-content-container.");
        return;
    }

    const contentCopy = content.cloneNode(true);
    contentCopy.querySelectorAll("[data-read-aloud]").forEach(readButton => readButton.remove());
    const text = contentCopy.textContent.trim().replace(/\s+/g, " ");
    if (!text) {
        console.error("Fant ingen tekst å lese opp.");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "nb-NO";
    const voice = getNorwegianVoice();
    if (voice) {
        utterance.voice = voice;
    }
    utterance.onend = () => resetReadAloudButton(button);
    utterance.onerror = event => {
        if (activeReadAloudButton !== button) {
            return;
        }
        resetReadAloudButton(button);
        if (event.error !== "canceled" && event.error !== "interrupted") {
            button.textContent = "Opplesing feilet";
            button.setAttribute("aria-live", "polite");
        }
    };

    activeReadAloudButton = button;
    isReading = true;
    button.textContent = "Stopp lesing";
    button.setAttribute("aria-label", "Stopp lesing");
    button.setAttribute("aria-pressed", "true");
    speechSynthesis.speak(utterance);
}

document.addEventListener("click", event => {
    if (!(event.target instanceof Element)) {
        return;
    }
    const button = event.target.closest("[data-read-aloud]");
    if (button) {
        readAloud(button);
    }
});



function speak() {
    if (isReading) {
        speechSynthesis.cancel();
        isReading = false;
        return;
    }
    const speechElem = document.querySelector("#speechText");
    let text = speechElem.textContent.trim();
    const words = text.split(/(\s+)/);
    speechElem.innerHTML = words.map(w => w.trim() ? `<span class="tts-word">${w}</span>` : w).join("");
    const lyd = new SpeechSynthesisUtterance(text);
    lyd.lang = "nb-NO";
    lyd.voice = getNorwegianVoice();
    let wordIndex = 0;
    const wordSpans = speechElem.querySelectorAll('.tts-word');
    lyd.onboundary = function(event) {
        if (event.name === 'word') {
            wordSpans.forEach(span => span.style.background = '');
            if (wordSpans[wordIndex]) {
                wordSpans[wordIndex].style.background = 'yellow';
            }
            wordIndex++;
        }
    };
    lyd.onend = function() {
        wordSpans.forEach(span => span.style.background = '');
        isReading = false;
    };
    isReading = true;
    speechSynthesis.speak(lyd);
}


function read_Tagg() {
    if (isReading) {
        speechSynthesis.cancel();
        isReading = false;
        return;
    }
    let text = document.querySelector(".tagger").textContent;
    const lyd = new SpeechSynthesisUtterance(text);
    lyd.lang = "nb-NO";
    lyd.voice = getNorwegianVoice();
    lyd.onend = () => { isReading = false; };
    isReading = true;
    speechSynthesis.speak(lyd);
}

function read_DOM() {
    if (isReading) {
        speechSynthesis.cancel();
        isReading = false;
        return;
    }
    let text = document.querySelector(".workflow_nettleser").textContent;
    const lyd = new SpeechSynthesisUtterance(text);
    lyd.lang = "nb-NO";
    lyd.voice = getNorwegianVoice();
    lyd.onend = () => { isReading = false; };
    isReading = true;
    speechSynthesis.speak(lyd);
}

function read_Fork_Dom() {
    if (isReading) {
        speechSynthesis.cancel();
        isReading = false;
        return;
    }
    let text = document.querySelector(".fork_dom").textContent;
    const lyd = new SpeechSynthesisUtterance(text);
    lyd.lang = "nb-NO";
    lyd.voice = getNorwegianVoice();
    lyd.onend = () => { isReading = false; };
    isReading = true;
    speechSynthesis.speak(lyd);
}

function read_git_intro() {
    if (isReading) {
        speechSynthesis.cancel();
        isReading = false;
        return;
    }
    let text = document.querySelector(".intro_git").textContent;
    const lyd = new SpeechSynthesisUtterance(text);
    lyd.lang = "nb-NO";
    lyd.voice = getNorwegianVoice();
    lyd.onend = () => { isReading = false; };
    isReading = true;
    speechSynthesis.speak(lyd);
}

function read_installGit() {
    if (isReading) {
        speechSynthesis.cancel();
        isReading = false;
        return;
    }
    let text = document.querySelector(".install_git").textContent;
    const lyd = new SpeechSynthesisUtterance(text);
    lyd.lang = "nb-NO";
    lyd.voice = getNorwegianVoice();
    lyd.onend = () => { isReading = false; };
    isReading = true;
    speechSynthesis.speak(lyd);
}

function read_installGitMac() {
    if (isReading) {
        speechSynthesis.cancel();
        isReading = false;
        return;
    }
    let text = document.querySelector(".install_git_mac").textContent;
    const lyd = new SpeechSynthesisUtterance(text);
    lyd.lang = "nb-NO";
    lyd.voice = getNorwegianVoice();
    lyd.onend = () => { isReading = false; };
    isReading = true;
    speechSynthesis.speak(lyd);
}

function read_oppgaver() {
    if (isReading) {
        speechSynthesis.cancel();
        isReading = false;
        return;
    }
    let text = document.querySelector(".HTMLoppgaver").textContent;
    const lyd = new SpeechSynthesisUtterance(text);
    lyd.lang = "nb-NO";
    lyd.voice = getNorwegianVoice();
    lyd.onend = () => { isReading = false; };
    isReading = true;
    speechSynthesis.speak(lyd);
}

function textToSpeech() {
    if (isReading) {
        speechSynthesis.cancel();
        isReading = false;
        return;
    }
    let text = document.querySelector(".grunnHTML").textContent;
    const lyd = new SpeechSynthesisUtterance(text);
    lyd.lang = "nb-NO";
    lyd.voice = getNorwegianVoice();
    lyd.onend = () => { isReading = false; };
    isReading = true;
    speechSynthesis.speak(lyd);
}

// --------------button UP!!! --------------

const btn_top = document.getElementById('btn_up');
if (btn_top) {
    window.addEventListener("scroll", () => {
        btn_top.style.display =
            document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
                ? "block"
                : "none";
    });
    btn_top.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
