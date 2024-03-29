import React, {useContext, useEffect, useState} from 'react';
import "../assets/css/Usercreate.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import Table from "../components/table/Table";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {Alert, AlertTitle} from "@material-ui/lab";
import {HashLoader} from "react-spinners";
import moment from 'moment';
import UserContext from "../userContext";


const fields = [
    "Shift Name",
    "Start time",
    "End time",
    "Created At",
]

const rows = [
    {
        "id": 1,
        "firstName": "mujeeb",
        "lastName": "singham",
        "email": "chandulagayan@gmail.com",
        "verificationtoken": "1234",
        "epfNo": null,
        "phoneNo": "0776465645",
        "image": null,
        "statusId": 1,
        "password": "$2y$10$zrrjILLqTKyxYiR3jrOdvuaE.tEG3U148gVPoe7zYQLpitytXpyU2 ",
        "createdAt": "2021-07-16T10:38:11.002Z",
        "updatedAt": "2021-07-16T10:38:11.002Z",
    },
    {
        "id": 9,
        "firstName": "Gayath",
        "lastName": "Chandula",
        "email": "chandulagayan1@gmail.com",
        "verificationtoken": "g96wx6",
        "epfNo": "47586598",
        "phoneNo": null,
        "image": "uploads/dashboard.JPG-1626512057383.jpeg",
        "statusId": 50,
        "password": "$2b$10$vqy4Pln0C.V88NOCdpOOFOKZYHbVGWv.yV/7XLn7cpYxLQnV2PzPi",
    }
];


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const token = localStorage.getItem("Token")

const headers = {
    headers: {

        "Authorization":`Bearer ${token}`
    }
};


const submitdelete = async (id) => {

    try{

        const body = {id};
        const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/department/1/delete",body,headers);
        window.location.reload();

    } catch(err) {
        console.log(err)
    }

};

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)
const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.shiftName}</td>
        <td>{item.startTime}</td>
        <td>{item.endTime}</td>
        <td>{moment(item.createdAt).format("MMM Do YY")}</td>
    </tr>
)

const Shift = () => {
    const classes = useStyles();
    const {userData} = useContext(UserContext);
    const [shiftName, setshiftName] = useState("");
    const [startTime, setstartTime] = useState("");
    const [endTime, setendTime] = useState("");
    const [err, setErr] = useState("");
    const [listData, setListData] = useState({ lists: [] });
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("Token")


    const headers = {
        headers: {

            "Authorization":`Bearer ${token}`
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `https://acl-automation.herokuapp.com/api/v1/shiftcontrollers/1/getall`,headers
            );
            setListData({lists:result.data.data.ShiftDetails})
            setLoading(false);
        };
        fetchData();
    }, [])

    function validateForm() {
        return shiftName.length > 0;
    }

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try{

            const body = {shiftName,startTime,endTime};
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/shiftcontrollers/1/create",body,headers);
            window.location.reload();

        } catch(err) {
            err.response.data.message && setErr(err.response.data.message)
        }

    };

    if (loading) {
        return (
            <div style={{ padding: "10px 20px", textAlign: "center", justifyContent:"center", display:"flex", alignItems:"center", width:"100%", height:"100vh", backgroundColor:"#FFFFFF"}}>
                <HashLoader  loading={loading}  size={150} />
            </div>
        )
    }
    return (
        <>
            {userData.role === 1 || userData.role === 50? (
                <>
                    <Sidebar/>
                    <div id="main" className="layout__content">
                        <TopNav/>
                        <div className="layout__content-main">
                            <h2 className="page-header">Shifts</h2>
                            <div className="row">
                                <div className="col-6">
                                    <div className="card full-height">
                                        <div>
                                            {err ? (
                                                <Alert severity="error">
                                                    <AlertTitle>Error</AlertTitle>
                                                    {err}
                                                </Alert>
                                            ) : null}
                                            <div className="rowuser">
                                                <label>Shift Name</label>
                                                <input type="text" autoFocus placeholder="Shift name" value={shiftName} onChange={(e) => setshiftName(e.target.value)} />
                                            </div>
                                            <div className="rowuser">
                                                <label>Start Time</label>
                                                <input type="time"  placeholder="" value={startTime} onChange={(e) => setstartTime(e.target.value)} />
                                            </div>
                                            <div className="rowuser">
                                                <label>End Time</label>
                                                <input type="time"  placeholder="" value={endTime} onChange={(e) => setendTime(e.target.value)} />
                                            </div>
                                            <div id="button" className="rowuser">
                                                <button disabled={!validateForm()}  onClick={submit}>submit</button>
                                            </div>



                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="card full-height">
                                        <Table
                                            limit="5"
                                            headData={fields}
                                            renderHead={(item, index) => renderOrderHead(item, index)}
                                            bodyData={listData.lists}
                                            renderBody={(item, index) => renderOrderBody(item, index)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ):null}
        </>
    )
}

export default Shift