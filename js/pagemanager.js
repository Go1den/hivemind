class PageManager {
    constructor() {

    };

    setDisplayOfElements(selectorValue, displayValue) {
        let elements = document.querySelectorAll(selectorValue);
        elements.forEach(el => {
            el.style.display = displayValue;
        });
    }

    turnOffWelcomeScreenElements() {
        this.setDisplayOfElements('.onAtStartOnly', 'none');
    }

    turnOnGameElements() {
        this.setDisplayOfElements('.offAtStart', 'initial');
    }

    addBorderedClass() {
        let gameElements = document.querySelectorAll('.toBeBordered');
        gameElements.forEach(el => {
            el.classList.add("bordered");
        });
    }

    displayInBetweenRoundsElements() {
        this.setDisplayOfElements('.showOnNextRoundOnly', 'inline');
    }

    hideInBetweenRoundsElements() {
        this.setDisplayOfElements('.showOnNextRoundOnly', 'none');
    }
    
    displayInBetweenGamesElements() {
        this.setDisplayOfElements('.newGame', '');
    }

    hideInBetweenGamesElements() {
        this.setDisplayOfElements('.gameButtons', 'none');
    }

    hideNewGameButton() {
        this.setDisplayOfElements('.newGame', 'none');
    }

    displayNextRoundButton() {
        this.setDisplayOfElements('.round', 'table');
    }

    hideNextRoundButton() {
        this.setDisplayOfElements('.round', 'none');
    }

    clearAllTables() {
        this.clearAnswerTable();
        this.clearUnusedLetterRow();
    }

    clearGuess() {
        document.getElementById("guess").innerHTML = '';
    }

    revealWord(word, index) {
        let answerTextDiv = document.getElementById("answerText");
        answerTextDiv.innerHTML += '<span id="' + word + '" onclick="onAnswerBoardClick(this, ' + index + ')"><strong>&nbsp;' + word + '&nbsp;</strong></span>';
        answerTextDiv.scrollLeft = answerTextDiv.scrollWidth;
    }

    getGuess() {
        return document.getElementById("guess").innerHTML;
    }

    clearAnswerTable() {
        document.getElementById("answerText").innerHTML = '';
    }

    clearUnusedLetterRow() {
        for(let i=1; i<8; i++) {
            document.getElementById("unusedLetterRow" + i.toString()).innerHTML = '';
        }
    }

    populateUnusedLetterTable(scrambledLetters) {
        for (let i=0; i<scrambledLetters.length; i++) {
            let currentLetter = scrambledLetters[i];
            document.getElementById("unusedLetterRow" + (i+1).toString()).innerHTML = '<image src=\"images/tiles/' + currentLetter +'.png\"/>';
        }
    }

    #buildBlankHTML(lettersInWord) {
        let result = '';
        for(let i=0; i<lettersInWord; i++) {
            result += '<image src=\"images/tiles/blank.png\" width=30px; height=30px;/>';
        }
        return result;
    }

    updateDefinition(definition) {
        document.getElementById("definitionText").innerHTML = definition;
        document.getElementById("definitionText").scrollTop = 0;
    }

    showDefinition() {
        document.getElementById("definition").style.display = 'initial';
    }

    hideDefinition() {
        document.getElementById("definitionText").innerHTML = '';
        document.getElementById("definition").style.display = 'none';
    }

    hideGuessAndTiles() {
        document.getElementById("usedLetterRow").style.display = 'none';
        document.getElementById("unusedLetterRow").style.display = 'none';
    }

    setThreshold(percentage) {
        document.getElementById("threshold").innerHTML = '<strong>' + percentage + '%</strong>';
    }

    setRank(rank) {
        document.getElementById("rank").innerHTML = '<strong>' + rank + '</strong>';
    }
}