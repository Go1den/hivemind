let hivemind = new Hivemind();

function tweet(e) {
    hivemind.tweet();
    e.blur();
}

function toggleSound(e) {
    hivemind.toggleSound();
    e.blur();
}

function todaysGame(e) {
    hivemind.todaysGame();
    e.blur();
}

function newGame(e) {
    hivemind.randomGame();
    e.blur();
}

function linkedGame(e) {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let puzzle = urlParams.get('puzzle');
    if (puzzle !== undefined && puzzle !== null) {
        hivemind.specificGame(Number(puzzle));
    } else {
        alert("The puzzle in your URL is not valid. Try playing today's puzzle or a random puzzle instead!");
    }
}

function backToHomeScreen(e) {
    location.href = "https://go1den.github.io/hive-mind";
}

function scramble(e) {
    if (hivemind.getIsGameGoing()) {
        hivemind.scramble(true);
    }
    e.blur();
}

function addLetter(field) {
    if (hivemind.getIsGameGoing()) {
        hivemind.addLetter(field);
    }
}

function putLetterBack(e) {
    if (hivemind.getIsGameGoing()) {
        hivemind.putLetterBack();
    }
    e.blur();
}

function submit(e) {
    if (hivemind.getIsGameGoing()) {
        hivemind.submit();
    }
    e.blur();
}

function giveUp(e) {
    if (hivemind.getIsGameGoing()) {
        hivemind.giveUp();
    }
    e.blur();
}

function onAnswerBoardClick(e, index) {
    if (hivemind.getIsGameGoing()) {
        hivemind.typePreviouslyFoundWord(index);
    } else {
        hivemind.updateDefinition(index);
    }
    e.blur();
}

document.addEventListener("keydown", function(event) {
    if (hivemind.getIsGameGoing()) {
        if (event.key === "Backspace") {
            hivemind.putLetterBack();
        } else if (event.key === "Enter") {
            hivemind.processEnter();
        } else if (event.key === " ") {
            hivemind.scramble(true);
        } else if (event.code.startsWith("Key") && event.code.length == 4) {
            let charCode = event.code.charCodeAt(3);
            if (charCode >= 65 && charCode <= 90) {
                hivemind.typeLetter(event.code.charAt(3));
            }
        }
    }
});