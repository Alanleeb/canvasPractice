var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d')

// c.fillStyle = "#c90345"
// c.fillRect(100, 100, 100, 100)
// c.fillRect(200, 200, 100, 100)
// c.fillRect(300, 300, 100, 100)
// c.fillRect(400, 400, 100, 100)

//Line
// c.beginPath()
// c.moveTo(100, 300)
// c.lineTo(300, 100)
// c.lineTo(300, 600)
// c.lineTo(100, 600)
// c.strokeStyle = "#b234a0"
// c.stroke()

// Arc / Circle
// c.beginPath()
// c.arc(300, 300, 30, 0, Math.PI * 2, false) 
// c.stroke()

// for (var i = 0; i < 20; i++) {
//     var rand = Math.random() * 256
//     var x = Math.random() * window.innerWidth
//     var y = Math.random() * window.innerHeight
//     c.beginPath()
//     c.strokeStyle = 'rgb(' +rand + ',150,' + rand +')'
//     c.arc(x, y, 30, 0, Math.PI * 2, false) 
//     c.stroke()
// }
var mouse = {
    x: undefined,
    y: undefined
}
var maxRadius = 40;
var minRadius = 2;
var colorArray = [
    '#30422e',
    '#B99309',
    '#edecde',
    '#cecbab'
]

window.addEventListener('mousemove', function(event){
    mouse.x = event.x
    mouse.y = event.y
})

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
}) 

function Circle(x, y, dx, dy, radius) {
 this.x = x;
 this.y = y;
 this.dx = dx;
 this.dy = dy;
 this.radius = radius
 this.minRadius = radius
 this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

 this.draw = function() {

    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false) 
    c.stroke()
    c.fillStyle = this.color
    c.fill()
 }

 this.update = function() {
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy= -this.dy
    } 
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx
    } 
    this.x += this.dx
    this.y += this.dy

    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
        if (this.radius < maxRadius) {
            this.radius += 1
        }
    } else if (this.radius > this.minRadius){
        this.radius -= 1
    }

    this.draw()
 }
}

var circleArray = []

function init() {
    circleArray = []
for (var i = 0; i < 800; i++) {
    var radius = Math.random() * 5 + 1
    var x = Math.random() * (innerWidth - radius * 2) + radius
    var y = Math.random() * (innerHeight - radius * 2) + radius
    var dx = (Math.random() - 1) 
    var dy = (Math.random() - 1) 
    

    circleArray.push(new Circle(x, y, dx, dy, radius))
    }
}
init()

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight)

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update()
    }
  
}
animate()