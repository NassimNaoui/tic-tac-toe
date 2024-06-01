const gameBoardObject = {
    gameBoard: ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'],
    combinaisons: [['A1', 'A2', 'A3'], ['B1', 'B2', 'B3'], ['C1', 'C2', 'C3'],
    ['A1', 'B1', 'C1'], ['A2', 'B2', 'C2'], ['A3', 'B3', 'C3'],
    ['A1', 'B2', 'C3'], ['A3', 'B2', 'C1']],
    compareArrays(a, b) {
        return JSON.stringify(a) === JSON.stringify(b)
    },
    gameBoardChecked: {
        player1: [],
        player2: []
    }
}

const player = {
    player1: {
        symbol: 'x',
        score: 0,
    },
    player2: {
        symbol: 'o',
        score: 0,
    },
}

const flowController = {
    round() {
        for (const playerNumber in player) {
            result = prompt(`${playerNumber} play :`);
            result = result.toUpperCase()
            gameBoardObject.gameBoardChecked[playerNumber].push(result);
            console.log(gameBoardObject.gameBoardChecked[playerNumber])
        }
    },
    checkGame() {
        for (const playerNumber in player) {
            for (const index in gameBoardObject.combinaisons) {
                if (gameBoardObject.compareArrays(gameBoardObject.combinaisons[index], gameBoardObject.gameBoardChecked[playerNumber])) {
                    player[playerNumber].score += 1;
                    console.log(`${playerNumber} : ${player[playerNumber].score}`);
                }
            }
        }
    }
};


