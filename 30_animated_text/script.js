const textEl = document.getElementById('text')
const speedEl = document.getElementById('speed')
const text = "The dog has a boner!"

let idx = 1
let speed = 200 / speedEl.value
writeText()

function writeText() {
    textEl.innerText = text.slice(0,idx)
    idx++
    if (idx > text.length) { idx = 1}
    //looping
    setTimeout(writeText, speed)
}