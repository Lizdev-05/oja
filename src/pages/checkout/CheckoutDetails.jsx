import React, { useState } from "react";
import style from "./CheckoutDetails.module.scss";
import Card from "../../components/card/Card";
import { CountryDropdown } from "react-country-region-selector";

const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({ ...billingAddress, [name]: value });
  };

  const handleSubmit = (e) => {};

  return (
    <section>
      <div className={`container ${style.checkout}`}>
        <h1>Checkout Details</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={style.card}>
              <h3>Shipping Address</h3>
              <label htmlFor="">Recipient's Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Recipient's Name"
                value={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
              />

              <label htmlFor="">Address line 1</label>
              <input
                type="text"
                placeholder="address line 1"
                required
                name="line1"
                value={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
              />
              <label htmlFor="">Address line 2</label>
              <input
                type="text"
                placeholder="address line 2"
                required
                name="line2"
                value={shippingAddress.line2}
                onChange={(e) => handleShipping(e)}
              />
              <label htmlFor="">City</label>
              <input
                type="text"
                placeholder="city"
                required
                name="city"
                value={shippingAddress.city}
                onChange={(e) => handleShipping(e)}
              />
              <label htmlFor="">State</label>
              <input
                type="text"
                placeholder="state"
                required
                name="state"
                value={shippingAddress.state}
                onChange={(e) => handleShipping(e)}
              />
              <label htmlFor="">Postal Code</label>
              <input
                type="text"
                placeholder="postal code"
                required
                name="postal_code"
                value={shippingAddress.postal_code}
                onChange={(e) => handleShipping(e)}
              />
              {/* <label htmlFor="">Country</label>
              <input
                type="text"
                placeholder="country"
                required
                name="country"
                value={shippingAddress.country}
                onChange={(e) => handleShipping(e)}
              /> */}

              <CountryDropdown
                className={style.select}
                valueType="short"
                value={shippingAddress.country}
                onChange={(val) => {
                  handleShipping({ target: { name: "country", value: val } });
                }}
              />

              <label htmlFor="">Phone</label>
              <input
                type="text"
                placeholder="phone"
                name="phone"
                value={shippingAddress.phone}
                onChange={(e) => handleShipping(e)}
              />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
