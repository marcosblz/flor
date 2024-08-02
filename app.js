const canvas = document.getElementById('Flor');
const ctx = canvas.getContext('2d');

// Ajustar tamaño del canvas basado en la ventana
function ajustarCanvas() {
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.7;
}

window.addEventListener('resize', ajustarCanvas);
ajustarCanvas();

function dibujarPetalo(x, y, radioX, escala, rotacion, color) {
    const pasos = 20;
    const anguloIncrement = (Math.PI / pasos) * 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotacion);
    ctx.scale(1, escala);
    ctx.beginPath();
    for (let i = 0; i <= pasos; i++) {
        const anguloActual = i * anguloIncrement;
        const radioActual = Math.sin(anguloActual) * radioX;
        const puntoY = Math.sin(anguloActual) * radioActual;
        const puntoX = Math.cos(anguloActual) * radioActual;
        if (i === 0) {
            ctx.moveTo(puntoX, puntoY);
        } else {
            ctx.lineTo(puntoX, puntoY);
        }
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.strokeStyle = 'black'; // Borde negro
    ctx.lineWidth = 3; // Grosor del borde
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function dibujarGirasol(x, y, numPetalos, radioXPetalo, radioYPetalo, altoTrazo) {
    const pasosTallo = 50;
    const altoTallo = altoTrazo / pasosTallo;
    let nuevaY = y;

    function dibujarTallo() {
        if (nuevaY < y + altoTrazo) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, nuevaY);
            ctx.lineWidth = 3; // Grosor del tallo ajustado
            ctx.strokeStyle = 'green';
            ctx.stroke();
            nuevaY += altoTallo;
            requestAnimationFrame(dibujarTallo);
        } else {
            const anguloIncrement = (Math.PI * 2) / numPetalos;
            let contadorPetalos = 0;
            function dibujarSiguientePetalo() {
                if (contadorPetalos < numPetalos) {
                    const angulo = contadorPetalos * anguloIncrement;
                    dibujarPetalo(x, y, radioXPetalo, 1.5, angulo, 'yellow');
                    contadorPetalos++;
                    setTimeout(dibujarSiguientePetalo, 500);
                }
                // Centro de la flor
                ctx.beginPath();
                ctx.arc(x, y, 15, 0, Math.PI * 2); 
                ctx.fillStyle = 'brown';
                ctx.fill();
            }
            dibujarSiguientePetalo();
        }
    }
    dibujarTallo();
}

document.addEventListener('DOMContentLoaded', () => {
    dibujarGirasol(canvas.width / 2, canvas.height / 2, 6, 50, 100, 200);
});
