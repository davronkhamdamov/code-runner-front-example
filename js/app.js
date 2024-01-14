const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    wrap: 80,
});
editor.setValue(`function sayHello(){
    return "Hello"
}`);

document.getElementById("editor").style.fontSize = "16px";
const buttonEl = document.getElementById("button");
const outputTextEl = document.querySelector(".outputtext");
const selectEl = document.querySelector("#lang");

buttonEl.addEventListener("click", () => {
    const code = editor.getValue();
    const output = eval(code);
    outputTextEl.textContent = output;
    sayHello();
});
selectEl.addEventListener("change", (e) => {
    editor.setValue("");
    editor.session.setMode("ace/mode/" + e.target.value);
});
window.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "Enter") {
        buttonEl.click();
    }
});
