import React, { useState } from "react";

import { images } from "../../constants";
import { MotionWrap, AppWrap } from "../../wrapper";
import { client } from "../../client";
import "./Footer.scss";

function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: "contact",
      name: name,
      email: email,
      message: message,
    };

    client.create(contact).then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    });
  };

  return (
    <>
      <h2 className="head-text">端杯咖啡一起聊聊吧</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:uniqueye608@gmail.com" className="p-text">
            uniqueye608@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +86 188 1522 1264" className="p-text">
            +86 188 1522 1264
          </a>
        </div>
      </div>
      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input type="text" className="p-text" placeholder="你的名字" name="name" value={name} onChange={handleChangeInput} required />
          </div>
          <div className="app__flex">
            <input
              type="email"
              className="p-text"
              placeholder="你的邮箱"
              name="email"
              value={email}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="你的留言"
              value={message}
              name="message"
              onChange={handleChangeInput}
              required
            ></textarea>
          </div>
          <button type="button" className="p-text" onClick={handleSubmit}>
            {loading ? "发送中" : "发送"}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">感谢联系！</h3>
        </div>
      )}
    </>
  );
}

export default AppWrap(MotionWrap(Footer, "app__footer"), "联系", "app__primarybg");
