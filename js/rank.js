class Rank {
    constructor() {

    };

    getRank(percentage) {
        if (percentage < 2) {
            return "Beginner";
        } else if (percentage < 5) {
            return "Good Start";
        } else if (percentage < 8) {
            return "Moving Up";
        } else if (percentage < 15) {
            return "Good";
        } else if (percentage < 25) {
            return "Solid";
        } else if (percentage < 40) {
            return "Nice";
        } else if (percentage < 50) {
            return "Great";
        } else if (percentage < 70) {
            return "Amazing";
        } else if (percentage < 100) {
            return "Genius";
        } else {
            return "Queen Bee";
        }
    }
}