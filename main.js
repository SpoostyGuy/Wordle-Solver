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

    await fetch('https://raw.githubusercontent.com/charlesreid1/five-letter-words/master/sgb-words.txt')
        .then(res => res.text())
        .then(res => {
            list = res.split('\n')
        })

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

    function getWord() {
        var tab = convertJSON()
        if (tab == 'won') {
            return tab
        }
        return list.find(function(val) {
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
            return resposne
        })
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
    if (word2 == 'won') {
        console.log('done')
        return
    }
    type(word2)
    await new Promise(r => setTimeout(r, 2500));
    var word3 = getWord()
    if (word3 == 'won') {
        console.log('done')
        return
    }
    type(word3)
    await new Promise(r => setTimeout(r, 2500));
    var word4 = getWord()
    if (word4 == 'won') {
        console.log('done')
        return
    }
    type(word4)
    await new Promise(r => setTimeout(r, 2500));
    var word5 = getWord()
    if (word5 == 'won') {
        console.log('done')
        return
    }
    type(word5)
}

ready()
