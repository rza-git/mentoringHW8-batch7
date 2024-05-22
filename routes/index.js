// LIST URL menggunakan router dari express.js
const express = require("express");
const router = express.Router();
const pool = require("../config/config.js")

// RESTFUL API
// GET => list data
// POST => create data baru
// PUT => update data
// DELETE => delete data


// List Products
// Route handler
//  ==> req = request DAN res = response
router.get("/products", (req, res) => {
    const {color} = req.query
    
    let filterOption = ""
    if(color) {
        filterOption = `WHERE colors.title = '${color}'`
    }

    const sql = `
        SELECT
            products.*,
            ARRAY_AGG(
                JSONB_BUILD_OBJECT(
                    'id', colors.id,
                    'title', colors.title,
                    'quantity', colors.quantity,
                    'created_at', colors.created_at,
                    'updated_at', colors.updated_at
                )
            ) AS colors
        FROM
            products
        INNER JOIN colors
            ON products.id = colors.product_id
        ${filterOption}
        GROUP BY
            products.id
    `

    pool.query(sql, (err, result) => {
        if(err) {
            console.log(err)
        } else {
           
            // res.status(200).json(result.rows)
            res.status(200).json(result.rows);
        }
    })
})

// Get Detail Product
// Satuan

// ARRAY_AGG ==> menampilkan array
// JSONB_BUILD_OBJECT => CREATE OBJECT
router.get("/products/:id", (req, res) => {
    const id = req.params.id;
   
    const sql = `
        SELECT
            products.*,
            ARRAY_AGG(
                JSONB_BUILD_OBJECT(
                    'id', colors.id,
                    'title', colors.title,
                    'quantity', colors.quantity,
                    'created_at', colors.created_at,
                    'updated_at', colors.updated_at
                )
            ) AS colors
        FROM 
            products
        INNER JOIN colors
            ON products.id = colors.product_id
        WHERE 
            products.id = ${id}
        GROUP BY
            products.id
    `

    pool.query(sql, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.status(200).json(result.rows[0])
        }
    })
})

// Create product baru
router.post("/products", (req, res) => {
    const {title, sku} = req.body;
    const sql = `
        INSERT INTO products(title, sku)
            VALUES
                ('${title}', '${sku}')
    `

    pool.query(sql, (err, result) => {
        if(err) {
            console.log(err)
        } else {

            res.status(201).json({message: "Data inserted succesfully"})
        }
    })
})



module.exports = router;