import ShoppingCartForm from "./ShoppingCartForm";

const buttonStyle = {
  borderRadius: '8px',
  backgroundColor: '#d4403b',
  margin: '5px',
  maxWidth: '90%'
}

export default function ShoppingCartOverview ({numberOfArticles, priceArticles, shippingCost,onPurchase}) {

  const subTotal = priceArticles + shippingCost;

  <div style={{margin:'5px',padding:'5px',maxWidth:'20%'}}>
    <div>Overview</div>
    <div>
      <p style={{textAlign:'left'}}>Articles &#40{numberOfArticles}&#41:</p>
      <p style={{textAlign:'right'}}>€ {priceArticles}</p>
    </div>
    <div>
      <p  style={{textAlign:'left'}}>shipping costs: </p>
      <p  style={{textAlign:'right'}}>€ {shippingCost}</p>
    </div>
    <div>
      <p>Subtotal: </p>
      <p>€ {subTotal}</p>
    </div>
    <div>
      <ShoppingCartForm onOrder={onPurchase}/>
    </div>
    <div style={{borderTop : '2px solid black'}}>
      <button onClick={onPurchase} style ={buttonStyle}>
          Proceed to checkout
      </button>
    </div>
  </div>
}