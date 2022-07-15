import classes from './ShippingForm.module.css';
// own component
import BtnCTA from '../UI/BtnCTA';
// hooks
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
// context
import { Store } from '../../context/Store';
import { useContext } from 'react';

function ShippingForm() {
  const router = useRouter();
  const { locale } = router;

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  //   console.log(shippingAddress);

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  // const [defaultFullName, setDefaultFullName] = useState('');
  // const [defaultAddress, setDefaultAddress] = useState('');
  // const [defaultCity, setDefaultCity] = useState('');
  // const [defaultPostalCode, setDefaultPostalCode] = useState('');
  // const [defaultCountry, setDefaultCountry] = useState('');

  //   const fullNameInputRef = useRef();
  //   const addressInputRef = useRef();
  //   const cityInputRef = useRef();
  //   const codeInputRef = useRef();
  //   const countryInputRef = useRef();

  useEffect(() => {
    // setDefaultFullName(shippingAddress.fullName);
    // setDefaultAddress(shippingAddress.address);
    // setDefaultCity(shippingAddress.city);
    // setDefaultPostalCode(shippingAddress.postalCode);
    // setDefaultCountry(shippingAddress.country);
    setFullName(shippingAddress.fullName);
    setAddress(shippingAddress.address);
    setCity(shippingAddress.city);
    setPostalCode(shippingAddress.postalCode);
    setCountry(shippingAddress.country);
  }, [shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();

    // const fullName = fullNameInputRef.current.value;
    // const address = addressInputRef.current.value;
    // const city = cityInputRef.current.value;
    // const postalCode = codeInputRef.current.value;
    // const country = countryInputRef.current.value;

    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });
    localStorage.setItem(
      'nappi-cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );

    if (locale === 'en') router.push('/payment');
    if (locale === 'it') router.push('/pagamento');
    if (locale === 'de') router.push('/zahlung');
  };

  return (
    <div className={classes.container}>
      {/* <div> */}
      <form className={classes['form-container']} onSubmit={submitHandler}>
        <div className={classes.field}>
          <label className={classes.label} htmlFor="name">
            {locale === 'en'
              ? 'Full name'
              : locale === 'it'
              ? 'Nome completo'
              : 'Nutzername'}
          </label>
          <input
            // value={fullName}
            className={classes.input}
            type="text"
            id="name"
            defaultValue={fullName}
            required
            onChange={(e) => setFullName(e.target.value)}
            // ref={fullNameInputRef}
          />
        </div>
        <div className={classes.field}>
          <label className={classes.label} htmlFor="address">
            {locale === 'en'
              ? 'Address'
              : locale === 'it'
              ? 'Indirizzo'
              : 'Addresse'}
          </label>
          <input
            className={classes.input}
            type="text"
            id="address"
            required
            defaultValue={address}
            onChange={(e) => setAddress(e.target.value)}
            // ref={addressInputRef}
          />
        </div>
        <div className={classes.field}>
          <label className={classes.label} htmlFor="city">
            {locale === 'en' ? 'City' : locale === 'it' ? 'Città' : 'Stadt'}
          </label>
          <input
            className={classes.input}
            type="text"
            id="city"
            required
            defaultValue={city}
            onChange={(e) => setCity(e.target.value)}
            // ref={cityInputRef}
          />
        </div>
        <div className={classes.field}>
          <label className={classes.label} htmlFor="code">
            {locale === 'en'
              ? 'Postal Code'
              : locale === 'it'
              ? 'Codice postale'
              : 'Postleitzahl'}
          </label>
          <input
            className={classes.input}
            type="text"
            id="postal"
            required
            defaultValue={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            // ref={codeInputRef}
          />
        </div>
        <div className={classes.field}>
          <label className={classes.label} htmlFor="country">
            {locale === 'en' ? 'Country' : locale === 'it' ? 'Paese' : 'Land'}
          </label>
          <input
            className={classes.input}
            type="text"
            id="country"
            required
            defaultValue={country}
            onChange={(e) => setCountry(e.target.value)}
            // ref={countryInputRef}
          />
        </div>
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
            // onCLickAction={submitHandler}
          />
        </div>
      </form>
    </div>
  );
}

export default ShippingForm;
