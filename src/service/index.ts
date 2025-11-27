import axios from 'axios';

const BASEURL = 'http://127.0.0.1:5000';

export const modelLimitApi = async () => {
  try {
    const response = await axios.get(`${BASEURL}/modelLimit`);
    return response.data;
  } catch (error: any) {
    return (
      error?.response || { status: false, message: 'Something went wrong' }
    );
  }
};

export const historyApi = async () => {
  try {
    console.log('====================================');
    console.log(BASEURL);
    console.log('====================================');
    const response = await axios.get(`${BASEURL}/history`);
    console.log('response.data', response.data);

    return response.data;
  } catch (error: any) {
    console.log('err', error);

    return (
      error?.response || { status: false, message: 'Something went wrong' }
    );
  }
};

export const analyzeApi = async (formData: FormData) => {
  try {
    const response = await axios.post(`${BASEURL}/analyze`, formData);
    return response.data;
  } catch (error: any) {
    return (
      error?.response || { status: false, message: 'Something went wrong' }
    );
  }
};
