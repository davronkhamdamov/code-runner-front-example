const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    wrap: 80,
});
editor.setValue(`function search(nums, target) {
    // code here
}`);

document.getElementById("editor").style.fontSize = "16px";
const buttonEl = document.getElementById("button");
const outputTextEl = document.querySelector(".outputtext");
const selectEl = document.querySelector("#lang");
const ErrorEl = document.querySelector(".error");
const PassedEl = document.querySelector(".passed");
const HintEl = document.querySelector(".hint");
const shouldBeEl = document.querySelector(".shouldBe");

const first_Case = { arr: [-1, 0, 3, 5, 9, 12], target: 9, result: 4 };
const second_Case = { arr: [-1, 0, 3, 5, 9, 12], target: 2, result: -1 };

buttonEl.addEventListener("click", () => {
    PassedEl.style.display = "none";
    ErrorEl.style.display = "none";
    HintEl.style.display = "none";
    let code = editor.getValue();
    const output = eval(
        code + "\n" + `search([${first_Case.arr}], ${first_Case.target})`
    );
    if (output == first_Case.result) {
        PassedEl.style.display = "block";
        const output2 = eval(
            code + "\n" + `search(${second_Case.arr}, ${second_Case.target})`
        );
        outputTextEl.innerHTML += output;
        if (output2 === second_Case.result) {
            outputTextEl.innerHTML += "<br>" + output2;
            PassedEl.style.display = "block";
        } else {
            shouldBeEl.textContent += second_Case.result;
            ErrorEl.style.display = "block";
            HintEl.style.display = "block";
        }
    } else {
        shouldBeEl.textContent += first_Case.result;
        ErrorEl.style.display = "block";
        HintEl.style.display = "block";
    }
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
