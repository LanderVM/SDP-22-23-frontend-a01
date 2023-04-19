import { useForm } from "react-hook-form"; 



export default function ShoppingCartForm ({onOrder}) {
  
  const { register, handleSubmit, reset,formState:{errors,isSubmitting} } = useForm();
  
  const onSubmit = (data) => {
    const location = data;
    onOrder(location);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
      <div classname="form-group">
        <label htmlFor="streetname" className="form-label">Streetname</label>
        <input {...register('streetnumber',{required:'streetname is required'})} disabled={isSubmitting}
        id='streetname' class="form-control" type="text" placeholder="streetname"/>
      </div>

      <div classname="form-group">
        <label htmlFor="streetnumber" className="form-label">Streetnumber</label>
        <input {...register('streetnumber',{required:'streetnumber is required'})} disabled={isSubmitting}
        id='streetnumber' class="form-control" type="number" step='1' placeholder="streetnumber"/>
      </div>

      <div classname="form-group">
        <label htmlFor="postalcode" className="form-label">Postal code</label>
        <input {...register('postalcode',{required:'postalcode is required'})} disabled={isSubmitting}
        id='postalcode' class="form-control" type="text" placeholder="postal code"/>
      </div>

      <div classname="form-group">
        <label htmlFor="country" className="form-label">Country</label>
        <input {...register('country',{required:'country is required'})} disabled={isSubmitting}
        id='country' class="form-control" type="text" placeholder="country"/>
      </div>

      <button type="submit" class="btn btn-primary" disabled={isSubmitting}>Submit</button>
    </form>
  );
}