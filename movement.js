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
var speed = 12; //Adjust as you want (it's slow now)
var movementState = {
    left: false,
    up: false,
    right: false,
    down: false
};

function startMove() {
    moveInterval = setInterval(function () {
        var dx = 0;
        var dy = 0;

        if (movementState.left) {
            dx -= 1;
        }
        if (movementState.up) {
            dy -= 1;
        }
        if (movementState.right) {
            dx += 1;
        }
        if (movementState.down) {
            dy += 1;
        }


        var length = Math.sqrt(dx * dx + dy * dy);
        if (length !== 0) {
            dx /= length;
            dy /= length;
        }

        x += dx * speed;
        y += dy * speed;


        x = Math.max(window.innerWidth / 5 + 10, Math.min(x, window.innerWidth - 100));
        y = Math.max(0, Math.min(y, window.innerHeight - 100));

        update(x, y);
    }, 20);
}

function stopMove() {
    clearInterval(moveInterval);
    moveInterval = null;
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode == 39) {        // Left
        movementState.left = true;
    } else if (event.keyCode == 40) { // Up
        movementState.up = true;
    } else if (event.keyCode == 37) { // Right
        movementState.right = true;
    } else if (event.keyCode == 38) { // Down
        movementState.down = true;
    }

    if (!moveInterval) {
        startMove();
    }
    if (!requestID) {
        requestID = requestAnimationFrame(move);
    }
});

document.addEventListener('keyup', function (event) {
    if (event.keyCode == 39) {        // Left
        movementState.left = false;
    } else if (event.keyCode == 40) { // Up
        movementState.up = false;
    } else if (event.keyCode == 37) { // Right
        movementState.right = false;
    } else if (event.keyCode == 38) { // Down
        movementState.down = false;
    }

    if (!(movementState.left || movementState.up || movementState.right || movementState.down)) {
        stopMove();
    }

});