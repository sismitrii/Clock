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

clockCreation();