// hooks
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// own component
import CheckoutWizard from '../../components/purchase/CheckoutWizard';
import ShippingForm from '../../components/purchase/ShippingForm';
import UserRoute from '../../components/routes/UserRoute';

function VersandPage() {
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    if (locale === 'en') router.push('/shipping');
    if (locale === 'it') router.push('/spedizione');
  }, [locale]);

  return (
    <UserRoute>
      <CheckoutWizard activeStep={1} />
      <ShippingForm />
    </UserRoute>
  );
}

export default VersandPage;
