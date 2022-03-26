import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import "./About.scss";
import { urlFor, client } from "../../client";
import { AppWrap, MotionWrap } from "../../wrapper";

function About() {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';

    client.fetch(query).then((data) => setAbouts(data));
  }, []);

  return (
    <>
      <h2 className="head-text">
        {/* I Know That <span>Good Apps</span>
        <br /> means <span>Good Business</span> */}
        关于<span>我</span>
      </h2>

      <div className="app__profiles">
        {abouts
          .sort((a, b) => (a.description > b.description ? 1 : b.description > a.description ? -1 : 0))
          .map((about, index) => (
            <motion.div
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, type: "tween" }}
              className="app__profile-item"
              key={about.title + index}
            >
              <img src={urlFor(about.imgUrl)} alt="about.title" />
              <h2 className="bold-text" style={{ marginTop: 20 }}>
                {about.title}
              </h2>
              <p className="p-text" style={{ marginTop: 10 }}>
                {about.description}
              </p>
            </motion.div>
          ))}
      </div>
    </>
  );
}

export default AppWrap(MotionWrap(About, "app__about"), "关于", "app__whitebg");
