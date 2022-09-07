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
    document.querySelector('.seconde').style.transform = `translate(-100%, -50%) rotate(${(seconde * 6) + 90 }deg)`
    document.querySelector('.minute').style.transform = `translate(-100%, -50%) rotate(${(minute * 6)+ (seconde* 0.1) + 90}deg)`
    document.querySelector('.hour').style.transform = `translate(-100%, -50%) rotate(${((hour%12)*30) +(minute * 0.5) + 90}deg)`

}
setInterval(updateDate,1000)

clockCreation();
updateDate();