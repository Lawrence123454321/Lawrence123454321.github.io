let email=document.getElementById("email");
let password=document.getElementById("password");
const urlParams = new URLSearchParams(window.location.search);
const param = urlParams.get('next');
function submit() {
    if(email=="Lawrence-Liu12345@outlook.com"&&password=="Lawrence") {
        window.location.href=param;
    }
}