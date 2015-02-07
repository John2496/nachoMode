var container = document.createElement("div");
var sombrero = document.createElement("img");
var iframe = document.createElement("iframe");
var canvas = document.createElement("canvas");
var nachos = [];

canvas.style.position ="fixed";
canvas.style.top = 0;
canvas.style.left=0;
canvas.style.width="100%";
canvas.style.height="100%";
canvas.style.opacity="0.5";

document.body.appendChild(canvas);

sombrero.src = "http://i.imgur.com/en3T7Wk.png";
sombrero.style.display = "block";
sombrero.style.margin = "0 auto";

container.appendChild(sombrero);

iframe.src="https://www.youtube.com/embed/vX2J6mceWic?rel=0&autoplay=1";
iframe.style.height = "100px";
iframe.style.width = "140px";
iframe.style.display = "block";
iframe.style.margin = "0 auto";

container.appendChild(iframe);

container.style.bottom = "-175px";
container.style.position = "fixed";
container.style.width = "80%";
container.style.margin = "0 0 0 -40%";
container.style.left = "50%";
container["z-index"] = -1;

document.body.appendChild(container);

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){
        window.setTimeout(callback, 10000);
    };
})();

moveUp();
createNacho();
requestAnimFrame(function() {
    animateNachos(canvas.getContext("2d"), canvas, nachos);
});

function createNacho(){
    nachos.push({
        height: 0,
        x: (Math.random() * canvas.width),
        fallSpeed : 1,
        c: "yellow"
    });
}

function animateNachos(context, canvas, nachos){
    context.clearRect(0, 0, canvas.width, canvas.height);
    updateNachos(nachos, canvas);
    drawNachos(nachos, context);
    requestAnimFrame(function() {
        animateNachos(context,canvas, nachos);
    });
}

function drawNacho(x, height, ctx){
    ctx.beginPath();
    ctx.moveTo(x,height+30);
    ctx.lineTo(x+10,height+10);
    ctx.lineTo(x+30,height+30);
    ctx.closePath();
    ctx.fillStyle = "#FFCC00";
    ctx.fill();
}

function drawNachos(nachos, context){
    nachos.forEach(function(nacho){
        drawNacho(nacho.x, nacho.height, context);
    });
}

function updateNachos(nachos, canvas){
    for (var i=0; i<nachos.length; i++){
        var nacho=nachos[i];

        if ((nacho.height === 40) && (nachos.length < 7)){
            createNacho();
        }
        if (nacho.height === canvas.height){
            nacho.height = 0;
            nacho.x = (Math.random() * canvas.width);
        }
        
        nacho.height += nacho.fallSpeed;
    }
}

function moveUp() {
    container.style.bottom = (parseInt(container.style.bottom.slice(0, -2)) + 3).toString() + "px";
    setTimeout(moveUp, 500);
}