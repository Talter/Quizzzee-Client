import React, { useEffect, useState } from "react";
import mainPageImage from "../../images/system/mainPage.png";
import learnzee from "../../images/default/Learnzee.png";
import examzee from "../../images/default/Examzee.png";
import addzee from "../../images/default/Addzee.png";
import Background1 from "../../images/system/mainPageBg1.png";
import Background2 from "../../images/system/mainPageBg2.png";
import QuizzzyCard from "../../components/layout/quizzzyCard/QuizzzyCard";
import { Carousel } from "antd";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const contentStyle = {
  display: 'flex',
  alignItems: 'center',
  height: '260px',
  color: '#fff',
  textAlign: 'left',
  // background: '#364d79',
  padding: '20px',
  boxSizing: 'border-box',
  background: 'linear-gradient(to right, #cdffd8, #94b9ff)',
};

const imageStyle = {
  flex: 5,
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
};

const textStyle = {
  flex: 7,
  paddingLeft: '20px',
  boxSizing: 'border-box',
};

const titleStyle = {
  fontSize: '2rem',
  margin: 0,
  color: '#fff',
  fontWeight: 'bold',
  letterSpacing: '-0.025em',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  textTransform: 'uppercase',
  fontFamily: 'Quicksand',
};

const detailStyle = {
  fontSize: '1.25rem',
  color: '#50545c',
};

function MainPage() {
  const navigate = useNavigate();

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const handleSmoothScroll = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [quizzzy, setQuizzzy] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/quizzzy?isPrivate=false&isActive=true`);
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
        <div className="text-5xl text-center font-bold text-green-100 pb-12">
          What we offer...
        </div>
        <div className="rounded-xl overflow-hidden bg-red-100 mx-56 mb-12">
          <Carousel arrows infinite autoplay>
            <div>
              <a href="#quizzz" onClick={(e) => handleSmoothScroll(e, 'quizzz')}>
                <div style={contentStyle}>
                  <img src={learnzee} alt="Banner 1" style={imageStyle} />
                  <div style={textStyle}>
                    <h3 style={titleStyle}>Master your learning with quizzzes and study modes</h3>
                    <p style={detailStyle}>Join our community of leaners using Quizzzess's quizzzes, practice tests, and AI tools to improve scores.</p>
                  </div>
                </div>
              </a>
            </div>
            <div>
              <div style={contentStyle}>
                <img src={examzee} alt="Banner 2" style={imageStyle} />
                <div style={textStyle}>
                  <h3 style={titleStyle}>100% ready for exam day</h3>
                  <p style={detailStyle}>With Study and Exam, turn your quizzzes into practice tests and master your study material.</p>
                </div>
              </div>
            </div>
            <div>
              <a href="/">
                <div style={contentStyle}>
                  <img src={addzee} alt="Banner 3" style={imageStyle} />
                  <div style={textStyle}>
                    <h3 style={titleStyle}>Find or create quizzzes</h3>
                    <p style={detailStyle}>Get the right content you need to learn. For a fun way to learn quizzzes, play popular learning games like Match.</p>
                  </div>
                </div>
              </a>
            </div>
          </Carousel>
        </div>
        <div className="py-1"></div>
      </section>
      <section id="quizzz"
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
