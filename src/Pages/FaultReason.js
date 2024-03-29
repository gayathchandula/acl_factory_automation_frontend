import React, {useContext, useEffect, useState} from 'react';
import "../assets/css/Usercreate.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import Table from "../components/table/Table";
import {makeStyles} from '@material-ui/core/styles';
import {HashLoader} from "react-spinners";
import {Alert, AlertTitle} from "@material-ui/lab";
import axios from "axios";
import moment from "moment";
import UserContext from "../userContext";


const fields = [
    "Id",
    "Special Case",
    "Case Type",
    "Fault Reason",
    "Created At",
    "Action"
]


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const token = localStorage.getItem("Token")

const headers = {
    headers: {

        "Authorization": `Bearer ${token}`
    }
};


const submitdelete = async (id) => {

    try {

        const body = {id};
        const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/faultreason/1/delete", body, headers);
        window.location.reload();

    } catch (err) {
        console.log(err)
    }

};

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.specialCases.name}</td>
        <td>{item.specialCases.specialcasetypes.specialTypename}</td>
        <td>{item.faultreason}</td>
        <td>{moment(item.createdAt).format("MMM Do YY")}</td>
        <td>
            <button onClick={() => {
                submitdelete(item.id)
            }} className="usertblbutton">Delete
            </button>
        </td>
    </tr>
)


const Fault = () => {
    const classes = useStyles();
    const {userData} = useContext(UserContext);
    const [faultreason, setfaultreason] = useState("");
    const [faultType, setfaultType] = useState("");
    const [specialcaseId, setspecialcaseId] = useState("");
    const [err, setErr] = useState("");
    const [listData, setListData] = useState({lists: []});
    const [listData1, setListData1] = useState({lists: []});
    const [listData2, setListData2] = useState({lists: []});
    let [loading, setLoading] = useState(true);
    const token = localStorage.getItem("Token")

    const headers = {
        headers: {

            "Authorization": `Bearer ${token}`
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `https://acl-automation.herokuapp.com/api/v1/specialcasescontroller/1/getall`, headers
            );
            setListData({lists: result.data.data.specialCase})
            const result1 = await axios(
                `https://acl-automation.herokuapp.com/api/v1/faultreason/1/getall`, headers
            );
            setListData1({lists: result1.data.data.FaultReasonsDetails})
            const result2 = await axios(
                `https://acl-automation.herokuapp.com/api/v1//specialtype/getall`, headers
            );
            setListData2({lists: result2.data.data.specialTypes})
            setLoading(false);
        };

        fetchData();
    }, [])

    function validateForm() {
        return faultreason.length > 0 && faultType.length > 0 && specialcaseId.length > 0;
    }

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try {

            const body = {faultreason, faultType, specialcaseId};
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/faultreason/1/create", body, headers);
            window.location.reload();

        } catch (err) {
            err.response.data.message && setErr(err.response.data.message)
        }

    };


    if (loading) {
        return (
            <div style={{
                padding: "10px 20px",
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "100vh",
                backgroundColor: "#FFFFFF"
            }}>
                <HashLoader loading={loading} size={150}/>
            </div>
        )
    }
    return (
        <>
            {userData.role === 1 || userData.role === 50 ? (
                <>
                    <Sidebar/>
                    <div id="main" className="layout__content">
                        <TopNav/>
                        <div className="layout__content-main">
                            <h2 className="page-header">Fault Reason Manage</h2>
                            <div className="row">
                                <div className="col-6">
                                    <div className="card full-height">
                                        <div>
                                            <form onSubmit={submit}>
                                                {err ? (
                                                    <Alert severity="error">
                                                        <AlertTitle>Error</AlertTitle>
                                                        {err}
                                                    </Alert>
                                                ) : null}
                                                <div className="rowuser">
                                                    <label>Fault Type</label>
                                                    <select id="department" name="department" value={faultType}
                                                            onChange={(e) => setfaultType(e.target.value)}>
                                                        <option value="" selected>please select Special case type
                                                        </option>
                                                        {listData2.lists.map((country, key) => (
                                                            <option key={key} value={country.id}>
                                                                {country.specialTypename}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="rowuser">
                                                    <label>Special case</label>
                                                    <select id="department" name="department" value={specialcaseId}
                                                            onChange={(e) => setspecialcaseId(e.target.value)} required>
                                                        <option value="" selected>please select special case</option>
                                                        {listData.lists.map((country, key) => (
                                                            <option key={key} value={country.id}>
                                                                {country.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="rowuser">
                                                    <label>Reason</label>
                                                    <input type="text" autoFocus placeholder="" value={faultreason}
                                                           onChange={(e) => setfaultreason(e.target.value)} required/>
                                                </div>
                                                <div id="button" className="rowuser">
                                                    <button type="submit">submit</button>
                                                </div>
                                            </form>
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
                                            bodyData={listData1.lists}
                                            renderBody={(item, index) => renderOrderBody(item, index)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    )
}

export default Fault