'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CltbtlcSchema extends Schema {
    up() {
        this.create('cltbtlcs', (table) => {
            table.increments()
            table.string('tlTlcCode', 3)
            table.string('tlName', 35)
            table.string('tlVia', 3)
            table.enu('tlint', ['True', 'False']).defaultTo('False')
            table.enu('tlmain', ['True', 'False']).defaultTo('False')
            table.timestamps()
        })
    }

    down() {
        this.drop('cltbtlcs')
    }
}

module.exports = CltbtlcSchema