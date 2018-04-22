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

    import _ from 'lodash'

    const X = 'X'
    const O = 'O'
    const N = ''

    const LOG_TIMEOUT = 2 * 1000
    const LOG_INFO = 'info'
    const LOG_ERROR = 'error'
    const LOG_WARNING = 'warning'
    const LOG_SUCCESS = 'success'

    const DEFAULT_SIZE = 3
    const PLAYERS = [X, O]


    export default {
        data () {
            return {
                log: [],
                size: DEFAULT_SIZE,
                players: PLAYERS,
                battlefield: this.generateBattlefield(DEFAULT_SIZE)
            }
        },

        computed: {
            rows: function () {
                return _.chunk(this.battlefield, this.size)
            },

            player: function () {
                return this.players[0]
            }
        },

        methods: {
            generateBattlefield: function (size) {
                return (
                    _.times(size * size, _.constant(N))
                    .map((value, index) => ({ value, index }))
                )
            },

            setLog: function (message, level=LOG_INFO, timeout=LOG_TIMEOUT) {
                this.log.push({ message, level })
                if (timeout) {
                    setTimeout(() => { this.log.shift() }, timeout)
                }
            },

            nextTurn: function () {
                this.players.push(this.players.shift())
            },

            makeTurn: function (cellIdx) {
                let cell = this.battlefield[cellIdx]

                if (cell.value !== N) {
                    this.setLog('Place is occupied', LOG_WARNING)
                    return
                }

                cell.value = this.player
                this.nextTurn()
            },

            newGame: function () {
                if (confirm('This game will be lost. Continue?')) {
                    this.battlefield = this.generateBattlefield(this.size)
                }
            }
        },

        components: { Battlefield, GameMenu, InfoPanel }
    }
</script>
