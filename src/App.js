import React, { useState, useEffect, useReducer } from 'react';
import JobModal from "./components/JobModal/JobModal";
import NewUserModal from "./components/NewUserModal/NewUserModal";
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserMinus, faEdit } from '@fortawesome/free-solid-svg-icons';
import Table from "./components/Table/Table";
import Table2 from "./components/Table2/Table2";
import ContentContainer from "./components/ContentContainer/ContentContainer";
import axios from 'axios';
/* import Modal from './components/Modal/Modal';
 */
import UserModal from './components/UserModal/UserModal';
import { reducer, INIT, ADD, ELIMINAR, EDIT } from './components/Reducers/ReducersUsers';
import { jobReducer, INIT_JOB, ELIMINAR_JOB, EDIT_JOB } from './components/Reducers/ReducersJobs';


const App = () => {

  const [users, dispatch] = useReducer(reducer, []);
  const [jobs, jobDispatch] = useReducer(jobReducer, []);
  const [selectedUser, setSelectedUser] = useState();
  const [selectedJob, setSelectedJob] = useState();
  const [displayNewUser, setDisplayNewUser] = useState(false);
  const [displayUserModal, setDisplayUserModal] = useState(false);
  const [displayJobModal, setDisplayJobModal] = useState(false);

  const headers = ["Name", "Avatar", "Job Title", "Actions"];
  const headers2 = ["Job Title", "Id", "Actions"];

  const getData2 = async (url, dispatch, actionType) => {
    try {
      const res = await axios.get(url);
      dispatch({ type: actionType, payload: res.data });
    } catch (err) {
      alert("Error getting data", err);
    }
  }

  const getUsers = async () => getData2("https://5f518d325e98480016123ada.mockapi.io/api/v1/users", dispatch, INIT);
  const getJobs = async () => getData2("https://5f518d325e98480016123ada.mockapi.io/api/v1/jobs", jobDispatch, INIT);

  const editUser = user => {
    setSelectedUser(user);
    setDisplayUserModal(true);
  }

  const editJobs = (job) => {
    setSelectedJob(job);
    setDisplayJobModal(true);
  }


  const deleteUser = (user) => {
    axios.delete(`https://5f518d325e98480016123ada.mockapi.io/api/v1/users/${user.id}`)
    .then(res => {
      dispatch({ type: ELIMINAR, payload: res.data });
    }) .catch(err => console.warn('err')) 
  }

  const deleteJob = (job) => {
    console.log("Ver", job.id)
    axios.delete(`https://5f518d325e98480016123ada.mockapi.io/api/v1/jobs/${job.id}`)
    .then(res => {
      console.log("ver", res.data)
      jobDispatch({ type: ELIMINAR, payload: res.data });
    }) .catch(err => console.warn('err')) 
  }

  useEffect(() => getUsers(), []);
  useEffect(() => getJobs(), []);

  return (
    <React.Fragment>
      <header className="main-header">
        <h1>Jobs</h1>
      </header>
      <button className="button-green" type="button" onClick={() => setDisplayNewUser(true)} style={{ marginLeft: `25px`, position: "fixed" }}>NUEVO USUARIO<FontAwesomeIcon icon={faUserPlus} style={{ marginLeft: `5px` }} /></button>

      {
        displayNewUser ?
          <NewUserModal jobs={jobs} close={() => setDisplayNewUser(false)} users={users} dispatch={dispatch} actionType={ADD} />
          :
          null
      }
      {
        displayUserModal ?
          <UserModal user={selectedUser} jobs={jobs} close={() => setDisplayUserModal(false)} users={users} dispatch={dispatch} actionType={EDIT} />
          :
          null
      }
      {
        displayJobModal ?
          <JobModal job={selectedJob} close={() => setDisplayJobModal(false)} jobs={jobs} jobDispatch={jobDispatch} actionType={EDIT}/>
          :
          null
      }
      <ContentContainer>
        <Table headers={headers}>
          {
            users.map(user => {
              const job = jobs.find(job => job.id == user.jobId) || { name: "Not Found" };
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td><img className="avatar-img" src={user.avatar} /></td>
                  <td>{job.name}</td>
                  <td>
                    <button
                      className="button-green"
                      onClick={() => editUser(user)}
                    >
                      EDIT
                       <FontAwesomeIcon icon={faEdit} style={{ marginLeft: `5px` }} />
                    </button>
                    <button
                      className="button-green"
                      onClick={() => deleteUser(user) }
                    >
                      DELETE
                       <FontAwesomeIcon icon={faEdit} style={{ marginLeft: `5px` }} />
                    </button>
                  </td>
                  
                </tr>
              )
            })
          }
        </Table>
      </ContentContainer>
      <ContentContainer>
        <Table2 headers2={headers2}>
          {
            jobs.map(job => {
              return (
                <tr  key={job.id}>
                  <td>{job.name}</td>
                  <td>{job.id}</td>
                  <td>
                    <button
                      className="button-green"
                      onClick={() => editJobs(job)}
                    >
                      EDIT
                       <FontAwesomeIcon icon={faEdit} style={{ marginLeft: `5px` }} />
                    </button>
                    <button
                      className="button-green"
                      onClick={() => deleteJob(job)}
                    >
                      DELETE
                       <FontAwesomeIcon icon={faEdit} style={{ marginLeft: `5px` }} />
                    </button>

                  </td>
                </tr>
              )
            })
          }
        </Table2>
      </ContentContainer>
    </React.Fragment>
  );
}

export default App;
