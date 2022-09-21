function type(word) {
    document.querySelector('[data-key="←"]').click()
    document.querySelector('[data-key="←"]').click()
    document.querySelector('[data-key="←"]').click()
    document.querySelector('[data-key="←"]').click()
    document.querySelector('[data-key="←"]').click()
    document.querySelector('[data-key="←"]').click()
    word.split('').forEach(function(val,index) {
        document.querySelector('[data-key="' + val.toLowerCase() + '"]').click()
        if (index == (word.split('').length-1)) {
            document.querySelector('[data-key="↵"]').click()
        }
    })
}

var normal = undefined

async function ready() {
    var list = {}
    var list2 = {}
    
    await fetch('https://raw.githubusercontent.com/tabatkins/wordle-list/main/words')
        .then(res => res.text())
        .then(res => {
            list = res.split('\n')
        })
   
    await fetch('https://www.nytimes.com/games-assets/v2/wordle.f3b467d34b755ef412d0411ab13998780171c617.js')
        .then(res => res.text())
        .then(res => {
            list2 = res.split(',_e=[')[1].split('],ke=')[0].replaceAll('"','').split(',')
        })
    
    var wordleStart = new Date(2021, 5, 19);
    var today = new Date();
    var currentWord = undefined
    
    list2.forEach(function(word){
        if(wordleStart.setHours(0,0,0,0) == today.setHours(0,0,0,0)) {
            currentWord = word
        }
        wordleStart.setDate(wordleStart.getDate() + 1);
    })
    
    console.log(currentWord)
         
    function wordleBasics(guess,soFar,word) {
        var table = {}
        guess.split('').forEach(function(val,index) {
            if (word.includes(val)) {
                if (word.charAt(index) == val) {
                    table[val] = 'correct'
                } else {
                    table[val] = 'present'
                }
            } else {
                table[val] = 'absent'
            }
        })
        if (table[Object.keys(table)[0]] == 'correct')  {
            if (table[Object.keys(table)[1]] == 'correct') {
                if (table[Object.keys(table)[2]] == 'correct') {
                    if (table[Object.keys(table)[3]] == 'correct') {
                        if (table[Object.keys(table)[4]] == 'correct') {
                            return 'won'
                        }
                    }
                }
            }
        }
        soFar.push(table)
        return soFar
    }
    
    function addCss(fileName) {

      var head = document.head;
      var link = document.createElement("link");

      link.rel = "stylesheet";
      link.href = fileName;

      head.appendChild(link);
    }
    
    addCss('https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css')
    
    function getBestStartingWord() {
        var array = list2
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        console.log(array)
        var pointsYE = {}
        var used = []
        for (let i = 0; i < 6; i++) {
            var val = undefined
            while (true) {
                var valTemp = array[Math.floor(Math.random() * array.length)]
                if (used.includes(valTemp) == false) {
                        val = valTemp
                    break
                }
            }
            var array2 = array
            var best = undefined
            var points = 9999999999999999999999999999
            for (let i = array2.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = array2[i];
                array2[i] = array2[j];
                array2[j] = temp;
            }
            array2.pop(val)
            array2.forEach(async function(val2) {
                var soFar = wordleBasics(val2,[],val)
                for (let i = 0; i < 1; i++) {
                    var word = getWord(soFar,list2)
                    soFar = wordleBasics(word,soFar,val)
                    if (soFar == 'won') {
                        if (points > i) {
                            best = val2
                            points = i
                            break
                        } else {
                            break
                        }
                    }
                }
            })
            if (best != undefined) {
                if (pointsYE[best] != undefined) {
                    pointsYE[best] = pointsYE[best] +1
                } else {
                    pointsYE[best] = 1
                }
            }
            console.log(best)
        }
        console.log(pointsYE)
        var obj = pointsYE
        console.log(Object.keys(obj).reduce(function(a, b){ return obj[a] > obj[b] ? a : b }))
    }

    function convertJSON() {
        var table = []
        Array.from(document.getElementsByClassName('Board-module_board__lbzlf')[0].children).forEach(function(val) {
            if (val.children[0].children[0].getAttribute('data-state') == 'correct')  {
                if (val.children[1].children[0].getAttribute('data-state') == 'correct') {
                    if (val.children[2].children[0].getAttribute('data-state') == 'correct') {
                        if (val.children[3].children[0].getAttribute('data-state') == 'correct') {
                            if (val.children[4].children[0].getAttribute('data-state') == 'correct') {
                                table = 'won'
                            }
                        }
                    }
                }
            }
            if (val.children[0].children[0].getAttribute('data-state') != 'empty' && table != 'won') {
                var tab = {}
                Array.from(val.children).forEach(function(val2) {
                    tab[val2.children[0].innerHTML] = val2.children[0].getAttribute('data-state')
                })
                table.push(tab)
            }
        })
        return table
    }
    
    async function Normal() {
        document.getElementsByClassName('Keyboard-module_keyboard__1HSnn')[0].style.display = 'none'
        document.body.setAttribute('onkeydown','document.querySelector(`[data-key="←"]`).click()')
        document.getElementById('bar').style.display = 'none'
        type('adieu')
        await new Promise(r => setTimeout(r, 2500));
        var word1 = getWord()
        if (word1 == 'won') {
            console.log('done')
            return
        }
        console.log(word1)
        type(word1)
        await new Promise(r => setTimeout(r, 2500));
        var word2 = getWord()
        console.log(word2)
        if (word2 == 'won') {
            console.log('done')
            return
        }
        type(word2)
        await new Promise(r => setTimeout(r, 2500));
        var word3 = getWord()
        console.log(word3)
        if (word3 == 'won') {
            console.log('done')
            return
        }
        type(word3)
        await new Promise(r => setTimeout(r, 2500));
        var word4 = getWord()
        console.log(word4)
        if (word4 == 'won') {
            console.log('done')
            return
        }
        type(word4)
        await new Promise(r => setTimeout(r, 2500));
        var word5 = getWord()
        console.log(word5)
        if (word5 == 'won') {
            console.log('done')
            return
        }
        type(word5)
    }
    
    function Instant() {
        document.getElementsByClassName('Keyboard-module_keyboard__1HSnn')[0].style.display = 'none'
        document.body.setAttribute('onkeydown','document.querySelector(`[data-key="←"]`).click()')
        document.getElementById('bar').remove()
        type(currentWord)
    }

    function getWord(tab2) {
        var tab = undefined
        if (tab2 != undefined) {
            tab = tab2
        } else {
            tab = convertJSON()
        }
        if (tab == 'won') {
            return tab
        }
        var word = 'skate'
        list.forEach(function(val) {
            var resposne = true
            tab.forEach(function(val2) {                
                if (val2[Object.keys(val2)[0]] == 'present') {
                    if (val.includes(Object.keys(val2)[0]) === false || val.charAt(0) === Object.keys(val2)[0]) {
                        resposne = false
                    }
                }
                if (val2[Object.keys(val2)[0]] == 'correct') {
                    if (val.charAt(0) != Object.keys(val2)[0]) {
                        resposne = false
                    }
                }
                if (val2[Object.keys(val2)[0]] == 'absent') {
                    if (val.includes(Object.keys(val2)[0])) {
                        resposne = false
                    }
                }
                 if (val2[Object.keys(val2)[1]] == 'present') {
                    if (val.includes(Object.keys(val2)[1]) === false || val.charAt(1) === Object.keys(val2)[1]) {
                        resposne = false
                    }
                }
                if (val2[Object.keys(val2)[1]] == 'correct') {
                    if (val.charAt(1) != Object.keys(val2)[1]) {
                        resposne = false
                    }
                }
                if (val2[Object.keys(val2)[1]] == 'absent') {
                    if (val.includes(Object.keys(val2)[1])) {
                        resposne = false
                    }
                }
                 if (val2[Object.keys(val2)[2]] == 'present') {
                    if (val.includes(Object.keys(val2)[2]) === false || val.charAt(2) === Object.keys(val2)[2]) {
                        resposne = false
                    }
                }
                if (val2[Object.keys(val2)[2]] == 'correct') {
                    if (val.charAt(2) != Object.keys(val2)[2]) {
                        resposne = false
                    }
                }
                if (val2[Object.keys(val2)[2]] == 'absent') {
                    if (val.includes(Object.keys(val2)[2])) {
                        resposne = false
                    }
                }
                 if (val2[Object.keys(val2)[3]] == 'present') {
                    if (val.includes(Object.keys(val2)[3]) === false || val.charAt(3) === Object.keys(val2)[3]) {
                        resposne = false
                    }
                }
                if (val2[Object.keys(val2)[3]] == 'correct') {
                    if (val.charAt(3) != Object.keys(val2)[3]) {
                        resposne = false
                    }
                }
                if (val2[Object.keys(val2)[3]] == 'absent') {
                    if (val.includes(Object.keys(val2)[3])) {
                        resposne = false
                    }
                }
                 if (val2[Object.keys(val2)[4]] == 'present') {
                    if (val.includes(Object.keys(val2)[4]) === false || val.charAt(4) === Object.keys(val2)[4]) {
                        resposne = false
                    }
                }
                if (val2[Object.keys(val2)[4]] == 'correct') {
                    if (val.charAt(4) != Object.keys(val2)[4]) {
                        resposne = false
                    }
                }
                if (val2[Object.keys(val2)[4]] == 'absent') {
                    if (val.includes(Object.keys(val2)[4])) {
                        resposne = false
                    }
                }
            })
            if (resposne == true) {
                word = val
            }
        })
        return word
    }
    
    
        document.body.insertAdjacentHTML( 'beforeend', `<aside id="bar" class="mdc-snackbar" style="display: flex; z-index: 2147483647;">
  <div class="mdc-snackbar__surface" role="status" aria-relevant="additions" style="padding-left: 0px; padding-right: 8px; display: flex; align-items: center; justify-content: flex-start; box-sizing: border-box; transform: scale(1); opacity: 1;">
    <div class="mdc-snackbar__label" aria-atomic="false" style="visibility: visible;">I am able to instantly guess today's wordle</div>
    <div class="mdc-snackbar__actions" aria-atomic="true" style="visibility: visible;">
      <button type="button" id="normal" class="mdc-button mdc-snackbar__action" style="pointer-events: all;">
        <div class="mdc-button__ripple"></div>
        <span class="mdc-button__label">NORMAL</span>
      </button><button type="button" id="instant" class="mdc-button mdc-snackbar__action" style="pointer-events: all;">
        <div class="mdc-button__ripple"></div>
        <span class="mdc-button__label">INSTANT</span>
      </button>
    </div>
  </div>
</aside>`)
    
    document.getElementById('normal').onclick = function() {
        Normal()
    }
    
    document.getElementById('instant').onclick = function() {
        Instant()
    }
    
}

ready()
