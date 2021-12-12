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

app.post("/login", async (req, res, next) => {
    try {
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
} catch (err) {
    next(err);
}
});

app.post("/registerIndividual", async (req, res) => {
    const {userid,email,name,phone,password,street,aptnumber,city,state,zip} = req.body;
    //Validations
    var validationUserId;
    var validationEmail;
    var validationPhone;
    //validateUserId(userid){
        const searcheduser = await db.query('SELECT * FROM "User"* WHERE u_id = $1', [userid]);
        if(searcheduser.rowCount != 0){
            validationUserId=  false;
        }
        else{
            validationUserId= true;
        }
    
    //validateEmail(email)
        const searcheduser2 = await db.query('SELECT * FROM "User"* WHERE email = $1', [email]);
        if(searcheduser2.rowCount != 0){
            validationEmail = false;
        }
        else{
            validationEmail= true;
        }
    
    //validatePhone
        const searcheduser3 = await db.query('SELECT * FROM "User"* WHERE phone = $1', [phone]);
        if(searcheduser3.rowCount != 0){
            validationPhone = false;
        }
        else{
            validationPhone = true;
        }
    //validation of unique userid,email and phone
    if(validationUserId){
        if(validationEmail){
            if(validationPhone){
                //finally insert into  individual table
                const newRegisterIndividual = await db.query('INSERT INTO individual (u_id, name, email, password, phone,city,street,apt_number,state,zip,point) VALUES($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11)', [userid, name, email, password,phone,city,street,aptnumber,state,zip,0]);
                res.json({isValid: true, type: ""});
            }
            else{
                //error phone
                console.log("Please write another phone number");
                res.json({isValid: false, type: "phone"});
            }
        }
        else{
            //error email
            console.log("Please write another email");
            res.json({isValid: false, type: "email"});
        }
    }
    else{
        //error user is
        console.log("Please write another user id");
        res.json({isValid: false, type: "userid"});
    }
});

app.post("/registerCorporate", async (req, res) => {
    const {userid,email,name,phone,password,street,aptnumber,city,state,zip} = req.body;
    //Validations
    var validationUserId;
    var validationEmail;
    var validationPhone;
    //validateUserId(userid){
        const searcheduser = await db.query('SELECT * FROM "User"* WHERE u_id = $1', [userid]);
        if(searcheduser.rowCount != 0){
            validationUserId=  false;
        }
        else{
            validationUserId= true;
        }
    
    //validateEmail(email)
        const searcheduser2 = await db.query('SELECT * FROM "User"* WHERE email = $1', [email]);
        if(searcheduser2.rowCount != 0){
            validationEmail = false;
        }
        else{
            validationEmail= true;
        }
    
    //validatePhone
        const searcheduser3 = await db.query('SELECT * FROM "User"* WHERE phone = $1', [phone]);
        if(searcheduser3.rowCount != 0){
            validationPhone = false;
        }
        else{
            validationPhone = true;
        }
    //validation of unique userid,email and phone
    if(validationUserId){
        if(validationEmail){
            if(validationPhone){
                //finally insert into  individual table
                const newRegisterCorporate = await db.query('INSERT INTO corporate (u_id, name, email, password, phone,city,street,apt_number,state,zip,budget) VALUES($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11)', [userid, name, email, password,phone,city,street,aptnumber,state,zip,0]);
                res.json({isValid: true, type: ""});
            }
            else{
                //error phone
                console.log("Please write another phone number");
                res.json({isValid: false, type: "phone"});
            }
        }
        else{
            //error email
            console.log("Please write another email");
            res.json({isValid: false, type: "email"});
        }
    }
    else{
        //error user is
        console.log("Please write another user id");
        res.json({isValid: false, type: "userid"});
    }
});

app.post("/registerPackageManager", async (req, res) => {
    const {userid,email,name,phone,password,branchid} = req.body;
    //Validations
    var validationUserId;
    var validationEmail;
    var validationPhone;
    var validationBranchId;
    //validateUserId(userid){
        const searcheduser = await db.query('SELECT * FROM "User"* WHERE u_id = $1', [userid]);
        if(searcheduser.rowCount != 0){
            validationUserId=  false;
        }
        else{
            validationUserId= true;
        }
    
    //validateEmail(email)
        const searcheduser2 = await db.query('SELECT * FROM "User"* WHERE email = $1', [email]);
        if(searcheduser2.rowCount != 0){
            validationEmail = false;
        }
        else{
            validationEmail= true;
        }
    
    //validatePhone
        const searcheduser3 = await db.query('SELECT * FROM "User"* WHERE phone = $1', [phone]);
        if(searcheduser3.rowCount != 0){
            validationPhone = false;
        }
        else{
            validationPhone = true;
        }
    //validate branchid
    const searchedbranch4 = await db.query('SELECT * FROM branch WHERE b_id = $1', [branchid]);
    if(searchedbranch4.rowCount != 0){
        validationBranchId = true;
    }
    else{
        validationBranchId = false;
    }
    //validation of unique userid,email,phone and branchid
    if(validationUserId){
        if(validationEmail){
            if(validationPhone){
                if(validationBranchId){
                 const newRegisterPackageManager = await db.query('INSERT INTO packagemanager (u_id, name, email, password, phone,b_id, salary) VALUES($1, $2, $3, $4,$5,$6,$7)', [userid, name, email, password,phone,branchid, 1000]);
                //update the employee num by one on that branch
                //get the employee num on that branch
                var someVar2 =[];
                var empNum;
                db.query('SELECT * FROM branch WHERE b_id = $1', [branchid], function(err,rows){
                   if(err){
                       console.log("err");
                   }
                   else{
                       setValue2(rows);
                   }
                });
               async function setValue2(value){
                   someVar2 = value;
                   empNum = someVar2.rows[0].employee_num;
                   console.log("in validations2");
                   console.log(empNum);
                   empNum = empNum + 1;
                   const updateEmployeeNum = await db.query("UPDATE branch SET employee_num = $1 WHERE b_id = $2", [empNum, branchid]);
                   res.json({isValid: true, type: ""});
                 }
                }
                else{
                    //error branch
                    console.log("This branch does not exist");
                    res.json({isValid: false, type: "branchid"});
                }
            }
            else{
                //error phone
                console.log("Please write another phone number");
                res.json({isValid: false, type: "phone"});
            }
        }
        else{
            //error email
            console.log("Please write another email");
            res.json({isValid: false, type: "email"});
        }
    }
    else{
        //error user is
        console.log("Please write another user id");
        res.json({isValid: false, type: "userid"});
    }
});

app.post("/registerShipper", async (req, res) => {
    const {userid,email,name,phone,password,vehicleid} = req.body;
    //Validations
    var validationUserId;
    var validationEmail;
    var validationPhone;
    var validationVehicleId;
     //validateUserId(userid){
    const searcheduser = await db.query('SELECT * FROM "User"* WHERE u_id = $1', [userid]);
    if(searcheduser.rowCount != 0){
        validationUserId=  false;
    }
    else{
        validationUserId= true;
    }
     
    //validateEmail(email)
    const searcheduser2 = await db.query('SELECT * FROM "User"* WHERE email = $1', [email]);
    if(searcheduser2.rowCount != 0){
        validationEmail = false;
    }
    else{
        validationEmail= true;
    }
    //validatePhone
    const searcheduser3 = await db.query('SELECT * FROM "User"* WHERE phone = $1', [phone]);
    if(searcheduser3.rowCount != 0){
        validationPhone = false;
    }
    else{
        validationPhone = true;
    }
    //validateVehicleId
    const searchedvehicle4 = await db.query('SELECT * FROM vehicle* WHERE v_id = $1', [vehicleid]);
     if(searchedvehicle4.rowCount != 0){
        validationVehicleId = true;
    }
    else{
        validationVehicleId = false;
    }
    //validation of unique userid,email and phone
    if(validationUserId){
        if(validationEmail){
            if(validationPhone){
                if(validationVehicleId){
                    const newRegisterShipper = await db.query('INSERT INTO shipper (u_id, name, email, password, phone,v_id,salary) VALUES($1, $2, $3, $4,$5,$6,$7)', [userid, name, email, password,phone,vehicleid,1500]);
                    res.json({isValid: true, type: ""});
                }
                else{
                    //error phone
                    console.log("This branch does not exist");
                    res.json({isValid: false, type: "branchid"});
                }
            }
            else{
                //error phone
                console.log("Please write another phone number");
                res.json({isValid: false, type: "phone"});
            }
        }
        else{
            //error email
            console.log("Please write another email");
            res.json({isValid: false, type: "email"});
        }
    }
    else{
        //error user is
        console.log("Please write another user id");
        res.json({isValid: false, type: "userid"});
    }
});

app.post("/registerCourier", async (req, res) => {
    const {userid,email,name,phone,password,vehicleid,branchid} = req.body;
    //validation of unique userid,email and phone
    //Validations
    var validationUserId;
    var validationEmail;
    var validationPhone;
    var validationVehicleId;
    var validationBranchId;
    //validateUserId(userid){
    const searcheduser = await db.query('SELECT * FROM "User"* WHERE u_id = $1', [userid]);
    if(searcheduser.rowCount != 0){
        validationUserId=  false;
    }
    else{
        validationUserId= true;
    }    
    //validateEmail(email)
    const searcheduser2 = await db.query('SELECT * FROM "User"* WHERE email = $1', [email]);
    if(searcheduser2.rowCount != 0){
        validationEmail = false;
    }
    else{
        validationEmail= true;
    }
    //validatePhone
    const searcheduser3 = await db.query('SELECT * FROM "User"* WHERE phone = $1', [phone]);
    if(searcheduser3.rowCount != 0){
        validationPhone = false;
    }
    else{
        validationPhone = true;
    }
    //validate vehicleid
    const searchedbranch4 = await db.query('SELECT * FROM vehicle* WHERE v_id = $1', [vehicleid]);
    if(searchedbranch4.rowCount != 0){
        validationVehicleId = true;
    }
    else{
        validationVehicleId = false;
    }
    //validate branchid
    const searchedbranch5 = await db.query('SELECT * FROM branch WHERE b_id = $1', [branchid]);
    if(searchedbranch5.rowCount != 0){
        validationBranchId = true;
    }
    else{
        validationBranchId = false;
    }
    //validate from courier vehicle table that vehicle in that branch

     //validation of unique userid,email and phone
    if(validationUserId){
        if(validationEmail){
            if(validationPhone){
                if(validationBranchId){
                    if(validationVehicleId){
                    const newRegisterCourier = await db.query('INSERT INTO courier (u_id, name, email, password, phone,v_id,b_id, salary) VALUES($1, $2, $3, $4,$5,$6,$7,$8)', [userid, name, email, password,phone,vehicleid,branchid, 800]);
                    //get the capacity of vehicle before delete it
                       //update the employee num by one on that branch
                       //find the branch id of that vehicle
                       //get the employee num on that branch
                        var someVar2 =[];
                        db.query('SELECT * FROM branch WHERE b_id = $1', [branchid], function(err,rows){
                        if(err){
                           console.log("err");
                        }
                        else{
                           setValue2(rows);
                        }
                        async function setValue2(value){
                        someVar2 = value;
                        empNum = someVar2.rows[0].employee_num;
                        console.log("in validations2");
                        console.log(empNum);
                        empNum = empNum + 1;
                        const updateEmployeeNum = await db.query("UPDATE branch SET employee_num = $1 WHERE b_id = $2", [empNum, branchid]);
                        res.json({isValid: true, type: ""});
                    }
                });  
    }
    else{
            //error vehicle
            console.log("This vehicle does not exist");
            res.json({isValid: false, type: "vehicleid"});

        }
    }
    else{
            //error phone
            console.log("This branch does not exist");
            res.json({isValid: false, type: "branchid"});
        }
    }   
    else{
            //error phone
            console.log("Please write another phone number");
            res.json({isValid: false, type: "phone"});
        }
    }
    else{
            //error email
            console.log("Please write another email");
            res.json({isValid: false, type: "email"});
        }
    }
    else{
        //error user is
        console.log("Please write another user id");
        res.json({isValid: false, type: "userid"});
    }
});

app.post("/companyHomePage", async (req, res) => {
    const {userid} = req.body;
    console.log("user id in company Home Page is");
    console.log(userid);
    orders =[];
    //by using this user id find orders and packages from order table
        const allOrders = db.query('SELECT * FROM package NATURAL JOIN "Order" WHERE send_corporate_id =$1', [userid]);
        rowcount = (await allOrders).rowCount;
        if(rowcount != 0){
            console.log(rowcount);
            for (let i = 0; i <rowcount; i++) {
                //get the branch names
                const destinationBranch = db.query('SELECT * FROM branch WHERE b_id =$1', [(await allOrders).rows[i].destination_b_id]);
                const sendBranch = db.query('SELECT * FROM branch WHERE b_id =$1', [(await allOrders).rows[i].send_b_id]);
                //find package status
                const packageStatus = db.query('SELECT * FROM package NATURAL JOIN pac_state NATURAL JOIN packagestate WHERE p_id =$1 and ps_id >= ALL(SELECT ps_id FROM pac_state WHERE p_id =$1)', [(await allOrders).rows[i].p_id]);

                order ={packagestatus:(await packageStatus).rows[0].name,destinationbid:(await destinationBranch).rows[0].name,sendbid:(await sendBranch).rows[0].name,pid:(await allOrders).rows[i].p_id,weight: (await allOrders).rows[i].weight, itemdescription:(await allOrders).rows[i].item_dscrptn,volume: (await allOrders).rows[i].volume,
                    price: (await allOrders).rows[i].price,takeindvid: (await allOrders).rows[i].take_indv_id }
                orders.push(order);
            }
            res.json({size: rowcount, orders:orders});
        }
        else{
            console.log("There is nothing to show");
            res.json({size: 0, orders: []});
        }
});
app.post("/getUserType", async (req, res) => {
    const {userId} = req.body;
    var usertype = '';
    console.log(userId);
    const inPackageManager = await db.query('SELECT * FROM packagemanager WHERE u_id = $1', [userId]);
    if(inPackageManager.rowCount != 0){
        //direct to package manage home page
        usertype='packagemanager';
        console.log(usertype);
        res.json({userType: usertype});
    }
    else{
        const inShipper = await db.query('SELECT * FROM shipper WHERE u_id = $1', [userId]);
        if(inShipper.rowCount != 0){
            //direct to shipper home
            usertype='shipper';
            console.log(usertype);
            res.json({userType: usertype});
        }
        else{
            const inCourier = await db.query('SELECT * FROM courier WHERE u_id = $1', [userId]);
            if(inCourier.rowCount != 0){
                //direct to courier page
                usertype='courier';
                console.log(usertype);
                res.json({userType: usertype});
            }
            else{
                const inCorporate = await db.query('SELECT * FROM corporate WHERE u_id = $1', [userId]);
                if(inCorporate.rowCount != 0){
                    //direct to corporate home page
                    usertype='corporate';
                    console.log(usertype);
                    res.json({userType: usertype});
                }
                else{
                    const inIndividual = await db.query('SELECT * FROM individual WHERE u_id = $1', [userId]);
                    if(inIndividual.rowCount != 0){
                        //direct to individual home page
                        usertype='individual';
                        console.log(usertype);
                        res.json({userType: usertype});
                    }
                    else{
                        console.log("There is an error");
                    }
                }
            }
        }
    }

});
app.post("/companyProfilePage", async (req, res) => {
    const {userid} = req.body;
    const corporate = await db.query('SELECT * FROM corporate WHERE u_id = $1', [userid]);
    if(corporate.rowCount != 0){
        //direct to individual home page
        //create address
        let addrs = corporate.rows[0].street + ' ' + corporate.rows[0].apt_number + ' ' +
         corporate.rows[0].city +'/' + corporate.rows[0].state + ' ' + corporate.rows[0].zip;
        res.json({username: corporate.rows[0].name,email: corporate.rows[0].email,phone:corporate.rows[0].phone,address:addrs,budget: corporate.rows[0].budget});
    }
    else{
        console.log("There is an error");
    }

});

app.post("/companyLoadMoney", async (req, res) => {
    const {userid, amount} = req.body;
    const findOldBudget = await db.query('SELECT * FROM corporate WHERE u_id = $1', [userid]);
    if(findOldBudget.rowCount != 0){
        //direct to individual home page
        //create address
        oldBudget = parseInt(findOldBudget.rows[0].budget);
        amount2 = parseInt(amount);
        newbudget = oldBudget + amount2;
        //update budget
        const updateBudget = await db.query('UPDATE corporate SET budget =$2 WHERE u_id = $1', [userid,newbudget]);
        res.json({success:true});
    }
    else{
        console.log("There is an error");
    }
});

app.post("/CustomerProfile", async (req, res) => {
    const {userid} = req.body;
    console.log(userid);
    const userInfo = await db.query('SELECT * FROM customer NATURAL JOIN customercard WHERE u_id = $1', [userid]);
    if(userInfo.rowCount != 0){
        //direct to individual home page
        //create address
        let addrs = userInfo.rows[0].street + ' ' + userInfo.rows[0].apt_number + ' ' +
         userInfo.rows[0].city +'/' + userInfo.rows[0].state + ' ' + userInfo.rows[0].zip;
        res.json({username: userInfo.rows[0].name, email: userInfo.rows[0].email, phone: userInfo.rows[0].phone,address: addrs,balance: userInfo.rows[0].money,points: userInfo.rows[0].point});
    }
    else {
        console.log("There is an error");
    }

});

app.post("/customerLoadMoney", async (req, res) => {
    const {userid, amount} = req.body;
    const findOldBudget = await db.query('SELECT * FROM customer NATURAL JOIN customercard WHERE u_id = $1', [userid]);
    if(findOldBudget.rowCount != 0){
        //direct to individual home page
        //create address
        oldBudget = parseInt(findOldBudget.rows[0].money);
        amount2 = parseInt(amount);
        newbudget = oldBudget + amount2;
        //update budget
        const updateBudget = await db.query('UPDATE customercard SET money =$2 WHERE u_id = $1', [userid, newbudget]);
        res.json({success:true});
    }
    else{
        console.log("There is an error");
    }
});

app.post("/individualProfileRecipient", async (req, res) => {
    const {userid} = req.body;
    orders =[];
    const findRecievedOrders = await db.query('SELECT * FROM "Order" NATURAL JOIN package WHERE take_indv_id = $1', [userid]);
    rowcount = findRecievedOrders.rowCount;
    if(rowcount != 0){
        console.log(rowcount);
        for(let i = 0; i <rowcount; i++){
            //get the latest package status
            const packagestatus =db.query('SELECT * FROM package NATURAL JOIN pac_state NATURAL JOIN packagestate WHERE p_id =$1 and ps_id >= ALL(SELECT ps_id FROM pac_state WHERE p_id =$1)', [findRecievedOrders.rows[i].p_id]);
            order ={ packagestatus: (await packagestatus).rows[0].name,pid: findRecievedOrders.rows[i].p_id,itemdescription: findRecievedOrders.rows[i].item_dscrptn};
            orders.push(order);
        }
        res.json({size:rowcount, orders: orders});
    }
    else{
        console.log("There is nothing to show");
            res.json({size: 0, orders: []});
    }
});

app.post("/individualProfileSender", async (req, res) => {
    const {userid} = req.body;
    orders =[];
    const findSentOrders = await db.query('SELECT * FROM "Order" NATURAL JOIN package WHERE send_individual_id = $1', [userid]);
    rowcount = (findSentOrders).rowCount;
    if(rowcount != 0){
        console.log(rowcount);
        for(let i = 0; i <rowcount; i++){
            //get the latest package status
            console.log("hereee");
            const packagestatus = await db.query('SELECT * FROM package NATURAL JOIN pac_state NATURAL JOIN packagestate WHERE p_id =$1 and ps_id >= ALL(SELECT ps_id FROM pac_state WHERE p_id =$1)', [(findSentOrders).rows[i].p_id]);
            order ={ packagestatus: packagestatus.rows[0].name,pid: findSentOrders.rows[i].p_id,itemdescription: findSentOrders.rows[i].item_dscrptn};
            orders.push(order);
            console.log(order);
        }
        console.log(orders);
        res.json({size:rowcount, orders: orders});
    }
    else{
        console.log("There is nothing to show");
            res.json({size: 0, orders: []});
    }
});

app.post("/shipperProfilePage", async (req, res) => {
    const {userid} = req.body;
    console.log(userid);
    const userInfo = await db.query('SELECT * FROM shipper WHERE u_id = $1', [userid]);
    if(userInfo.rowCount != 0){
        //direct to individual home page
        //create address
        res.json({username: userInfo.rows[0].name, email: userInfo.rows[0].email, phone: userInfo.rows[0].phone,vehicleid: userInfo.rows[0].v_id});
    }
    else {
        console.log("There is an error");
    }
});

app.post("/packageManagerProfilePage", async (req, res) => {
    const {userid} = req.body;
    console.log(userid);
    const userInfo = await db.query('SELECT * FROM packagemanager WHERE u_id = $1', [userid]);
    if(userInfo.rowCount != 0){
        //direct to individual home page
        //create address
        res.json({username: userInfo.rows[0].name, email: userInfo.rows[0].email, phone: userInfo.rows[0].phone,branchid: userInfo.rows[0].b_id});
    }
    else {
        console.log("There is an error");
    }
});
app.post("/courierProfilePage", async (req, res) => {
    const {userid} = req.body;
    console.log(userid);
    const userInfo = await db.query('SELECT * FROM courier WHERE u_id = $1', [userid]);
    if(userInfo.rowCount != 0){
        //direct to individual home page
        //create address
        res.json({username: userInfo.rows[0].name, email: userInfo.rows[0].email, phone: userInfo.rows[0].phone,vehicleid: userInfo.rows[0].v_id});
    }
    else {
        console.log("There is an error");
    }
});
app.post("/SeeDetails", async (req, res) => {
    const {userid,packageid} = req.body;
    console.log("in see details");
    const packageInfo = await db.query('SELECT * FROM package NATURAL JOIN "Order" NATURAL JOIN pac_state NATURAL JOIN packagestate WHERE p_id =$1 and ps_id >= ALL(SELECT ps_id FROM pac_state WHERE p_id =$1)', [packageid]);
    if(packageInfo.rowCount != 0){
        //direct to individual home page
        const senderBranch =  await db.query('SELECT * FROM branch WHERE b_id =$1', [packageInfo.rows[0].send_b_id]);
        senderBranchName = senderBranch.rows[0].name;
        const destinationBranch = await db.query('SELECT * FROM branch WHERE b_id =$1', [packageInfo.rows[0].destination_b_id]);
        destinationBranchName = destinationBranch.rows[0].name;
        //create address
        console.log({description: packageInfo.rows[0].item_dscrptn,packageid: packageid, weight: packageInfo.rows[0].weight,volume: packageInfo.rows[0].volume,recipient:packageInfo.rows[0].take_indv_id,senderBranchName: senderBranchName, destinationBranchName: destinationBranchName,packagestatus:packageInfo.rows[0].name});
        res.json({description: packageInfo.rows[0].item_dscrptn,packageid: packageid, weight: packageInfo.rows[0].weight,volume: packageInfo.rows[0].volume,recipient:packageInfo.rows[0].take_indv_id,senderBranchName: senderBranchName, destinationBranchName: destinationBranchName,packagestatus:packageInfo.rows[0].name});
    }
    else {
        console.log("There is an error");
    }
});


