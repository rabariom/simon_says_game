let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let highestScore =localStorage.getItem("highestScore") || 0;
let btns = ["green", "blue", "red", "yellow"];
let h2 = document.querySelector("h2");


document.addEventListener("keypress", function () {
    
    if(started == false){
        //console.log("game started");
        started = true;
        levelUp();
    } 
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash");
    }, 250);
}
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function (){
        btn.classList.remove("userflash");
    }, 250);
}
function levelUp(){
    userSeq = [];
    
    level++;
    h2.innerText = `LEVEL ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    //console.log(gameSeq);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    btnFlash(randBtn);
}

function checkAns(idx){
    
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else {
        
        if(level > highestScore){
            highestScore = level;
            localStorage.setItem("highestScore", highestScore);
        }
        
        h2.innerHTML = `Game Over! Your score is <b>${level}</b> <br> Press any key to RESTART.
            <br> Highest Score is <b>${highestScore}</b>`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function (){
            document.querySelector("body").style.backgroundColor = "white";
        }, 250);
        reset();
    }
}


function btnPress () {
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    //console.log(userSeq);
    checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");

for(btn of allBtn){
    btn.addEventListener("click", btnPress);
}

function reset() {
   
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}