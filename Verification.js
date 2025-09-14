let i=document.getElementById("key");
let s=document.getElementById("submit");
let p=document.getElementById("Test");
const urlParams = new URLSearchParams(window.location.search);
const param = urlParams.get('next');
let a=generate(40);
function oc() {
    if(i.value==a) {
        p.innerHTML="Redirecting to "+param+"...";
        window.location.href=param;
    }
    alert("Wrong Passkey!");
    a=generate(20);
    console.log(a);
}
function generate(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
s.addEventListener("click", oc);
