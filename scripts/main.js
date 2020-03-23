const bacter = document.getElementById('bacter');
const pole = document.getElementById('pole');
bacter.style.top = '100px';
bacter.style.left = '100px';

const move = (element, x, y) => {
    if (y-parseInt(element.style.top)>0) {
        element.style.top = parseInt(element.style.top)+Math.round(Math.random())+2+'px';
    } else {
        element.style.top = parseInt(element.style.top)-Math.round(Math.random())-2+'px';
    }

    if (x-parseInt(element.style.left)>0) {
        element.style.left = parseInt(element.style.left)+Math.round(Math.random())+2+'px';
    } else {
        element.style.left = parseInt(element.style.left)-Math.round(Math.random())-2+'px';
    }
};

// setInterval(() => {move(bacter)}, 10);

pole.addEventListener("mousemove", (e) => {
    let x = e.clientX;
    let y = e.clientY;
    console.log(x, y);
    move(bacter, x, y);
});