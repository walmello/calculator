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

function operate(n1, op, n2, decimals){
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
    return parseFloat(result.toFixed(decimals))
}

let buttons = {
    numbers: document.querySelectorAll('.number'),
    operators: document.querySelectorAll('.operator'),
    equal: document.querySelector('#equal'),
    clear: document.querySelector('#clear'),
    dot: document.querySelector('#dot')
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
    clearMode: false,
    lockOp: false,
}

buttons.numbers.forEach(n => {
    let digit = n.innerHTML
    n.onclick = function(){
        if (display.error) return
        if(display.clearMode){
            display.set(0)
            display.clearMode = false
            display.lockOp = false
        }

        if(display.get().includes('.')){
            display.add(digit)
        }

        else if(n.innerHTML == 0){
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
    operator: '',
    update(signal){
        this.value = display.get()
        this.operator = signal
    },
    clear(){
        this.value = '0'
        this.operator = ''
        display.error = false
    }
}

buttons.operators.forEach(op => {
    let signal = op.innerHTML
    op.onclick = function(){
        if (display.error) return
        if(store.operator == ''){
            store.update(signal)
            display.clearMode = true
        }
        else if(!display.lockOp){
            buttons.equal.onclick()
            store.update(signal)
            store
            display.lockOp = true
        }
        else{
            store.update(signal)
        }
        console.log(store)
    }
})

buttons.equal.onclick = function(){
    if (display.error) return
    if(store.operator == '') {
        return
    }
    let before = display.get()
    let value = operate(
        store.value,
        store.operator,
        display.get(),
        10
    )
    console.log(value)
    if(!isFinite(value) || isNaN(value)){
        value = 'ERROR'
        display.error = true;
    }
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
    console.log(store)
}

buttons.clear.onclick = function(){
    store.clear()
    display.set(0)
}

buttons.dot.onclick = function(){
    if (display.error) return
    if(!display.get().includes('.')){
        display.add('.')
    }
}
