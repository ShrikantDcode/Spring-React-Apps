import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Doughnut, Bar, Line } from "react-chartjs-2";

const AnalyzeData = (props) => {
  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [clinicalData, setClinicalData] = useState([]);
  const params = useParams();
  useEffect(() => {
    console.log(params);
    axios
      .get(
        "http://localhost:8080/clinicalservices/api/patients/analyze/" +
          params.patientId
      )
      .then((res) => {
        console.log(res.data);
        setId(res.data.id);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setAge(res.data.age);
        setClinicalData(res.data.clinicalData);
      });
  }, []);

  return (
    <div>
      <h2>Patient Details:</h2>
      First Name: {firstName}
      <br />
      Last Name: {lastName}
      <br />
      Age: {age}
      <h2>Clinical Report:</h2>
      {clinicalData.map((eachEntry) => (
        <RowCreator item={eachEntry} patientId={id} />
      ))}
    </div>
  );
};

class RowCreator extends React.Component {
  render() {
    var eachEntry = this.props.item;
    var patientId = this.props.patientId;

    return (
      <div>
        <table border="1">
          <tr>
            <td>
              <b>{eachEntry.componentName}</b>
            </td>
          </tr>
          <tr>
            <td>{eachEntry.componentName}</td>
            <td>{eachEntry.componentValue}</td>
            <td>{eachEntry.measuredDateTime}</td>
            <td>
              <Link to={"/chart/" + eachEntry.componentName + "/" + patientId}>
                <img src={require("../Logo.png")} height="20" widtch="20" />
              </Link>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default AnalyzeData;
