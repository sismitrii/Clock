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
            setTimeout(()=>{time.style.transition = "all 0.05s cubic-bezier(0, 2.09, 0.58, 1"}, 500)
        })
    }
    document.querySelector('.seconde').style.transform = `translate(-100%, -50%) rotate(${(seconde * 6) + 90 }deg)`
    document.querySelector('.minute').style.transform = `translate(-100%, -50%) rotate(${(minute * 6)+ (seconde* 0.1) + 90}deg)`
    document.querySelector('.hour').style.transform = `translate(-100%, -50%) rotate(${((hour%12)*30) +(minute * 0.5) + 90}deg)`
}

function digitalUpdateTime(){
    const now = new Date();
    const seconde__one = Math.ceil(now.getSeconds()/10)
    const seconde__two = (now.getSeconds())%10;
    
    const ahead = document.querySelector('.ahead');
    const behind = document.querySelector('.behind');
    const actif = document.querySelector('.actif');
    const frontToSet = document.querySelector('.actif .front p')
    const backToSet = document.querySelector('.actif .back p')

    ahead.firstElementChild.style.transition = 'transform 0.6s ease-out'
    ahead.classList.add('actif');
    

    setTimeout(()=>{
        ahead.classList.remove('ahead');
        actif.firstElementChild.style.transition = "unset";

        behind.classList.add('ahead');
        behind.classList.remove('behind');

        actif.classList.add('behind');
        actif.classList.remove('actif');
        frontToSet.innerText = (seconde__two + 1)%10
        backToSet.innerText = (seconde__two +2)%10 
    }, 500)



}


setInterval(()=>{
    updateDate();
    digitalUpdateTime();
},1000)

clockCreation();
updateDate();
