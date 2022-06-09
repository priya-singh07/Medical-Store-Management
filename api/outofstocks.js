const pool = require('../db_config/config');

module.exports.ADDSTOCKS = async (req,res) => {
    try {
        const { name, price } = req.body;
        if(!name || !price) {
            return res.status(200).json({
                status: 0,
                message: "Missing required fields"
            })
        }
        const quantity = 0;
        const sql = 'INSERT INTO `medicines`(name, price, quantity) VALUES(?,?,?);';
        const bind = [name, price, quantity];
        const result = await pool.query(sql, bind);
        return res.status(200).json({
            status: 1,
            message: "Item added",
            result
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 0,
            error: error.message
        })
    }
}

module.exports.GETALLSTOCKS = async (req,res) => {
    try {
        const sql = 'SELECT * FROM medicines WHERE quantity=0;';
        const result = await pool.query(sql);
        return res.status(200).json({
            status: 1,
            message: "All item fetched from out of stock list",
            result
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 0,
            error: error.message
        })
    }
}

module.exports.GETONESTOCKS = async (req,res) => {
    try {
        const { id } = req.params;
        if(!id) {
            return res.status(200).json({
                status: 0,
                message: "Missing required fields"
            })
        }
        const sql = 'SELECT * FROM medicines WHERE id=?;';
        const bind = [id];
        const result = await pool.query(sql, bind);
        return res.status(200).json({
            status: 1,
            message: "Item fetched from out of stock list",
            result
        })
    } catch (error) {
        return res.status(500).json({
            status: 0,
            error: error.message
        })
    }
}

module.exports.EDITSTOCKS = async(req,res) => {
    try {
        const { name, price, expiry_date } = req.body;
        const { id } = req.params;
        if(!name || !id || !price) {
            return res.status(200).json({
                status: 0,
                message: "Missing required fields"
            })
        }
        const sql = 'UPDATE `medicines` SET name=?, price=?, expiry_date=? WHERE id=?;';
        const bind = [name, price, expiry_date, id];
        const result = await pool.query(sql, bind);
        return res.status(200).json({
            status: 1,
            message: "Item edited",
            result
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 0,
            error: error.message
        })
    }
}

module.exports.DELETESTOCKS = async (req,res) => {
    try {
        const { id } = req.params;
        if(!id) {
            return res.status(200).json({
                status: 0,
                message: "Missing required fields"
            })
        }
        const sql = 'DELETE FROM medicines WHERE id=?;';
        const bind = [id];
        const result = await pool.query(sql, bind);
        return res.status(200).json({
            status: 1,
            message: "Item deleted from out of stock list",
            result
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 0,
            error: error.message
        })
    }
}
