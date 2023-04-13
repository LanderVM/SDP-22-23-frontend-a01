export default function Error({ error }) {

  const margin = {
    margin: "20% 0"
  }

  if (error) {
    return (
      <div className="mx-5 alert alert-danger" data-cy="transactions_error">
        <h4 className="alert-heading">An error occured</h4>
        {error.message || JSON.stringify(error)}
      </div>
    );
  }

  return null;
}