import React, {
  useCallback,

  useContext, useEffect,
  useState,
} from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { List } from 'antd';
import { ProductsForShoppingCartContext } from '../../Contexts/ProductsForShoppingCartContext';
import Error from '../Error';
import Loader from '../Loader';
import ShoppingCartContent from './ShoppingCartContent';
import ShoppingCartOverview from './ShoppingCartOverview';
import useProducts from '../../api/product';

export default function ShoppingCart() {
  const {
    productsFromContext,
  } = useContext(ProductsForShoppingCartContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [myCart, setCart] = useState(null);
  const productenApi = useProducts();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        setError(null);
        await setCart(productsFromContext);
      } catch (error2) {
        setError(error2);
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [productsFromContext]);

  const handleView = useCallback(async (nameToView) => {
    try {
      setError(null);
      await productenApi.getByName(nameToView);
    } catch (err) {
      setError(err);
    }
  }, []);
  if (!myCart || myCart.length === 0) {
    return (
      <div>There are no products available in your cart</div>

    );
  }
  return (

    <Container fluid>
      <Row style={{ margin: '2% 4%' }}>

        <Col>
          <Loader loading={loading} />
          <Error error={error} />
          <div>
            <List
              bordered
              style={{ backgroundColor: 'white' }}
              dataSource={myCart}
              pagination={{
                align: 'center',
                pageSize: 10,
              }}
              renderItem={(item) => (
                <List.Item key={item.product_id} style={{ display: 'block' }}>
                  {!loading && !error ? <ShoppingCartContent cart={item} onView={handleView} context={ProductsForShoppingCartContext} />
                    : null}

                </List.Item>
              )}
            />
          </div>

        </Col>
        <Col md="3">
          <ShoppingCartOverview cart={myCart} />
        </Col>
      </Row>
    </Container>

  );
}
