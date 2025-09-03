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
code {
    color:brown;
}
`;
nav.className="nav";
nav.innerHTML=
`
<a href="index.html" class="link big">Home</a>
<a href="Class.html" class="link">Class</a>
<a href="Spare.html" class="link">Smol Projects</a>
<a href="index.html" class="link">?</a>
<a href="index.html" class="link">?</a>
<a href="index.html" class="link">?</a>
<a href="index.html" class="link">?</a>
`;
document.head.appendChild(style);
document.body.prepend(nav);