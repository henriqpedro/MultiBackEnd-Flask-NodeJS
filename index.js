const apiUrl = 'http://localhost:3000';

const fileInput = document.getElementById("archieve");
const scriptInput = document.getElementById("script");

fileInput.addEventListener("change", (e) => {
    let data = new FormData();
    data.append('file', e.target.files[0]);

    fetch(apiUrl, {
        method: "POST",
        body: data
    }).then((res) => {
        return res.json();
    }).then((res) => {
        scriptInput.value = res;
    });
});