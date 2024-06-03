const gameBoardObject = {

    gameBoard: [['A1',false], ['A2',false], ['A3',false], ['B1',false], ['B2',false], ['B3',false],['C1',false], ['C2',false], ['C3',false]],

    combinaisons: [['A1', 'A2', 'A3'], ['B1', 'B2', 'B3'], ['C1', 'C2', 'C3'],
    ['A1', 'B1', 'C1'], ['A2', 'B2', 'C2'], ['A3', 'B3', 'C3'],
    ['A1', 'B2', 'C3'], ['A3', 'B2', 'C1']],

    permutations: [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]],

    chunk(arr) {
        const size = 3;
        const chunkedArray = [];
        for (let i = 0; i < arr.length; i++) {
            const last = chunkedArray[chunkedArray.length - 1];
            if(!last || last.length === size){
                chunkedArray.push([arr[i]]);
            }else{
                last.push(arr[i]);
            }
        };
        return chunkedArray;
    },
    
    cardinals: [],

    combinaisonsPermutation: [],

    compareArrays(a, b) {
        return JSON.stringify(a) === JSON.stringify(b)
    },

    gameBoardChecked: {
        player1: [],
        player2: ['A3', 'B3', 'C3']
    }
}

gameBoardObject.cardinals = (function(data) {
    const arr = [];
    for (const k in data.combinaisons) {
        for (const i in data.permutations) {
            for (const n in data.permutations[i]) {
                arr.push(data.combinaisons[k][data.permutations[i][n]])
            }
        }
    }
    return arr
})(gameBoardObject);

gameBoardObject.combinaisonsPermutation = gameBoardObject.chunk(gameBoardObject.cardinals)

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
    checkingBoard(playerPlays) {
        for (const index in gameBoardObject.gameBoard) {
            for (const caseChecked in playerPlays) {
                if (playerPlays[caseChecked] === gameBoardObject.gameBoard[index][0]) {
                    gameBoardObject.gameBoard[index][1] = true;
                }
            }
        }
    },
    round() {
        for (const playerNumber in player) {
            result = prompt(`${playerNumber} play :`);
            result = result.toUpperCase();
            gameBoardObject.gameBoardChecked[playerNumber].push(result);
            this.checkingBoard(gameBoardObject.gameBoardChecked[playerNumber]);
        }
    },
    checkGame() {
        for (const playerNumber in player) {
            for (const index in gameBoardObject.combinaisonsPermutation) {
                if (gameBoardObject.compareArrays(gameBoardObject.combinaisonsPermutation[index], gameBoardObject.gameBoardChecked[playerNumber])) {
                    player[playerNumber].score += 1;
                    console.log(player[playerNumber].score)
                }
            }
        }
    },
    
};

