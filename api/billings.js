const pool = require('../db_config/config');
const val = require('../helpers/calculation');

module.exports.ADDBILL = async(req,res) => {
    try {
        const { med_id, name, invoice_id, cgst, sgst, quantity, price, discount, refno, rate, amount, expiry_date } = req.body;
        if(!med_id || !invoice_id || !quantity || !price || !rate ||!amount || !refno) {
            return res.status(400).json({
                status: 0,
                message: "Missing required fields"
            })
        }
        const sql = `INSERT INTO bills(med_id, name, invoice_id, quantity, price, discount, cgst, sgst, refno, rate, amount, expiry_date) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`
        const bind = [med_id, name, invoice_id, quantity, price, discount, cgst, sgst, refno, rate, amount, expiry_date];
        const result = await pool.query(sql,bind);
        return res.status(200).json({
            status: 1,
            message: "Item added into the cart",
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

module.exports.GETBILLFROMINVOICE = async(req,res) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM bills WHERE invoice_id=?';
        const result = await pool.query(sql,[id]);
        return res.status(200).json({
            status: 1,
            message: "Bill details fetched",
            result
        })
    } catch (error) {
        return res.status(500).json({
            status: 0,
            error: error.message
        })
    }
}

module.exports.GETALLBILLS = async(req,res) => {
    try {
        const sql = 'SELECT * FROM bills';
        const result = await pool.query(sql);
        return res.status(200).json({
            status: 1,
            message: "All bills fetched",
            result
        })
    } catch (error) {
        return res.status(500).json({
            status: 0,
            error: error.message
        })
    }
}

module.exports.EDITBILL = async(req,res) => {
    try {
        const { medicine, quantity, price, batch, name, discount, gst } = req.body;
        if(!medicine || !quantity || !price || !batch || !name || !discount || !gst) {
            return res.status(200).json({
                status: 0,
                message: "Missing required fields"
            })
        }
        const amount = val(price, quantity, discount, gst);
        const sql = 'UPDATE bills SET name=?, medicine=?, price=?, quantity=?, discount=?, gst=?, batch=?, amount=?';
        const bind = [name, medicine, price, quantity, discount, gst, batch, amount];
        const result = await pool(sql, bind);
        return res.status(200).json({
            status: 1,
            message: "Bill updated successfully",
            result
        })
    } catch (error) {
        return res.status(500).json({
            status: 0,
            error: error.message
        })
    }
}

module.exports.DELETEBILL = async(req,res) => {
    try {
        const { id } = req.params;
        const sql = 'DELETE FROM bills WHERE id=?';
        const result = await pool.query(sql,[id]);
        return res.status(200).json({
            status: 1,
            message: "Bill deleted successfully",
            result
        })
    } catch (error) {
        return res.status(500).json({
            status: 0,
            error: error.message
        })
    }
}

module.exports.GETPRICEBYID = async(req,res) => {
    try {
        const { id } = req.params;
        if(!id) {
            return res.status(400).json({
                status: 0,
                message: "Missing required fields"
            })
        }
        const sql = `SELECT * from medicines WHERE id=?`;
        const result = await pool.query(sql, [id]);
        return res.status(200).json({
            status: 1,
            message: "Details fetched successfully",
            price: result[0].price,
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

module.exports.GETDETAILSBYNAME = async(req,res) => {
    try {
        const { name } = req.params;
        if(!name) {
            return res.status(400).json({
                status: 0,
                message: "Missing required fields"
            })
        }
        const sql = `SELECT * from medicines WHERE name=?`;
        const result = await pool.query(sql, [name]);
        return res.status(200).json({
            status: 1,
            message: "Details fetched successfully",
            price: result[0].price,
            id: result[0].id,
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

// module.exports.ADDBILL = async(req,res) => {
//     try {
//         const { medicine, quantity, price, batch, name, discount, gst } = req.body;
//         if(!medicine || !quantity || !price || !batch || !name || !discount || !gst) {
//             return res.status(200).json({
//                 status: 0,
//                 message: "Missing required fields"
//             })
//         }
//         const amount = val(price, quantity, discount, gst);
//         const sql = 'INSERT INTO bills(name, medicine, quantity, price, discount, gst, batch, amount) ADD VALUES(?,?,?,?,?,?,?,?)'
//         const bind = [name, medicine, quantity, price, discount, gst, batch, amount];
//         const result = await pool(sql, bind);
//         return res.status(200).json({
//             status: 1,
//             message: "Bill created successfully",
//             result
//         })
//     } catch (error) {
//         return res.status(500).json({
//             status: 0,
//             error: error.message
//         })
//     }
// }