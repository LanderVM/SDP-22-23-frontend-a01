import {
  useAuth0,
} from '@auth0/auth0-react';
import axios from 'axios';
import {
  useCallback,
} from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/orders`;

export default function useOrder() {
  const {
    getAccessTokenSilently,
  } = useAuth0();

  const placeOrder = useCallback(async (order) => {
    const token = await getAccessTokenSilently();
    const {
      id,
      ...values
    } = order;
    const values2 = values.order_lines.map((e) => {
      const { productId, amount } = e;
      return {
        PRODUCT_product_id: productId,
        product_count: amount,
      };
    });
    const values3 = {
      ...values,
      order_lines: values2,
    };
    await axios({
      method: id ? 'PUT' : 'POST',
      url: `${baseUrl}/${id ?? ''}`,
      data: values3,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [getAccessTokenSilently]);

  return {
    placeOrder,
  };
}
