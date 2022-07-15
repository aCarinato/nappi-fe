import { Fragment } from 'react';
// own component
import CheckoutWizard from '../../components/purchase/CheckoutWizard';
import ShippingForm from '../../components/purchase/ShippingForm';
import UserRoute from '../../components/routes/UserRoute';

function ShippingPage() {
  return (
    <UserRoute>
      <CheckoutWizard activeStep={1} />
      <ShippingForm />
    </UserRoute>
  );
}

export default ShippingPage;
