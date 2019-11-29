'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IdsSchema extends Schema {
    up() {
        this.create('ids', (table) => {
            table.increments()
            table.enu('tyReg', ['HC', 'IT']).notNullable()
            table.string('PrtNum', 32).notNullable()
            table.string('SrlNum', 32).notNullable()
            table.string('PrtNm', 32).notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('ids')
    }
}

module.exports = IdsSchema