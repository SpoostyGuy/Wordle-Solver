function type(word) {
    word.split('').forEach(function(val,index) {
        document.querySelector('[data-key="' + val.toLowerCase() + '"]').click()
        if (index == (word.split('').length-1)) {
            document.querySelector('[data-key="↵"]').click()
        }
    })
}

async function ready() {
    var list = {}

    await fetch('https://raw.githubusercontent.com/tabatkins/wordle-list/main/words')
        .then(res => res.text())
        .then(res => {
            list = res.split('\n')
        })
    
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
    
    function getBestStartingWord() {
        var array = list
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        console.log(array)
        var pointsYE = {}
        array.forEach(async function(val) {
            var array2 = array
            var best = undefined
            var points = 9999999999999999999999999999
            for (let i = array2.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = array2[i];
                array2[i] = array2[j];
                array2[j] = temp;
            }
            array2.forEach(async function(val2) {
                var soFar = wordleBasics(val2,[],val)
                for (let i = 0; i < 2; i++) {
                    var word = getWord(soFar)
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
        })
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
                    if (val.includes(Object.keys(val2)[0]) === false) {
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
                    if (val.includes(Object.keys(val2)[1]) === false) {
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
                    if (val.includes(Object.keys(val2)[2]) === false) {
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
                    if (val.includes(Object.keys(val2)[3]) === false) {
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
                    if (val.includes(Object.keys(val2)[4]) === false) {
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
            if (response == true) {
                word = val
            }
        })
        return word
    }
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

ready()
