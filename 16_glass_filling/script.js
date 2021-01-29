const smallCups = document.querySelectorAll('.cup-small')
const liters = document.getElementById('liters')
const percentage = document.getElementById('percentage')
const remained = document.getElementById('remained')

function updateBigCups(){
    const fullCups = document.querySelectorAll('.cup-small.full').length //number of full cups
    const totalCups = smallCups.length //always 8
    console.log(fullCups)

    if (fullCups===0) {
        percentage.style.visibility='hidden'
        percentage.style.height=0
    } else {
        percentage.style.visibility='visible'
        percentage.style.height= `${330*fullCups/totalCups}px`
        percentage.innerText=`${100*fullCups/totalCups}%`
    }

    if(fullCups===totalCups) {
        remained.style.visibility='hidden'
        remained.style.height=0
    } else {
        remained.style.visibility='visible'
        liters.innerText = `${2-(250 * fullCups / 1000)} L`
        remained.style.height="20px"
    }

}

smallCups.forEach((cup, idx) => {
    cup.addEventListener('click', () => highlightCups(idx))

})

function highlightCups (idx) {
    if (smallCups[idx].classList.contains('full') && !smallCups[idx].nextElementSibling.classList.contains('full') ){
        idx--
    }


    smallCups.forEach((cup, idx2) => {
        if(idx2 <= idx) {
            cup.classList.add('full')
        } else {
            cup.classList.remove('full')
        }
    })

    updateBigCups();
}

