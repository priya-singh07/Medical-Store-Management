const res = require('express/lib/response');
const pool = require('../db_config/config');

module.exports.ADDINVOICE = async (req, res) => {
    try {
        const { cust_name, cust_contact, cust_address, seller_name, seller_contact, seller_address } = req.body;
        if (!cust_name || !cust_contact || !seller_address || !seller_contact || !seller_name) {
            return res.status(400).json({
                status: 0,
                message: "Required fields missing",
            })
        }
        let sql;
        let bind;
        if (cust_address === '' || !cust_address) {
            sql = `INSERT INTO invoice(cust_name, cust_contact, seller_name, seller_contact, seller_address) VALUES(?,?,?,?,?)`;
            bind = [cust_name, cust_contact, seller_name, seller_contact, seller_address];
        }
        else {
            sql = `INSERT INTO invoice(cust_name, cust_contact, cust_address, seller_name, seller_contact, seller_address) VALUES(?,?,?,?,?,?)`;
            bind = [cust_name, cust_contact, cust_address, seller_name, seller_contact, seller_address];
        }
        const result = await pool.query(sql, bind);
        return res.status(200).json({
            status: 1,
            message: "New invoice record added",
            insertedId: result.insertId,
            result
        })
    } catch (error) {
        return res.status(500).json({
            status: 0,
            error
        })
    }
}

module.exports.GETALLINVOICES = async (req, res) => {
    try {
        let sql = `SELECT * FROM invoice ORDER BY id DESC`;
        const result = await pool.query(sql);
        return res.status(200).json({
            status: 1,
            message: "Invoices fetched",
            result
        })
    } catch (error) {
        return res.status(500).json({
            status: 0,
            error
        })
    }
}

module.exports.EDITINVOICE = async (req, res) => {
    try {
        const { id, cust_name, cust_contact, cust_address, seller_name, seller_contact, seller_address } = req.body;
        if (!id || !cust_name || !cust_contact || !seller_address || !seller_contact || !seller_name) {
            return res.status(400).json({
                status: 0,
                message: "Required fields missing",
            })
        }
        let sql;
        let bind;
        if (cust_address === '' || !cust_address) {
            sql = `UPDATE invoice SET cust_name=?, cust_contact=?, seller_name=?, seller_contact=?, seller_address=? WHERE id=?`;
            bind = [cust_name, cust_contact, seller_name, seller_contact, seller_address, id];
        }
        else {
            sql = `UPDATE invoice SET cust_name=?, cust_contact=?, cust_address=?, seller_name=?, seller_contact=?, seller_address=? WHERE id=?`;
            bind = [cust_name, cust_contact, cust_address, seller_name, seller_contact, seller_address, id];
        }
        const result = await pool.query(sql, bind);
        return res.status(200).json({
            status: 1,
            message: "Invoice record edited",
            result
        })
    } catch (error) {
        return res.status(500).json({
            status: 0,
            error
        })
    }
}