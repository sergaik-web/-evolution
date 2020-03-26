const energy = document.getElementById('energy');
import {arBacter, arEat} from "./main.js";

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

export {createElement};