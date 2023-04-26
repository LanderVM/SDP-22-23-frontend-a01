import React from 'react';
import { Alert } from 'antd';

export default function Error({ error }) {
  if (error) {
    return (
      <Alert
        data-cy="error"
        message="Error"
        description={error.message || JSON.stringify(error)}
        type="error"
        // showIcon
      />
    );
  }

  return null;
}
