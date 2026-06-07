const display = document.getElementById("display");
const historyList = document.getElementById("historyList");

function appendValue(value){
    display.value += value;
}

function clearDisplay(){
    display.value = "";
}

function deleteLast(){
    display.value = display.value.slice(0,-1);
}

function calculate(){

    try{

        if(display.value === "") return;

        const expression = display.value;
        const result = eval(expression);

        display.value = result;

        addHistory(`${expression} = ${result}`);

    }catch{

        display.value = "Error";

        setTimeout(()=>{
            display.value = "";
        },1500);

    }
}

function squareRoot(){
    display.value = Math.sqrt(Number(display.value));
}

function square(){
    display.value = Math.pow(Number(display.value),2);
}

function percentage(){
    display.value = Number(display.value)/100;
}

function toggleTheme(){
    document.body.classList.toggle("dark");
}

function addHistory(text){

    const li = document.createElement("li");
    li.textContent = text;

    historyList.prepend(li);

    let history =
    JSON.parse(localStorage.getItem("history")) || [];

    history.unshift(text);

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );
}

window.onload = ()=>{

    let history =
    JSON.parse(localStorage.getItem("history")) || [];

    history.forEach(item=>{

        const li =
        document.createElement("li");

        li.textContent = item;

        historyList.appendChild(li);

    });

};

document.addEventListener("keydown",(event)=>{

    if(
        !isNaN(event.key) ||
        ['+','-','*','/','.'].includes(event.key)
    ){
        appendValue(event.key);
    }

    if(event.key==="Enter"){
        calculate();
    }

    if(event.key==="Backspace"){
        deleteLast();
    }

    if(event.key==="Escape"){
        clearDisplay();
    }
});