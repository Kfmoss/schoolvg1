const btsss = document.querySelector(".testingbtn");
if (btsss){
    btsss.addEventListener("click", speak);
}



let isReading = false;
let activeReadAloudButton = null;
let speechRequestId = 0;

function getNorwegianVoice(voices = speechSynthesis.getVoices()) {
    return voices.find(voice =>
        voice.lang.toLowerCase() === "nb-no" && voice.name.toLowerCase().includes("google")
    ) || voices.find(voice =>
        voice.lang.toLowerCase().startsWith("nb")
    );
}

function getAvailableSpeechVoices() {
    const voices = speechSynthesis.getVoices();
    if (voices.length) {
        return Promise.resolve(voices);
    }

    return new Promise(resolve => {
        const finish = () => {
            clearTimeout(timeoutId);
            speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
            resolve(speechSynthesis.getVoices());
        };
        const handleVoicesChanged = () => {
            if (speechSynthesis.getVoices().length) {
                finish();
            }
        };
        const timeoutId = setTimeout(finish, 1500);
        speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);
    });
}

function getSpeechLanguage(button) {
    if (!(button instanceof Element)) {
        return "nb-NO";
    }
    return button.closest(".textspeech1, .textspeech2")
        ?.querySelector(".speech-language")?.value || "nb-NO";
}

function getSpeechVoice(language, voices) {
    if (language === "nb-NO") {
        return getNorwegianVoice(voices);
    }
    const languagePrefix = language.split("-")[0].toLowerCase();
    return voices.find(voice => voice.lang.toLowerCase() === language.toLowerCase())
        || voices.find(voice => voice.lang.toLowerCase().startsWith(languagePrefix));
}

function showSpeechStatus(message) {
    const status = document.getElementById("speech-status");
    if (status) {
        status.textContent = message;
        status.hidden = !message;
    } else if (message) {
        console.error(message);
    }
}

function getMissingVoiceMessage(language) {
    const languageNames = {
        uk: "ukrainsk",
        ar: "arabisk",
        en: "engelsk"
    };
    const languageName = languageNames[language.split("-")[0]] || language;
    return `Ingen ${languageName} tale-stemme er tilgjengelig. Installer en slik stemme i nettleseren eller operativsystemet, og prøv igjen.`;
}

function readSpeechContent(button, selector) {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
        showSpeechStatus("Opplesing er ikke tilgjengelig i denne nettleseren.");
        return;
    }
    if (isReading) {
        speechRequestId++;
        speechSynthesis.cancel();
        isReading = false;
        return;
    }

    const content = document.querySelector(selector);
    if (!content) {
        console.error(`Fant ikke innholdet som skal leses opp: ${selector}`);
        return;
    }
    const contentCopy = content.cloneNode(true);
    contentCopy.querySelectorAll(".speech-language-label").forEach(label => label.remove());
    const text = contentCopy.textContent.trim().replace(/\s+/g, " ");
    if (!text) {
        console.error("Fant ingen tekst å lese opp.");
        return;
    }

    const language = getSpeechLanguage(button);
    const requestId = ++speechRequestId;
    isReading = true;
    showSpeechStatus("");
    getAvailableSpeechVoices().then(voices => {
        if (!isReading || requestId !== speechRequestId) {
            return;
        }
        const voice = getSpeechVoice(language, voices);
        if (language !== "nb-NO" && !voice) {
            isReading = false;
            showSpeechStatus(getMissingVoiceMessage(language));
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = voice?.lang || language;
        if (voice) {
            utterance.voice = voice;
        }
        utterance.onend = () => {
            if (requestId === speechRequestId) {
                isReading = false;
            }
        };
        utterance.onerror = event => {
            if (requestId !== speechRequestId) {
                return;
            }
            isReading = false;
            if (event.error !== "canceled" && event.error !== "interrupted") {
                showSpeechStatus(`Opplesing feilet: ${event.error}`);
            }
        };
        speechSynthesis.speak(utterance);
    });
}

const readingModeToggle = document.getElementById("reading-mode-toggle");
if (readingModeToggle) {
    readingModeToggle.addEventListener("click", () => {
        const page = readingModeToggle.closest(".Basiccontainer");
        const isEnabled = page.classList.toggle("reading-mode");
        readingModeToggle.setAttribute("aria-pressed", String(isEnabled));
        readingModeToggle.textContent = isEnabled ? "Slå av lesemodus" : "Slå på lesemodus";
    });
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



function speak(button) {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
        showSpeechStatus("Opplesing er ikke tilgjengelig i denne nettleseren.");
        return;
    }
    if (isReading) {
        speechRequestId++;
        speechSynthesis.cancel();
        isReading = false;
        return;
    }
    const speechElem = document.querySelector("#speechText");
    let text = speechElem.textContent.trim();
    const words = text.split(/(\s+)/);
    speechElem.innerHTML = words.map(w => w.trim() ? `<span class="tts-word">${w}</span>` : w).join("");
    const language = getSpeechLanguage(button);
    const wordSpans = speechElem.querySelectorAll('.tts-word');
    const requestId = ++speechRequestId;
    isReading = true;
    showSpeechStatus("");
    getAvailableSpeechVoices().then(voices => {
        if (!isReading || requestId !== speechRequestId) {
            return;
        }
        const voice = getSpeechVoice(language, voices);
        if (language !== "nb-NO" && !voice) {
            isReading = false;
            showSpeechStatus(getMissingVoiceMessage(language));
            return;
        }

        const lyd = new SpeechSynthesisUtterance(text);
        lyd.lang = voice?.lang || language;
        if (voice) {
            lyd.voice = voice;
        }
        let wordIndex = 0;
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
            if (requestId === speechRequestId) {
                wordSpans.forEach(span => span.style.background = '');
                isReading = false;
            }
        };
        lyd.onerror = event => {
            if (requestId !== speechRequestId) {
                return;
            }
            wordSpans.forEach(span => span.style.background = '');
            isReading = false;
            if (event.error !== "canceled" && event.error !== "interrupted") {
                showSpeechStatus(`Opplesing feilet: ${event.error}`);
            }
        };
        speechSynthesis.speak(lyd);
    });
}


function read_Tagg(button) {
    readSpeechContent(button, ".tagger");
}

function read_DOM(button) {
    readSpeechContent(button, ".workflow_nettleser");
}

function read_Fork_Dom(button) {
    readSpeechContent(button, ".fork_dom");
}

function read_git_intro(button) {
    readSpeechContent(button, ".intro_git");
}

function read_installGit(button) {
    readSpeechContent(button, ".install_git");
}

function read_installGitMac(button) {
    readSpeechContent(button, ".install_git_mac");
}

function read_oppgaver(button) {
    readSpeechContent(button, ".HTMLoppgaver");
}

function textToSpeech(button) {
    readSpeechContent(button, ".grunnHTML");
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
