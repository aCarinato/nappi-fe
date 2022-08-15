import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classes from './OrderSummary.module.css';

import { useState } from 'react';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';

function OrderSummary(props) {
  const {
    id,
    shippingAddress,
    isDelivered,
    deliveredAt = '',
    paymentMethod,
    isPaid,
    paidAt,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPending,
    loadingPay,
    createOrder,
    onApprove,
    onError,
  } = props;

  const { locale } = useRouter();

  // console.log(id);

  // ORDER DELIVERY
  const [loadingDeliver, setLoadingDeliver] = useState(false);
  const deliverOrderHandler = async () => {
    try {
      setLoadingDeliver(true);
      // const { data } = await axios.put(
      //   `${process.env.NEXT_PUBLIC_API}/orders/${id}/deliver`,
      //   {}
      // );
      // console.log(id);
      setLoadingDeliver(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div>
        <h2>
          {locale === 'en'
            ? 'Shipping Address'
            : locale === 'it'
            ? 'Indirizzo di spedizione'
            : 'Lieferanschrift'}
        </h2>
        <div>
          {shippingAddress.fullName}, {shippingAddress.address},{' '}
          {shippingAddress.city}, {shippingAddress.postalCode},{' '}
          {shippingAddress.country}
        </div>
      </div>
      <br></br>
      <div>
        <h2>
          {' '}
          {locale === 'en'
            ? 'Payment Method'
            : locale === 'it'
            ? 'Metodo di pagamento'
            : 'Zahlungsmethode'}
        </h2>
        <div>{paymentMethod}</div>
        {isPaid ? <div>Paid at {paidAt}</div> : <div>Not paid</div>}
      </div>
      <br></br>
      <div>
        <h2>Order Items</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th className="    p-5 text-right">Quantity</th>
              <th className="  p-5 text-right">Price</th>
              <th className="p-5 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item) => (
              <tr key={item._id} className="border-b">
                <td>
                  <Link
                    href={
                      locale === 'en'
                        ? `/product/${item.slugEN}`
                        : locale === 'it'
                        ? `/prodotto/${item.slugIT}`
                        : `/produkt/${item.slugDE}`
                    }
                  >
                    <a className="flex items-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                      ></Image>
                      &nbsp;
                      {item.name}
                    </a>
                  </Link>
                </td>
                <td className=" p-5 text-right">{item.quantity}</td>
                <td className="p-5 text-right">${item.price}</td>
                <td className="p-5 text-right">
                  ${item.quantity * item.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br></br>
      <div>
        <div className="card  p-5">
          <h2 className="mb-2 text-lg">Order Summary</h2>
          <ul>
            <li>
              <div className="mb-2 flex justify-between">
                <div>Items</div>
                <div>${itemsPrice}</div>
              </div>
            </li>{' '}
            <li>
              <div className="mb-2 flex justify-between">
                <div>Tax</div>
                <div>${taxPrice}</div>
              </div>
            </li>
            <li>
              <div className="mb-2 flex justify-between">
                <div>Shipping</div>
                <div>${shippingPrice}</div>
              </div>
            </li>
            <li>
              <div className="mb-2 flex justify-between">
                <div>Total</div>
                <div>${totalPrice}</div>
              </div>
            </li>
            {!isPaid && (
              // <div>ORDINE NON PAGATO!!</div>
              <li>
                {isPending ? (
                  <div>Loading...</div>
                ) : (
                  <div>
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    ></PayPalButtons>
                  </div>
                )}
                {loadingPay && <div>Loading...</div>}
              </li>
            )}
            <br></br>
            {isPaid && (
              <div>
                <h2>
                  {' '}
                  {locale === 'en'
                    ? 'Order is paid'
                    : locale === 'it'
                    ? 'Ordine pagato'
                    : 'Bestellung ist bezahlt'}
                </h2>
              </div>
            )}
            <br></br>
            {isDelivered ? (
              <div>
                <h2>
                  {locale === 'en'
                    ? 'Order is shipped / delivered'
                    : locale === 'it'
                    ? 'Ordine spedito / consegnato'
                    : 'Bestellung ist verzenden'}
                  Delivered at {deliveredAt}
                </h2>{' '}
              </div>
            ) : (
              <div>
                <h2>
                  {locale === 'en'
                    ? 'Not shipped / delivered'
                    : locale === 'it'
                    ? 'Non spedito / consegnato'
                    : 'Niet verzenden'}
                </h2>{' '}
              </div>
            )}
          </ul>
          {loadingDeliver ? (
            <div>
              {' '}
              {locale === 'en'
                ? 'Loading...'
                : locale === 'it'
                ? 'Caricamento...'
                : 'Opladen...'}
            </div>
          ) : (
            <button onClick={deliverOrderHandler}>
              {' '}
              {locale === 'en'
                ? 'Deliver order'
                : locale === 'it'
                ? 'Consegna ordine'
                : 'Verzenden bestell'}
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default OrderSummary;
