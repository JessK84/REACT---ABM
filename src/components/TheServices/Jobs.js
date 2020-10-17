import axios from 'axios';

const baseJobs = 'https://5f518d325e98480016123ada.mockapi.io/api/v1/jobs';


export const getJobs = async () => {
    try {
        const res = await axios.get(baseJobs);
        return res.data;
    }catch(err) {
        throw new Error(`Unhandled - getJobs: ${err}`);
    }
}

