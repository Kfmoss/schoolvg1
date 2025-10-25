



let btn = document.getElementById('toggle');
btn.addEventListener('click', () => {
document.body.classList.toggle('light-mode');
});


let isReading = false;
let listenersAdded = false;



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
    
    
    



};