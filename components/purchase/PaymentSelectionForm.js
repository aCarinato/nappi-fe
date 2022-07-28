// styles
import classes from './PaymentSelectionForm.module.css';
// own components
import BtnCTA from '../UI/BtnCTA';
// hooks
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
// context
import { Store } from '../../context/Store';

function PaymentSelectionForm() {
  const router = useRouter();
  const { locale } = router;

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  //   const paymentMethodList =
  //   locale === 'en'
  //     ? ['User Login', 'Shipping Address', 'Payment Method', 'Place Order']
  //     : locale === 'it'
  //     ? ['Login', 'Indirizzo spedizione', 'Pagamento', 'Conferma']
  //     : [
  //         'Benutzer-Anmeldung',
  //         'Lieferanschrift',
  //         'Zahlungsmethode',
  //         'Bestellung aufgeben',
  //       ];

  const [selectedMethod, setSelectedMethod] = useState();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!selectedMethod) return alert('Select payment method');

    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedMethod });
    localStorage.setItem(
      'nappi-cart',
      JSON.stringify({ ...cart, paymentMethod: selectedMethod })
    );

    if (locale === 'en') router.push('/place-order');
    if (locale === 'it') router.push('/completa-ordine');
    if (locale === 'de') router.push('/bestellung-aufgeben');
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      if (locale === 'en') return router.push('/shipping');
      if (locale === 'it') return router.push('/spedizione');
      if (locale === 'de') return router.push('/versand');
    }

    setSelectedMethod(paymentMethod || '');
  }, [paymentMethod, shippingAddress.address, locale]);

  return (
    <div className={classes.container}>
      {/* <div> */}
      <form className={classes['form-container']} onSubmit={submitHandler}>
        <h3>
          {locale === 'en'
            ? 'Payment Method'
            : locale === 'it'
            ? 'Metodo di pagamento'
            : 'Zahlungsmethode'}
        </h3>
        {['Paypal', 'Stripe', 'Cash on delivery'].map((payment) => (
          <div className={classes.field} key={payment}>
            <label className={classes.label} htmlFor={payment}>
              {payment}
            </label>
            <input
              className={classes.input}
              type="radio"
              id={payment}
              checked={selectedMethod === payment}
              onChange={() => setSelectedMethod(payment)}
            />
          </div>
        ))}

        <div className={classes['CTA-wrapper']}>
          <BtnCTA
            type="submit"
            label={
              locale === 'en'
                ? 'Next'
                : locale === 'it'
                ? 'Continua'
                : 'Nächste'
            }
            // onCLickAction={loginHandler}
          />
        </div>
      </form>
    </div>
  );
}

export default PaymentSelectionForm;
