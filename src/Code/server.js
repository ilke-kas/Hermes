const express = require('express');
const app = express();
const cors = require('cors');
//connect db
const db = require('./connection');
app.use(cors());
app.use(express.json());

app.listen(3001, function x() {
    console.log("server is running on port 3001");
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    var usertype= '';
    const newLogin = await db.query('SELECT * FROM "User" WHERE u_id = $1 AND password = $2', [email, password]);
    if (newLogin.rowCount != 0 ) {
        //find user type is it package manager
        const inPackageManager = await db.query('SELECT * FROM packagemanager WHERE u_id = $1 AND password = $2', [email, password]);
        if(inPackageManager.rowCount != 0){
            //direct to package manage home page
            usertype='packagemanager';
            console.log(usertype);
            res.json({isValid: true, userId: newLogin.rows[0].u_id ,userType: usertype});
        }
        else{
            const inShipper = await db.query('SELECT * FROM shipper WHERE u_id = $1 AND password = $2', [email, password]);
            if(inShipper.rowCount != 0){
                //direct to shipper home
                usertype='shipper';
                console.log(usertype);
                res.json({isValid: true, userId: newLogin.rows[0].u_id ,userType: usertype});
            }
            else{
                const inCourier = await db.query('SELECT * FROM courier WHERE u_id = $1 AND password = $2', [email, password]);
                if(inCourier.rowCount != 0){
                    //direct to courier page
                    usertype='courier';
                    console.log(usertype);
                    console.log( newLogin.rows[0].u_id);
                    res.json({isValid: true, userId: newLogin.rows[0].u_id ,userType: usertype});
                }
                else{
                    const inCorporate = await db.query('SELECT * FROM corporate WHERE u_id = $1 AND password = $2', [email, password]);
                    if(inCorporate.rowCount != 0){
                        //direct to corporate home page
                        usertype='corporate';
                        console.log(usertype);
                        res.json({isValid: true, userId: newLogin.rows[0].u_id ,userType: usertype});
                    }
                    else{
                        const inIndividual = await db.query('SELECT * FROM individual WHERE u_id = $1 AND password = $2', [email, password]);
                        if(inIndividual.rowCount != 0){
                            //direct to individual home page
                            usertype='individual';
                            console.log(usertype);
                            res.json({isValid: true, userId: newLogin.rows[0].u_id ,userType: usertype});
                        }
                        else{
                            console.log("There is an error");
                        }
                    }
                }
            }
        }
    }
    else {
        console.log("Try again");
        res.json(false);
    }
});


