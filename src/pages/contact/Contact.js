import React, { useRef } from "react";
import style from "./Contact.module.scss";
import Card from "../../components/card/Card";
import { FaEnvelope, FaTwitter, FaPhoneAlt } from "react-icons/fa";
import { GoLocation } from "react-icons/go";

import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        {
          publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_ID,
        }
      )
      .then(
        (result) => {
          toast.success("Message sent successfully");
        },
        (error) => {
          toast.error("Message failed to send");
        }
      );
    e.target.reset();
  };

  return (
    <section>
      <div className={`container ${style.contact}`}>
        <h2>Contact Us</h2>
        <div className={style.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={style.card}>
              <label htmlFor="">Name</label>
              <input type="text" name="user_name" require placeholder="Name" />
              <label htmlFor="">Email</label>
              <input
                type="email"
                name="user_email"
                require
                placeholder="Your active email"
              />
              <label htmlFor="">Subject</label>
              <input type="text" name="subject" require placeholder="Subject" />
              <label htmlFor="">Message</label>
              <textarea name="message" cols="30" rows="10"></textarea>
              <button className="--btn --btn-primary">Send Message</button>
            </Card>
          </form>
          <div className={style.details}>
            <Card cardClass={style.card2}>
              <h3>Our Contact Information</h3>
              <p>
                Fill the form or contact us directly using the information below
              </p>
              <div className={style.icons}>
                <span>
                  <FaPhoneAlt />
                  <p>+233050-123-4567</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>Support@email.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p>Aluguntugui, Accra Ghana</p>
                </span>
                <span>
                  <FaTwitter />
                  <p>@oyin_ojesanmi</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
