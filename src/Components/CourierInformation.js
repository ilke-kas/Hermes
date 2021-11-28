import React from "react";

function CourierInformation() {
    return (
        <div>
            <div>
                <h2>My Information</h2>
                <table>
                    <tr>
                        <td>User ID:</td>
                        <td>courier1</td>
                    </tr>
                    <tr>
                        <td>User Name:</td>
                        <td>Mehmet Taşkaya</td>
                    </tr>
                    <tr>
                        <td>Email: </td>
                        <td>mehmet.taski@gmail.com</td>
                    </tr>
                    <tr>
                        <td>Phone Number:&emsp;</td>
                        <td>0555 555 55 55</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td>Eryaman/ANKARA</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default CourierInformation;