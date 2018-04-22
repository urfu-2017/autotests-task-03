<template>
    <table class="battlefield">
        <tr class="battlefield__row"
            v-for="(row, rowIdx) in rows" :key="rowIdx">
            <td class="battlefield__cell"
                v-for="(cell, cellIdx) in row" :key="cellIdx"
                @click="makeTurn(cell.index)">
                <cell :value="cell.value"/>
            </td>
        </tr>
    </table>
</template>

<script>
    import Cell from './Cell.vue'

    export default {
        components: { Cell },
        props: ['rows', 'makeTurn']
    }
</script>

<style lang="stylus">
    .battlefield__cell {
        width 50px
        height 50px
        text-align center
        vertical-align middle
        line-height 50px
        border 1px solid #333

        :hover {
            cursor pointer
            background #eee
        }
    }
</style>
