var gamespace = document.getElementById("game");
gamespace.style.right = window.innerWidth - gamespace.offsetWidth + "px";
gamespace.style.bottom = window.innerHeight - gamespace.offsetHeight  + "px";

var anim = "Emi_Standing_F.png";

function update(x, y) {
    gamespace.innerHTML = "<img src='sprites/" + anim +"' style='position: fixed; left: " + Math.trunc(x) +
        "vh; bottom: " + Math.trunc(y) + "vh; height: 10vh; width: 10vh;'>";
}

var map = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
           [1, 0, 0, 0, 0, 2, 0, 0, 0, 1],
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
           [1, 0, 0, 0, 0, 0, 1, 1, 0, 1],
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
           [1, 1, 1, 1, 0, 0, 1, 1, 1, 1]
];

var x = 0;
var y = 0;
var moveInterval;
var speed = 0.3; //Adjust as you want (it's slow now)
var movementState = {
    left: false,
    up: false,
    right: false,
    down: false
};

let i = 0;
let j = 0;
map.forEach(el => {
    j = 0;
    el.forEach(ell => {
        if(ell == 2) {
            x = j * 10;
            y = 90 - i * 10;
            update(x, y);
        }
        j += 1;
    });
    i += 1;
});

function startMove() {
    moveInterval = setInterval(function () {
        var dx = 0;
        var dy = 0;

        var goX = true;
        var goY = true;

        if (movementState.right) {
            dx += 1;
            if (map[(9-Math.trunc(y / 10))][(Math.trunc(x / 10)) + 1] == 1 || map[(9-Math.trunc((y + 9) / 10))][(Math.trunc(x / 10)) + 1] == 1) {
                goX = false;
            }
        }
        if (movementState.down) {
            dy -= 1;
            if (map[(9-Math.trunc((y - 1) / 10))][(Math.trunc(x / 10))] == 1 || map[(9-Math.trunc((y - 1) / 10))][(Math.trunc((x + 9) / 10))] == 1) {
                goY = false;
            }
        }
        if (movementState.left) {
            dx -= 1;
            if (map[(9-Math.trunc(y  / 10))][(Math.trunc((x - 1) / 10))] == 1 || map[(9-Math.trunc((y + 9)  / 10))][(Math.trunc((x - 1) / 10))] == 1) {
                goX = false;
            }
        }
        if (movementState.up) {
            dy += 1;
            if (map[(9-Math.trunc(y / 10)) - 1][(Math.trunc(x / 10))] == 1 || map[(9-Math.trunc(y / 10)) - 1][(Math.trunc((x + 9) / 10))] == 1) {
                goY = false
            }
        }
        console.log(9-Math.trunc(y / 10),Math.trunc(x / 10))
        console.log(goX, goY)

        var length = Math.sqrt(dx * dx + dy * dy);
        if (length !== 0) {
            dx /= length;
            dy /= length;
        }

        if(goX) x += dx * speed;

        if(goY) y += dy * speed;

        x = Math.max(0, Math.min(x, 90));
        y = Math.max(0, Math.min(y, 90));
        
    
        update(x, y);

    }, 20);
}

function stopMove() {
    clearInterval(moveInterval);
    moveInterval = null;
    update(x, y);
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode == 39) {        // Left
        movementState.right = true;
        anim = "Emi_Walking_F.gif";
    } else if (event.keyCode == 40) { // Up
        movementState.down = true;
        anim = "Emi_Walking_F.gif";
    } else if (event.keyCode == 37) { // Right
        anim = "Emi_Walking_F.gif";
        movementState.left = true;
    } else if (event.keyCode == 38) { // Down
        anim = "Emi_Walking_F.gif";
        movementState.up = true;
    }

    if (!moveInterval) {
        startMove();
    }
    /* if (!requestID) {
        requestID = requestAnimationFrame(move);
    } */
});

document.addEventListener('keyup', function (event) {
    if (event.keyCode == 39) {        // Left
        anim = "Emi_Standing_F.png";
        movementState.right = false;
    } else if (event.keyCode == 40) { // Up
        movementState.down = false;
        anim = "Emi_Standing_F.png";
    } else if (event.keyCode == 37) { // Right
        movementState.left = false;
        anim = "Emi_Standing_F.png";
    } else if (event.keyCode == 38) { // Down
        movementState.up = false;
        anim = "Emi_Standing_F.png";
    }


    if (!(movementState.left || movementState.up || movementState.right || movementState.down)) {
        stopMove();
    }
});