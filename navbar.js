/* Copyright (C) lliu.fun - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lawrence Liu lawrence-liu12345@outlook.com, September 2025
 */
let nav = document.createElement('div');
let style = document.createElement('style');
style.innerHTML=
`
.nav {
    top: 0px;
    position: fixed;
    left: 0px;
    right: 0px;
    height: 60px;
    padding-top: 20px;
    padding-left: 50px;
    background-color: #333;
    font-family: 'Courier New', Courier, monospace;
    box-shadow: rgb(149, 157, 165) 0px 8px 24px;
}
.link {
    color: #ccc;
    font-size: 1.4rem;
    transition: 200ms linear;
}
.big {
    font-size: 2rem;
}
.main {
    margin-top: 100px;
    margin-left: 200px;
    margin-right: 200px;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #eee;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
}
.link:hover {
    color: #333;
    background-color:#bbb;
    border: 1px solid #000;
    transition: 300ms linear;
}
.rightlink {
    margin-right:10px;
    padding-right:10px;
    color: #ccc;
    font-size: 1.6rem;
    transition: 200ms linear;
}
.link:hover {
    color: #333;
    background-color:#bbb;
    border: 2px solid #000;
    border-radius: 3px;
    transition: 150ms linear;
}
code {
    color:brown;
}

a {
    color:darkslategray;
}
`;
nav.className="nav";
nav.innerHTML=
`
<a href="https://lliu.fun" class="link big">lliu.fun</a>
<a href="https://lliu.fun/Class.html" class="link">Class</a>
<a href="https://lliu.fun/Spare.html" class="link">Spare Projects</a>
<a href="https://lliu.fun/Experiments.html" class="link">Experiments</a>
<a href="https://lliu.fun/Calculator" class="link">Calculators</a>
<a href="https://lliu.fun/JSG/" class="link">Games</a>
<a href="" class="link">?</a>
<a href="https://lliu.fun/login" class="rightlink">Login</a>
`;
document.head.appendChild(style);
document.body.prepend(nav);
document.body.append(`<meta http-equiv="X-Frame-Options" content="DENY">`);