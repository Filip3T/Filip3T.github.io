var gamespace = document.getElementById("game");
gamespace.style.right = window.innerWidth - gamespace.offsetWidth + 20 + "px";
gamespace.style.bottom = window.innerHeight - gamespace.offsetHeight + 20 + "px";

function update(x, y) {
    gamespace.innerHTML = "<img src='ludzik.png' style='position: fixed; right: " + x +
    "px; bottom: " + y + "px;'>";
}

var x = window.innerWidth - 100;
var y = 0;
var moveInterval;
var movementState = {
    left: false,
    up: false,
    right: false,
    down: false
};

function startMove() {
    moveInterval = setInterval(function () {
        if (movementState.left && x > (window.innerWidth * 0.2) + 20) {
            x -= 10;
        }  
        if (movementState.up && y > 0) {
            y -= 10;
        }
        if (movementState.right && x < window.innerWidth - 100) {
            x += 10;
        }
        if (movementState.down && y < window.innerHeight - 100) {
            y += 10;
        }

        update(x, y);
    }, 2);
}

function stopMove() {
    clearInterval(moveInterval);
    moveInterval = null;
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode == 39) {              // Left
        movementState.left = true;
    } else if (event.keyCode == 40) {       // Up
        movementState.up = true;
    } else if (event.keyCode == 37) {       // Right
        movementState.right = true;
    } else if (event.keyCode == 38) {       // Down
        movementState.down = true;
    }
    if (!moveInterval) {
        startMove();
    }
});

document.addEventListener('keyup', function (event) {
    if (event.keyCode == 39) {              // Left
        movementState.left = false;
    } else if (event.keyCode == 40) {       // Up
        movementState.up = false;
    } else if (event.keyCode == 37) {       // Right
        movementState.right = false;
    } else if (event.keyCode == 38) {       // Down
        movementState.down = false;
    }
    if (!(movementState.left || movementState.up || movementState.right || movementState.down)) {
        stopMove();
    }
});