import {

  Card, Col, List, Row,
} from 'antd';
import React, { useEffect, useState } from 'react';

import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { NavLink } from 'react-router-dom';
import useProducts from '../../../api/product-service';
import Error from '../../../Components/error';
import Loader from '../../../Components/loader';

export default function PopularOverview() {
  const [popularProduct, setPopularProduct] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const productApi = useProducts();

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productApi.getPopular();
        setPopularProduct(data);
      } catch (error2) {
        setError(error2);
      } finally {
        setLoading(false);
      }
    };
    fetchPopularProducts();
  }, []);

  const { lg, md } = useBreakpoint();
  const fontSizeName = lg ? '20px' : '15px';
  const fontSizePrice = lg ? '16px' : '13px';
  const pageItems = lg ? 5 : md ? 4 : 2;

  return (
    <>
      <Loader
        loading={loading}
        extraStyle={{
          position: 'absolute', top: '30vh', left: '50%', zIndex: '9999',
        }}
      />
      <Error error={error} />
      <List
        grid={{
          gutter: 16,
          xs: 2,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 5,
          xxl: 5,
        }}
        dataSource={popularProduct}
        pagination={{
          align: 'center',
          pageSize: pageItems,
        }}
        renderItem={(item) => (
          <List.Item style={{ display: 'block' }}>
            <Card>
              <Col gutter={{
                xs: 8, sm: 16, md: 24, lg: 32,
              }}
              >
                <Row>
                  <img src={item.image_URL} alt="product" width="120px" height="70px" />
                </Row>
                <Row style={{ flex: '1 0 50%' }}>
                  <NavLink
                    to={`/product/${item.product_id}`}
                    style={{
                      fontSize: fontSizeName, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap',
                    }}
                    className="linkTo"
                    data-cy="productNameUrl"
                  >
                    <b>{item.name}</b>
                  </NavLink>
                </Row>

                <Row style={{ textAlign: 'left', justifyContent: 'left', flex: '1 0 25%' }}>
                  <div data-cy="cartPrice" style={{ fontSize: fontSizePrice, color: '#ff4d4f' }}>
                    €&nbsp;
                    {item.price}
                  </div>

                </Row>

              </Col>

            </Card>
          </List.Item>
        )}
      />
    </>
  );
}
