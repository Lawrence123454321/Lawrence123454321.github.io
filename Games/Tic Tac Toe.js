
let b1=document.getElementById("box1");
let b2=document.getElementById("box2");
let b3=document.getElementById("box3");
let b4=document.getElementById("box4");
let b5=document.getElementById("box5");
let b6=document.getElementById("box6");
let b7=document.getElementById("box7");
let b8=document.getElementById("box8");
let b9=document.getElementById("box9");
let bs1=document.getElementById("boxs1");
let bs2=document.getElementById("boxs2");
let bs3=document.getElementById("boxs3");
let bs4=document.getElementById("boxs4");
let bs5=document.getElementById("boxs5");
let bs6=document.getElementById("boxs6");
let bs7=document.getElementById("boxs7");
let bs8=document.getElementById("boxs8");
let bs9=document.getElementById("boxs9");
let o1=0,o2=0,o3=0,o4=0,o5=0,o6=0,o7=0,o8=0,o9=0;
let turn=0; // 0: X     1: O
function check(){
    console.log("Board:");
    console.log(o1+" "+o2+" "+o3);
    console.log(o4+" "+o5+" "+o6);
    console.log(o7+" "+o8+" "+o9);
    document.getElementById("step").innerHTML=turn==0?"This step turn: X":"This step turn: O"
    if((o1==o2&&o2==o3&&o1!=0)||(o4==o5&&o5==o6&&o4!=0)||(o7==o8&&o8==o9&&o7!=0)||(o1==o4&&o4==o7&&o1!=0)||(o2==o5&&o5==o8&&o2!=0)||(o3==o6&&o6==o9&&o3!=0)||(o1==o5&&o5==o9&&o1!=0)||(o3==o5&&o5==o7&&o3!=0))
    {
        o1=0;o2=0;o3=0;o4=0;o5=0;o6=0;o7=0;o8=0;o9=0;
        document.getElementById("step").innerHTML=turn?"X":"O";
        document.getElementById("step").innerHTML+=" Win!";
        setTimeout(() => {
            console.log("sleeping zzz");
        }, 1500);
        console.log("done");
        msg="Game OVER! ";
        msg+=turn?"X":"O";
        msg+=" Win!";
        alert(msg);
        location.reload();
    }
    else if(o1!=0&&o2!=0&&o3!=0&&o4!=0&&o5!=0&&o6!=0&&o7!=0&&o8!=0&&o9!=0){
        console.log("done");msg="Game OVER! ";alert(msg);
        o1=0;o2=0;o3=0;o4=0;o5=0;o6=0;o7=0;o8=0;o9=0;
        location.reload();
    }
}
function c1(){
    if(o1!=0) return;
    o1=turn+1;
    bs1.innerHTML=turn==0?"\nX":"\nO";
    b1.style.backgroundColor=turn==0?"lightcyan":"#FF7276";
    turn=1-turn;
    check();
}
function c2(){
    if(o2!=0) return;
    o2=turn+1;
    bs2.innerHTML=turn==0?"\nX":"\nO";
    b2.style.backgroundColor=turn==0?"lightcyan":"#FF7276";
    turn=1-turn;
    check();
}
function c3(){
    if(o3!=0) return;
    o3=turn+1;
    bs3.innerHTML=turn==0?"\nX":"\nO";
    b3.style.backgroundColor=turn==0?"lightcyan":"#FF7276";
    turn=1-turn;
    check();
}
function c4(){
    if(o4!=0) return;
    o4=turn+1;
    bs4.innerHTML=turn==0?"\nX":"\nO";
    b4.style.backgroundColor=turn==0?"lightcyan":"#FF7276";
    turn=1-turn;
    check();
}
function c5(){
    if(o5!=0) return;
    o5=turn+1;
    bs5.innerHTML=turn==0?"\nX":"\nO";
    b5.style.backgroundColor=turn==0?"lightcyan":"#FF7276";
    turn=1-turn;
    check();
}
function c6(){
    if(o6!=0) return;
    o6=turn+1;
    bs6.innerHTML=turn==0?"\nX":"\nO";
    b6.style.backgroundColor=turn==0?"lightcyan":"#FF7276";
    turn=1-turn;
    check();
}
function c7(){
    if(o7!=0) return;
    o7=turn+1;
    bs7.innerHTML=turn==0?"\nX":"\nO";
    b7.style.backgroundColor=turn==0?"lightcyan":"#FF7276";
    turn=1-turn;
    check();
}
function c8(){
    if(o8!=0) return;
    o8=turn+1;
    bs8.innerHTML=turn==0?"\nX":"\nO";
    b8.style.backgroundColor=turn==0?"lightcyan":"#FF7276";
    turn=1-turn;
    check();
}
function c9(){
    if(o9!=0) return;
    o9=turn+1;
    bs9.innerHTML=turn==0?"\nX":"\nO";
    b9.style.backgroundColor=turn==0?"lightcyan":"#FF7276";
    turn=1-turn;
    check();
}
b1.addEventListener("click", c1);
b2.addEventListener("click", c2);
b3.addEventListener("click", c3);
b4.addEventListener("click", c4);
b5.addEventListener("click", c5);
b6.addEventListener("click", c6);
b7.addEventListener("click", c7);
b8.addEventListener("click", c8);
b9.addEventListener("click", c9);
