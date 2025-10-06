const outputDiv = document.getElementById('output');

// Lagre original console.log
const originalLog = console.log;

// Overstyr console.log for å vise i output-div
console.log = function(...args) {
    outputDiv.innerHTML += args.join(' ') + '<br>';
    originalLog.apply(console, args);
};

// Kjør kode fra editoren
document.getElementById('runCode').onclick = function() {
    outputDiv.innerHTML = ''; // Tøm output før ny kjøring
    try {
        eval(editor.getValue());
    } catch (e) {
        outputDiv.innerHTML = '<span style="color:red;">' + e + '</span>';
    }
};

// CLEAR-knapp
document.querySelector('button[style*="red"]').onclick = function() {
    outputDiv.innerHTML = '';
};