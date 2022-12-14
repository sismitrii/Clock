const clockCircle = document.querySelector('.border-circle')

function clockCreation(){
    for(let i=1; i<= 30; i++){
        const line = document.createElement('div');
        line.classList.add('time-line')
        if (i%15 === 0){
            line.classList.add('cardinal')
        } else if (i%5 ===0){
            line.classList.add('large')
        } else {
            line.classList.add('small')
        }

        line.style.transform = `translate(-50%, -50%) rotate(${(i)*6}deg)`
        clockCircle.appendChild(line);
    }
}
function updateDate(){
    const now = new Date(); 
    const seconde = now.getSeconds();
    const minute = now.getMinutes();
    const hour = now.getHours();
    if (seconde === 0){
        document.querySelectorAll('.arrow').forEach((time)=>{
            time.style.transition = "unset";
            setTimeout(()=>{time.style.transition = "all 0.05s cubic-bezier(0, 2.09, 0.58, 1"}, 500);
        })
    }
    document.querySelector('.seconde').style.transform = `translate(-100%, -50%) rotate(${(seconde * 6) + 90 }deg)`;
    document.querySelector('.minute').style.transform = `translate(-100%, -50%) rotate(${(minute * 6)+ (seconde* 0.1) + 90}deg)`;
    document.querySelector('.hour').style.transform = `translate(-100%, -50%) rotate(${((hour%12)*30) +(minute * 0.5) + 90}deg)`;
}

const timeTab = [
    {type:'.hour__one', modulo: 3},
    {type:'.hour__two', modulo: 10},
    {type:'.minute__one', modulo: 6},
    {type:'.minute__two',modulo: 10},
    {type:'.seconde__one', modulo: 6},
    {type:'.seconde__two', modulo: 10}
]

function initDigitalClock(){
    const now = new Date();
    const digitTab = now.toString().split(' ')[4].split('').filter((x)=> x !==':');

    timeTab.forEach((time)=>{
        document.querySelector(`${time.type} .behind .front p`).innerText = (parseInt(digitTab[0]) + 1)%time.modulo;
        document.querySelector(`${time.type} .behind .back p`).innerText = (parseInt(digitTab[0]) + 2)%time.modulo;
        document.querySelector(`${time.type} .ahead .front p`).innerText = parseInt(digitTab[0]);
        document.querySelector(`${time.type} .ahead .back p`).innerText = (parseInt(digitTab[0]) + 1)%time.modulo;
        document.querySelector(`${time.type} .actif .back p`).innerText = parseInt(digitTab[0]);
        digitTab.shift();
    })
}

function updateDigitalClock(obj = {type: '.seconde__two', modulo: 10}){
    const now = new Date();

    let digitValue = 0;
    let nextObj;
    switch (obj.type){
        case '.seconde__two' :
            digitValue = isTimer ? count%10 : (now.getSeconds())%10;
            nextObj = {type: '.seconde__one', modulo: 6}
        break;
        case '.seconde__one' :
            digitValue = isTimer ? Math.ceil((count%60)/10) : Math.ceil(now.getSeconds()/10)
            nextObj = {type: '.minute__two', modulo: 10}
        break;
        case '.minute__two' :
            digitValue = isTimer ?  Math.ceil(count/60)%10 : now.getMinutes()%10
            nextObj = {type: '.minute__one', modulo: 6}
        break;
        case '.minute__one' :
            digitValue = isTimer ? Math.ceil(Math.ceil(count/60)/10) : Math.ceil(now.getMinutes()/10)
            nextObj = {type: '.hour__two', modulo: 10}
        break;
        case '.hour__two' :
            digitValue = isTimer ? Math.ceil(count/3600)%10 : now.getHours()%10
            nextObj = {type: '.hour__one', modulo: 3}
        break;
        case '.hour__one' :
            digitValue = isTimer ? Math.ceil(Math.ceil(count/3600)/10) : Math.ceil(now.getHours()/10)
            nextObj = null
        break;
    }
    if (digitValue === 0 &&??nextObj){
        updateDigitalClock(nextObj)
    }

    
    const ahead = document.querySelector(`${obj.type} .ahead`);
    const behind = document.querySelector(`${obj.type} .behind`);
    const actif = document.querySelector(`${obj.type} .actif`);
    const frontToSet = document.querySelector(`${obj.type} .actif .front p`);
    const backToSet = document.querySelector(`${obj.type} .actif .back p`);

    ahead.firstElementChild.style.transition = 'transform 0.6s ease-out';
    ahead.classList.add('actif');
    

    setTimeout(()=>{
        ahead.classList.remove('ahead');
        actif.firstElementChild.style.transition = "unset";

        behind.classList.add('ahead');
        behind.classList.remove('behind');

        actif.classList.add('behind');
        actif.classList.remove('actif');
        frontToSet.innerText = (digitValue + 1)%obj.modulo;
        backToSet.innerText = (digitValue +2)%obj.modulo;
    }, 500);
}


let isTimer = false;
let isPlaying = false;
const changeType = document.querySelector('.change-type');
const playPause = document.querySelector('.play-pause');
const reset = document.querySelector('.reset');

function timerInit(){
    document.querySelector('.seconde').style.transform = `translate(-100%, -50%) rotate(90deg)`;
    document.querySelector('.minute').style.transform = `translate(-100%, -50%) rotate(90deg)`;
    document.querySelector('.hour').style.transform = `translate(-100%, -50%) rotate(90deg)`;

    timeTab.forEach((time)=>{
        document.querySelector(`${time.type} .behind .front p`).innerText = 1;
        document.querySelector(`${time.type} .behind .back p`).innerText = 2;
        document.querySelector(`${time.type} .ahead .front p`).innerText = 0;
        document.querySelector(`${time.type} .ahead .back p`).innerText = 1;
        document.querySelector(`${time.type} .actif .back p`).innerText = 0;
    })
}


let count = 0; // nbr seconds
let playingTimer;

function playPauseFct(){
    isPlaying = !isPlaying;
    if (isPlaying){
        playPause.innerText = "pause";
        playingTimer = setInterval(()=>{
            count += 1;
            updateDigitalClock();
            updateClock();
        },1000)
    } else {
        clearInterval(playingTimer);
        playPause.innerText = "play";
    }
}

function updateClock(){
    const seconde = count%60;
    const minute = Math.floor(count/60)%60
    const hour = Math.floor((count/3600)%24)


    if (seconde === 0){
        document.querySelectorAll('.arrow').forEach((time)=>{
            time.style.transition = "unset";
            setTimeout(()=>{time.style.transition = "all 0.05s cubic-bezier(0, 2.09, 0.58, 1"}, 500);
        })
    }
    document.querySelector('.seconde').style.transform = `translate(-100%, -50%) rotate(${(seconde * 6) + 90 }deg)`;
    document.querySelector('.minute').style.transform = `translate(-100%, -50%) rotate(${(minute * 6)+ (seconde* 0.1) + 90}deg)`;
    document.querySelector('.hour').style.transform = `translate(-100%, -50%) rotate(${((hour%12)*30) +(minute * 0.5) + 90}deg)`;
}

function resetFct(){
    clearInterval(playingTimer);
    count = 0;
    timerInit();
    playPause.innerText = 'start'

}


changeType.addEventListener('click', ()=>{
    isTimer = !isTimer;
    if (isTimer){
        setTimeout(()=>{
            clearInterval(clock);
            timerInit();
        },600)
        clearInterval(clock);
        changeType.innerText = "clock"
        playPause.innerText = "Start"
        reset.innerText = "Reset"
        playPause.addEventListener('click', playPauseFct)
        reset.addEventListener('click', resetFct)
    } else {
        isPlaying = false;
        count = 0;
        clearInterval(playingTimer);
        setTimeout(()=>{
            initDigitalClock();
            clock = setInterval(()=>{
                updateDate();
                updateDigitalClock();
            },1000)
        }, 600)

        changeType.innerText = "timer"
        playPause.innerText = "-----"
        reset.innerText = "-----"
    }
})



initDigitalClock();
let clock = setInterval(()=>{
    updateDate();
    updateDigitalClock();
},1000)

clockCreation();