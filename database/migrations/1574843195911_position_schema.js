'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PositionSchema extends Schema {
    up() {
        this.create('positions', (table) => {
            table.increments()
            table.string('SrlNum', 32).notNullable()
            table.enu('tyReg', ['HC', 'IT']).notNullable()
            table.string('Address', 100).notNullable()
            table.string('City', 30).notNullable()
            table.string('tlc', 3).notNullable()
            table.decimal('lat', 9, 6).notNullable()
            table.decimal('lng', 9, 6).notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('positions')
    }
}

module.exports = PositionSchema