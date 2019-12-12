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
            .raw('SELECT id, tyReg, SrlNum as value FROM ids')
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
        post.tyReg = request.input('tyReg1')
        post.Address = request.input('Address')
        post.City = request.input('City')
        post.tlc = request.input('tlc')
        post.lat = request.input('lat')
        post.lng = request.input('lng')

        await post.save()
        return response.status(202).json({ "message": "Check Point Berhasil" })
    }


    async hosted({ request, response, view }) {
        return view.render('hosted');
    }

    async showtlc({ params, request, response, view }) {
        let hasil = await Database
            .raw('SELECT tlTlcCode FROM cltbtlcs WHERE tlName = ?', params.tlName);
        return response.json(hasil);
    }

    async showtyReg({ params, request, response, view }) {
        let records = await Database
            .raw('SELECT tyReg FROM ids WHERE SrlNum = ?', params.SrlNum);
        return response.json(records);
    }

    async showgraph1({ params, response }) {
        let value = await Database
            .raw('SELECT tlc, COUNT(id) AS jumlah FROM positions WHERE created_at BETWEEN "' + params.date + ' 00:00:00" AND "' + params.date + ' 23:58:00" GROUP BY tlc LIMIT 10')
        var datee = value[0]
        return response.json(datee);
    }

    async showgraph2({ response }) {
        let value = await Database
            .raw('SELECT * from (SELECT COUNT(case when tyReg = "HC" THEN 1 ELSE null END) \
            AS HC \
            ,  COUNT(case when tyReg = "IT"  THEN 1 ELSE null END) AS IT, tlc from positions\
            group by tlc ) AS test WHERE IT AND HC IS NOT NULL LIMIT 10')

        var record = value[0]
        return response.json(record)
    }

    async showgraphdef({ response }) {
        var d = new Date();
        var curtime = (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())
        let value1 = await Database
            .raw('SELECT tlc, COUNT(id) AS jumlah FROM positions WHERE created_at BETWEEN "' + curtime + ' 00:00:00" AND "' + curtime + ' 23:58:00" GROUP BY tlc LIMIT 10')
        var dateee = value1[0]
        return response.json(dateee);

    }

}


module.exports = IdController