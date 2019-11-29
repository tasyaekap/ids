'use strict'
const Ids = use('App/Models/Id')
const Post = use('App/Models/Position')
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with ids
 */
class IdController {
    /**
     * Show a list of all ids.
     * GET ids
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
        let ids = await Database
            .raw('SELECT id, SrlNum as value FROM ids')
        var data = ids[0]

        return response.json(data)
    }

    /**
     * Render a form to be used for creating a new id.
     * GET ids/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {}

    /**
     * Create/save a new id.
     * POST ids
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
        const ids = new Ids()

        ids.tyReg = request.input('tyReg')
        ids.PrtNum = request.input('PrtNum')
        ids.SrlNum = request.input('SrlNum')
        ids.PrtNm = request.input('PrtNm')

        await ids.save()
    }

    /**
     * Display a single id.
     * GET ids/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {}

    /**
     * Render a form to update an existing id.
     * GET ids/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {}

    /**
     * Update id details.
     * PUT or PATCH ids/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {}

    /**
     * Delete a id with id.
     * DELETE ids/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {}

    async showlat({ response, view }) {
        let lat = await Database
            .raw('SELECT t.id, t.SrlNum AS value, t.Address, t.lat, t.lng\
            from positions t\
            inner join (\
                select SrlNum, max(created_at) as MaxDate\
                from positions\
                group by SrlNum\
            ) tm on t.SrlNum = tm.SrlNum and t.created_at = tm.MaxDate')

        const lattest = lat[0]
        return response.json(lattest)

    }

    async storenew({ request, response }) {
        const post = new Post()

        post.SrlNum = request.input('SrlNum1')
        post.Address = request.input('Address')
        post.lat = request.input('lat')
        post.lng = request.input('lng')

        await post.save()
        return response.status(202).json({ "message": "Check Point Berhasil" })
    }


    async hosted({ request, response, view }) {
        return view.render('hosted');
    }

}


module.exports = IdController