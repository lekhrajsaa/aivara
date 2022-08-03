import axios from "axios";

const X_API_KEY = process.env.NEXT_PUBLIC_XAPI;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_API;


export const notificationApi = async () => {
    const token = localStorage.getItem('token');

    var data = JSON.stringify({
        query: `{
        getNotification{
            notifications{
                clientName
                id
                reportId
                reportStatus
                customTimeStamp
                checked
            }
            status
        }
    }`,
        variables: {}
    });

    var config = {
        method: 'post',
        url: `${SERVER_URL}api/v1`,
        headers: {
            'x-api-key': X_API_KEY,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: data
    };

    try {
        const response = await axios(config);
        return response;
    } catch (error) {
        throw error;
    }
}