import CheckoutWizard from '../../components/purchase/CheckoutWizard';
import PaymentSelectionForm from '../../components/purchase/PaymentSelectionForm';
import UserRoute from '../../components/routes/UserRoute';

function PaymentPage() {
  return (
    <UserRoute>
      <CheckoutWizard activeStep={2} />
      <PaymentSelectionForm />
    </UserRoute>
  );
}

export default PaymentPage;
