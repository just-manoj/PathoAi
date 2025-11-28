import axios from 'axios';

const BASEURL = 'https://pathoai-api-production.up.railway.app';

export const modelLimitApi = async () => {
  try {
    const response = await axios.get(`${BASEURL}/modelLimit`);
    return response.data;
  } catch (error: any) {
    return (
      error?.response?.data ||
      error?.response || { status: false, message: 'Something went wrong' }
    );
  }
};

export const historyApi = async () => {
  try {
    const response = await axios.get(`${BASEURL}/history`);
    return response.data;
  } catch (error: any) {
    return (
      error?.response?.data ||
      error?.response || { status: false, message: 'Something went wrong' }
    );
  }
};

export const analyzeApi = async (formData: FormData) => {
  try {
    const response = await axios.post(`${BASEURL}/analyze`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
    console.log('res', response);

    return response.data;
  } catch (error: any) {
    console.log('res', error?.response);

    return (
      error?.response?.data ||
      error?.response || { status: false, message: 'Something went wrong' }
    );
  }
};

export const feedbackApi = async (
  id: string,
  rating: number,
  notes: string,
) => {
  try {
    const response = await axios.post(
      `${BASEURL}/feedback?id=${id}`,
      { rating, notes },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      },
    );
    return response.data;
  } catch (error: any) {
    return (
      error?.response?.data ||
      error?.response || { status: false, message: 'Something went wrong' }
    );
  }
};
