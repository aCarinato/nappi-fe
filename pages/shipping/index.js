// hooks
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// own component
import CheckoutWizard from '../../components/purchase/CheckoutWizard';
import ShippingForm from '../../components/purchase/ShippingForm';
import UserRoute from '../../components/routes/UserRoute';

function ShippingPage() {
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    if (locale === 'it') router.push('/spedizione');
    if (locale === 'de') router.push('/versand');
  }, [locale]);

  return (
    <UserRoute>
      <CheckoutWizard activeStep={1} />
      <ShippingForm />
    </UserRoute>
  );
}

export default ShippingPage;
