window.onload;

var score = 0;
var gamePlugin = '\
                <div class="container"> \
                    <button id="newGame">Nouvelle partie</button> \
                    <p class="explanation"> Assemble les valeurs jusqu' + "'" + 'à atteindre le <span class="noticeme">2048</span></p> \
                    <div class="game"> \
                        <div class="grid"> \
                            <div class="row"> \
                                <div class="cell"></div> \
                                <div class="cell"></div> \
                                <div class="cell"></div> \
                                <div class="cell"></div> \
                            </div> \
                            <div class="row"> \
                                <div class="cell"></div> \
                                <div class="cell"></div> \
                                <div class="cell"></div> \
                                <div class="cell"></div> \
                            </div> \
                            <div class="row"> \
                                <div class="cell"></div> \
                                <div class="cell"></div> \
                                <div class="cell"></div> \
                                <div class="cell"></div> \
                            </div> \
                            <div class="row"> \
                                <div class="cell"></div> \
                                <div class="cell"></div> \
                                <div class="cell"></div> \
                                <div class="cell"></div> \
                            </div> \
                        </div> \
                        <div class="tiles"> \
                        </div> \
                    </div> \
                    <p class="explanation"><span class="noticeme">Pour jouer:</span> utilisez les touches flêchées de votre clavier</p> \
                </div> \
                ';
var tools = ' \
<link rel="stylesheet" type="text/css" href="style.css"> \
<link href="https://fonts.googleapis.com/css?family=Orbitron&display=swap" rel="stylesheet"> \
';

$(document).ready(function () {
    $("head").append(tools);
    $(".2048").html(gamePlugin);
    startGame();
})

function startGame() {
    $(".loose, .win, .tile, .score").remove();
    score = 0;
    newTile();
    newTile();
    $("button").after("<div class='score'>Score: " + score + "</div>")
}

function newTile() {
    var randomColumn = Math.floor((Math.random() * 4) + 1);
    var randomRow = Math.floor((Math.random() * 4) + 1);
    var tileValue = Math.random() < 0.9 ? 2 : 4;

    if ($("div").hasClass("tile-position-" + randomRow + "-" + randomColumn)) {
        return newTile();
    }
    else {
        $(".tiles").append('<div class="tile tile-position-' + randomRow + "-" + randomColumn + ' ' + 'tile-' + tileValue + ' tile-new"><div class="tile-inner">' + tileValue +'</div></div>');
    }
}

function winCheck() {
    if ($("div").hasClass("tile-2048")) {
        if ($("div").hasClass("win") == false) {
            $(".game").append("<div class='win'><p>Gagné!</p></div>");
        }
    }
    else if ($(".tile-inner").length == 16) {
        var x = 4;
        var y = 4;

        for (i = x; i >= 1; i--) {
            for (j = y; j > 1; j--) {
                var tileValue = parseInt($(".tile-position-" + i + "-" + j).text());
                var tileValueTarget = parseInt($(".tile-position-" + i + "-" + (j-1)).text());
                
                if (tileValue == tileValueTarget) {
                    return true; // PAS ENCORE PERDU
                }
            }
        }

        for (i = y; i >= 1; i--) {
            for (j = x; j > 1; j--) {
                var tileValue = parseInt($(".tile-position-" + j + "-" + i).text());
                var tileValueTarget = parseInt($(".tile-position-" + (j-1) + "-" + i).text());
                
                if (tileValue == tileValueTarget) {
                    return true; // PAS ENCORE PERDU
                }
            }
        }
        if ($("div").hasClass("loose") == false) {
            $(".game").append("<div class='loose'><p>Perdu!</p></div>");
        }
    }
}

function newScore(toAdd) {
    score += toAdd;
    $(".score").html("Score: <span class='noticeme'>" + score + "</span>");
}

function moveRight() {
    var x = 3;
    var y = 4;
    var movement = false;

    $("div").removeClass("tile-new");

    for (j = 1; j <= 12; j++) {
        if (y === 0) {
            y = 4;
            x--;
        }
        if ($("div").hasClass("tile-position-" + x + "-" + y)) {
            for (i = x; i < 4; i++) {
                var tileValue = parseInt($(".tile-position-" + i + "-" + y).text());
                var tileValueTarget = parseInt($(".tile-position-" + (i+1) + "-" + y).text());
                

                if ($("div").hasClass("tile-position-" + (i+1) + "-" + y) == false) {
                    $(".tile-position-" + i + "-" + y).addClass("tile-position-" + (i+1) + "-" + y);
                    $(".tile-position-" + (i+1) + "-" + y).removeClass("tile-position-" + i + "-" + y);
                    movement = true;
                } else {
                    // code pour implémenter le merge
                    if (tileValue == tileValueTarget && $(".tile-position-" + i + "-" + y).hasClass("tile-merged") == false && $(".tile-position-" + (i+1) + "-" + y).hasClass("tile-merged") == false) {
                        $(".tile-position-" + (i+1) + "-" + y).remove();
                        $(".tile-position-" + i + "-" + y).addClass("tile-position-" + (i+1) + "-" + y);
                        $(".tile-position-" + i + "-" + y).addClass("tile-merged");
                        $(".tile-position-" + i + "-" + y).removeClass("tile-" + tileValue);
                        $(".tile-position-" + i + "-" + y).addClass("tile-" + (tileValue + tileValueTarget))
                        $(".tile-position-" + (i+1) + "-" + y).removeClass("tile-position-" + i + "-" + y);
                        $(".tile-position-" + (i+1) + "-" + y + "> .tile-inner").html(tileValue + tileValueTarget);
                        newScore((tileValue + tileValueTarget));
                        movement = true;
                    }
                }
            }
            y--;
        } else {
            y--;
        }
    }
    $("div").removeClass("tile-merged");
    return movement;
}

function moveLeft() {
    var x = 2;
    var y = 4;
    var movement = false;

    $("div").removeClass("tile-new");

    for (j = 1; j <= 12; j++) {
        if (y === 0) {
            y = 4;
            x++;
        }
        if ($("div").hasClass("tile-position-" + x + "-" + y)) {
            for (i = x; i > 1; i--) {
                var tileValue = parseInt($(".tile-position-" + i + "-" + y).text());
                var tileValueTarget = parseInt($(".tile-position-" + (i-1) + "-" + y).text());
                

                if ($("div").hasClass("tile-position-" + (i-1) + "-" + y) == false) {
                    $(".tile-position-" + i + "-" + y).addClass("tile-position-" + (i-1) + "-" + y);
                    $(".tile-position-" + (i-1) + "-" + y).removeClass("tile-position-" + i + "-" + y);
                    movement = true;
                } else {
                    // code pour implémenter le merge
                    if ($(".tile-position-" + (i-1) + "-" + y).hasClass("tile-merged") == false) {
                        if (tileValue == tileValueTarget && $(".tile-position-" + i + "-" + y).hasClass("tile-merged") == false && $(".tile-position-" + (i-1) + "-" + y).hasClass("tile-merged") == false) {
                            $(".tile-position-" + (i-1) + "-" + y).remove();
                            $(".tile-position-" + i + "-" + y).addClass("tile-position-" + (i-1) + "-" + y);
                            $(".tile-position-" + i + "-" + y).addClass("tile-merged");
                            $(".tile-position-" + i + "-" + y).removeClass("tile-" + tileValue);
                            $(".tile-position-" + i + "-" + y).addClass("tile-" + (tileValue + tileValueTarget))
                            $(".tile-position-" + (i-1) + "-" + y).removeClass("tile-position-" + i + "-" + y);
                            $(".tile-position-" + (i-1) + "-" + y + "> .tile-inner").html(tileValue + tileValueTarget);
                            newScore((tileValue + tileValueTarget));
                            movement = true;
                        }
                    }
                }
            }
            y--;
        } else {
            y--;
        }
    }
    $("div").removeClass("tile-merged");
    return movement;
}

function moveUp() {
    var x = 4;
    var y = 2;
    var movement = false;

    $("div").removeClass("tile-new");

    for (j = 1; j <= 12; j++) {
        if (x === 0) {
            x = 4;
            y++;
        }
        if ($("div").hasClass("tile-position-" + x + "-" + y)) {
            for (i = y; i > 1; i--) {
                var tileValue = parseInt($(".tile-position-" + x + "-" + i).text());
                var tileValueTarget = parseInt($(".tile-position-" + x + "-" + (i-1)).text());
                

                if ($("div").hasClass("tile-position-" + x + "-" + (i-1)) == false) {
                    $(".tile-position-" + x + "-" + i).addClass("tile-position-" + x + "-" + (i-1));
                    $(".tile-position-" + x + "-" + (i-1)).removeClass("tile-position-" + x + "-" + i);
                    movement = true;
                } else {
                    // code pour implémenter le merge
                    if ($(".tile-position-" + x + "-" + (i-1)).hasClass("tile-merged") == false) {
                        if (tileValue == tileValueTarget && $(".tile-position-" + x + "-" + i).hasClass("tile-merged") == false && $(".tile-position-" + x + "-" + (i-1)).hasClass("tile-merged") == false) {
                            $(".tile-position-" + x + "-" + (i-1)).remove();
                            $(".tile-position-" + x + "-" + i).addClass("tile-position-" + x + "-" + (i-1));
                            $(".tile-position-" + x + "-" + i).addClass("tile-merged");
                            $(".tile-position-" + x + "-" + i).removeClass("tile-" + tileValue);
                            $(".tile-position-" + x + "-" + i).addClass("tile-" + (tileValue + tileValueTarget))
                            $(".tile-position-" + x + "-" + (i-1)).removeClass("tile-position-" + x + "-" + i);
                            $(".tile-position-" + x + "-" + (i-1) + "> .tile-inner").html(tileValue + tileValueTarget);
                            newScore((tileValue + tileValueTarget));
                            movement = true;
                        }
                    }
                }
            }
            x--;
        } else {
            x--;
        }
    }
    $("div").removeClass("tile-merged");
    return movement;
}

function moveDown() {
    var x = 4;
    var y = 3;
    var movement = false;

    $("div").removeClass("tile-new");

    for (j = 1; j <= 12; j++) {
        if (x === 0) {
            x = 4;
            y--;
        }
        if ($("div").hasClass("tile-position-" + x + "-" + y)) {
            for (i = y; i < 4; i++) {
                var tileValue = parseInt($(".tile-position-" + x + "-" + i).text());
                var tileValueTarget = parseInt($(".tile-position-" + x + "-" + (i+1)).text());
                

                if ($("div").hasClass("tile-position-" + x + "-" + (i+1)) == false) {
                    $(".tile-position-" + x + "-" + i).addClass("tile-position-" + x + "-" + (i+1));
                    $(".tile-position-" + x + "-" + (i+1)).removeClass("tile-position-" + x + "-" + i);
                    movement = true;
                } else {
                    // code pour implémenter le merge
                    if ($(".tile-position-" + x + "-" + (i+1)).hasClass("tile-merged") == false) {
                        if (tileValue == tileValueTarget && $(".tile-position-" + x + "-" + i).hasClass("tile-merged") == false && $(".tile-position-" + x + "-" + (i+1)).hasClass("tile-merged") == false) {
                            $(".tile-position-" + x + "-" + (i+1)).remove();
                            $(".tile-position-" + x + "-" + i).addClass("tile-position-" + x + "-" + (i+1));
                            $(".tile-position-" + x + "-" + i).addClass("tile-merged");
                            $(".tile-position-" + x + "-" + i).removeClass("tile-" + tileValue);
                            $(".tile-position-" + x + "-" + i).addClass("tile-" + (tileValue + tileValueTarget))
                            $(".tile-position-" + x + "-" + (i+1)).removeClass("tile-position-" + x + "-" + i);
                            $(".tile-position-" + x + "-" + (i+1) + "> .tile-inner").html(tileValue + tileValueTarget);
                            newScore((tileValue + tileValueTarget));
                            movement = true;
                        }
                    }
                }
            }
            x--;
        } else {
            x--;
        }
    }
    $("div").removeClass("tile-merged");
    return movement;
}

$(document).on("click", "#newGame", function () {
    startGame();
})

$(document).keydown(function (key) {
    if (key.which == 13) {
        startGame();
    }
    if ($("div").hasClass("win") == false) {
        if (key.which == 37) { // Left
            if (moveLeft()) {
                newTile();
            }
        }
        else if (key.which == 38) { // Up
            if (moveUp()) {
                newTile();
            }
        }
        else if (key.which == 39) { // Right
            if (moveRight()) {
                newTile();
            }
        }
        else if (key.which == 40) { // Down
            if (moveDown()) {
                newTile();
            }
        }
    }
})

$(document).keyup(function () {
    winCheck();
})