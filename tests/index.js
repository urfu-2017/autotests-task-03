import { mount } from 'vue-test-utils'
import Game from '../src/components/Game.vue'
import Vue from 'vue'
import { expect } from 'chai'


describe('Tic-tac-toe', () => {
    const getActualRows = (wrapper) => (
        wrapper.vm.rows.map(
            row => row.map(
                cell => cell.value
            )
        )
    )

    const checkRowsEqual = (wrapper, expectedRows) => (
        Vue.nextTick()
            .then(() => {
                const actualRows = getActualRows(wrapper)
                expect(actualRows).to.be.deep.equal(expectedRows)
            })
    )

    describe('battlefield build', () => {
        const examples = [{
            size: -10,
            expectedRows: [] 
        }, {
            size: 0,
            expectedRows: [] 
        }, {
            size: 3,
            expectedRows: [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ]
        }, {
            size: 4,
            expectedRows: [
                ['', '', '', ''],
                ['', '', '', ''],
                ['', '', '', ''],
                ['', '', '', ''],
            ]
        }]

        examples.forEach(({ size, expectedRows }) => {
            it(`should ${!expectedRows.length ? 'not' : ''} build ${size}x${size} battlefield`, () => {
                const wrapper = mount(Game)
                wrapper.setData({ size: size })
                return checkRowsEqual(wrapper, expectedRows)
            })
        })
    })

    describe('cell set', () => {
        const wrapper = mount(Game)
        wrapper.setData({ size: 2 })

        const expectedRows = [
            ['VALUE0', 'VALUE1'],
            [      '', 'VALUE3']
        ]

        it(`should set cell if empty`, () => {
            wrapper.vm.setCell(0, 'VALUE0')
            wrapper.vm.setCell(1, 'VALUE1')
            wrapper.vm.setCell(3, 'VALUE3')
            return checkRowsEqual(wrapper, expectedRows)
        })

        it(`should not set cell if not empty`, () => {
            wrapper.vm.setCell(0, 'NEW_VALUE0')
            return checkRowsEqual(wrapper, expectedRows)
        })

        it(`should not set cell if out of range`, () => {
            wrapper.vm.setCell(4, 'OUT_OF_RANGE')
            return checkRowsEqual(wrapper, expectedRows)
        })
    })

    describe('line get', () => {
        const examples = [{
            size: 3,
            lines: [{
                vertical: '036',
                horizontal: '012',
                diagonal1: '048',
                diagonal2: '0'
            }, {
                vertical: '147',
                horizontal: '012',
                diagonal1: '15',
                diagonal2: '13'
            }, {
                vertical: '258',
                horizontal: '012',
                diagonal1: '2',
                diagonal2: '246'
            }, {
                vertical: '036',
                horizontal: '345',
                diagonal1: '37',
                diagonal2: '13'
            }, {
                vertical: '147',
                horizontal: '345',
                diagonal1: '048',
                diagonal2: '246'
            }, {
                vertical: '258',
                horizontal: '345',
                diagonal1: '15',
                diagonal2: '57'
            }, {
                vertical: '036',
                horizontal: '678',
                diagonal1: '6',
                diagonal2: '246'
            }, {
                vertical: '147',
                horizontal: '678',
                diagonal1: '37',
                diagonal2: '57'
            }, {
                vertical: '258',
                horizontal: '678',
                diagonal1: '048',
                diagonal2: '8'
            }]
        }]

        examples.forEach(({ size, lines }) => {
            const wrapper = mount(Game)
            wrapper.setData({ size: size })

            Vue.nextTick(() => {
                wrapper.vm.battlefield.forEach(cell => {
                    wrapper.vm.setCell(cell.index, cell.index)
                })
            })

            lines.forEach((line, idx) => {
                it(`should return correct vertical line for ${size}x${size} at idx ${idx}`, () => {
                    const actualLine = wrapper.vm.verticalLine(idx)
                    expect(actualLine).to.be.equal(line.vertical)
                })

                it(`should return correct horizontal line for ${size}x${size} at idx ${idx}`, () => {
                    const actualLine = wrapper.vm.horizontalLine(idx)
                    expect(actualLine).to.be.equal(line.horizontal)
                })

                it(`should return correct diagonal1 line for ${size}x${size} at idx ${idx}`, () => {
                    const actualLine = wrapper.vm.diagonal1Line(idx)
                    expect(actualLine).to.be.equal(line.diagonal1)
                })

                it(`should return correct diagonal2 line for ${size}x${size} at idx ${idx}`, () => {
                    const actualLine = wrapper.vm.diagonal2Line(idx)
                    expect(actualLine).to.be.equal(line.diagonal2)
                })
            })
        })
    })

    describe('win check', () => {
        const examples = [{
            seq: [0, 3, 1, 4, 2],
            winner: 'X'
        }, {
            seq: [0, 3, 1, 4, 6, 5],
            winner: 'O'
        }]

        examples.forEach(({ seq, winner }) => {
            it(`should admit ${winner} as a winner for seq ${seq}`, () => {
                const wrapper = mount(Game)
                wrapper.setData({ size: 3, winSize: 3 })
        
                return Vue.nextTick()
                    .then(() => {
                        seq.forEach(cellIdx => {
                            wrapper.vm.makeTurn(cellIdx)
                        })
                    })
                    .then(() => {
                        expect(wrapper.vm.finished).to.be.true
                        expect(wrapper.vm.player).to.be.equal(winner)
                    })
            })
        })
    })
})
