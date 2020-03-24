const eatAll = document.getElementById('eat');
const populAll = document.getElementById('popul');
const petri = document.getElementById('petri');
const stop = document.getElementById('stop');
const clear = document.getElementById('clear');
const time = document.getElementById('time');
let arBacter=[];
let arEat = [];



const moveBacter = (bacter)=>{
    let random = Math.round(Math.random()*100);
    if (random<25){
        if (parseInt(bacter.style.gridColumn)===100) {
            bacter.style.gridColumn = 1 + "/ auto";
        } else {
            bacter.style.gridColumn = parseInt(bacter.style.gridColumn)+1 +"/ auto";
        }
    } else if (random>=25 && random<50){
        if (parseInt(bacter.style.gridColumn)===1) {
            bacter.style.gridColumn = 100 + "/ auto";
        } else {
            bacter.style.gridColumn = parseInt(bacter.style.gridColumn)-1 +"/ auto";
        }
    } else if (random>=50 && random<75){
        if (parseInt(bacter.style.gridRow)===100) {
            bacter.style.gridRow = 1 + "/ auto";
        } else {
            bacter.style.gridRow = parseInt(bacter.style.gridRow)+1 +"/ auto";
        }
    } else {
        if (parseInt(bacter.style.gridRow)===1) {
            bacter.style.gridRow = 100 + "/ auto";
        } else {
            bacter.style.gridRow = parseInt(bacter.style.gridRow)-1 +"/ auto";
        }
    }
};

const life = () => {
    timer();
};

const timer = ()=> {
    if (time.value === '0') {
        return
    } else {
        const bacterAll = document.querySelectorAll('.bacter');
        for (let i = bacterAll.length - 1; i >= 0; i--) {
            moveBacter(bacterAll[i]);
        }
        setTimeout(() => {timer(time.value)}, time.value)
    }
};



class createElement{
    constructor(itemClass, count){
        this.itemClass = itemClass;
        this.count = count;
    }
    create() {
        for (let i=this.count; i>0 ; i--){
            let el = document.createElement('div');
            el.className = this.itemClass;
            el.style.gridArea = `${Math.round(Math.random()*100)+1} / ${Math.round(Math.random()*100)+1}`;
            petri.append(el);
            this.itemClass==='bacter' ? arBacter.push(el) : arEat.push(el);
        }
    }
}



document.addEventListener("submit", (event)=>{
    event.preventDefault();
    if (document.querySelectorAll('.bacter').length>0){
        life();
    } else {
        let element = new createElement('bacter', populAll.value);
        element.create();
        element = new createElement('eat', eatAll.value);
        element.create();
        life();
    }
});

clear.addEventListener("click", ()=>{
    function clearPetri() {
        const elements = petri.children;
        for (let i=elements.length-1; i>=0; i--) {
            elements[i].remove();
        }
    }
    clearPetri();
});

stop.addEventListener("click", ()=>{
    time.value = 0;
});



