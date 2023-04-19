import React, { useCallback } from 'react';

export default function ProductElement({
  product, onView,
}) {
  const handleView = useCallback((e) => {
    e.preventDefault();
    onView(product.product_id);
  }, [product.product_id, onView]);

  return (
    <span className="col card-body container">
      <div className="row">
        <img src={product.photo} alt="product" className="p-2 rounded-2" />
        <div>
          <h4 className="col">{product.name}</h4>
          <div className="col">
            Price:&nbsp;
            {product.price}
            &nbsp;€
          </div>
          <div className="row">
            <div className="col">
              In Stock:&nbsp;
              {product.stock}
            </div>
            <div className="col text-end">
              <button type="button" onClick={handleView}>View</button>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
}
