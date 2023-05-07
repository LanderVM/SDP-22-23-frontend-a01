import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/profile`;

const useProfile = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getCompanyInfo = useCallback(async () => {
    const token = await getAccessTokenSilently();
    // console.log(`het token: ${token}`);
    const { data } = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(`de data: ${data}`);
    console.log(data.items);
    return data.items;
  }, [getAccessTokenSilently]);

  const getAllCollegues = useCallback(async () => {
    const token = await getAccessTokenSilently();

    const { data } = await axios.get(`${baseUrl}/colleagues`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.items;
  }, [getAccessTokenSilently]);

  return { getCompanyInfo, getAllCollegues };
};

export default useProfile;
