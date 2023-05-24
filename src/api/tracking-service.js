import {
  useAuth0,
} from '@auth0/auth0-react';
import axios from 'axios';
import {
  useCallback,
} from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/orders`;

export default function useOrderTracker() {
  const {
    getAccessTokenSilently,
  } = useAuth0();

  const getTrackingStatus = useCallback(async ({ trackingCode, verificationCode }) => {
    const {
      data,
    } = await axios.get(`${baseUrl}/?trackAndTraceCode=${trackingCode}&verificationCode=${verificationCode}`, {
    });
    return data;
  }, [getAccessTokenSilently]);

  const getTrackingCodesByOrder = useCallback(async (orderId) => {
    const token = await getAccessTokenSilently();
    const {
      data,
    } = await axios.get(`${baseUrl}/codes/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }, [getAccessTokenSilently]);

  return {
    getTrackingStatus,
    getTrackingCodesByOrder,
  };
}
