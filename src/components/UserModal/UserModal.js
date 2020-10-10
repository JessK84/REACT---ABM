import React, { useState } from 'react';
import './UserModal.scss';
import Modal from '../Modal/Modal';
import axios from "axios";

const UserModal = ({ user, jobs, close, users, dispatch, actionType }) => {
    const [newName, setNewName] = useState(user.name);
    const [newJobId, setNewJobId] = useState(user.jobId);

    const changeName = event => setNewName(event.target.value);/// toma le valor del input entonces se lo pasa en NewUser
    const changeJobId = event => setNewJobId(event.target.value);/// toma el valor del select

    const save = () => {
        const newUser = {
            ...user,
            jobId: newJobId,
            name: newName
        };
    
 

        axios.put(`https://5f518d325e98480016123ada.mockapi.io/api/v1/users/${newUser.id}`, newUser)// newUser es lo que subimos a la api
            .then(res => {
                dispatch({ type: actionType, payload: newUser });
                close();
            }).catch(err => console.log(err));
    }

    return (
        <Modal title={`Edit User ${user.name}`} close={close}>
            <form>
                <input type="text" defaultValue={user.name} onChange={changeName} />
                <select defaultValue={user.jobId} onChange={changeJobId}>
                    {
                        jobs.map(job => {
                            return (
                                <option value={job.id}>
                                    {job.name}
                                </option>
                            )
                        })
                    }
                </select>
                <button type="button" onClick={save}>Save</button>
            </form>
        </Modal>
    );
};

export default UserModal;
