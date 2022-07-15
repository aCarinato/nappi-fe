// hooks
import { useRouter } from 'next/router';
// own component
import CheckoutWizard from '../../components/purchase/CheckoutWizard';
import ShippingForm from '../../components/purchase/ShippingForm';
import UserRoute from '../../components/routes/UserRoute';

function VersandPage() {
  const router = useRouter();
  const { locale } = router;

  if (locale === 'en') router.push('/shipping');
  if (locale === 'it') router.push('/spedizione');

  return (
    <UserRoute>
      <CheckoutWizard activeStep={1} />
      <ShippingForm />
    </UserRoute>
  );
}

export default VersandPage;
