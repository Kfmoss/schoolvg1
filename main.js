


let editor = document.querySelector("#editor");
let runCodeButton = document.querySelector("#runCode");
let resetCodeButton = document.querySelector('.editor_reset');

const myeditor= ace.edit(editor, {
    theme: "ace/theme/cobalt",
    mode: "ace/mode/javascript",
})


runCodeButton.addEventListener('click', ()=> {
    const code = myeditor.getValue();
    const result = eval(code);


});

document.getElementById('editor').style.fontSize='22px';





