<template>
    <div class="wrapper">
        <info-panel :log="log" />
        <battlefield :rows="rows" :makeTurn="makeTurn" />
        <game-menu>
            <button @click="newGame">New game</button>
        </game-menu>
    </div>
</template>

<script>
    import InfoPanel from './InfoPanel.vue'
    import Battlefield from './Battlefield.vue'
    import GameMenu from './GameMenu.vue'

    import { constant, times, range, chunk, flow } from 'lodash'
    import { includes, inRange } from 'lodash/fp'

    const X = 'X'
    const O = 'O'
    const N = ''
    const PLAYERS = [X, O]

    const LOG_TIMEOUT = 2 * 1000
    const LOG_INFO = 'info'
    const LOG_ERROR = 'error'
    const LOG_WARNING = 'warning'
    const LOG_SUCCESS = 'success'

    const DEFAULT_SIZE = 4
    const DEFAULT_WIN_SIZE = 3


    export default {
        data () {
            return {
                log: [],
                finished: false,
                size: DEFAULT_SIZE,
                winSize: DEFAULT_WIN_SIZE,
                players: PLAYERS,
                battlefield: null
            }
        },

        created () {
            this.battlefield = this.buildBattlefield()
        },

        computed: {
            rows () {
                return chunk(this.battlefield, this.size)
            },

            player () {
                return this.players[0]
            }
        },

        watch: {
            battlefield (value) {
                if (!value) {
                    this.battlefield = this.buildBattlefield()
                }
            },

            size (newValue, oldValue) {
                if (newValue !== oldValue) {
                    this.battlefield = null
                }
            }
        },

        methods: {
            buildBattlefield () {
                return (
                    times(this.size * this.size, constant(N))
                    .map((value, index) => ({ value, index }))
                )
            },

            getCol (cellIdx) {
                return Math.floor(cellIdx % this.size)
            },

            getRow (cellIdx) {
                return Math.floor(cellIdx / this.size)
            },

            initialHorizontal () {
                return range(this.size)
            },

            initialVertical () {
                return this.initialHorizontal().map(
                    x => x * this.size
                )
            },

            initialDiagonal1 () {
                return this.initialHorizontal().map(
                    x => x * this.size + x
                )
            },

            initialDiagonal2 () {
                return this.initialDiagonal1().map(
                    x => (this.getRow(x) + 1) * this.size - this.getCol(x) - 1
                )
            },

            rightTo (columns) {
                return x => x + columns
            },

            downTo (rows) {
                return x => x + this.size * rows
            },

            shiftVertical (cellIdx) {
                let cellCol = this.getCol(cellIdx)
                return this.rightTo(cellCol)
            },

            shiftHorizontal (cellIdx) {
                let cellRow = this.getRow(cellIdx)
                return this.downTo(cellRow)
            },

            shiftDiagonal1 (cellIdx) {
                let cellRow = this.getRow(cellIdx)
                let cellCol = this.getCol(cellIdx)
                return this.downTo(cellRow - cellCol)
            },

            shiftDiagonal2 (cellIdx) {
                let cellRow = this.getRow(cellIdx)
                let cellCol = this.getCol(cellIdx)
                return this.downTo(cellRow - this.size + cellCol + 1)
            },

            lineBy (initial, ...funcs) {
                return (
                    initial
                    .map(flow(...funcs))
                    .filter(inRange(0, this.size * this.size))
                    .map(x => this.battlefield[x].value)
                    .join('')
                )
            },

            verticalLine (cellIdx) {
                return this.lineBy(
                    this.initialVertical(),
                    this.shiftVertical(cellIdx)
                )
            },

            horizontalLine (cellIdx) {
                return this.lineBy(
                    this.initialHorizontal(),
                    this.shiftHorizontal(cellIdx)
                )
            },

            diagonal1Line (cellIdx) {
                return this.lineBy(
                    this.initialDiagonal1(),
                    this.shiftDiagonal1(cellIdx)
                )
            },

            diagonal2Line (cellIdx) {
                return this.lineBy(
                    this.initialDiagonal2(),
                    this.shiftDiagonal2(cellIdx)
                )
            },

            checkWin (cellIdx) {
                return [
                    this.verticalLine(cellIdx),
                    this.horizontalLine(cellIdx),
                    this.diagonal1Line(cellIdx),
                    this.diagonal2Line(cellIdx)
                ].some(
                    includes(this.player.repeat(this.winSize))
                )
            },

            setLog (message, level=LOG_INFO, timeout=LOG_TIMEOUT) {
                this.log.push({ message, level })
                if (timeout) {
                    setTimeout(() => { this.log.shift() }, timeout)
                }
            },

            nextTurn () {
                this.players.push(this.players.shift())
            },

            setCell (cellIdx, value) {
                let cell = this.battlefield[cellIdx]

                if (!cell) {
                    this.setLog('Incorrect cell index', LOG_ERROR)
                    return false
                }

                if (cell.value !== N) {
                    this.setLog('The place is not empty', LOG_WARNING)
                    return false
                }

                cell.value = value
                return true
            },

            makeTurn (cellIdx) {
                if (this.finished) {
                    this.setLog('The game is finished', LOG_WARNING)
                    return
                }

                if (!this.setCell(cellIdx, this.player)) {
                    return
                }

                if (this.checkWin(cellIdx)) {
                    this.finished = true
                    this.setLog(`Player ${this.player} won!`, LOG_SUCCESS)
                    return
                }

                this.nextTurn()
            },

            newGame () {
                if (confirm('This game will be lost. Continue?')) {
                    this.finished = false
                    this.battlefield = null
                }
            }
        },

        components: { Battlefield, GameMenu, InfoPanel }
    }
</script>
