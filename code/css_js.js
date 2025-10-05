let isReading = false;
let listenersAdded = false;


// function main_speech(){
//     document.querySelectorAll('i').forEach(x =>{
//         x.addEventListener('click', function(){
//             const container = x.closest('section');
//             if(container){ const selector = container.id; console.log(selector) }
//         })
//     })
  

// }


function main_speech() {
    if (listenersAdded) return;
    listenersAdded = true;
    document.querySelectorAll('i').forEach(x =>{
        x.addEventListener('click', function(){
            if(isReading){
                speechSynthesis.cancel();
                isReading = false;
                return;
            }
            const container = x.closest('section');
            if(container){
                isReading = true;
                const selector =container.id;
                console.log(selector);
                const speechElem = document.querySelector('#'+selector);
                let text = speechElem.textContent.trim();
                const lyd =  new SpeechSynthesisUtterance(text);
                lyd.lang = "nb-NO";
                lyd.onend = function(){
                    isReading = false();
                };
                speechSynthesis.speak(lyd);

             }
        })
    })
    
    
    



}


// function speak_grunnleggende() {
//     if (isReading) {
//         speechSynthesis.cancel();
//         isReading = false;
//         return;
//     }
//     const speechElem = document.querySelector("#grunnleggende");
//     let text = speechElem.textContent.trim();
//     const words = text.split(/(\s+)/);
//     speechElem.innerHTML = words.map(w => w.trim() ? `<span class="tts-word">${w}</span>` : w).join("");
//     const lyd = new SpeechSynthesisUtterance(text);
//     lyd.lang = "nb-NO";
//     let wordIndex = 0;
//     const wordSpans = speechElem.querySelectorAll('.tts-word');
//     lyd.onboundary = function(event) {
//         if (event.name === 'word') {
//             wordSpans.forEach(span => span.style.background = '');
//             if (wordSpans[wordIndex]) {
//                 wordSpans[wordIndex].style.background = '#7E3FF2';
//             }
//             wordIndex++;
//         }
//     };
//     lyd.onend = function() {
//         wordSpans.forEach(span => span.style.background = '');
//         isReading = false;
//     };
//     isReading = true;
//     speechSynthesis.speak(lyd);
// }

// function speak_inline() {
//     if (isReading) {
//         speechSynthesis.cancel();
//         isReading = false;
//         return;
//     }
//     const speechElem = document.querySelector("#inline");
//     let text = speechElem.textContent.trim();
//     const words = text.split(/(\s+)/);
//     speechElem.innerHTML = words.map(w => w.trim() ? `<span class="tts-word">${w}</span>` : w).join("");
//     const lyd = new SpeechSynthesisUtterance(text);
//     lyd.lang = "nb-NO";
//     let wordIndex = 0;
//     const wordSpans = speechElem.querySelectorAll('.tts-word');
//     lyd.onboundary = function(event) {
//         if (event.name === 'word') {
//             wordSpans.forEach(span => span.style.background = '');
//             if (wordSpans[wordIndex]) {
//                 wordSpans[wordIndex].style.background = 'yellow';
//             }
//             wordIndex++;
//         }
//     };
//     lyd.onend = function() {
//         wordSpans.forEach(span => span.style.background = '');
//         isReading = false;
//     };
//     isReading = true;
//     speechSynthesis.speak(lyd);
// }

// function speak_internal() {
//     if (isReading) {
//         speechSynthesis.cancel();
//         isReading = false;
//         return;
//     }
//     const speechElem = document.querySelector("#internal");
//     let text = speechElem.textContent.trim();
//     const words = text.split(/(\s+)/);
//     speechElem.innerHTML = words.map(w => w.trim() ? `<span class="tts-word">${w}</span>` : w).join("");
//     const lyd = new SpeechSynthesisUtterance(text);
//     lyd.lang = "nb-NO";
//     let wordIndex = 0;
//     const wordSpans = speechElem.querySelectorAll('.tts-word');
//     lyd.onboundary = function(event) {
//         if (event.name === 'word') {
//             wordSpans.forEach(span => span.style.background = '');
//             if (wordSpans[wordIndex]) {
//                 wordSpans[wordIndex].style.background = 'yellow';
//             }
//             wordIndex++;
//         }
//     };
//     lyd.onend = function() {
//         wordSpans.forEach(span => span.style.background = '');
//         isReading = false;
//     };
//     isReading = true;
//     speechSynthesis.speak(lyd);
// }

// function speak_external() {
//     if (isReading) {
//         speechSynthesis.cancel();
//         isReading = false;
//         return;
//     }
//     const speechElem = document.querySelector("#external");
//     let text = speechElem.textContent.trim();
//     const words = text.split(/(\s+)/);
//     speechElem.innerHTML = words.map(w => w.trim() ? `<span class="tts-word">${w}</span>` : w).join("");
//     const lyd = new SpeechSynthesisUtterance(text);
//     lyd.lang = "nb-NO";
//     let wordIndex = 0;
//     const wordSpans = speechElem.querySelectorAll('.tts-word');
//     lyd.onboundary = function(event) {
//         if (event.name === 'word') {
//             wordSpans.forEach(span => span.style.background = '');
//             if (wordSpans[wordIndex]) {
//                 wordSpans[wordIndex].style.background = 'yellow';
//             }
//             wordIndex++;
//         }
//     };
//     lyd.onend = function() {
//         wordSpans.forEach(span => span.style.background = '');
//         isReading = false;
//     };
//     isReading = true;
//     speechSynthesis.speak(lyd);
// }

// function speak_hvorfor_ekstern() {
//     if (isReading) {
//         speechSynthesis.cancel();
//         isReading = false;
//         return;
//     }
//     const speechElem = document.querySelector("#hvorfor-ekstern");
//     let text = speechElem.textContent.trim();
//     const words = text.split(/(\s+)/);
//     speechElem.innerHTML = words.map(w => w.trim() ? `<span class="tts-word">${w}</span>` : w).join("");
//     const lyd = new SpeechSynthesisUtterance(text);
//     lyd.lang = "nb-NO";
//     let wordIndex = 0;
//     const wordSpans = speechElem.querySelectorAll('.tts-word');
//     lyd.onboundary = function(event) {
//         if (event.name === 'word') {
//             wordSpans.forEach(span => span.style.background = '');
//             if (wordSpans[wordIndex]) {
//                 wordSpans[wordIndex].style.background = 'yellow';
//             }
//             wordIndex++;
//         }
//     };
//     lyd.onend = function() {
//         wordSpans.forEach(span => span.style.background = '');
//         isReading = false;
//     };
//     isReading = true;
//     speechSynthesis.speak(lyd);
// }

// function speak_class_id() {
//     if (isReading) {
//         speechSynthesis.cancel();
//         isReading = false;
//         return;
//     }
//     const speechElem = document.querySelector("#class_id");
//     let text = speechElem.textContent.trim();
//     const words = text.split(/(\s+)/);
//     speechElem.innerHTML = words.map(w => w.trim() ? `<span class="tts-word">${w}</span>` : w).join("");
//     const lyd = new SpeechSynthesisUtterance(text);
//     lyd.lang = "nb-NO";
//     let wordIndex = 0;
//     const wordSpans = speechElem.querySelectorAll('.tts-word');
//     lyd.onboundary = function(event) {
//         if (event.name === 'word') {
//             wordSpans.forEach(span => span.style.background = '');
//             if (wordSpans[wordIndex]) {
//                 wordSpans[wordIndex].style.background = 'yellow';
//             }
//             wordIndex++;
//         }
//     };
//     lyd.onend = function() {
//         wordSpans.forEach(span => span.style.background = '');
//         isReading = false;
//     };
//     isReading = true;
//     speechSynthesis.speak(lyd);
// }

// function speak_class_id() {
//     if (isReading) {
//         speechSynthesis.cancel();
//         isReading = false;
//         return;
//     }
//     const speechElem = document.querySelector("#class_id");
//     let text = speechElem.textContent.trim();
//     const words = text.split(/(\s+)/);
//     speechElem.innerHTML = words.map(w => w.trim() ? `<span class="tts-word">${w}</span>` : w).join("");
//     const lyd = new SpeechSynthesisUtterance(text);
//     lyd.lang = "nb-NO";
//     let wordIndex = 0;
//     const wordSpans = speechElem.querySelectorAll('.tts-word');
//     lyd.onboundary = function(event) {
//         if (event.name === 'word') {
//             wordSpans.forEach(span => span.style.background = '');
//             if (wordSpans[wordIndex]) {
//                 wordSpans[wordIndex].style.background = 'yellow';
//             }
//             wordIndex++;
//         }
//     };
//     lyd.onend = function() {
//         wordSpans.forEach(span => span.style.background = '');
//         isReading = false;
//     };
//     isReading = true;
//     speechSynthesis.speak(lyd);
// }
