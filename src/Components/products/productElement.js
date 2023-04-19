import React, { useCallback } from 'react';

export default function ProductElement({
  productId, name, price, stock, photo, onView,
}) {
  const handleView = useCallback((e) => {
    e.preventDefault();
    onView(productId);
  }, [productId, onView]);

  return (
    <span className="col card-body container">
      <div className="row">
        <img src={photo} alt="product" className="p-2 rounded-2" />
        <div>
          <h4 className="col">{name}</h4>
          <div className="col">
            Price:
            {price}
            $
          </div>
          <div className="row">
            <div className="col">
              In Stock:
              {stock}
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
