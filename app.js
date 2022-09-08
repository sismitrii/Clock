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

// function initDigitalClock(){

// }

function digitalUpdateTime(){
    const now = new Date();
    const seconde__two = (now.getSeconds())%10;

    if (seconde__two === 0){
        updateSecondDigitTwo();
    } 
    
    const secondeTwoAhead = document.querySelector('.seconde__two .ahead');
    const secondeTwoBehind = document.querySelector('.seconde__two .behind');
    const secondeTwoActif = document.querySelector('.seconde__two .actif');
    const frontToSet = document.querySelector('.seconde__two .actif .front p');
    const backToSet = document.querySelector('.seconde__two .actif .back p');

    secondeTwoAhead.firstElementChild.style.transition = 'transform 0.6s ease-out';
    secondeTwoAhead.classList.add('actif');
    

    setTimeout((now)=>{
        secondeTwoAhead.classList.remove('ahead');
        secondeTwoActif.firstElementChild.style.transition = "unset";

        secondeTwoBehind.classList.add('ahead');
        secondeTwoBehind.classList.remove('behind');

        secondeTwoActif.classList.add('behind');
        secondeTwoActif.classList.remove('actif');
        frontToSet.innerText = (seconde__two + 1)%10;
        backToSet.innerText = (seconde__two +2)%10;
    }, 500);
}

function updateSecondDigitTwo(){
    const now = new Date();
    const seconde__one = Math.ceil(now.getSeconds()/10);

    const secondeOneAhead = document.querySelector('.seconde__one .ahead');
    const secondeOneBehind = document.querySelector('.seconde__one .behind');
    const secondeOneActif = document.querySelector('.seconde__one .actif');
    const frontToSet = document.querySelector('.seconde__one .actif .front p');
    const backToSet = document.querySelector('.seconde__one .actif .back p');

    secondeOneAhead.firstElementChild.style.transition = 'transform 0.6s ease-out';
    secondeOneAhead.classList.add('actif');

    setTimeout(()=>{
        secondeOneAhead.classList.remove('ahead');
        secondeOneActif.firstElementChild.style.transition = "unset";

        secondeOneBehind.classList.add('ahead');
        secondeOneBehind.classList.remove('behind');

        secondeOneActif.classList.add('behind');
        secondeOneActif.classList.remove('actif');
        frontToSet.innerText = (seconde__one + 1)%6;
        backToSet.innerText = (seconde__one +2)%6;
    }, 500);
}


function updateDigit(obj){
    const now = new Date();

    let digitValue = 2;
    let nextObj;
    switch (obj.type){
        case '.seconde__two' :
            digitValue = (now.getSeconds())%10;
            nextObj = {type: '.seconde__one', modulo: 6}
        break;
        case '.seconde__one' :
            digitValue = Math.ceil(now.getSeconds()/10)
            nextObj = {type: '.minute__two', modulo: 10}
        break;
        case '.minute__two' :
            digitValue = now.getMinutes()%10
            nextObj = {type: '.minute__one', modulo: 6}
        break;
        case '.minute__one' :
            digitValue = Math.ceil(now.getMinutes()/10)
            nextObj = {type: '.hour__two', modulo: 10}
        break;
        case '.hour__two' :
            digitValue = now.getHours()%10
            nextObj = {type: '.hour__one', modulo: 3}
        break;
        case '.hour__one' :
            digitValue = Math.ceil(now.getHours()/10)
            nextObj = null
        break;
    }
    if (digitValue === 0 && nextObj){
        updateDigit(nextObj)
    }
    
    const ahead = document.querySelector(`${obj.type} .ahead`);
    const behind = document.querySelector(`${obj.type} .behind`);
    const actif = document.querySelector(`${obj.type} .actif`);
    const frontToSet = document.querySelector(`${obj.type} .actif .front p`);
    const backToSet = document.querySelector(`${obj.type} .actif .back p`);

    ahead.firstElementChild.style.transition = 'transform 0.6s ease-out';
    ahead.classList.add('actif');
    

    setTimeout((now)=>{
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













setInterval(()=>{
    updateDate();
    //digitalUpdateTime();
    updateDigit({type: '.seconde__two', modulo: 10});
},1000)

clockCreation();
updateDate();
