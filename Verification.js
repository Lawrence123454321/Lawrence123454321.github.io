let i=document.getElementById("key");
let s=document.getElementById("submit");
let p=document.getElementById("Test");
const urlParams = new URLSearchParams(window.location.search);
const param = urlParams.get('next');
async function oc() {
    const hash = await hashString(i.value);
    if(hash=="d85596b1f655ade7eeccbb8ea9af70cb7f7ed83e7156afc13a1b9ce394788eb3"){
        alert("Yay");
        window.location.href=param;
    }
    else alert("No");
}
async function hashString(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('')
    return hashHex;
}
s.addEventListener("click", oc);
