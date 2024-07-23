const gameBoardObject = {

    gameBoard: [['A1', false], ['A2', false], ['A3', false], ['B1', false], ['B2', false], ['B3', false], ['C1', false], ['C2', false], ['C3', false]],

    combinaisons: [['A1', 'A2', 'A3'], ['B1', 'B2', 'B3'], ['C1', 'C2', 'C3'],
    ['A1', 'B1', 'C1'], ['A2', 'B2', 'C2'], ['A3', 'B3', 'C3'],
    ['A1', 'B2', 'C3'], ['A3', 'B2', 'C1']],

    permutations: [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]],

    chunk(arr) {
        const size = 3;
        const chunkedArray = [];
        for (let i = 0; i < arr.length; i++) {
            const last = chunkedArray[chunkedArray.length - 1];
            if (!last || last.length === size) {
                chunkedArray.push([arr[i]]);
            } else {
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
        player2: [],
        roundResult: [['win', false], ['draw', false]],
        infoRound: []
    }
}

gameBoardObject.cardinals = (function (data) {
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
        symbol: 'O',
        score: 0,
        played: false,
    },
    player2: {
        symbol: 'X',
        score: 0,
        played: false,
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
    selectedCase: []
    ,
    findIntersection(arr1, arr2) {
        const intersection = [];
        for (let i = 0; i < arr1.length; i++) {
          const element = arr1[i];
          if (arr2.indexOf(element) !== -1 && intersection.indexOf(element) === -1) {
            intersection.push(element);
          }
        } if (intersection.length === 3) {
            return intersection;
        }
      },
    round(playerNumber) {
        gameBoardObject.gameBoardChecked[playerNumber].push(this.selectedCase[0]);
        console.log(`${playerNumber} play : ${this.selectedCase}`)
        this.checkingBoard(gameBoardObject.gameBoardChecked[playerNumber]);
        console.log(`${playerNumber} : ${gameBoardObject.gameBoardChecked[playerNumber]}`)
        this.checkGame(playerNumber)
    },
    game() {
        while (!gameBoardObject.gameBoardChecked.roundResult[0][1]) {
            this.rolePLay(); if (gameBoardObject.gameBoardChecked.roundResult[0][1] || gameBoardObject.gameBoardChecked.roundResult[1][1]) {
                this.resetBoard();
                break;
            };
        }
    },
    findWinCombinaison(playerNumber) {
        let found = false;
        for (let i = 0; i < gameBoardObject.combinaisonsPermutation.length; i++) {
            if (JSON.stringify(gameBoardObject.combinaisonsPermutation[i]) === JSON.stringify(this.findIntersection(gameBoardObject.gameBoardChecked[playerNumber], gameBoardObject.combinaisonsPermutation[i]))) {
                found = true
                break;
            }
        }
        return found;
    },
    checkGame(playerNumber) {
        if (this.findWinCombinaison(playerNumber)) {
            player[playerNumber].score += 1;
            gameBoardObject.gameBoardChecked.roundResult[0][1] = true;
            gameBoardObject.gameBoardChecked.infoRound[0] = `${playerNumber} won the round !`
            console.log(player[playerNumber].score);
            console.log(gameBoardObject.gameBoardChecked.roundResult);
        }
        else if (gameBoardObject.gameBoardChecked.player1.length + gameBoardObject.gameBoardChecked.player2.length === gameBoardObject.gameBoard.length) {
            gameBoardObject.gameBoardChecked.roundResult[1][1] = true;
            gameBoardObject.gameBoardChecked.infoRound[0] = `It's a draw !`
            console.log(gameBoardObject.gameBoardChecked.roundResult);
        }
    },
    resetBoard() {
        for (const index in gameBoardObject.gameBoard) {
            gameBoardObject.gameBoard[index][1] = false;
        };
        for (const index in gameBoardObject.gameBoardChecked.roundResult) {
            gameBoardObject.gameBoardChecked.roundResult[index][1] = false;
        }
        gameBoardObject.gameBoardChecked.player1 = [];
        gameBoardObject.gameBoardChecked.player2 = [];
    },
    resetScore() {
        for (const playerNumber in player) {
            player[playerNumber].score = 0;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.card-game');
    let currentPlayer = 'player1';

    // Définir la fonction de gestion de clic
    function handleClick(event) {
        const item = event.currentTarget;

        // Vérifier si la case est déjà prise
        if (item.querySelector('.player1') || item.querySelector('.player2')) {
            return;
        }

        // Déterminer le symbole et la classe en fonction du joueur actuel
        const icon = document.createElement('div');
        icon.classList.add(currentPlayer);
        icon.textContent = player[currentPlayer].symbol;
        item.appendChild(icon);

        // Mettre à jour le choix et appeler la fonction de round
        choice = item.id;
        flowController.selectedCase[0] = choice;
        flowController.round(currentPlayer);

        //Afficher le score des joueurs
        
        const scoreplayer1 = document.getElementById('score-player1')
        const scoreplayer2 = document.getElementById('score-player2')
        const infoRound = document.getElementById('info-round')
        
        scoreplayer1.innerHTML = player.player1.score
        scoreplayer2.innerHTML = player.player2.score
        infoRound.innerHTML = gameBoardObject.gameBoardChecked.infoRound
        
        if (gameBoardObject.gameBoardChecked.roundResult[0][1]) {
            buttons.forEach(item => {
                item.removeEventListener('click', handleClick);
            })
        }

        // Alterner les joueurs
        if (currentPlayer === 'player1') {
            player.player1[2] = true;
            player.player2[2] = false;
            currentPlayer = 'player2';
        } else {
            player.player1[2] = false;
            player.player2[2] = true;
            currentPlayer = 'player1';
        }

        console.log(player.player1[2]);
        console.log(player.player2[2]);
    }
    // Ajouter l'event listener à chaque bouton
    buttons.forEach(item => {
        item.addEventListener('click', handleClick);
    });
});
