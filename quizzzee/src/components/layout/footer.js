import React, { useState, useEffect } from "react";
import Background from "../../images/system/footer1.png";
import { MailOutlined, PhoneOutlined, StarOutlined } from "@ant-design/icons";

function Footer() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) => {
        const quotes = data;
        const select = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(select);
      })
      .catch((error) => {
        console.error("Error fetching random fact:", error);
      });
  }, []);
  return (
    <div
      className="bg-cover min-h-96 pt-24 grid grid-rows-5"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="row-span-4 px-24 text-white relative">
        <div className="text-6xl font-bold">
          <span className="text-white">Quizz</span>
          <span className="text-blue-600">zee</span>
        </div>
        <div className="flex justify-between pt-12">
          <div>
            <div className="mb-3">
              <MailOutlined className="pr-2" /> ToryNothing@gmail.com
            </div>
            <div className="mb-3">
              <PhoneOutlined className="pr-2" /> 0941351430
            </div>
            <div>
              <StarOutlined className="pr-2" />{" "}
              <a
                target="_blank"
                href="https://docs.google.com/forms/d/e/1FAIpQLSej85chH-gObIs9L8r66_hAAdAs0K2kHxx1Me_IfCI75PnXCQ/viewform?usp=sharing"
              >
                Feel free to leave feedback here!
              </a>
            </div>
          </div>
          {quote && (
            <div className="text-xl font-semibold">
              <div className="italic">"{quote.text}"</div>
              <div className="italic text-right">
                - {quote.author.split(",")[0]}
              </div>
            </div>
          )}

          <div className="absolute right-20 bottom-3 text-2xl font-bold">
            Wish you a happy learning!!
          </div>
        </div>
      </div>

      <div className="px-12">
        <div className="h-[3px] bg-white " />
        <div className="ps-8 text-white flex items-center h-full">
          Group 7 Distribution
        </div>
      </div>
    </div>
  );
}

export default Footer;
