import React, { useState, useEffect, useReducer } from 'react';
import Table2 from '../Table2/Table2';
import { jobReducer, INIT_JOB, ELIMINAR_JOB, EDIT_JOB } from '../Reducers/ReducersJobs';
import JobModal  from '../JobModal/JobModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { getJobs } from '../TheServices/Jobs';

const JobsPages = () => {

    const [jobs, jobDispatch] = useReducer(jobReducer, []);
    const [displayJobModal, setDisplayJobModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState();
    
    // const getData2 = async (url, dispatch, actionType) => {
    //   try {
    //     const res = await axios.get(url);
    //     dispatch({ type: actionType, payload: res.data });
    //   } catch (err) {
    //     alert("Error getting data", err);
    //   }
    }
  
    // const getJobs = async () => getData2("https://5f518d325e98480016123ada.mockapi.io/api/v1/jobs", jobDispatch, INIT_JOB);


    const editJobs = (job) => {
        setSelectedJob(job);
        setDisplayJobModal(true);
      }
      
    const deleteJob = (job) => {
        console.log("Ver", job.id)
        axios.delete(`https://5f518d325e98480016123ada.mockapi.io/api/v1/jobs/${job.id}`)
        .then(res => {
        console.log("ver", res.data)
        jobDispatch({ type: ELIMINAR_JOB, payload: res.data });
        }) .catch(err => console.warn('err')) 
    }


    useEffect(() => {
      const promise = getJobs();
      promise.then(data => jobDispatch({ type: TODOS_INIT, data }));
  }, []);


    const headers2 = ["Job Title", "Id", "Actions"];
    return (
      <React.Fragment>
      {
        displayJobModal ?
          <JobModal job={selectedJob} close={() => setDisplayJobModal(false)} jobs={jobs} jobDispatch={jobDispatch} actionType={EDIT_JOB}/>
          :
          null
      }
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
  </React.Fragment>
     );
}

export default JobsPages;