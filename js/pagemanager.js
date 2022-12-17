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
        this.clearRevealedAnswerTable();
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

    revealMissedWord(word, index) {
        let answerTextDiv = document.getElementById("revealedAnswerText");
        answerTextDiv.innerHTML += '<span id="' + word + '" onclick="onAnswerBoardClick(this, ' + index + ')"><strong>&nbsp;' + word + '&nbsp;</strong></span>';
        answerTextDiv.scrollLeft = answerTextDiv.scrollWidth;
    }

    getGuess() {
        return document.getElementById("guess").innerHTML;
    }

    clearAnswerTable() {
        document.getElementById("answerText").innerHTML = '';
    }

    clearRevealedAnswerTable() {
        document.getElementById("revealedAnswerText").innerHTML = '';
    }

    clearUnusedLetterRow() {
        for(let i=1; i<8; i++) {
            document.getElementById("unusedLetterRow" + i.toString()).innerHTML = '';
        }
    }

    populateUnusedLetterTable(scrambledLetters) {
        for (let i=0; i<scrambledLetters.length; i++) {
            let currentLetter = scrambledLetters[i];
            if (i == 3) {
                document.getElementById("unusedLetterRow" + (i+1).toString()).innerHTML = '<image src=\"images/tiles/' + currentLetter +'gold.png\"/>';
            } else {
                document.getElementById("unusedLetterRow" + (i+1).toString()).innerHTML = '<image src=\"images/tiles/' + currentLetter +'silver.png\"/>';
            }
        }
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

    hideMissedWordsTable() {
        document.getElementById("revealedAnswerTable").style.display = 'none';
    }

    showMissedWordsTable() {
        document.getElementById("revealedAnswerTable").style.display = 'initial';
    }

    setRankThreshold(percentage) {
        document.getElementById("rank").style.backgroundPosition = 100 - percentage + '%';
    }

    animateRankUp(soundboard, currentRank) {
        this.setRankThreshold(100);
        setTimeout(() => {
            document.getElementById("rank").classList.remove("progressBar");
            soundboard.playSound("rankUpSound", 0.25);
            this.setRankThreshold(0);
            this.setRank(currentRank);
            document.getElementById("rank").classList.add("progressBar");
        }, 1000);
    }

    setThreshold(percentage) {
        document.getElementById("threshold").innerHTML = '<strong>' + percentage + '%</strong>';
        document.getElementById("threshold").style.backgroundPosition = 100 - percentage + '%';
    }

    setPointThreshold(percentage) {
        document.getElementById("pointThreshold").innerHTML = '<strong>' + percentage + '%</strong>';
        document.getElementById("pointThreshold").style.backgroundPosition = 100 - percentage + '%';
    }

    setRank(rank) {
        document.getElementById("rank").innerHTML = '<strong>' + rank + '</strong>';
    }

    setTweetText(rank, score, puzzleLink, isTodaysPuzzle, puzzleID) {
        let text = 'I scored ' + score + ' to achieve the rank of ' + rank;
        if (isTodaysPuzzle) {
            text += ' in today\'s #HiveMind, a word game by @GoldenSRL! Can you beat my score? Click "Play Today\'s Puzzle" to find out!';
        } else {
            text += ' in #HiveMind, a word game by @GoldenSRL! Can you beat my score? Click "Play Linked Puzzle" to find out!';
        }
        console.log(puzzleLink);
        console.log(text);
        let hashtags = "hivemind" + puzzleID;

        let myUrlWithParameters = new URL ("https://twitter.com/intent/tweet");
        myUrlWithParameters.searchParams.append("hashtags", hashtags);
        myUrlWithParameters.searchParams.append("ref_src", "twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E");
        myUrlWithParameters.searchParams.append("text", text);
        myUrlWithParameters.searchParams.append("url", puzzleLink);

        document.getElementById("tweet").innerHTML = '<a href="' + myUrlWithParameters + '">Click me to Tweet</a>';
    }

    setScore(score) {
        document.getElementById("score").innerHTML = '<strong>' + score + '</strong>';
    }
}