class Rank {
    constructor() {

    };

    getRank(percentage) {
        if (percentage < 2) {
            return "Beeswax";
        } else if (percentage < 5) {
            return "Larva";
        } else if (percentage < 8) {
            return "Pupa";
        } else if (percentage < 15) {
            return "New Bee";
        } else if (percentage < 25) {
            return "Worker Bee";
        } else if (percentage < 40) {
            return "Busy Bee";
        } else if (percentage < 50) {
            return "Drone";
        } else if (percentage < 70) {
            return "Queen Bee";
        } else if (percentage < 100) {
            return "Beekeeper";
        } else {
            return "The Bee's Knees";
        }
    }

    getProgressToNextRank(rankName, totalPossiblePoints, myScore) {
        let startingPercentage = 0;
        let targetPercentage = 0;
        if (rankName === "Beeswax") {
            targetPercentage = .02;
        } else if (rankName === "Larva") {
            startingPercentage = .02;
            targetPercentage = .05;
        } else if (rankName === "Pupa") {
            startingPercentage = .05;
            targetPercentage = .08;
        } else if (rankName === "New Bee") {
            startingPercentage = .08;
            targetPercentage = .15;
        } else if (rankName === "Worker Bee") {
            startingPercentage = .15;
            targetPercentage = .25;
        } else if (rankName === "Busy Bee") {
            startingPercentage = .25;
            targetPercentage = .40;
        } else if (rankName === "Drone") {
            startingPercentage = .40;
            targetPercentage = .50;
        } else if (rankName === "Queen Bee") {
            startingPercentage = .50;
            targetPercentage = .70;
        } else if (rankName === "Beekeeper") {
            startingPercentage = .70;
            targetPercentage = 1.00;
        } else {
            startingPercentage = 1.00;
            targetPercentage = 1.00;
        }
        let lowerThreshold = startingPercentage * totalPossiblePoints;
        let upperThreshold = targetPercentage * totalPossiblePoints;
        let pointsInRange = upperThreshold - lowerThreshold;
        let pointsEarnedInRange = Math.max(0, myScore - lowerThreshold);
        return Math.round(1000 * (pointsEarnedInRange / pointsInRange)) / 10;
    }
}