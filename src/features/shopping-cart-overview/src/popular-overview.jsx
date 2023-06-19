import {

  Card, Carousel, Col, Row,
} from 'antd';
import React, { useEffect, useState } from 'react';

import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { useNavigate } from 'react-router-dom';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import useProducts from '../../../api/product-service';
import Error from '../../../Components/error';
import Loader from '../../../Components/loader';
import '../shopping-cart.css';

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

  const navigate = useNavigate();

  const { lg, md } = useBreakpoint();
  const fontSizeName = lg ? '20px' : '15px';
  const fontSizePrice = lg ? '16px' : '13px';
  const pageItems = lg ? 4 : md ? 3 : 2;
  const carouselMargin = lg ? '1vw' : md ? '2vw' : '3vw';

  return (
    <>
      <Loader
        loading={loading}
        extraStyle={{
          position: 'absolute', top: '30vh', left: '50%', zIndex: '9999',
        }}
      />
      <Error error={error} />
      <Carousel style={{ marginLeft: carouselMargin, marginRight: carouselMargin }} arrows dots={false} nextArrow={<RightOutlined />} prevArrow={<LeftOutlined />} infinite slidesToShow={pageItems} slidesToScroll={1} autoplay>
        {popularProduct.map((item) => (
          <Card onClick={() => navigate(`/product/${item.product_id}`)}>
            <Col gutter={{
              xs: 8, sm: 16, md: 24, lg: 32,
            }}
            >
              <Row>
                <img src={item.image_URL} alt="product" width="120px" height="70px" />
              </Row>
              <Row style={{ flex: '1 0 50%' }}>
                <p
                  style={{
                    fontSize: fontSizeName, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap',
                  }}
                  data-cy="productNameUrl"
                >
                  <b>{item.name}</b>
                </p>
              </Row>
              <Row style={{ textAlign: 'left', justifyContent: 'left', flex: '1 0 25%' }}>
                <div data-cy="cartPrice" style={{ fontSize: fontSizePrice, color: '#ff4d4f' }}>
                  €&nbsp;
                  {item.price}
                </div>
              </Row>
            </Col>
          </Card>
        ))}
      </Carousel>
    </>
  );
}
