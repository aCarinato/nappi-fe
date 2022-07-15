import { Fragment } from 'react';
import CheckoutWizard from '../../components/purchase/CheckoutWizard';

function ShippingPage() {
  return (
    <Fragment>
      <CheckoutWizard activeStep={1} />
    </Fragment>
  );
}

export default ShippingPage;
