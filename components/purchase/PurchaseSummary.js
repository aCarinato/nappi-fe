import classes from './PurchaseSummary.module.css';
import BtnCTA from '../UI/BtnCTA';
import { useRouter } from 'next/router';

function PurchaseSummary(props) {
  const router = useRouter();
  const { locale } = router;

  const { itemsPrice, taxPrice, shippingPrice, totalPrice, placeOrderHandler } =
    props;
  return (
    <div>
      <ul>
        <li>
          <div>
            <div>
              {locale === 'en'
                ? 'Items'
                : locale === 'it'
                ? 'Articoli'
                : 'Artikel'}
            </div>
            <div>EUR {itemsPrice}</div>
          </div>
        </li>
        <li>
          <div>
            <div>
              {locale === 'en' ? 'VAT' : locale === 'it' ? 'IVA' : 'MwSt'}
            </div>
            <div>EUR {taxPrice}</div>
          </div>
        </li>
        <li>
          <div>
            <div>
              {locale === 'en'
                ? 'Shipping Price'
                : locale === 'it'
                ? 'Spedizione'
                : 'Versandkosten'}
            </div>
            <div>EUR {shippingPrice}</div>
          </div>
        </li>
        <li>
          <div>
            <div>Tax</div>
            <div>EUR {totalPrice}</div>
          </div>
        </li>
        <li>
          <BtnCTA
            type="button"
            label={
              locale === 'en'
                ? 'Place order'
                : locale === 'it'
                ? 'Completa ordine'
                : 'Bestellung aufgeben'
            }
            onCLickAction={placeOrderHandler}
          />
        </li>
      </ul>
    </div>
  );
}

export default PurchaseSummary;
