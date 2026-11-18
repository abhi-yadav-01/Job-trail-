import axios from 'axios';

const API_URL = 'http://localhost:5000/api/applications';

const getToken = () => {
    const token = localStorage.getItem('jobtrail_token')
    const headers = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return headers

}

export const fetchApplications = async () => {
    const headers = getToken()

    const { data } = await axios.get(`${API_URL}/`, headers);
    return data.data;
};

export const fetchApplicationById = async (id) => {
    const headers = getToken()
    const { data } = await axios.get(`${API_URL}/${id}`, headers);
    return data.data;
};

export const createApplication = async (appData) => {
    const payload = {
        ...appData,
        notes: [],
        interviews: [],
        history: [{ status: appData.status, at: appData.appliedDate || new Date().toLocaleDateString() }]
    };
    const headers = getToken()
    const { data } = await axios.post(`${API_URL}/`, payload, headers);
    return data.data;
};

export const updateApplication = async (id, appData) => {
    const headers = getToken()
    const { data } = await axios.patch(`${API_URL}/${id}`, appData, headers);
    return data.data;
};

export const deleteApplication = async (id) => {
    const headers = getToken()
    await axios.delete(`${API_URL}/${id}`, headers);
    return id;
};

export const fetchStats = async () => {
    const headers = getToken()
    const { data } = await axios.get(`${API_URL}/stats`, headers);
    return data.data;
};