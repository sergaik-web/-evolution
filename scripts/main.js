const eatAll = document.getElementById('eat');
const populAll = document.getElementById('popul');
const petri = document.getElementById('petri');
const stop = document.getElementById('stop');
const clear = document.getElementById('clear');
const time = document.getElementById('time');
const energy = document.getElementById('energy');
const countBacter = document.getElementById('countBacter');
const countEat = document.getElementById('countEat');
let arBacter=[];
let arEat = [];



const eatDetected = (bacter) => {
    let gridRow = parseInt(bacter.style.gridRow);
    let gridColumn = parseInt(bacter.style.gridColumn);
    for (let i=0; i<arEat.length; i++){
        let eatRow = parseInt(arEat[i].style.gridRow);
        let eatColumn = parseInt(arEat[i].style.gridColumn);

        if ((eatRow === gridRow || eatRow-gridRow===-1 || eatRow-gridRow===1) && ((eatColumn - gridColumn)===1 || (eatColumn - gridColumn)===2)){
            return 20;
        } else if ((eatRow === gridRow || eatRow-gridRow===-1 || eatRow-gridRow===1) && ((eatColumn - gridColumn)===-1 || (eatColumn - gridColumn)===-2)){
            return 40;
        } else if ((eatColumn === gridColumn || eatColumn-gridColumn===1 || eatColumn-gridColumn===-1)  && ((eatRow - gridRow)===1 || (eatRow - gridRow)===2)){
            return 60;
        } else if ((eatColumn === gridColumn || eatColumn-gridColumn===1 || eatColumn-gridColumn===-1) && ((eatRow - gridRow)===-1 || (eatRow - gridRow)===-1)){
            return 80;
        }
    }
    return -1;
};

const ripBacter = (bacter) =>{
    if(arBacter.indexOf(bacter, 0) !== -1){
        arBacter[arBacter.indexOf(bacter, 0)].remove();
        arBacter.splice(arBacter.indexOf(bacter, 0),1);
        let element = new createElement('eat', 1, bacter.style.gridRow, bacter.style.gridColumn, 'black');
        element.create();
    }
};

const eating = (bacter) =>{
    let gridRow = parseInt(bacter.style.gridRow);
    let gridColumn = parseInt(bacter.style.gridColumn);

    for (let i=0; i<arEat.length; i++){
        if (parseInt(arEat[i].style.gridRow) === gridRow && parseInt(arEat[i].style.gridColumn) === gridColumn){
            arEat[i].remove();
            arEat.splice(i,1);
            bacter.hungry--;
        }
    }
};

const moveBacter = (bacter)=>{
    eating(bacter);

    if (bacter.energy === 0){
        ripBacter(bacter)
    }

    if (bacter.hungry <= 0){
        let element = new createElement('bacter', 1, bacter.style.gridRow, bacter.style.gridColumn);
        element.create();
        bacter.hungry = 2;
    }


    let random = eatDetected(bacter);
    if (random===-1){random = Math.round(Math.random()*100);}
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
    bacter.energy--;
};

const life = () => {
    timer();
};

const timer = ()=> {
    countBacter.textContent=arBacter.length;
    countEat.textContent=arEat.length;
    if (time.value === '0') {
        return
    } else {
        const bacterAll = document.querySelectorAll('.bacter');
        for (let i = bacterAll.length - 1; i >= 0; i--) {
            moveBacter(bacterAll[i]);
        }
        if (Math.round(Math.random()*100)>80){
            let element = new createElement('eat', 2);
            element.create();
        }
        setTimeout(() => {timer(time.value)}, time.value)
    }
};



class createElement{
    constructor(itemClass, count, gridRow, gridColumn, background){
        this.itemClass = itemClass;
        this.count = count;
        this.gridRow = gridRow ;
        this.gridColumn = gridColumn;
        this.background = background;
    }
    create() {
        for (let i=this.count; i>0 ; i--){
            let el = document.createElement('div');
            el.className = this.itemClass;
            if (this.count === 1 && this.itemClass === 'bacter'){
                el.style.gridRow = this.gridRow;
                el.style.gridColumn = this.gridColumn;
            } else if (this.count === 1 && this.itemClass === 'eat'){
                el.style.gridRow = this.gridRow;
                el.style.gridColumn = this.gridColumn;
                el.style.backgroundColor = this.background;
            } else {
                el.style.gridArea = `${Math.round(Math.random() * 100) + 1} / ${Math.round(Math.random() * 100) + 1}`;
            }
            petri.append(el);
            if (this.itemClass==='bacter'){
                el.energy = energy.value;
                el.hungry = 2;
                arBacter.push(el)
            } else {
                arEat.push(el);
            }
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



