let i=document.getElementById("key");
let s=document.getElementById("submit");
let p=document.getElementById("Test");
const urlParams = new URLSearchParams(window.location.search);
const param = urlParams.get('next');
let a=int_t("Hello Hecker");
function oc() {
    if(i.value==a) {
        p.innerHTML="Redirecting to "+param+"...";
        window.location.href=param;
    }
    alert("Wrong Passkey! Passkey is "+a);
    
}
async function hashSHA256(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
function int_t(message) {
    let conversion = "";
    message.forEach(element => {
        conversion += element.charCodeAt(0);
    });
    return conversion;
}
s.addEventListener("click", oc);
