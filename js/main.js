let hivemind = new Hivemind();

function newGame(e) {
    hivemind.newGame();
    e.blur();
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