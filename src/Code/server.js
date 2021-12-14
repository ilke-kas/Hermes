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
                const newCustomerCard = await db.query('INSERT INTO customercard (u_id,money) VALUES ($1,$2)',[userid,0]);
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
        const allOrders = db.query('SELECT * FROM ONLY package NATURAL JOIN "Order" WHERE send_corporate_id =$1', [userid]);
        rowcount = (await allOrders).rowCount;
        if(rowcount != 0){
            console.log(rowcount);
            for (let i = 0; i <rowcount; i++) {
                //get the branch names
                const destinationBranch = db.query('SELECT * FROM branch WHERE b_id =$1', [(await allOrders).rows[i].destination_b_id]);
                const sendBranch = db.query('SELECT * FROM branch WHERE b_id =$1', [(await allOrders).rows[i].send_b_id]);
                //find package status
                const packageStatus = db.query('SELECT * FROM ONLY package NATURAL JOIN pac_state NATURAL JOIN packagestate WHERE p_id =$1 and ps_id >= ALL(SELECT ps_id FROM pac_state WHERE p_id =$1)', [(await allOrders).rows[i].p_id]);

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
    const userInfo = await db.query('SELECT * FROM individual NATURAL JOIN customercard WHERE u_id = $1', [userid]);
    if(userInfo.rowCount != 0){
        //direct to individual home page
        //create address
        console.log(userInfo.rows[0].email);
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
    const findOldBudget = await db.query('SELECT * FROM individual NATURAL JOIN customercard WHERE u_id = $1', [userid]);
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
    const findRecievedOrders = await db.query('SELECT * FROM "Order" NATURAL JOIN ONLY package WHERE take_indv_id = $1', [userid]);
    rowcount = findRecievedOrders.rowCount;
    if(rowcount != 0){
        console.log(rowcount);
        for(let i = 0; i <rowcount; i++){
            //get the latest package status
            const packagestatus =db.query('SELECT * FROM ONLY package NATURAL JOIN pac_state NATURAL JOIN packagestate WHERE p_id =$1 and ps_id >= ALL(SELECT ps_id FROM pac_state WHERE p_id =$1)', [findRecievedOrders.rows[i].p_id]);
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
    const findSentOrders = await db.query('SELECT * FROM "Order" NATURAL JOIN ONLY package WHERE send_individual_id = $1', [userid]);
    rowcount = (findSentOrders).rowCount;
    if(rowcount != 0){
        console.log(rowcount);
        for(let i = 0; i <rowcount; i++){
            //get the latest package status
            console.log("hereee");
            const packagestatus = await db.query('SELECT * FROM ONLY package NATURAL JOIN pac_state NATURAL JOIN packagestate WHERE p_id =$1 and ps_id >= ALL(SELECT ps_id FROM pac_state WHERE p_id =$1)', [(findSentOrders).rows[i].p_id]);
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
    const packageInfo = await db.query('SELECT * FROM ONLY package NATURAL JOIN "Order" NATURAL JOIN pac_state NATURAL JOIN packagestate WHERE p_id =$1 and ps_id >= ALL(SELECT ps_id FROM pac_state WHERE p_id =$1)', [packageid]);
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
app.post("/getAllUsers", async (req, res) => {
    const {userid} = req.body;
    console.log("getAllUsers");
    users =[];
    const allUsers = await db.query('SELECT * FROM individual WHERE u_id <> $1', [userid]);
    rowcount = (allUsers).rowCount;
    console.log(rowcount);
    if(rowcount != 0){
        //create address
        console.log(rowcount);
        for(let i = 0; i <rowcount; i++){
            user ={ userid: allUsers.rows[i].u_id};
            users.push(user);
        }
        console.log({size:rowcount,users: users});
        res.json({size:rowcount,users: users});
    }
    else {
        console.log("There is an error");
        res.json({size:0,users: []});
    }
});
app.post("/getAllBranch", async (req, res) => {
    const {userid} = req.body;
    console.log("getAllBranch");
    branches =[];
    const allBranches = await db.query('SELECT * FROM branch');
    rowcount = (allBranches).rowCount;
    console.log(rowcount);
    if(rowcount != 0){
        //create address
        console.log(rowcount);
        for(let i = 0; i <rowcount; i++){
            branch ={ branchid: allBranches.rows[i].b_id, branchname: allBranches.rows[i].name};
            branches.push(branch);
        }
        console.log({size:rowcount,branches: branches});
        res.json({size:rowcount,branches: branches});
    }
    else {
        console.log("There is an error");
        res.json({size:0,branches: []});
    }
});
app.post("/calculatePrice", async (req, res) => {
    const {weight,volume} = req.body;
    console.log("calculatePrice");
    calculatedVolumePrice = (volume / 1000) * 3;
    var calculatedWeightPrice = 0;
    if(weight>= 1 && weight <= 10){
        calculatedWeightPrice = 30;
    }
    else if(weight > 10 && weight <= 50){
        calculatedWeightPrice = 30 + (weight -10 ) * 3;
    }
    else if(weight > 50){
        calculatedWeightPrice = 30 + (weight -10 ) * 2;

    }
    price = calculatedWeightPrice + calculatedVolumePrice;
    console.log(price);
    res.json({price:price});
});
app.post("/submitPackageCourier", async (req, res) => {
    const {userid, description,weight,volume,clickedUser,clickedSenderBranch,clickedDestinationBranch} = req.body;
    //first calculate the price 
    console.log("calculatePrice");
    calculatedVolumePrice = (volume / 1000) * 3;
    var calculatedWeightPrice = 0;
    var usertype;
    if(weight>= 1 && weight <= 10){
        calculatedWeightPrice = 30;
    }
    else if(weight > 10 && weight <= 50){
        calculatedWeightPrice = 30 + (weight -10 ) * 3;
    }
    else if(weight > 50){
        calculatedWeightPrice = 30 + (weight -10 ) * 2;

    }
    price = calculatedWeightPrice + calculatedVolumePrice;
    console.log(price);
    //then submit it
    //first look at the user type corporate or individual
       //find id of senderbranch
       const senderBranch = await db.query('SELECT * FROM branch WHERE name = $1', [clickedSenderBranch]);
       senderBranchId = senderBranch.rows[0].b_id;
       const destinationBranch = await db.query('SELECT * FROM branch WHERE name = $1', [clickedDestinationBranch]);
       destinationBranchId = destinationBranch.rows[0].b_id;
       //calculate currentDate
       let date_ob = new Date();

        // current date
        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // prints date in YYYY-MM-DD format
        currentdate = year + "-" + month + "-" + date;

const inCorporate = await db.query('SELECT * FROM corporate WHERE u_id = $1', [userid]);
if(inCorporate.rowCount != 0){
    //direct to corporate home page
    usertype='corporate';
    console.log(usertype);
    const currentbalance = await db.query('SELECT * FROM corporate WHERE u_id = $1', [userid]);
    if(currentbalance.rows[0].money >= price){
             //when submitted automatically assign courier to that package
            //first fetch all of the courier from the database and but them to an array
            allCouriers =[];
            const getAllCouriers = await db.query("SELECT * FROM Courier WHERE b_id =$1",[senderBranchId]);
            rowcount = getAllCouriers.rowCount;
            if(rowcount != 0){
                for(let i = 0; i <rowcount; i++){
                    courier ={courierid: getAllCouriers.rows[i].u_id, vehicleid: getAllCouriers.rows[i].v_id};
                    allCouriers.push(courier);
                }
                //now randomly choose one of the couriers
                console.log(allCouriers);
                inc = 0;
                randomindex = 0;
                while(inc <20){
                randomindex = Math.floor(Math.random() * rowcount);
                console.log(randomindex);
                console.log("vehicle id:" + allCouriers[randomindex].vehicleid);
                inc++;
                }
                //add order
                const newOrder = await db.query('INSERT INTO "Order" (take_indv_id,send_corporate_id,price,rate,send_individual_id,destination_b_id,send_b_id) VALUES($1, $2, $3, $4,$5,$6,$7) RETURNING *', [clickedUser, userid, price, null,null,destinationBranchId,senderBranchId]);
                const newPackage = await db.query('INSERT INTO package (o_id,weight,item_dscrptn,volume) VALUES($1, $2, $3, $4) RETURNING *', [newOrder.rows[0].o_id,weight,description,volume]);
                const newPackageStatus = await db.query('INSERT INTO packagestate (name,state_date) VALUES($1, $2)RETURNING *', ["Submitted",currentdate]);
                const newPackageState = await db.query('INSERT INTO pac_state (ps_id,p_id,v_id) VALUES($1, $2,$3)', [newPackageStatus.rows[0].ps_id,newPackage.rows[0].p_id,allCouriers[randomindex].vehicleid]);
                res.json({success:true, reason:""});
                }
                else{
                    console.log("There is no courier in database");
                    res.json({success:false, reason:"courier"}); 

                }
    }else{
        res.json({success:false,reason:"money"});
    }
}
else{
    const inIndividual = await db.query('SELECT * FROM individual WHERE u_id = $1', [userid]);
    if(inIndividual.rowCount != 0){
        //direct to individual home page
        usertype='individual';
        console.log(usertype);
        const currentbalance = await db.query('SELECT * FROM individual NATURAL JOIN customercard WHERE u_id = $1', [userid]);
        if(currentbalance.rows[0].money >= price){
            
            //when submitted automatically assign courier to that package
            //first fetch all of the courier from the database and but them to an array
            allCouriers =[];
            const getAllCouriers = await db.query("SELECT * FROM Courier WHERE b_id =$1",[senderBranchId]);
            rowcount = getAllCouriers.rowCount;
            if(rowcount != 0){
                for(let i = 0; i <rowcount; i++){
                    courier ={courierid: getAllCouriers.rows[i].u_id, vehicleid: getAllCouriers.rows[i].v_id};
                    allCouriers.push(courier);
                }
                //now randomly choose one of the couriers
                console.log(allCouriers);
                inc = 0;
                randomindex = 0;
                while(inc <20){
                randomindex = Math.floor(Math.random() * rowcount);
                console.log(randomindex);
                console.log("courier id:" + allCouriers[randomindex].courierid);
                console.log("vehicle id:" + allCouriers[randomindex].vehicleid);
                inc++;
                }
                  //add order
                const newOrder = await db.query('INSERT INTO "Order" (take_indv_id,send_corporate_id,price,rate,send_individual_id,destination_b_id,send_b_id) VALUES($1, $2, $3, $4,$5,$6,$7) RETURNING *', [clickedUser, null, price, null,userid,destinationBranchId,senderBranchId]);
                const newPackage = await db.query('INSERT INTO package (o_id,weight,item_dscrptn,volume) VALUES($1, $2, $3, $4) RETURNING *', [newOrder.rows[0].o_id,weight,description,volume]);
                const newPackageStatus = await db.query('INSERT INTO packagestate (name,state_date) VALUES($1, $2)RETURNING *', ["Submitted",currentdate]);
                const newPackageState = await db.query('INSERT INTO pac_state (ps_id,p_id,v_id) VALUES($1, $2,$3)', [newPackageStatus.rows[0].ps_id,newPackage.rows[0].p_id,allCouriers[randomindex].vehicleid]);
                res.json({success:true, reason:""});
            }
            else{
                console.log("There is no courier in database");
                res.json({success:false, reason:"courier"});
            }
        }
        else{
            res.json({success:false,reason:"money"});
        }
    }
    else{
        console.log("There is an error");
        res.json({success:false,reason:"error"});
    }
}
});
app.post("/submitPackageBranch", async (req, res) => {
    const {userid, description,weight,volume,clickedUser,clickedSenderBranch,clickedDestinationBranch} = req.body;
    //first calculate the price 
    console.log("calculatePrice");
    calculatedVolumePrice = (volume / 1000) * 3;
    var calculatedWeightPrice = 0;
    var usertype;
    if(weight>= 1 && weight <= 10){
        calculatedWeightPrice = 30;
    }
    else if(weight > 10 && weight <= 50){
        calculatedWeightPrice = 30 + (weight -10 ) * 3;
    }
    else if(weight > 50){
        calculatedWeightPrice = 30 + (weight -10 ) * 2;

    }
    price = calculatedWeightPrice + calculatedVolumePrice;
    console.log(price);
    //then submit it
    //first look at the user type corporate or individual
       //find id of senderbranch
       const senderBranch = await db.query('SELECT * FROM branch WHERE name = $1', [clickedSenderBranch]);
       senderBranchId = senderBranch.rows[0].b_id;
       const destinationBranch = await db.query('SELECT * FROM branch WHERE name = $1', [clickedDestinationBranch]);
       destinationBranchId = destinationBranch.rows[0].b_id;
       //calculate currentDate
       let date_ob = new Date();

        // current date
        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // prints date in YYYY-MM-DD format
        currentdate = year + "-" + month + "-" + date;

const inCorporate = await db.query('SELECT * FROM corporate WHERE u_id = $1', [userid]);
if(inCorporate.rowCount != 0){
    //direct to corporate home page
    usertype='corporate';
    console.log(usertype);
    const currentbalance = await db.query('SELECT * FROM corporate WHERE u_id = $1', [userid]);
    if(currentbalance.rows[0].money >= price){ 
                //add order
                const newOrder = await db.query('INSERT INTO "Order" (take_indv_id,send_corporate_id,price,rate,send_individual_id,destination_b_id,send_b_id) VALUES($1, $2, $3, $4,$5,$6,$7) RETURNING *', [clickedUser, userid, price, null,null,destinationBranchId,senderBranchId]);
                const newPackage = await db.query('INSERT INTO package (o_id,weight,item_dscrptn,volume) VALUES($1, $2, $3, $4) RETURNING *', [newOrder.rows[0].o_id,weight,description,volume]);
                const newPackageStatus = await db.query('INSERT INTO packagestate (name,state_date) VALUES($1, $2)RETURNING *', ["Submitted",currentdate]);
                const newPackageState = await db.query('INSERT INTO pac_state (ps_id,p_id,v_id) VALUES($1, $2,$3)', [newPackageStatus.rows[0].ps_id,newPackage.rows[0].p_id,0]);
                res.json({success:true, reason:""});
    }else{
        res.json({success:false,reason:"money"});
    }
}
else{
    const inIndividual = await db.query('SELECT * FROM individual WHERE u_id = $1', [userid]);
    if(inIndividual.rowCount != 0){
        //direct to individual home page
        usertype='individual';
        console.log(usertype);
        const currentbalance = await db.query('SELECT * FROM individual NATURAL JOIN customercard WHERE u_id = $1', [userid]);
        if(currentbalance.rows[0].money >= price){
                  //add order
                const newOrder = await db.query('INSERT INTO "Order" (take_indv_id,send_corporate_id,price,rate,send_individual_id,destination_b_id,send_b_id) VALUES($1, $2, $3, $4,$5,$6,$7) RETURNING *', [clickedUser, null, price, null,userid,destinationBranchId,senderBranchId]);
                const newPackage = await db.query('INSERT INTO package (o_id,weight,item_dscrptn,volume) VALUES($1, $2, $3, $4) RETURNING *', [newOrder.rows[0].o_id,weight,description,volume]);
                const newPackageStatus = await db.query('INSERT INTO packagestate (name,state_date) VALUES($1, $2)RETURNING *', ["Submitted",currentdate]);
                const newPackageState = await db.query('INSERT INTO pac_state (ps_id,p_id,v_id) VALUES($1, $2,$3)', [newPackageStatus.rows[0].ps_id,newPackage.rows[0].p_id,0]);
                res.json({success:true, reason:""});
        }
        else{
            res.json({success:false,reason:"money"});
        }
    }
    else{
        console.log("There is an error");
        res.json({success:false,reason:"error"});
    }
}
});
app.post("/makePackageDelivered", async (req, res) => {
    const {pid} = req.body;
    console.log("makePackageDelivered");
    // current date
    let date_ob = new Date();
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// prints date in YYYY-MM-DD format
currentdate = year + "-" + month + "-" + date;
    const newPackageStatus = await db.query('INSERT INTO packagestate (name,state_date) VALUES($1, $2)RETURNING *', ["Delivered",currentdate]);
    const newPackageState = await db.query('INSERT INTO pac_state (ps_id,p_id,v_id) VALUES($1, $2,$3)', [newPackageStatus.rows[0].ps_id, pid, 0]);
    //put package tu securely delivered packages
    const packageInfo = await db.query('SELECT * FROM package WHERE p_id =$1',[pid]);
    const addSecurelyDeliveredPackages = await db.query('INSERT INTO securelydeliveredpackages (p_id,o_id,weight,item_dscrptn,volume) VALUES ( $1,$2,$3,$4,$5)',[pid,packageInfo.rows[0].o_id,packageInfo.rows[0].weight,packageInfo.rows[0].item_dscrptn,packageInfo.rows[0].volume]);
    res.json();
});
app.post("/getCustomerToBranchPackagesCourier", async (req, res) => {
    const {userid} = req.body;
    //find the vehicle id of the courier
    const getVehicleId = await db.query('SELECT * FROM courier WHERE u_id =$1', [userid]);
    vehicleid = getVehicleId.rows[0].v_id;
    console.log("getCustomerToBranchPackagesCourier");
    orders =[];
    const getPackages = await db.query('SELECT * FROM package NATURAL JOIN "Order" NATURAL JOIN packagestate NATURAL JOIN pac_state WHERE v_id = $1',[vehicleid]);
    rowcount = getPackages.rowCount;
    if(rowcount != 0){
        console.log(rowcount);
        for(let i = 0; i <rowcount; i++){
            //get the latest package status
            const indvorcorp= await db.query('SELECT * FROM ONLY package NATURAL JOIN packagestate NATURAL JOIN pac_state WHERE p_id =$1 and v_id =$2 and ps_id >= ALL(SELECT ps_id FROM pac_state WHERE p_id =$3)', [getPackages.rows[i].p_id,vehicleid, getPackages.rows[i].p_id]);
            //if sender is corporate
            if(indvorcorp.rowCount != 0){
                const packagestatus = await db.query('SELECT * FROM "Order" NATURAL JOIN package NATURAL JOIN pac_state NATURAL JOIN packagestate WHERE p_id =$1 AND ps_id =$2',[indvorcorp.rows[0].p_id,indvorcorp.rows[0].ps_id]);
                value =packagestatus.rows[0].send_corporate_id;
                console.log(packagestatus.rows[0].send_individual_id);
                if(packagestatus.rows[0].send_corporate_id != undefined && packagestatus.rows[0].name == "Submitted" && packagestatus.rows[0].v_id== vehicleid){
                    //dind address
                    const getAddress  = await db.query("SELECT * FROM individual WHERE u_id = $1",[packagestatus.rows[0].send_corporate_id]);
                    let addrs = getAddress.rows[0].street + ' ' + getAddress.rows[0].apt_number + ' ' +
                    getAddress.rows[0].city +'/' + getAddress.rows[0].state + ' ' + getAddress.rows[0].zip;
                    order ={ packagestatus: (packagestatus).rows[0].name,pid: getPackages.rows[i].p_id,takerid: packagestatus.rows[0].take_indv_id,sendercorporateid:packagestatus.rows[0].send_corporate_id
                        ,senderindividualid: null,address: addrs,senderbranchid:packagestatus.rows[0].send_b_id, packagestateid:packagestatus.rows[0].ps_id };
                    orders.push(order);
                }
                else if(packagestatus.rows[0].send_individual_id != undefined && packagestatus.rows[0].name == "Submitted" && packagestatus.rows[0].v_id== vehicleid  )
                { //if it is individual sender
                    const getAddress  = await db.query("SELECT * FROM individual WHERE u_id = $1",[packagestatus.rows[0].send_individual_id]);
                    let addrs = getAddress.rows[0].street + ' ' + getAddress.rows[0].apt_number + ' ' +
                    getAddress.rows[0].city +'/' + getAddress.rows[0].state + ' ' + getAddress.rows[0].zip;
                    order ={ packagestatus: (packagestatus).rows[0].name,pid: getPackages.rows[i].p_id,takerid: packagestatus.rows[0].take_indv_id,sendercorporateid:null
                        ,senderindividualid:packagestatus.rows[0].send_individual_id ,address: addrs,senderbranchid:packagestatus.rows[0].send_b_id,packagestateid:packagestatus.rows[0].ps_id };
                    orders.push(order);
                }  
            }else{
                console.log("There is no package to show");
         }
        }
        res.json({size:rowcount, orders: orders});

    }else{
        console.log("There is no package to show");
        res.json({size:0, orders:[]});
    }
});
app.post("/acceptPackageCourier", async (req, res) => {
    const {userid,value} = req.body;
    //find the vehicle id of the courier
    const getVehicleId = await db.query('SELECT * FROM courier WHERE u_id =$1', [userid]);
    vehicleid = getVehicleId.rows[0].v_id;
    console.log("/findAnotherCourier");
     //calculate currentDate
     let date_ob = new Date();

     // current date
     // adjust 0 before single digit date
     let date = ("0" + date_ob.getDate()).slice(-2);

     // current month
     let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

     // current year
     let year = date_ob.getFullYear();

     // prints date in YYYY-MM-DD format
     currentdate = year + "-" + month + "-" + date;
     //create packagestate
     const insertPackageState = await db.query('INSERT INTO packagestate (name,state_date) VALUES ($1,$2) RETURNING *',["Courier to Branch",currentdate]);
     const insertPacState = await db.query('INSERT INTO pac_state (ps_id,p_id,v_id) VALUES ($1,$2,$3)',[insertPackageState.rows[0].ps_id,value,vehicleid]);
     res.json({success:true});

});
app.post("/getShipperPartPackageManager", async (req, res) => {
    const {userid} = req.body;
    //find the branch id of the package manager
    const branchid = await db.query('SELECT * FROM packagemanager WHERE u_id =$1',[userid]);
    bid = branchid.rows[0].b_id;
    //get packages in that branch
    const getPackages = await db.query('WITH tbl1 AS '+
    '(SELECT ps_id, pac_state.p_id AS p_id, v_id,o_id,weight,item_dscrptn,volume  FROM pac_state LEFT OUTER JOIN package ON package.p_id = pac_state.p_id) ' +
' , tbl2 AS '+
    ' (SELECT tbl1.ps_id AS ps_id,p_id,v_id,o_id,weight,item_dscrptn,volume,name,state_date  FROM tbl1 LEFT OUTER JOIN packagestate ON  tbl1.ps_id = packagestate.ps_id ORDER BY ps_id) ' +
' ,tbl3 AS ' +
   ' (SELECT ps_id,p_id,v_id,tbl2.o_id AS o_id,weight,item_dscrptn,volume,name,state_date,take_indv_id,send_corporate_id,price, ' +
           ' rate,send_individual_id,destination_b_id,send_b_id FROM tbl2  LEFT OUTER JOIN "Order" ON  "Order".o_id = tbl2.o_id WHERE send_b_id = $1) ' +
' SELECT * FROM tbl3 AS t WHERE name = \'Courier to Branch\' AND ps_id >= ALL(SELECT ps_id ' +
                                            ' FROM tbl3 AS q ' +
                                            ' WHERE q.p_id = t.p_id) ',[bid]);
    orders =[];
    rowcount = getPackages.rowCount;
    if(rowcount != 0){
        console.log(rowcount);
        for(let i = 0; i <rowcount; i++){
            //if sender is corporate
            if(getPackages.rowCount != 0){
                if(getPackages.rows[i].send_corporate_id != undefined && getPackages.rows[i].name == "Courier to Branch" ){
                    //dind address
                    const getAddress  = await db.query("SELECT * FROM corporate WHERE u_id = $1",[getPackages.rows[i].take_indv_id]);
                    let addrs = getAddress.rows[0].street + ' ' + getAddress.rows[0].apt_number + ' ' +
                    getAddress.rows[0].city +'/' + getAddress.rows[0].state + ' ' + getAddress.rows[0].zip;
                    order ={ packagestatus: (getPackages).rows[i].name,pid: getPackages.rows[i].p_id,takerid: getPackages.rows[i].take_indv_id,sendercorporateid:getPackages.rows[0].send_corporate_id
                        ,senderindividualid: null,address: addrs,senderbranchid:getPackages.rows[i].send_b_id, packagestateid:getPackages.rows[i].ps_id,destinationbranchid : getPackages.rows[i].destination_b_id};
                    orders.push(order);
                }
                else if(getPackages.rows[i].send_individual_id != undefined  && getPackages.rows[i].name == "Courier to Branch")
                { //if it is individual sender
                    const getAddress  = await db.query("SELECT * FROM individual WHERE u_id = $1",[getPackages.rows[i].take_indv_id]);
                    let addrs = getAddress.rows[0].street + ' ' + getAddress.rows[0].apt_number + ' ' +
                    getAddress.rows[0].city +'/' + getAddress.rows[0].state + ' ' + getAddress.rows[0].zip;
                    order ={ packagestatus: (getPackages).rows[i].name,pid: getPackages.rows[i].p_id,takerid: getPackages.rows[i].take_indv_id,sendercorporateid:null
                        ,senderindividualid: getPackages.rows[0].send_individual_id,address: addrs,senderbranchid:getPackages.rows[i].send_b_id, packagestateid:getPackages.rows[i].ps_id,destinationbranchid : getPackages.rows[i].destination_b_id };
                    orders.push(order);
                }  
            }else{
                console.log("There is no package to show");
         }
        }
        res.json({size:rowcount, orders: orders});
}
else{
    console.log("There is no package to show");
    res.json({size:0, orders:[]});
}

});
app.post("/getAllShippers", async (req, res) => {
    const {userid,value} = req.body;
    shippers =[];
    //find the sender branch id from the userid of the packagemanager
    const senderbranchid = await db.query('SELECT * FROM packagemanager WHERE u_id = $1',[userid]);
    sbid = senderbranchid.rows[0].b_id;
    //find the all shipper on the given route
    const allShipperOnRoute = await db.query('SELECT * FROM route NATURAL JOIN vehicle NATURAL JOIN shipper WHERE destination_b_id = $1 AND departure_b_id= $2 ',[value,sbid]);
    rowcount = allShipperOnRoute.rowCount;
    if(rowcount != 0){
        console.log(rowcount);
        for(let i = 0; i <rowcount; i++){
            shipper ={shipperid: allShipperOnRoute.rows[i].u_id};
            shippers.push(shipper);
        }
        res.json({size:rowcount, shippers:shippers});
    }
    else{
        console.log('There is no shipper on this Route!');
        res.json({size:0, shippers:[]});
    }

});
app.post("/AssignShipper", async (req, res) => {
    const {userid,value,clickedShipper} = req.body;
    console.log(userid + " "+value + " "+clickedShipper + " ");
    //get current date
     //calculate currentDate
     let date_ob = new Date();

     // current date
     // adjust 0 before single digit date
     let date = ("0" + date_ob.getDate()).slice(-2);

     // current month
     let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

     // current year
     let year = date_ob.getFullYear();

     // prints date in YYYY-MM-DD format
     currentdate = year + "-" + month + "-" + date;
     //find the vid of the clickedShipper
     const vehicleidquery = await db.query("SELECT * FROM shipper WHERE u_id =$1",[clickedShipper]);
     vehicleid = vehicleidquery.rows[0].v_id;
    //find the sender branch id from the userid of the packagemanager
    //assign the package to the shipper
    const insertToPackageState = await db.query("INSERT INTO packagestate (name,state_date) VALUES ($1,$2) RETURNING *",["Sender Branch",currentdate]);
    const inserToPacState = await db.query("INSERT INTO pac_state (ps_id,p_id,v_id) VALUES ($1,$2,$3)",[insertToPackageState.rows[0].ps_id,value,vehicleid]);
    //change the money of the user
    //find the price of the package
    const package = await db.query('SELECT * FROM "Order" NATURAL JOIN package WHERE p_id =$1',[value]);
    price = package.rows[0].price;
    //find the sender is corporate or individual
    currentbalance = 0;
    if(package.rows[0].send_corporate_id == null){
        //it is individual
        sender = package.rows[0].send_individual_id;
        const findBalance = await db.query("SELECT * FROM customercard WHERE u_id =$1",[sender]);
        currentbalance = findBalance.rows[0].money;
        newbalance = currentbalance - price;
        //update balance
        const updateBalance = await db.query('UPDATE customercard SET money = $2 WHERE u_id =$1',[sender,newbalance]);
        res.json({success:true});
    }
    else{   
        sender = package.rows[0].send_corporate_id;
        const findBalance = await db.query("SELECT * FROM corporate WHERE u_id =$1",[sender]);
        currentbalance = findBalance.rows[0].budget;
        newbalance = currentbalance - price;
        //update balance
        const updateBalance = await db.query('UPDATE corporate SET budget = $2 WHERE u_id =$1',[sender,newbalance]);
        res.json({success:true});
    }
  

});
app.post("/findAnotherCourier", async (req, res) => {
    const {userid,value} = req.body;
    //find the vehicle id of the user
    const findVehicle = await db.query('SELECT * FROM courier Where u_id = $1',[userid]);
    //find the package
    const findPackage = await db.query('SELECT * FROM package WHERE p_id = $1',[value]);
    const findLatestState = await db.query('SELECT * FROM ONLY package NATURAL JOIN packagestate NATURAL JOIN pac_state WHERE p_id =$1 and v_id =$2 and ps_id >= ALL(SELECT ps_id FROM pac_state WHERE p_id =$3)', [value,findVehicle.rows[0].v_id,value]);
    //fetch all the couriers
    allCouriers =[];
    const getAllCouriers = await db.query("SELECT * FROM Courier WHERE b_id =$1",[findVehicle.rows[0].b_id]);
    rowcount = getAllCouriers.rowCount;
    if(rowcount != 0){
        for(let i = 0; i <rowcount; i++){
            courier ={courierid: getAllCouriers.rows[i].u_id, vehicleid: getAllCouriers.rows[i].v_id};
            allCouriers.push(courier);
        }
        //now randomly choose one of the couriers
        console.log(allCouriers);
        inc = 0;
        randomindex = 0;
        while(inc <20){
        randomindex = Math.floor(Math.random() * rowcount);
        console.log(randomindex);
        console.log("courier id:" + allCouriers[randomindex].courierid);
        console.log("vehicle id:" + allCouriers[randomindex].vehicleid);
        inc++;
        }
        const updateLatestState = await db.query('UPDATE pac_state SET v_id = $1 WHERE ps_id = $2 AND p_id = $3 AND v_id =$4',[allCouriers[randomindex].vehicleid,findLatestState.rows[0].ps_id, value, findVehicle.rows[0].v_id]);
        res.json({success:true});
    }
    else{
        console.log("There is no courier in database");
        res.json({success:false});

    }

});
app.post("/getBranchToBranchShipper", async (req, res) => {
    const {userid} = req.body;
    //find the vehicle id of the user
    const findVehicle = await db.query('SELECT * FROM shipper WHERE u_id =$1',[userid]);
    vehicleid = findVehicle.rows[0].v_id;
    const query = await db.query(' WITH tbl1 AS ' +
    ' (SELECT ps_id, pac_state.p_id AS p_id, v_id,o_id,weight,item_dscrptn,volume  FROM pac_state LEFT OUTER JOIN package ON package.p_id = pac_state.p_id) '+
' , tbl2 AS ' +
    ' (SELECT tbl1.ps_id AS ps_id,p_id,v_id,o_id,weight,item_dscrptn,volume,name,state_date  FROM tbl1 LEFT OUTER JOIN packagestate ON  tbl1.ps_id = packagestate.ps_id ORDER BY ps_id) ' +
' ,tbl3 AS ' +
    ' (SELECT ps_id,p_id,v_id,tbl2.o_id AS o_id,weight,item_dscrptn,volume,name,state_date,take_indv_id,send_corporate_id,price, ' +
           ' rate,send_individual_id,destination_b_id,send_b_id FROM tbl2  LEFT OUTER JOIN "Order" ON  "Order".o_id = tbl2.o_id WHERE v_id= $1) ' +
' SELECT * FROM tbl3 AS t WHERE name = \'Sender Branch\' AND ps_id >= ALL(SELECT ps_id ' +
                                           ' FROM tbl3 AS q ' +
                                           '  WHERE q.p_id = t.p_id) ',[vehicleid]);

    allPackages =[];
    rowcount = query.rowCount;
    if(rowcount != 0){
        for(let i = 0; i <rowcount; i++){
            if(query.rows[i].send_individual_id == undefined) //corporate
            {
                const getAddress  = await db.query("SELECT * FROM individual WHERE u_id = $1",[query.rows[i].take_indv_id]);
                let addrs = getAddress.rows[0].street + ' ' + getAddress.rows[0].apt_number + ' ' +
                getAddress.rows[0].city +'/' + getAddress.rows[0].state + ' ' + getAddress.rows[0].zip;
                pckg = {pid: query.rows[i].p_id,senderindividualid: null,sendercorporateid: query.rows[i].send_corporate_id,address:addrs, takerid: query.rows[i].take_indv_id}
                allPackages.push(pckg);
            }
            else{
                const getAddress  = await db.query("SELECT * FROM individual WHERE u_id = $1",[query.rows[i].take_indv_id]);
                let addrs = getAddress.rows[0].street + ' ' + getAddress.rows[0].apt_number + ' ' +
                getAddress.rows[0].city +'/' + getAddress.rows[0].state + ' ' + getAddress.rows[0].zip;
                pckg = {pid: query.rows[i].p_id,senderindividualid: query.rows[i].send_individual_id,sendercorporateid: null ,address:addrs, takerid: query.rows[i].take_indv_id}
                allPackages.push(pckg);
            }
        }
        res.json({size:rowcount, packages: allPackages});
    }
    else{
        console.log("There is no package to show");
        res.json({size:0, packages: []});
    }
});
app.post("/acceptShipper", async (req, res) => {
    const {userid,value} = req.body;
    //find the vehicle id of the courier
    const getVehicleId = await db.query('SELECT * FROM shipper WHERE u_id =$1', [userid]);
    vehicleid = getVehicleId.rows[0].v_id;
    console.log("/acceptShipper");
     //calculate currentDate
     let date_ob = new Date();

     // current date
     // adjust 0 before single digit date
     let date = ("0" + date_ob.getDate()).slice(-2);

     // current month
     let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

     // current year
     let year = date_ob.getFullYear();

     // prints date in YYYY-MM-DD format
     currentdate = year + "-" + month + "-" + date;
     //create packagestate
     const insertPackageState = await db.query('INSERT INTO packagestate (name,state_date) VALUES ($1,$2) RETURNING *',["Shipper",currentdate]);
     const insertPacState = await db.query('INSERT INTO pac_state (ps_id,p_id,v_id) VALUES ($1,$2,$3)',[insertPackageState.rows[0].ps_id,value,vehicleid]);
     res.json({success:true});

});
app.post("/denyShipper", async (req, res) => {
    const {userid,value} = req.body;
     //calculate currentDate
     let date_ob = new Date();

     // current date
     // adjust 0 before single digit date
     let date = ("0" + date_ob.getDate()).slice(-2);

     // current month
     let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

     // current year
     let year = date_ob.getFullYear();

     // prints date in YYYY-MM-DD format
     currentdate = year + "-" + month + "-" + date;
    //find the vehicle id of the user
    const findVehicle = await db.query('SELECT * FROM shipper Where u_id = $1',[userid]);
    //find the package
    const findPackage = await db.query('SELECT * FROM package WHERE p_id = $1',[value]);
    const findLatestState = await db.query('SELECT * FROM ONLY package NATURAL JOIN packagestate NATURAL JOIN pac_state WHERE p_id =$1 and v_id =$2 and ps_id >= ALL(SELECT ps_id FROM pac_state WHERE p_id =$3)', [value,findVehicle.rows[0].v_id,value]);
    //fetch all the couriers
    const deleteState = await db.query('DELETE FROM packagestate WHERE ps_id =$1',[findLatestState.rows[0].ps_id]);
    const findLatestState2 = await db.query('SELECT * FROM ONLY package NATURAL JOIN packagestate NATURAL JOIN pac_state WHERE p_id =$1 and ps_id >= ALL(SELECT ps_id FROM pac_state WHERE p_id =$1)', [value]);
    const update = await db.query('UPDATE packagestate SET state_date = $1 WHERE ps_id =$2',[currentdate,findLatestState2.rows[0].ps_id]);
    res.json({success:true});
});




