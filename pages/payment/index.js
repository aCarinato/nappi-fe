import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CheckoutWizard from '../../components/purchase/CheckoutWizard';
import PaymentSelectionForm from '../../components/purchase/PaymentSelectionForm';
import UserRoute from '../../components/routes/UserRoute';

function PaymentPage() {
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    if (locale === 'de') router.push('/zahlung');
    if (locale === 'it') router.push('/pagamento');
  }, [locale]);

  return (
    <UserRoute>
      <CheckoutWizard activeStep={2} />
      <PaymentSelectionForm />
    </UserRoute>
  );
}

export default PaymentPage;
