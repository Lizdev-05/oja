import React, { useState } from "react";
import style from "./CheckoutDetails.module.scss";
import Card from "../../components/card/Card";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch } from "react-redux";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "../../redux/slice/checkoutSlice";

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

  const dispatch = useDispatch();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({ ...billingAddress, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
  };

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
            {/* // Billing Address */}
            <Card cardClass={style.card}>
              <h3>billing Address</h3>
              <label htmlFor="">Recipient's Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Recipient's Name"
                value={billingAddress.name}
                onChange={(e) => handleBilling(e)}
              />

              <label htmlFor="">Address line 1</label>
              <input
                type="text"
                placeholder="address line 1"
                required
                name="line1"
                value={billingAddress.line1}
                onChange={(e) => handleBilling(e)}
              />
              <label htmlFor="">Address line 2</label>
              <input
                type="text"
                placeholder="address line 2"
                name="line2"
                value={billingAddress.line2}
                onChange={(e) => handleBilling(e)}
              />
              <label htmlFor="">City</label>
              <input
                type="text"
                placeholder="city"
                required
                name="city"
                value={billingAddress.city}
                onChange={(e) => handleBilling(e)}
              />
              <label htmlFor="">State</label>
              <input
                type="text"
                placeholder="state"
                required
                name="state"
                value={billingAddress.state}
                onChange={(e) => handleBilling(e)}
              />
              <label htmlFor="">Postal Code</label>
              <input
                type="text"
                placeholder="postal code"
                required
                name="postal_code"
                value={billingAddress.postal_code}
                onChange={(e) => handleBilling(e)}
              />

              <CountryDropdown
                className={style.select}
                valueType="short"
                value={billingAddress.country}
                onChange={(val) => {
                  handleBilling({ target: { name: "country", value: val } });
                }}
              />

              <label htmlFor="">Phone</label>
              <input
                type="text"
                placeholder="phone"
                name="phone"
                value={billingAddress.phone}
                onChange={(e) => handleBilling(e)}
              />
              <button type="submit" className="--btn --btn-primary">
                Proceed to checkout
              </button>
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
