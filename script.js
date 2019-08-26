// Arithmetic functions

function add(n1, n2) {
    return n1 + n2
}

function sub(n1, n2) {
    return n1 - n2
}

function mult(n1, n2) {
    return n1 * n2
}

function div(n1, n2) {
    return n1 / n2 
}

function operate(n1,op,n2) {
    n1 = parseInt(n1)
    n2 = parseInt(n2)
    switch(op){
        case '+':
            return add(n1,n2)
        case '-':
            return sub(n1,n2)
        case '*':
            return mult(n1,n2)
        case '/':
            return div(n1,n2)
    }
}

// caluculator GUI

let input =
    document.querySelector('input[type="text"]')
let buttons = 
    document.querySelectorAll('button')
let dotButton = 
    document.querySelector('#dot') 
let addButton =
    document.querySelector('#add')
let eqlButton =
    document.querySelector('#eql')

buttons.forEach(button => {
    let id = button.id
    if(id[0] == 'n')
        button.onclick = function(){
            if(input.value.includes('.'))
                input.value += button.innerHTML
            else if(input.value == '0')
                input.value = button.innerHTML
            else
                input.value += button.innerHTML 
        }
    if(id == 'n0')
        button.onclick = function(){
            if(input.value != 0)
                input.value += '0'
        }
    if(id == 'dot')
        button.onclick = function(){
            if(!input.value.includes('.'))
                input.value += '.'
        }
})
