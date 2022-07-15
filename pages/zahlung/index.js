import CheckoutWizard from '../../components/purchase/CheckoutWizard';
import PaymentSelectionForm from '../../components/purchase/PaymentSelectionForm';
import UserRoute from '../../components/routes/UserRoute';
// hooks
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function ZahlungPage() {
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    if (locale === 'en') router.push('/payment');
    if (locale === 'it') router.push('/pagamento');
  }, [locale]);

  return (
    <UserRoute>
      <CheckoutWizard activeStep={2} />
      <PaymentSelectionForm />
    </UserRoute>
  );
}

export default ZahlungPage;
