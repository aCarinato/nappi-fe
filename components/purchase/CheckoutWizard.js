import { useRouter } from 'next/router';
import classes from './CheckoutWizard.module.css';

function CheckoutWizard({ activeStep = 0 }) {
  const router = useRouter();
  const { locale } = router;

  const steps =
    locale === 'en'
      ? ['User Login', 'Shipping Address', 'Payment Method', 'Place Order']
      : locale === 'it'
      ? ['Login', 'Indirizzo spedizione', 'Pagamento', 'Conferma']
      : [
          'Benutzer-Anmeldung',
          'Lieferanschrift',
          'Zahlungsmethode',
          'Bestellung aufgeben',
        ];

  return (
    <div className={`${classes.container}`}>
      {steps.map((step, index) => (
        <div key={step} className={classes.item}>
          <div
            className={`
         ${
           index <= activeStep ? classes.activeItemTxt : classes.inactiveItemTxt
         }
         `}
          >
            {step}
          </div>
          <div
            className={`
         ${index <= activeStep ? classes.activeItemBottom : ''}
         `}
          ></div>
        </div>
      ))}
    </div>
  );
}

export default CheckoutWizard;
