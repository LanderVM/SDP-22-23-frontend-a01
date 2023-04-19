import React from 'react';

export default function Error({ error }) {
  if (error) {
    return (
      <div className="mx-5 alert alert-danger" data-cy="transactions_error">
        <h4 className="alert-heading">An error occurred</h4>
        {error.message || JSON.stringify(error)}
      </div>
    );
  }

  return null;
}
