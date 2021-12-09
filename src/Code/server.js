const express = require('express');
const app = express();
const cors = require('cors');
//connect db
const db = require('./connection');
app.use(cors());
app.use(express.json());

//require route
//app.use("/",require('./login.js'))


app.listen(3001, function x() {
    console.log("server is running on port 3001");
})

app.post("/login", async (req, res) => {
    debugger;
    const {email, password} = req.body;
    const newLogin = await db.query('SELECT * FROM "User" WHERE u_id = $1 AND password = $2', [email, password]);
    debugger;
    if (newLogin.rowCount != 0 ) {
        console.log(newLogin.rows);
        res.json(newLogin.rows);
    }
    else {
        console.log("Try again");
        res.json(false);
    }
});


