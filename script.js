function add(n1, n2){
    return n1 + n2
}

function sub(n1, n2){
    return n1 - n2
}

function mult(n1, n2){
    return n1 * n2
}

function div(n1, n2){
    return n1 / n2
}

function operate(n1, op, n2){
    n1 = parseFloat(n1)
    n2 = parseFloat(n2)

    result = 0

    switch(op){
        case '+':
            result = add(n1,n2)
            break
        case '-':
            result = sub(n1,n2)
            break
        case '*':
            result = mult(n1, n2)
            break
        case '/':
            result = div(n1, n2)
            break
    }
    return result
}

let buttons = {
    numbers: document.querySelectorAll('.number'),
    operators: document.querySelectorAll('.operator'),
    equal: document.querySelector('#equal')
}

let display = {
    GUI: document.querySelector("#display"),
    add(n){
        this.GUI.innerHTML += n
    },
    set(n){
       this.GUI.innerHTML = n 
    },
    get(){
        return this.GUI.innerHTML
    },
    clearMode: false
}

buttons.numbers.forEach(n => {
    let digit = n.innerHTML
    n.onclick = function(){
        if(display.clearMode){
            display.set(0)
            display.clearMode = false
        }

        if(n.innerHTML == 0){
            if(display.get() != 0){
                display.add(digit)
            }
        }
        else{
            if(display.get() == 0){
                display.set(digit)
            }
            else{
                display.add(digit)
            }
        }
    }
})

let store = {
    value: display.get(),
    operator: ''
}

buttons.operators.forEach(op => {
    let signal = op.innerHTML
    op.onclick = function(){
        store = {
            value: display.get(),
            operator: signal
        }
        display.clearMode = true
        console.log(store)
    }
})

buttons.equal.onclick = function(){
    if(store.operator == '') return
    let before = display.get()
    let value = operate(
        store.value,
        store.operator,
        display.get()
    )
    if(!display.clearMode){
        store.value = Math.abs(before)
        display.clearMode = true
        display.set(value)
    }
    else{
        if(store.operator == '-'){
            value *= -1
        }
    }

    display.set(value)
}
