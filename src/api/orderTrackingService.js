import {
  useAuth0,
} from '@auth0/auth0-react';
import axios from 'axios';
import {
  useCallback,
} from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/order`;

export default function useOrderTracker() {
  const {
    getAccessTokenSilently,
  } = useAuth0();

  const getTrackingStatus = useCallback(async ({ trackingCode, verificationCode }) => {
    const token = await getAccessTokenSilently();
    const {
      data,
    } = await axios.get(`${baseUrl}/?trackAndTraceCode=${trackingCode}&verificationCode=${verificationCode}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }, [getAccessTokenSilently]);

  return {
    getTrackingStatus,
  };
}
