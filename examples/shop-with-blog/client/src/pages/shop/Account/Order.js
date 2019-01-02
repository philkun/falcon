import React from 'react';
import { H1, GridLayout } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
import { GetOrderQuery } from '@deity/falcon-ecommerce-uikit';

const Order = ({ match }) => {
  const id = parseInt(match.params.id, 10);

  return (
    <GetOrderQuery variables={{ id }}>
      {({ order }) => (
        <GridLayout mb="md" gridGap="md">
          <H1>
            <T id="order.title" orderId={order.incrementId} />
          </H1>
        </GridLayout>
      )}
    </GetOrderQuery>
  );
};

export default Order;
