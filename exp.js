import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai";
import{has} from './rest.js';
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
const genAI = new GoogleGenerativeAI(has);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const spm = "hva er "; 

const btn_send = document.getElementById('btn_send').addEventListener("click", () =>{
    const qst = spm+"DOM HTML";
    const window = document.getElementById('_window');
    // const inp = document.getElementById('input_bruker');
    // console.log(qst);
    async function spørGemini(qst) {
      try{

        const result = await model.generateContent(qst);
        const response = await result.response;
        const text = await result.response.text();
        window.innerHTML = marked.parse(text);
    
      }
      catch(error)
      {
        console.error("Houston, we have a problem: ", error);

      }
      
    }
    spørGemini(qst);    
})





























let isReading = false;

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
    lyd.onend = () => { isReading = false; };
    isReading = true;
    speechSynthesis.speak(lyd);
}

const btn_top = document.getElementById('btn_up');
window.onscroll = function(){
    scrollFunc();
}
function scrollFunc(){
    if(document.body.scrollTop>20 || document.documentElement.scrollTop>20){
        btn_top.style.display ="block";

    }
    else{
        btn_top.style.display ="none";
    }
}
btn_top.onclick = function(){
    window.scrollTo({
        top:0,
        behavior:'smooth'
    })
}
