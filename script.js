let runningtotal = 0;
let buffer = "0";
let previousoperator;

const screen = document.querySelector('.screen');

function buttonclick(value) {
    if (isNaN(value)) {
        handlesymbol(value);
    } else {
        handlenumber(value);
    }
    screen.innerText = buffer;
}

function handlesymbol(symbol) {
    symbol = symbol.toLowerCase();
    switch (symbol) {
        case 'c':
            buffer = '0';
            runningtotal = 0;
            break;
        case '=':
            if (previousoperator === null) {
                return;
            }
            flushoperation(parseInt(buffer));
            previousoperator = null;
            buffer = runningtotal.toString();
            runningtotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handlemath(symbol);
            break;
    }
}

function handlemath(symbol) {
    if (buffer === '0') {
        return;
    }

    const intbuffer = parseInt(buffer);
    if (isNaN(intbuffer)) {
        return;
    }

    if (runningtotal === 0) {
        runningtotal = intbuffer;
    } else {
        flushoperation(intbuffer);
    }
    previousoperator = symbol;
    buffer = '0';
}

function flushoperation(intbuffer) {
    if (isNaN(intbuffer)) {
        return;
    }

    if (previousoperator === '+') {
        runningtotal += intbuffer;
    } else if (previousoperator === '−') {
        runningtotal -= intbuffer;
    } else if (previousoperator === '×') {
        runningtotal *= intbuffer;
    } else if (previousoperator === '÷') {
        if (intbuffer === 0) {
            alert("Cannot divide by zero!");
            return;
        }
        runningtotal /= intbuffer;
    }
}

function handlenumber(numberstring) {
    if (buffer === '0') {
        buffer = numberstring;
    } else {
        buffer += numberstring;
    }
}

function init() {
    document.querySelector('.calc-buttons')
        .addEventListener('click', function (event) {
            const target = event.target.closest('button');
            if (!target) return;
            buttonclick(target.innerText);
        });
}
init();
