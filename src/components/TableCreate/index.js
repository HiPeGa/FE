import { useEffect, useState } from "react";
import "./TableCreate.css";
import axios from "axios";
function TableCreate() {

  const [type, setType] = useState("proj");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time_start, setTimeStart] = useState("");
  const [time_end, setTimeEnd] = useState("");
  const [owner_project, setOwner] = useState(null);

  const accessToken = localStorage.getItem("access");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post('http://27.79.176.204:8000/api/info/', 
        {
          type, title, description, time_start, time_end, owner_project
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Gửi access token trong header
          },
        }
      );
      return data; 
    } catch (err) {
      return []; 
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <table className="table_create">
          <thead>
            <tr>
              <th>CREATE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select name="options" style={{width: "100%"}} onChange={(e) => {setType(e.target.value)}}>
                  <option value="proj">Create Project</option>
                  <option value="task">Create Task</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <input type="text" placeholder="Title" style={{width: "100%"}} onChange={(e) => {setTitle(e.target.value)}}></input>
              </td>
            </tr>
            <tr>
              <td>
                <textarea placeholder="Description" rows="4" style={{width: "100%"}} onChange={(e) => {setDescription(e.target.value)}}></textarea>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="TimeStart" style={{marginRight: "10px"}}>Time start:</label>
                <input type="datetime-local" id="TimeStart" onChange={(e) => {setTimeStart(e.target.value)}}></input>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="TimeEnd" style={{marginRight: "10px"}}>Time end:</label>
                <input type="datetime-local" id="TimeEnd" onChange={(e) => {setTimeEnd(e.target.value)}}></input>
              </td>
            </tr>
            {type=="proj" && <tr>
              <td>
                <input type="text" placeholder="Owner Project" style={{width: "100%"}} onChange={(e) => {setOwner(e.target.value)}}></input>
              </td>
            </tr>}
          </tbody>
        </table>
        <button type="submit" style={{width: "314px"}}>Create</button>
      </form>
    </>
  );
}
export default TableCreate;

// "url": "http://27.79.176.204:8000/api/info/1/",
//         "title": "Project A",
//         "description": "Description for project A",
//         "type": "task",
//         "time_init": "2024-10-11T15:00:00+07:00",
//         "time_start": "2024-10-11T16:00:00+07:00",
//         "time_end": "2024-11-01T00:00:00+07:00",
//         "owner_project": null