import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CheckoutWizard from '../../components/purchase/CheckoutWizard';
import PaymentSelectionForm from '../../components/purchase/PaymentSelectionForm';
import UserRoute from '../../components/routes/UserRoute';

function PagamentoPage() {
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    if (locale === 'en') router.push('/payment');
    if (locale === 'de') router.push('/zahlung');
  }, [locale]);
  return (
    <UserRoute>
      <CheckoutWizard activeStep={2} />
      <PaymentSelectionForm />
    </UserRoute>
  );
}

export default PagamentoPage;
