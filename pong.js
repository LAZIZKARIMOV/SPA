// êëàññ îïðåäåëÿþùèé ïàðàìåòðû èãðîâîãî ïðÿìîóãîëüíèêà è ìåòîä äëÿ åãî îòðèñîâêè

function rect(color, x, y, width, height) {
    this.color = color; // öâåò ïðÿìîóãîëüíèêà
    this.x = x; // êîîðäèíàòà õ
    this.y = y; // êîîðäèíàòà ó
    this.width = width; // øèðèíà
    this.height = height; // âûñîòà
    // ôóíêöèÿ ðèñóåò ïðÿìîóãîëüíèê ñîãëàñíî çàäàííûì ïàðàìåòðàì
    this.draw = function() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    };
}
// ôóíêöèÿ ïðîâåðÿåò ïåðåñåêàþòñÿ ëè ïåðåäàííûå åé ïðÿìîóãîëüíûå îáúåêòû

function collision(objA, objB) {
    if (objA.x + objA.width > objB.x && objA.x < objB.x + objB.width && objA.y + objA.height > objB.y && objA.y < objB.y + objB.height) {
        return true;
    }
    else {
        return false;
    }
}
// äâèæåíèå îïïîíåíòà

function aiMove() {
    var y;
    // äåëàåì ñêîðîñòü îïïîíåíòà çàâèñèìîé îò ñêîðîñòè øàðèêà
    switch (ball.vY) {
    case 2:
        vY = 2;
        break;
    case 3:
        vY = 3;
        break;
    case 4:
        vY = 4;
        break;
    case 5:
        vY = 5;
        break;
    case 6:
        vY = 5;
        break;
    case 7:
        vY = 6;
        break;
    case 8:
        vY = 6;
        break;
    case 9:
        vY = 6;
        break;
    case 0:
        vY = 0;
        break;
    }

    if (ball.y < ai.y + ai.height / 2) {
        y = ai.y - vY;
    }
    if (ball.y > ai.y + ai.height / 2) {
        y = ai.y + vY;
    }
    if (10 < y && y < game.height - ai.height - 10) {
        ai.y = y;
    }
}
// äâèæåíèå èãðîêà

function playerMove(e) {
    if (start) {
        var y = e.pageY;
        // óñëîâèå ïðîâåðÿåò íå âûõîäèò ëè ðàêåòêà çà ïðåäåëû ïîëÿ
        if (player.height / 2 + 10 < y && y < game.height - player.height / 2 - 10) {
            // ïðèâÿçûâàåì ïîëîæåíèå ìûøè ê ñåðåäèíå ðàêåòêè
            player.y = y - player.height / 2;
        }
    }
}


function startGame() {
    if (!start) {
        ball.vX = -2;
        ball.vY = 2;
        start = true;
    }
}

// îòðèñîâêà èãðû

function draw() {
    game.draw(); // èãðîâîå ïîëå
    // ðàçäåëèòåëüíàÿ ïîëîñà
    for (var i = 10; i < game.height; i += 45) {
        context.fillStyle = "#EB1C00";
        context.fillRect(game.width / 2 - 10, i, 20, 30);
    }
    // ðèñóåì íà ïîëå ñ÷¸ò
    context.font = 'bold 128px courier';
    context.textAlign = 'center';
    context.textBaseline = 'top';
    context.fillStyle = '#ccc';
    context.fillText(ai.scores, 100, 0);
    context.fillText(player.scores, game.width - 100, 0);
    ai.draw(); // ëåâàÿ ðàêåòêà
    player.draw(); // ðàêåòêà èãðîêà
    ball.draw(); // øàðèê
    if (!start) {
        // âûâîä ñòàòñòèêè
        context.fillStyle = "#ccc";
        context.globalAlpha = 0.7;
        context.fillRect(0, 0, game.width, game.height);
        context.font = 'bold 16px courier';
        context.textBaseline = 'top';
        context.fillStyle = '#000';
        context.fillText("Total: " + game.total + " Win: " + game.win + " Lose: " + game.lose, game.width / 2, 0);
        context.font = 'bold 60px courier';
        context.textBaseline = 'top';
        context.fillStyle = '#000';
        context.fillText("Let's play!", game.width / 2, game.height / 2 - 50);
        context.font = 'bold 16px courier';
        context.textBaseline = 'top';
        context.fillStyle = '#000';
        context.fillText("click on me", game.width / 2, game.height / 2 + 25);
        context.textBaseline = 'bottom';
        context.fillText("Karimov L.", game.width / 2, game.height);
    }
}
// èãðîâûå èçìåíåíèÿ êîòîðûå íóæíî ïðîèçâåñòè

function update() {
    // äâèãàåì ðàêåòêó îïïîíåíòà
    aiMove();
    // ìåíÿåì êîîðäèíàòû øàðèêà
    // Äâèæåíèå ïî îñè Ó
    if (ball.y < 0 || ball.y + ball.height > game.height) {
        // ñîïðèêîñíîâåíèå ñ ïîëîì è ïîòîëêîì èãðîâîãî ïîëÿ
        ball.vY = -ball.vY;
    }
    // Äâèæåíèå ïî îñè Õ
    if (ball.x < 0) {
        // ñòîëêíîâåíèå ñ ëåâîé ñòåíîé
        ball.vX = -ball.vX;
        player.scores++;
    }
    if (ball.x + ball.width > game.width) {
        // ñòîëêíîâåíèå ñ ïðàâîé
        ball.vX = -ball.vX;
        ai.scores++;
    }

    // Åñëè ñ÷¸ò ðàâåí äåñÿòè òî çàâåðøàåì ïàðòèþ
    if (ai.scores === 10 || player.scores === 10) {
        if (ai.scores === 10) { // ïîáåäà ai
            game.lose++;
            start = false;
            ball.x = game.width - player.width - 1.5 * ball.width - 10;
            ball.y = game.height / 2 - ball.width / 2;
            ai.y = game.height / 2 - ai.height / 2;
            player.y = game.height / 2 - ai.height / 2;
        } else { // ïîáåäà èãðîêà
            game.win++;
            start = false;
            ball.x = player.width + ball.width;
            ball.y = game.height / 2 - ball.width / 2;
            ai.y = game.height / 2 - ai.height / 2;
            player.y = game.height / 2 - ai.height / 2;
        }
        ball.vX = 0;
        ball.vY = 0;
        ai.scores = 0;
        player.scores = 0;
        game.total++;
    }

    // Ñîïðèêîñíîâåíèå ñ ðàêåòêàìè
    if ((collision(ai, ball) && ball.vX < 0) || (collision(player, ball) && ball.vX > 0)) {
        // ïðèðàùåíèå ñêîðîñòè øàðèêà
        if (ball.vX < 9 && -9 < ball.vX) {
            if (ball.vX < 0) {
                ball.vX--;
            } else {
                ball.vX++;
            }
            if (ball.vY < 0) {
                ball.vY--;
            } else {
                ball.vY++;
            }
        }
        ball.vX = -ball.vX;
    }
    // ïðèðàùåíèå êîîðäèíàò
    ball.x += ball.vX;
    ball.y += ball.vY;
}

function play() {
    draw(); // îòðèñîâûâàåì âñ¸ íà õîëñòå
    update(); // îáíîâëÿåì êîîðäèíàòû
}
// Èíèöèàëèçàöèÿ ïåðåìåííûõ

function init() {
    start = false;
    // îáúåêò êîòîðûé çàäà¸ò èãðîâîå ïîëå
    game = new rect("#000", 0, 0, 480, 320);
    game.total = 0;
    game.win = 0;
    game.lose = 0;
    // Ðàêåòêè-èãðîêè
    ai = new rect("#52E1FF", 10, game.height / 2 - 40, 20, 80);
    player = new rect("#52E1FF", game.width - 30, game.height / 2 - 40, 20, 80);
    // êîëè÷åñòâî î÷êîâ
    ai.scores = 0;
    player.scores = 0;
    // íàø êâàäðàòíûé èãðîâîé "øàðèê"
    ball = new rect("#FAF500", 40, game.height / 2 - 10, 20, 20);
    // ñêîðîñòü øàðèêà
    ball.vX = 0; // ñêîðîñòü ïî îñè õ
    ball.vY = 0; // ñêîðîñòü ïî îñè ó
    var canvas = document.getElementById("canvas");
    canvas.width = game.width;
    canvas.height = game.height;
    context = canvas.getContext("2d");
    canvas.onmousemove = playerMove;
    canvas.onclick = startGame;
    setInterval(play, 1000 / 50);
}

init();
