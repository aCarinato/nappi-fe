import React, { Fragment } from 'react';
// next
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

function OrderSummary(props) {
  const {
    id,
    shippingAddress,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
  } = props;

  //   console.log(shippingAddress);

  const { locale } = useRouter();

  return (
    <Fragment>
      <h1>
        {locale === 'en'
          ? `Order Summary: ${id}`
          : locale === 'it'
          ? `Riepilogo ordine: ${id}`
          : `Lieferanschrift: ${id}`}
      </h1>
      <br></br>
      <h2>
        {locale === 'en'
          ? 'Shipping Address'
          : locale === 'it'
          ? 'Indirizzo di spedizione'
          : 'Lieferanschrift'}
      </h2>

      {shippingAddress && (
        <div>
          {' '}
          {shippingAddress.fullName}, {shippingAddress.address},{' '}
          {shippingAddress.city}, {shippingAddress.postalCode},{' '}
          {shippingAddress.country}
        </div>
      )}
      <br></br>
      {orderItems && (
        <div>
          <h2>
            {' '}
            {locale === 'en'
              ? 'Order Items'
              : locale === 'it'
              ? 'Articoli'
              : 'Artikels'}
          </h2>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
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
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${item.quantity * item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <br></br>
      {itemsPrice && taxPrice && (
        <>
          <h2>Order Summary</h2>
          <ul>
            <li>
              <div>
                <div>Items</div>
                <div>${itemsPrice}</div>
              </div>
            </li>{' '}
            <li>
              <div>
                <div>Tax</div>
                <div>${taxPrice}</div>
              </div>
            </li>
            <li>
              <div>
                <div>Shipping</div>
                <div>${shippingPrice}</div>
              </div>
            </li>
            <li>
              <div>
                <div>Total</div>
                <div>${totalPrice}</div>
              </div>
            </li>
          </ul>
        </>
      )}
      <br></br>
      <h2>
        {' '}
        {locale === 'en' ? 'Payment' : locale === 'it' ? 'Pagamento' : 'Betaal'}
      </h2>
      {isPaid ? (
        <div>
          {' '}
          {locale === 'en'
            ? 'Paid at'
            : locale === 'it'
            ? 'Pagato il'
            : 'Betaalt op'}{' '}
          {paidAt}
        </div>
      ) : (
        <div>
          {locale === 'en'
            ? 'Not paid'
            : locale === 'it'
            ? 'Non pagato'
            : 'Betaalt op'}
          {locale === 'en' ? (
            <Link href={`/orders-strp/${id}`}>Proceed to payment</Link>
          ) : locale === 'it' ? (
            <Link href={`/ordini-strp/${id}`}>Procedere col pagamento</Link>
          ) : (
            <Link href={`/bestellen-strp/${id}`}>Ga naar betalen</Link>
          )}
        </div>
      )}
    </Fragment>
  );
}

export default OrderSummary;
