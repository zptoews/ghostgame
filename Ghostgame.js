/**
 * Title: My ghost game
 * Author: Zachary
 * Date: 11/05/2021
 **/

//Constants For the canvas size and player size
const WIDTH = 1900;
const HEIGHT = 840;
const PLAYER_WIDTH = 40
const PLAYER_HEIGHT = 40

//Constants for the wall
const FINISH_SIZE = 100

//Constants for the walls
const WALL_WIDTH = 40
const WALL_HEIGHT = 120
const FIRST_WALL_COLOUR = 'Black'

//Const for the finish
const FINISH_X_POSITION = (WIDTH - FINISH_SIZE)
const FINISH_Y_POSITION = (HEIGHT - FINISH_SIZE)

//For The ghost image
const GHOST_IMAGE = new Image()
GHOST_IMAGE.src = "Ghost_image.png"

//For the human image
const HUMAN_IMAGE = new Image()
HUMAN_IMAGE.src = "Human_image.png"

//For the human player speed
const HUMAN_X_SPEED = 3
const HUMAN_Y_SPEED = 3

//For ghost player acceleration
const GHOST_ACCELERATION = 0.05

//Const for debug
const DEBUG = false

// Some context variables
var ctx
var frameCount = 0

// some variables for the human player
var humanXPosition = 0
var humanYPosition = 0

// some variables for the ghost player
var ghostXPosition = (WIDTH - PLAYER_WIDTH)
var ghostYPosition = 0
var mouseX = 0
var mouseY = 0

//For ghost player speed
var ghostXSpeed = 3
var ghostYSpeed = 3

// Tells you that these are false for now
var upPressed = false
var downPressed = false
var leftPressed = false
var rightPressed = false

//for the ghosts colour
var ghostColour

//For the finish colour
var finishColor

//variables for the walls
var wallArray = []
var wallColour = FIRST_WALL_COLOUR

//The variable to start the game
var gameStarted = false

// To listen for when a key is pushed
window.addEventListener('keydown', keyDownFunction)
function keyDownFunction(keyboardEvent) {
    var keyDown = keyboardEvent.key
    console.log("You just pressed", keyDown)

    // To show that keyDown is true
    if (keyDown == "w") {
        upPressed = true
    }
    if (keyDown == "a") {
        leftPressed = true
    }
    if (keyDown == "s") {
        downPressed = true
    }
    if (keyDown == "d") {
        rightPressed = true
    }
    if (keyDown == " ") {
        spacePressed = true
    }
}

// For when the key is released
window.addEventListener('keyup', keyUpFunction)

function keyUpFunction(keyboardEvent) {
    var keyUp = keyboardEvent.key
    console.log("You just released", keyUp)

    if (keyUp == "w") {
        upPressed = false
    }
    if (keyUp == "a") {
        leftPressed = false
    }
    if (keyUp == "s") {
        downPressed = false
    }
    if (keyUp == "d") {
        rightPressed = false
    }
    if (keyUp == " ") {
        spacePressed = false
        startGame()
    }
}

window.onload = startCanvas
console.log("start")

function startCanvas() {
    ctx = document.getElementById("myCanvas").getContext("2d")

    updateCanvas()

    //To put up the title screen
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    ctx.fillStyle = "black"
    ctx.font = "200px Arial"
    ctx.fillText("Ghost game", 400, 200)
    ctx.font = "40px Arial"
    ctx.fillText("Trigger Warning: Ghosts and mansions are in this game", 400, 300)
    ctx.fillText("Once upon a time there was a legend that there was a treasure", 400, 400)
    ctx.fillText("hidden within a magic temple that was said to have changing walls.", 400, 450)
    ctx.fillText("So a brave hero set out using his mastery of the W, A, S, and D", 400, 500)
    ctx.fillText("elements to over come any challenge and get the fabled treasure", 400, 550)
    ctx.fillText("but right as he could see the treasure a ghost who has mastered", 400, 600)
    ctx.fillText("the element of the mouse appeared to try to stop him.", 400, 650)
    ctx.fillText("Human player: Uses W, A, S, and D to move",400,700)
    ctx.fillText("Ghost player: Accelerates toward the mouse cursor",400,750)
    ctx.fillText("Spacebar to start", 800, 800)
}

function startGame() {
    if (!gameStarted) {
        for (let index = 0; index < 15; index++) {
            //To get a new wall array
            wallArray.push(new Wall(Math.floor(Math.random() * WIDTH + 1), Math.floor(Math.random() * HEIGHT + 1)));
        }
        timer = setInterval(updateCanvas, 10)
        gameStarted = true
    }
}

function updateCanvas() {
    // Clear the frame
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    if (DEBUG) {
        // To show where the players X and Y are
        ctx.fillStyle = "black"
        ctx.font = "10px Arial"
        ctx.fillText("X position: " + humanXPosition, 30, 30)
        ctx.fillText("Y position: " + humanYPosition, 30, 50)

        //To show the speed of the player
        ctx.fillText("X speed: " + HUMAN_X_SPEED, 30, 70)
        ctx.fillText("Y speed: " + HUMAN_Y_SPEED, 30, 90)
        ctx.fillText("X speed: ", 30, 70)
        ctx.fillText("Y speed: ", 30, 90)
    }

    //The up pressed
    if (upPressed) {
        humanYPosition -= HUMAN_Y_SPEED
    }
    if (downPressed) {
        humanYPosition += HUMAN_Y_SPEED
    }
    if (leftPressed) {
        humanXPosition -= HUMAN_X_SPEED
    }
    if (rightPressed) {
        humanXPosition += HUMAN_X_SPEED
    }

    // Drawing the human player
    ctx.fillStyle = "blue"
    ctx.fillRect(humanXPosition, humanYPosition, PLAYER_WIDTH, PLAYER_HEIGHT)
    ctx.drawImage(HUMAN_IMAGE, humanXPosition, humanYPosition, PLAYER_WIDTH, PLAYER_HEIGHT)

    // Drawing the ghost player
    ctx.fillStyle = ghostColour
    ctx.fillRect(ghostXPosition, ghostYPosition, PLAYER_WIDTH, PLAYER_HEIGHT)
    ctx.drawImage(GHOST_IMAGE, ghostXPosition, ghostYPosition, PLAYER_WIDTH, PLAYER_HEIGHT)

    // Ghost acceleration
    if (mouseX > ghostXPosition) {
        ghostXSpeed = ghostXSpeed + GHOST_ACCELERATION
        //console.log("X acl")
    } else {
        ghostXSpeed = ghostXSpeed - GHOST_ACCELERATION
        //console.log("X dcl")
    }
    if (mouseY < ghostYPosition) {
        ghostYSpeed = ghostYSpeed - GHOST_ACCELERATION
        //console.log("Y dcl")
    } else {
        ghostYSpeed = ghostYSpeed + GHOST_ACCELERATION
        // console.log("Y acl")
    }

    //Ghost acceleration
    ghostXPosition = ghostXPosition + ghostXSpeed
    ghostYPosition = ghostYPosition + ghostYSpeed

    // Ghost bouncing off the walls
    if (ghostXPosition > WIDTH) {
        ghostXSpeed = -1 * ghostXSpeed
    }
    if (ghostXPosition < -PLAYER_WIDTH) {
        ghostXSpeed = -1 * ghostXSpeed
    }
    if (ghostYPosition < -PLAYER_HEIGHT) {
        ghostYSpeed = -1 * ghostYSpeed
    }
    if (ghostYPosition > HEIGHT) {
        ghostYSpeed = -1 * ghostYSpeed
    }

    if (DEBUG) {
        ghostXSpeed = 0
        ghostYSpeed = 0
    }

    //for stoping the human from going outside the walls
    if (humanXPosition > WIDTH - PLAYER_WIDTH) {
        humanXPosition = WIDTH - PLAYER_WIDTH
    }
    if (humanYPosition > HEIGHT - PLAYER_HEIGHT) {
        humanYPosition = HEIGHT - PLAYER_HEIGHT
    }
    if (humanXPosition < 0) {
        humanXPosition = 0
    }
    if (humanYPosition < 0) {
        humanYPosition = 0
    }

    //Counter for array
    counter = 0;
    while (counter < wallArray.length) {
        ctx.fillStyle = wallColour;
        ctx.fillRect(wallArray[counter].XPOSITION, wallArray[counter].YPOSITION, WALL_WIDTH, WALL_HEIGHT);
        counter++
    }

    wallColour = 'black'

    //To make the wall change colour and detcet the collision
    //Right wall collision
    if (collisionDetectedWall() && humanXPosition <= wallArray[counter].XPOSITION + WALL_WIDTH + 1 &&
        humanXPosition >= wallArray[counter].XPOSITION + WALL_WIDTH * 3 / 4) {
        humanXPosition = wallArray[counter].XPOSITION + WALL_WIDTH
        wallColour = "blue"
    }
    //Left wall collision
    else if (collisionDetectedWall() && humanXPosition + 3 + PLAYER_WIDTH >= wallArray[counter].XPOSITION + 1 &&
        humanXPosition + PLAYER_WIDTH <= wallArray[counter].XPOSITION + WALL_WIDTH / 4) {
        humanXPosition = wallArray[counter].XPOSITION - PLAYER_WIDTH
        wallColour = "red"
    }
    //Top wall collision
    else if (collisionDetectedWall() && humanYPosition - PLAYER_HEIGHT <= wallArray[counter].YPOSITION + 1 &&
        humanYPosition + PLAYER_WIDTH <= wallArray[counter].YPOSITION + WALL_HEIGHT / 4) {
        humanYPosition = wallArray[counter].YPOSITION - PLAYER_HEIGHT
        wallColour = "green"
    }
    //Bottom wall collision
    else if (collisionDetectedWall() && humanYPosition >= wallArray[counter].YPOSITION + WALL_WIDTH + 1 &&
        humanYPosition >= wallArray[counter].YPOSITION + WALL_HEIGHT * 3 / 4) {
        humanYPosition = wallArray[counter].YPOSITION + WALL_HEIGHT
        wallColour = "purple"
    }

    //Drawing the Finish line
    ctx.fillStyle = finishColor
    ctx.fillRect(FINISH_X_POSITION, FINISH_Y_POSITION, FINISH_SIZE, FINISH_SIZE)

    //Collision detection to change the ghost clour and end the game
    if (collisionDetected()) {
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, WIDTH, HEIGHT)
        ctx.fillStyle = "black"
        ctx.font = "200px Arial"
        ctx.fillText("Ghost wins", 400, 450)
        ctx.font = "80px Arial"
        ctx.fillText("Refresh page to start over", 450, 650)
        ghostColour = "orange"
        clearInterval(timer)
    } else {
        ghostColour = "cyan"
    }

    //Collision for the finish line to end the game
    if (collisionDetectedFinish()) {
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, WIDTH, HEIGHT)
        ctx.fillStyle = "black"
        ctx.font = "200px Arial"
        ctx.fillText("Human wins", 400, 450)
        ctx.font = "80px Arial"
        ctx.fillText("Refresh page to start over", 450, 650)
        finishColor = "red"
        clearInterval(timer)
    } else {
        finishColor = "green"
    }
}

//Collision detection for the ghost
function collisionDetected() {

    //The collisions for the Human and the ghost
    if (humanXPosition >= ghostXPosition - PLAYER_WIDTH &&
        humanYPosition >= ghostYPosition - PLAYER_HEIGHT &&
        humanXPosition <= ghostXPosition + PLAYER_WIDTH &&
        humanYPosition <= ghostYPosition + PLAYER_HEIGHT) {
        return (true)
    } else {
        return (false)
    }
}

//Collision detection for finish line
function collisionDetectedFinish() {

    //The collisions for the Human and the finish line
    if (humanXPosition + PLAYER_WIDTH >= FINISH_X_POSITION &&
        humanYPosition + PLAYER_HEIGHT >= FINISH_Y_POSITION) {
        return (true)
    } else {
        return (false)

    }
}

//Collision detection for the walls
function collisionDetectedWall() {

    counter = 0;
    while (counter < wallArray.length) {
        if (humanXPosition + PLAYER_WIDTH >= wallArray[counter].XPOSITION &&
            humanYPosition + PLAYER_HEIGHT >= wallArray[counter].YPOSITION &&
            humanXPosition <= wallArray[counter].XPOSITION + WALL_WIDTH &&
            humanYPosition <= wallArray[counter].YPOSITION + WALL_HEIGHT) {
            return (true)
        } //End of the if

        counter++
    } //End of the while

    return (false)
}

// To see if the mouse moves
window.addEventListener('mousemove', mouseMovedFunction)

function mouseMovedFunction(mouseEvent) {
    mouseX = mouseEvent.offsetX
    mouseY = mouseEvent.offsetY
}

class Wall {
    constructor(X, Y) {
        this.XPOSITION = X
        this.YPOSITION = Y
    }
}
