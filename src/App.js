import React, { useState, useEffect, useReducer } from 'react';
import JobModal from "./components/JobModal/JobModal";
import NewUserModal from "./components/NewUserModal/NewUserModal";
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserMinus, faEdit } from '@fortawesome/free-solid-svg-icons';
import Table from "./components/Table/Table";
import ContentContainer from "./components/ContentContainer/ContentContainer";
import axios from 'axios';
/* import Modal from './components/Modal/Modal';
 */
import UserModal from './components/UserModal/UserModal';
import { reducer, INIT, ADD, ELIMINAR, EDIT } from './components/Reducers/ReducersUsers';
import JobsPages from './components/ThePages/JobPage';



const App = () => {

  const [users, dispatch] = useReducer(reducer, []);
  const [selectedUser, setSelectedUser] = useState();
  const [displayNewUser, setDisplayNewUser] = useState(false);
  const [displayUserModal, setDisplayUserModal] = useState(false);

  const headers = ["Name", "Avatar", "Job Title", "Actions"];

  const getData2 = async (url, dispatch, actionType) => {
    try {
      const res = await axios.get(url);
      dispatch({ type: actionType, payload: res.data });
    } catch (err) {
      alert("Error getting data", err);
    }
  }

  const getUsers = async () => getData2("https://5f518d325e98480016123ada.mockapi.io/api/v1/users", dispatch, INIT);


  const editUser = user => {
    setSelectedUser(user);
    setDisplayUserModal(true);
  }



  const deleteUser = (user) => {
    axios.delete(`https://5f518d325e98480016123ada.mockapi.io/api/v1/users/${user.id}`)
    .then(res => {
      dispatch({ type: ELIMINAR, payload: res.data });
    }) .catch(err => console.warn('err')) 
  }

  

  useEffect(() => getUsers(), []);

  return (
    <React.Fragment>
      <header className="main-header">
        <h1>Jobs</h1>
      </header>
      <button className="button-green" type="button" onClick={() => setDisplayNewUser(true)} style={{ marginLeft: `25px`, position: "fixed" }}>NUEVO USUARIO<FontAwesomeIcon icon={faUserPlus} style={{ marginLeft: `5px` }} /></button>

      {
        displayNewUser ?
          <NewUserModal close={() => setDisplayNewUser(false)} users={users} dispatch={dispatch} actionType={ADD} />
          :
          null
      }
      {
        displayUserModal ?
          <UserModal user={selectedUser} close={() => setDisplayUserModal(false)} users={users} dispatch={dispatch} actionType={EDIT} />
          :
          null
      }
 
      <ContentContainer>
        <JobsPages />
        <Table headers={headers}>
          {
            users.map(user => {
              // const job = jobs.find(job => job.id == user.jobId) || { name: "Not Found" };
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td><img className="avatar-img" src={user.avatar} /></td>
                  {/* <td>{job.name}</td> */}
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
     
    </React.Fragment>
  );
}

export default App;
