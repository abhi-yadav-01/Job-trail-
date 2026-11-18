import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const loginUser = async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const payload = {
        "email": normalizedEmail,
        "password": password
    }
    const { data } = await axios.post(`${API_URL}/login`, payload);

    console.log("data", data.data.user)

    const user = data.data.user

    const { ...safeUser } = user;
    return {
        user: safeUser,
        token: data.data.token
    };
};

export const registerUser = async ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    const payload = {
        "name": name,
        "email": normalizedEmail,
        "password": password,
    }

    const { data } = await axios.post(`${API_URL}/register`, payload
    );
    console.log("data", data);

    const user = data.data.user


    const newUser = {
        name: user.name,
        email: user.email,
        password: password,
        masterResume: '',
        createdAt: user.createdAt
    };

    const { data: resultData } = await axios.post(`${API_URL}/login`, newUser);
    console.log(resultData);
    const { token, ...safeUser } = resultData.data;
    console.log("created", resultData)
    console.log("im token", resultData.data.token)
    console.log("new user", safeUser)
    return {
        user: safeUser,
        token: token
    };
};