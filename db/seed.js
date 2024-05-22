const pool = require("../config/config.js");
const fs = require("fs");

const productSql = fs.readFileSync("./db/product.sql", {encoding: "utf-8"});
const colorSql = fs.readFileSync("./db/color.sql", {encoding: "utf-8"});

pool.query(productSql, (err, result) => {
    if(err) {
        console.log(err)
    } else {

        pool.query(colorSql, (err, result) => {
            if(err) {
                console.log(err)
            } else {
                console.log("seeding successfull");
                pool.end();
            }
        })
    }
})