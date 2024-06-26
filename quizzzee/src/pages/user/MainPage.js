import React, { useEffect, useState } from "react";
import mainPageImage from "../../images/system/mainPage.png";
import Background1 from "../../images/system/mainPageBg1.png";
import Background2 from "../../images/system/mainPageBg2.png";
import QuizzzyCard from "../../components/layout/quizzzyCard/QuizzzyCard";
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
function MainPage() {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const [quizzzy, setQuizzzy] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/quizzzy/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setQuizzzy(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <section className="grid grid-cols-2 items-center pt-12">
        <div className="ps-36">
          <div className="px-6 text-6xl font-bold italic">
            <span className="text-mainColor">About </span>
            <span className="text-mainColorBold">Us</span>
          </div>
          <div className="text-xl italic text-mainColor pt-5">
            Unveiling the magic within education, turning curiosity into
            captivating adventures through the realms of knowledge.
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
        <div className="py-1"></div>
      </section>
      <section
        className="bg-cover pt-36 bg-mainColor min-h-96 grid grid-cols-4 grid-flow-rows px-36 gap-12 mb-12"
        style={{ backgroundImage: `url(${Background2})` }}
      >
        {quizzzy &&
          quizzzy.map((data) => <QuizzzyCard quizzzy={data} key={data._id} />)}
      </section>
    </div>
  );
}

export default MainPage;
