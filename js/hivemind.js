class Hivemind {

    dictionary;
    seedPuzzle;
    seedWord;
    seedCenterLetter;
    upperCaseSeedWord;
    letters;
    answerArray;
    usedLetterIndex = 1;
    originalPositionArray;
    score;
    foundWords = new Array();
    soundboard;
    isGameGoing = false;
    pageManager;
    totalRoundPoints;
    lastSubmittedGuess = '';
    clearRate = 0;
    rank;

    constructor() {
        this.dictionary = new Dictionary();
        this.soundboard = new Soundboard();
        this.pageManager = new PageManager();
        this.rank = new Rank();
    }

    newGame() {
        this.isGameGoing = true;
        this.usedLetterIndex = 1;
        this.lastSubmittedGuess = '';
        this.score = 0;
        this.setScore();
        this.foundWords = new Array();
        this.seedPuzzle = this.dictionary.getRandomPuzzle().split(',');
        this.seedWord = this.seedPuzzle[0];
        this.seedCenterLetter = this.seedPuzzle[1].charAt(Math.floor(Math.random() * this.seedPuzzle[1].length));
        this.upperCaseSeedWord = this.seedWord.toUpperCase();
        this.letters = this.seedWord.split('');
        this.answerArray = this.dictionary.getValidWordArray(this.seedWord, this.seedCenterLetter);
        this.originalPositionArray = [];
        this.letters = this.upperCaseSeedWord.split('');
        this.pageManager.clearAllTables();
        this.scramble(false);
        this.setTotalPossibleRoundPoints();
        this.setThreshold();
        this.pageManager.turnOffWelcomeScreenElements();
        this.pageManager.addBorderedClass();
        this.pageManager.turnOnGameElements();
        this.pageManager.hideDefinition();
    }

    setTotalPossibleRoundPoints() {
        let total = 0;
        for (let i=0; i<this.answerArray.length; i++) {
            total += this.getWordScore(this.answerArray[i]);
        }
        this.totalRoundPoints = total;
    }

    getIsGameGoing() {
        return this.isGameGoing;
    }

    giveUp() {
        for (let i=0; i<this.answerArray.length; i++) {
            let word = this.answerArray[i];
            if (this.foundWords.indexOf(word) < 0) {
                this.revealWord(i);
                this.foundWords.push(word);
            }
        }
        this.#endRound(true);
    }

    #endRound(isGameOver) {
        this.isGameGoing = false;
        this.pageManager.showDefinition();
        this.pageManager.hideGuessAndTiles();
        this.pageManager.displayInBetweenGamesElements();
        this.pageManager.hideInBetweenGamesElements();
        if (isGameOver) {
            this.soundboard.playSound("gameOverSound", .1);
        }
        else {
            this.pageManager.hideNewGameButton();
            this.pageManager.displayNextRoundButton();
            this.soundboard.playSound("clearSound", .1);
        }
    }

    getWordScore(word) {
        let points = word.length;
        if (points == 4) {
            points = 1;
        }
        let pangramCheck = String.prototype.concat(...new Set(word)).length;
        if (pangramCheck == 7) {
            points += 7;
        }
        return points;
    }

    scoreWord(word) {
        this.score += this.getWordScore(word);
        this.setScore();
        this.setThreshold();
    }

    setThreshold() {
        if (this.isGameGoing) {
            let percentage = Math.round(1000 * (this.foundWords.length / this.answerArray.length)) / 10;
            console.log(percentage);
            this.pageManager.setThreshold(percentage);
            this.pageManager.setRank(this.rank.getRank(percentage));
        }
    }

    setScore() {
        document.getElementById("score").innerHTML = '<strong>' + this.score + '</strong>';
    }

    setRound() {
        document.getElementById("round").innerHTML = '<strong>' + this.round + '</strong>';
    }

    submit() {
        let word = this.pageManager.getGuess();
        let answerArrayIndex = this.answerArray.indexOf(word);
        let foundWordsIndex = this.foundWords.indexOf(word);

        if (word.length > 0) {
            this.lastSubmittedGuess = word;
            if (answerArrayIndex >= 0 && foundWordsIndex < 0) {
                this.revealWord(answerArrayIndex);
                this.foundWords.push(word);
                this.scoreWord(word);
                if (this.foundWords.length === this.answerArray.length) {
                    this.#endRound(false);
                } else {
                    this.soundboard.playSound("correctSound", 0.5);
                }
            } else {
                this.soundboard.playSound("wrongSound", 1);
            }
            for (let i=0; i<word.length; i++) {
                this.putLetterBack();
            }
        }
        return;
    }

    typeLetter(letter) {
        for (let i=0; i<this.scrambledLetters.length; i++) {
            let field = "unusedLetterRow"+ (i+1).toString();
            if (this.scrambledLetters[i] === letter && document.getElementById(field).innerHTML !== undefined && document.getElementById(field).innerHTML.length > 0) {
                addLetter(field);
                break;
            }
        }
    }

    revealWord(index) {
        this.pageManager.revealWord(this.answerArray[index], this.foundWords.length + 1);
    }

    addLetter(field) {
        let letterToBeAdded = document.getElementById(field).innerHTML[23];
        console.log(letterToBeAdded);
        if (this.usedLetterIndex < 18 && letterToBeAdded !== '' && letterToBeAdded !== undefined) {
            document.getElementById("guess").innerHTML += letterToBeAdded;
            this.usedLetterIndex++;
        }
    }

    putLetterBack() {
        if (this.usedLetterIndex > 1) {
            let currentGuess = document.getElementById("guess").innerHTML;
            document.getElementById("guess").innerHTML = currentGuess.slice(0, -1);
            this.usedLetterIndex--;
        }
    }

    scramble(playSound) {
        if (this.isGameGoing) {
            let copyLettersArray = [...this.letters];
            let centerLetterIndex = copyLettersArray.indexOf(this.seedCenterLetter.toUpperCase());
            copyLettersArray.splice(centerLetterIndex, 1);
            let newArray = [];
            for (let i=0; i<3; i++) {
                let nextIndex = Math.floor(Math.random() * copyLettersArray.length);
                newArray.push(copyLettersArray[nextIndex]);
                copyLettersArray.splice(nextIndex, 1);
            }
            newArray.push(this.seedCenterLetter.toUpperCase());
            for (let j=0; j<3; j++) {
                let nextIndex = Math.floor(Math.random() * copyLettersArray.length);
                newArray.push(copyLettersArray[nextIndex]);
                copyLettersArray.splice(nextIndex, 1);
            }
            this.scrambledLetters = newArray;
            this.pageManager.clearGuess();
            this.pageManager.populateUnusedLetterTable(this.scrambledLetters);
            this.usedLetterIndex = 1;
            this.originalPositionArray = [];
            if (playSound) {
                this.soundboard.playSound("shuffleSound", 0.4);
            }
        }
    }

    processEnter() {
        if (this.usedLetterIndex > 1) {
            this.submit();
        } else {
            if (this.lastSubmittedGuess !== '' && this.usedLetterIndex === 1) {
                for (let i=0; i<this.lastSubmittedGuess.length; i++) {
                    this.typeLetter(this.lastSubmittedGuess.charAt(i));
                }
            }
        }
    }

    typePreviouslyFoundWord(index) {
        let selectedWord = this.answerArray[index-1];
        if (this.foundWords.indexOf(selectedWord) >= 0) {
            do {
                this.putLetterBack();
            } while (this.usedLetterIndex > 1);
            for (let i=0; i<selectedWord.length; i++) {
                this.typeLetter(selectedWord.charAt(i));
            }
        }
    }

    hideDefinition() {
        this.pageManager.hideDefinition();
    }

    async updateDefinition(index) {
        if (index <= this.answerArray.length) {
            let word = this.foundWords[index-1];
            let result = await this.dictionary.lookup(word);
            this.pageManager.updateDefinition(result);
        }
    }
}