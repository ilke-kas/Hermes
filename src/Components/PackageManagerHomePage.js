import React ,{useState, useEffect} from "react";
import {Cookies, useCookies} from "react-cookie";
import NavBar from "./NavBar";
import ManagerPackageAcceptance from "./ManagerPackageAcceptance";
import SeeReportPopupPackageManager from "./SeeReportPopupPackageManager";

function PackageManagerHomePage() {
    const [popup, setPopup] = React.useState(false);
    const cookies = new Cookies();
    const userid = cookies.get(["userId"]);
    const [reports,setReports] = useState([]);
    const [reportSize,setReportSize]=useState("");
    const [popid,setPopId]=useState("");

    React.useEffect(() => {
        getAllReports();
    },[]);

    async function getAllReports() {
        const body = {userid};
       
        const response = await fetch('http://localhost:3001/getAllReportsInBranch', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            setReports(data.reports);
            console.log(reports);
            setReportSize(data.size);
            console.log(data);
        });
        
    }
    return (
        <div>
            <NavBar></NavBar>
            <ManagerPackageAcceptance/>
            {
                reports.map((x) => {
                    console.log("there" + x);
                    return <tr> 
                    <td  className="table-td">{x.reportid}</td>
                    <td  className="table-td">{x.userreport}</td>
                    
                    <td><button type="button" onClick={e => { setPopup(true);setPopId(x.pid);}} className="btn btn-info">See Report</button></td>
                    </tr>
                    
                
            })
                
            }<SeeReportPopupPackageManager trigger={popup} setTrigger={setPopup} id={popid}></SeeReportPopupPackageManager>

            
        </div>

    );
}

export default PackageManagerHomePage;