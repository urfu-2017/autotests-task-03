

scenarios = [
    {
        name: "assymetric draw",
        winner: "draw",
        game: [[1,1],[1,2],[2,2],[3,1],[3,2],[1,2],[1,1],[3,3],[1,3],[2,1],[2,3]]
    },
    {
        name: "symmetric draw",
        winner: "draw",
        game: [[2,1],[2,2],[3,2],[3,1],[1,1],[1,2],[1,3],[2,3],[3,3]]
    },
    {
        name: "easy horizontal",
        winner: "x",
        game: [[2,1],[3,1],[2,2],[3,2],[2,3]]
    },
    {
        name: "easy horizontal",
        winner: "o",
        game: [[3,1],[2,1],[3,2],[2,2],[1,2],[2,3]]
    },
    {
        name: "easy vertical",
        winner: "x",
        game: [[1,1],[1,2],[1,1],[1,2],[2,1],[2,2],[3,1]]
    },
    {
        name: "easy vertical",
        winner: "o",
        game: [[1,2],[1,1],[1,3],[2,1],[2,2],[3,1]]
    },
    {
        name: "easy sub diagonal",
        winner: "x",
        game: [[1,3],[2,3],[2,2],[3,2],[3,1]]
    },
    {
        name: "easy main diagonal",
        winner: "x",
        game: [[1,1],[2,1],[2,2],[3,1],[3,3]]
    },
    {
        name: "easy main diagonal",
        winner: "o",
        game: [[2,1],[1,1],[3,1],[2,2],[3,2],[3,3]]
    },
    {
        name: "easy sub diagonal",
        winner: "o",
        game: [[1,2],[1,3],[1,1],[2,2],[2,1],[3,1]]
    },
    {
        name: "bi win",
        winner: "x",
        game: [[1,1],[1,2],[1,3],[2,3],[3,3],[3,2],[3,1],[2,1],[2,2]]
    },
    {
        name: "bi win",
        winner: "x",
        game: [[1,2],[1,3],[2,3],[3,3],[3,2],[3,1],[2,1],[1,1],[2,2]]
    },
    {
        name: "fair play",
        winner: "x",
        game: [[3,2],[2,2],[1,3],[2,3],[1,1],[1,2],[2,1],[3,3],[3,1]]
    },
    {
        name: "game not ended",
        winner: "",
        game:  [[1,2],[1,3],[2,3],[3,3],[3,2],[3,1],[2,1],[1,1]]
    }

]

negative_scenarios = [
    {
        name: "cell out of range",
        throws: /Cell .*-.* not found/,
        game: [[0, 0]]
    },
    {
        name: "cell out of range",
        throws: /Cell .*-.* not found/,
        game: [[4, 2]]
    }
]


describe('cross-zero', () => {

    beforeEach(wipe)
    // after(wipe)

    function play(steps, eachTurnCb=null) {
        return steps
            .map(pair => getCell(...pair))
            .map(cell => {
                const turnResult = processUserAction(cell)
                if (eachTurnCb) eachTurnCb(cell, turnResult)
                return turnResult
            })
    }

    describe('positive', () => {

        it(`turns is xoxoxo`, () => {
            let expectedPlayer = 'x'
            const log = play([[1,2],[1,3],[2,3],[3,3],[3,2],[3,1]], (cell, turnRes) => {
                expectedPlayer = expectedPlayer === 'x' ? 'o' : 'x'
                chai.assert.strictEqual(currentPlayer, expectedPlayer)
            })
        })

        scenarios.forEach(({name, winner, game}) => {
            let winnerName = winner
            if (!winner || winner === 'draw')
                winnerName = 'nobody'

            it(`${winnerName} should win in ${name}`, () => {
                const log = play(game)
                const lastRecord = log[log.length - 1]
                chai.assert.strictEqual(lastRecord.winner, winner)

                if (winner) {
                    const actualWinner = document
                            .getElementById('winner')
                            .getAttribute('name')
                    chai.assert.strictEqual(actualWinner, winner)
                }
            })
        })
    })

    describe('negative', () => {

        it(`it should do nothing when tryin to mark marked cell`, () => {
            let remPlayer = currentPlayer
            const log = play([[1,2],[1,2]])
            const lastRecord = log[log.length - 1]

            chai.assert.isNotOk(lastRecord.somethingHappens)
            chai.assert.notStrictEqual(remPlayer, currentPlayer)
        })

        it(`should throw when not a cell used`, () => {
            const plzPlay = () => processUserAction(null)
            chai.assert.throws(plzPlay, /not a Cell/)
        })

        negative_scenarios.forEach(({name, throws, game}) => {
            it (`should throws ${throws} when ${name}`, () => {
                const plzPlay = () => play(game)
                chai.assert.throws(plzPlay, throws)
            })
        })
    })
})
