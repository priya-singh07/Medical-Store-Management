const pool = require('../db_config/config');

module.exports.ADDSTOCKS = async (req, res) => {
    try {
        const { name, expiry_date, price, quantity } = req.body;
        if (!name || !price || !quantity) {
            return res.status(400).json({
                status: 0,
                message: "Missing required fields"
            })
        }
        let date;
        if(expiry_date) {
            date = expiry_date.slice(0,7)
        }
        const sql = 'INSERT INTO `medicines`(name, expiry_date, price, quantity) VALUES (?,?,?,?);';
        const bind = [name, date, price, quantity];
        const result = await pool.query(sql, bind);
        return res.status(200).json({
            status: 1,
            message: "Item added into stock list",
            result
        })
    } catch (error) {
        return res.status(500).json({
            status: 0,
            error: error.message
        })
    }
}

module.exports.GETALLSTOCKS = async (req, res) => {
    try {
        const sql = `SELECT * FROM medicines WHERE quantity>${0} ORDER BY id`;
        const result = await pool.query(sql);
        return res.status(200).json({
            status: 1,
            message: "All item fetched from stock list",
            result
        })
    } catch (error) {
        return res.status(500).json({
            status: 0,
            error: error.message
        })
    }
}

module.exports.GETONESTOCKS = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(200).json({
                status: 0,
                message: "Missing required fields"
            })
        }
        const sql = 'SELECT * FROM medicines WHERE id=?';
        const bind = [id];
        const result = await pool.query(sql, bind);
        return res.status(200).json({
            status: 1,
            message: "Item fetched from stock list",
            result
        })
    } catch (error) {
        return res.status(500).json({
            status: 0,
            error: error.message
        })
    }
}

module.exports.EDITSTOCKS = async (req, res) => {
    try {
        const { name, price, quantity, expiry_date } = req.body;
        const { id } = req.params;
        if (!name || !price || !quantity || !id || !expiry_date) {
            return res.status(200).json({
                status: 0,
                message: "Missing required fields"
            })
        }
        const sql = 'UPDATE `medicines` SET name=?, price=?, quantity=?, expiry_date=? WHERE id=?';
        const bind = [name, price, quantity, expiry_date, id];
        const result = await pool.query(sql, bind);
        return res.status(200).json({
            status: 1,
            message: "Item edited",
            result
        })
    } catch (error) {
        return res.status(500).json({
            status: 0,
            error: error.message
        })
    }
}

module.exports.DELETESTOCKS = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(200).json({
                status: 0,
                message: "Missing required fields"
            })
        }
        const sql = 'DELETE FROM medicines WHERE id=?';
        const bind = [id];
        const result = await pool.query(sql, bind);
        return res.status(200).json({
            status: 1,
            message: "Item deleted from stock list",
            result
        })
    } catch (error) {
        return res.status(500).json({
            status: 0,
            error: error.message
        })
    }
}
