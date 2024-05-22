// Setup Backend
// Setup express
const express = require('express')
const app = express()
const port = 3000
// import
const router = require("./routes")

// convert json ke object javascript
app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})