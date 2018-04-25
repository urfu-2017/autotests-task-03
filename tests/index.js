import { mount } from 'vue-test-utils'
import Game from '../src/components/Game.vue'
import Vue from 'vue'
import { expect } from 'chai'


describe('Tic-tac-toe', () => {
    describe('battlefield building', () => {
        let examples = [{
            size: 3,
            rows: [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ]
        }, {
            size: 4,
            rows: [
                ['', '', '', ''],
                ['', '', '', ''],
                ['', '', '', ''],
                ['', '', '', ''],
            ]
        }]

        examples.forEach(({ size, rows }) => {
            it(`should build correct ${size}x${size} battlefield`, () => {
                const wrapper = mount(Game)
                wrapper.setData({ size: size })

                Vue.nextTick(() => {
                    let actualRows = wrapper.vm.rows.map(
                        row => row.map(
                            cell => cell.value
                        )
                    )

                    expect(actualRows).to.be.deep.equal(rows)
                })
            })
        })
    })
})
