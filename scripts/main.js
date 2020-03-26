// Variable
// Class
import { createElement } from './createElement.js';


const eatAll = document.getElementById('eat');
const populAll = document.getElementById('popul');
const petri = document.getElementById('petri');
const stop = document.getElementById('stop');
const clear = document.getElementById('clear');
const time = document.getElementById('time');
const countBacter = document.getElementById('countBacter');
const countEat = document.getElementById('countEat');
const arBacter = [];
const arEat = [];
let count = 0;
let dataAr = [['ход', 'еды', 'бактерий'], [0, 0, 0]];


// Function
const eatDetected = (bacter) => {
  const gridRow = parseInt(bacter.style.gridRow);
  const gridColumn = parseInt(bacter.style.gridColumn);
  for (let i = 0; i < arEat.length; i++) {
    const eatRow = parseInt(arEat[i].style.gridRow);
    const eatColumn = parseInt(arEat[i].style.gridColumn);

    if ((eatRow === gridRow || eatRow - gridRow === -1 || eatRow - gridRow === 1) && ((eatColumn - gridColumn) === 1 || (eatColumn - gridColumn) === 2)) {
      return 20;
    } if ((eatRow === gridRow || eatRow - gridRow === -1 || eatRow - gridRow === 1) && ((eatColumn - gridColumn) === -1 || (eatColumn - gridColumn) === -2)) {
      return 40;
    } if ((eatColumn === gridColumn || eatColumn - gridColumn === 1 || eatColumn - gridColumn === -1) && ((eatRow - gridRow) === 1 || (eatRow - gridRow) === 2)) {
      return 60;
    } if ((eatColumn === gridColumn || eatColumn - gridColumn === 1 || eatColumn - gridColumn === -1) && ((eatRow - gridRow) === -1 || (eatRow - gridRow) === -1)) {
      return 80;
    }
  }
  return -1;
};

const ripBacter = (bacter) => {
  if (arBacter.indexOf(bacter, 0) !== -1) {
    arBacter[arBacter.indexOf(bacter, 0)].remove();
    arBacter.splice(arBacter.indexOf(bacter, 0), 1);
    const element = new createElement('eat', 1, bacter.style.gridRow, bacter.style.gridColumn, 'black');
    element.create();
  }
};

const eating = (bacter) => {
  const gridRow = parseInt(bacter.style.gridRow);
  const gridColumn = parseInt(bacter.style.gridColumn);

  for (let i = 0; i < arEat.length; i++) {
    if (parseInt(arEat[i].style.gridRow) === gridRow && parseInt(arEat[i].style.gridColumn) === gridColumn) {
      arEat[i].remove();
      arEat.splice(i, 1);
      bacter.hungry--;
    }
  }
};

const moveBacter = (bacter) => {
  eating(bacter);

  if (bacter.energy === 0) {
    ripBacter(bacter);
  }

  if (bacter.hungry <= 0) {
    const element = new createElement('bacter', 1, bacter.style.gridRow, bacter.style.gridColumn);
    element.create();
    bacter.hungry = 2;
  }


  let random = eatDetected(bacter);
  if (random === -1) { random = Math.round(Math.random() * 100); }
  if (random < 25) {
    if (parseInt(bacter.style.gridColumn) === 100) {
      bacter.style.gridColumn = `${1}/ auto`;
    } else {
      bacter.style.gridColumn = `${parseInt(bacter.style.gridColumn) + 1}/ auto`;
    }
  } else if (random >= 25 && random < 50) {
    if (parseInt(bacter.style.gridColumn) === 1) {
      bacter.style.gridColumn = `${100}/ auto`;
    } else {
      bacter.style.gridColumn = `${parseInt(bacter.style.gridColumn) - 1}/ auto`;
    }
  } else if (random >= 50 && random < 75) {
    if (parseInt(bacter.style.gridRow) === 100) {
      bacter.style.gridRow = `${1}/ auto`;
    } else {
      bacter.style.gridRow = `${parseInt(bacter.style.gridRow) + 1}/ auto`;
    }
  } else if (parseInt(bacter.style.gridRow) === 1) {
    bacter.style.gridRow = `${100}/ auto`;
  } else {
    bacter.style.gridRow = `${parseInt(bacter.style.gridRow) - 1}/ auto`;
  }
  bacter.energy--;
};

const life = () => {
  timer();
};

const timer = () => {
  countBacter.textContent = arBacter.length;
  countEat.textContent = arEat.length;

  if (time.value === '0') { return; }

  const bacterAll = document.querySelectorAll('.bacter');

  for (let i = bacterAll.length - 1; i >= 0; i--) {
    moveBacter(bacterAll[i]);
  }

  if (Math.round(Math.random() * 100) > 80) {
    const element = new createElement('eat', 2);
    element.create();
  }

  count++;
  dataAr.push([count, arEat.length, arBacter.length]);
  if (count % 10 === 0) { google.charts.setOnLoadCallback(drawChart); }

  setTimeout(() => { timer(time.value); }, time.value);
};
export { arBacter, arEat };


// EventListener
document.addEventListener('submit', (event) => {
  event.preventDefault();
  if (document.querySelectorAll('.bacter').length > 0) {
    life();
  } else {
    let element = new createElement('bacter', populAll.value);
    element.create();
    element = new createElement('eat', eatAll.value);
    element.create();
    life();
  }
});

clear.addEventListener('click', () => {
  function clearPetri() {
    const elements = petri.children;
    for (let i = elements.length - 1; i >= 0; i--) {
      elements[i].remove();
    }
  }
  clearPetri();
  arBacter = [];
  arEat = [];
  count = 0;
  dataAr = [['ход', 'еды', 'бактерий'], [0, 0, 0]];
});

stop.addEventListener('click', () => {
  time.value = 0;
});


// Google Chart
const drawChart = () => {
  const data = google.visualization.arrayToDataTable(dataAr);
  // Define the chart to be drawn.
  const options = {
    title: 'Отношение еды к популяции',
    legend: { position: 'bottom' },
  };

  // Instantiate and draw the chart.
  const chart = new google.visualization.LineChart(document.getElementById('myPieChart'));
  chart.draw(data, options);
};

google.charts.load('current', { packages: ['corechart'], language: 'ru' });

google.charts.setOnLoadCallback(drawChart);
