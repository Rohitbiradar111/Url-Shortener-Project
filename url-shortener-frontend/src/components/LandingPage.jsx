import { useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";
import Card from "./Card";
import { GoArrowRight } from "react-icons/go";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-64px)] lg:px-14 sm:px-8 px-4">
      <div className="lg:flex-row flex-col lg:py-12 pt-16 lg:gap-10 gap-8 flex justify-around items-center">
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: -80 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-bold font-roboto text-slate-800 md:text-5xl sm:text-4xl text-3xl   md:leading-13.75 sm:leading-11.25 leading-10 lg:w-full md:w-[70%] w-full"
          >
            ClipIt Simplifies URL Shortening For Efficient Sharing
          </motion.h1>
          <p className="text-slate-700 text-lg my-5">
            ClipIt streamlines the process of URL shortening, making sharing
            links effortless and efficient. With its user-friendly interface,
            ClipIt allows you to generate concise, easy-to-share URLs in
            seconds. Simplify your sharing experience with ClipIt today.
          </p>
          <div className="flex items-center gap-3">
            <motion.button
              initial={{ opacity: 0, y: 80 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onClick={() => navigate("/register")}
              className="cursor-pointer border w-40 text-black rounded-full py-2 flex items-center justify-center gap-2 hover:bg-amber-300"
            >
              Get Started <GoArrowRight size={20} />
            </motion.button>
          </div>
        </div>
        <div className="flex-1 flex justify-center w-full">
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="sm:w-96 w-80 object-cover rounded-md border-4 border-yellow-500"
            src="/images/url_shortener_image.jpg"
            alt="url shortener image"
            draggable={false}
          />
        </div>
      </div>
      <div className="sm:pt-12 pt-7">
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-slate-800 font-bold lg:w-[60%] md:w-[70%] sm:w-[80%] mx-auto text-3xl text-center"
        >
          Trusted by individuals and teams at the world best companies{" "}
        </motion.p>
        <div className="pt-4 pb-7 grid lg:gap-10 gap-4 xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-2 grid-cols-1 text-center mt-4 mb-8">
          <Card
            title="Simple URL Shortening"
            desc="Experience the ease of creating short, memorable URLs in just a few clicks. Our intuitive interface and quick setup process ensure you can start shortening URLs without any hassle."
          />
          <Card
            title="Powerful QR Codes"
            desc="Generate instant QR codes for every link. Perfect for business cards, posters, and offline sharing."
          />
          <Card
            title="Enhanced Security"
            desc="Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption, ensuring your data remains safe and secure."
          />
          <Card
            title="Fast and Reliable"
            desc="Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your shortened URLs will always be available and responsive, ensuring a seamless experience for your users."
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
