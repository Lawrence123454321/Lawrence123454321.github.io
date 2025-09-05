let i=document.getElementById("key");
let s=document.getElementById("submit");
let p=document.getElementById("Test");
const urlParams = new URLSearchParams(window.location.search);
const param = urlParams.get('next');
function oc() {
    if(i.value=="GAC05657") {
        p.innerHTML="Redirecting to "+param+"...";
        window.location.href=param;
    }
    alert("Wrong Passkey!");
}
s.addEventListener("click", oc);