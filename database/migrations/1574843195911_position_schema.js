'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PositionSchema extends Schema {
    up() {
        this.create('positions', (table) => {
            table.increments()
            table.string('SrlNum', 32).notNullable()
            table.string('Address', 100).notNullable()
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