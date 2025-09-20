const fs=require("./fs.js");
function save(){
    let data = "Someone wrote here.\n";

    writeFile('data.txt', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
}
document.getElementById("save").addEventListener("click", save);