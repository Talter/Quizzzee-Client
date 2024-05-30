import React from "react";
import mainPageImage from "../../images/system/mainPage.png";
import Background1 from "../../images/system/mainPageBg1.png";
import Background2 from "../../images/system/mainPageBg2.png";
import { Carousel } from "antd";

import { UserContext } from "../../context/UserContext";

const contentStyle = {
  margin: 0,
  height: "260px",
  color: "#fff",
  lineHeight: "260px",
  textAlign: "center",
  background: "#364d79",
};

const Content = () => {
  return(
    <a className=" rounded-xl  bg-subColor shadow-inner grid grid-rows-2 transition transform hover:scale-105" href="/quizzzy/1">
      <div className="min-h-36 text-xl text-white text-center flex items-center justify-center">
        Quizzzy name
      </div>
      <div className="min-h-36 bg-white border-extraColor border rounded-xl text-black px-4 py-2">
        <div>Description: ABC</div>
        <div>Author: ABC</div>
        <div className="mt-12 text-gray-400">Last update: ABC</div>
      </div>
    </a>
  )
}
function MainPage() {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <div>
      <section className="grid grid-cols-2 items-center pt-12">
        <div className="ps-36">
          <div className="px-6 text-6xl font-bold italic">
            <span className="text-mainColor">About </span>
            <span className="text-mainColorBold">Us</span>
          </div>
          <div className="text-xl italic text-mainColor pt-5">
          Unveiling the magic within education, turning curiosity into captivating adventures through the realms of knowledge.
          </div>
        </div>
        <img
          alt="Main Page image"
          className="h-64 w-64 ms-12 rounded-full justify-self-center shadow-[5px_5px_0px_2px_rgba(144,172,244,0.5)]"
          src={mainPageImage}
        ></img>
      </section>
      <section
        className="bg-cover pt-36"
        style={{ backgroundImage: `url(${Background1})` }}
      >
        <div className="text-5xl text-center font-semibold text-white pb-12">
          What we offer
        </div>
        <div className="rounded-xl overflow-hidden bg-red-100 mx-56 mb-12">
        <Carousel arrows infinite autoplay>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
        </div>
        <div className="py-1">
        </div>
      </section>
      <section  className="bg-cover pt-36 bg-mainColor min-h-96 grid grid-cols-4 grid-flow-rows px-36 gap-12 mb-12"
        style={{ backgroundImage: `url(${Background2})` }}>
        <Content/>
        <Content/>
        <Content/>
        <Content/>
        <Content/>
        <Content/>
        <Content/>
        <Content/>
      </section>
    </div>
  );
}

export default MainPage;
