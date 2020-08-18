const elTextArea = document.getElementById('editor');
const elBtnClear = document.getElementById('btn-clear');

elTextArea.addEventListener('input', () => {
    localStorage.taskTextEditorValue = elTextArea.value;
});

elBtnClear.addEventListener('click', () => {
    elTextArea.value = '';
    delete localStorage.taskTextEditorValue;
});

function loadText() {
    const savedText = localStorage.taskTextEditorValue;
    if (savedText) {
        elTextArea.value = localStorage.taskTextEditorValue;
    }
}

loadText();