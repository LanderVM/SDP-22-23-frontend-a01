import ShoppingCartContentElement from "./ShoppingCartContentElement";



export default function ShoppingCartContent ({onRemove,onIncrease,products,productsAmount}) {
  return(
    <div style={{maxWidth:'80%',margin:'5px'}}>
      <p>Shopping cart</p>
      <div>
        {products.map((el)=>{
          const amount = productsAmount.forEach(item=>{
            if (item.id===el.product_id){
              return item.amount;
            }
          })
          return <ShoppingCartContentElement key={el.product_id} name={el.name} amount={amount} theId={el.product_id} onRemove={onRemove} onIncrease={onIncrease}/>
        })}
      </div>
    </div>
  );
}