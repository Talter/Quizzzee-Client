import React, { useEffect, useRef, useState } from "react";
import DDD from "../../images/squad/DDD.png";
import DoAn from "../../images/squad/DoAn.png";
import Ni from "../../images/squad/Ni.png";
import VVV from "../../images/squad/VVV.png";
import Habibi from "../../images/squad/Habibi.png.jpg.gif";
import { motion } from "framer-motion";
import sound from "../../sound/habibi.mp3";

function Content(a) {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(sound);
  }, []);

  function play() {
    audioRef.current.play();
  }

  function stop() {
    audioRef.current.pause();
  }

  return (
    <div className="py-6 grid grid-rows-6 justify-center">

      <motion.img
        src={a.image}
        className="size-48 rounded-full row-span-5"
        onMouseEnter={() => {
          if (a.image === Habibi) {
            play();
          }
        }}
        onMouseLeave={() => {
          if (a.image === Habibi) {
            stop();
          }
        }}
        alt="lov u"
        whileHover={{
          rotate: 360,
          transition: {
            duration: a.image === Habibi? 0.01 : 2,
            repeat: Infinity,
            ease: "linear",
            type: "tween",
          },
        }}
       
      />
      <div className="text-xl font-semibold text-center mt-2">
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
          {a.name}
        </div>
      </div>
    </div>
  );
}

function AboutUs() {
  const audioRef = useRef(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(sound);
  }, []);

  const play = () => {
    if (canPlay) {
      audioRef.current.play();
    }
  };

  const stop = () => {
    audioRef.current.stop();
  };

  const handleUserInteraction = () => {
    setCanPlay(true);
  };

  useEffect(() => {
    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);
    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, []);

  return (
    <div className="min-h-screen py-12 px-48 bg-mainColor text-white">
      <div className="text-center mb-12 text-4xl font-bold">
        <span>Quizz</span>
        <span className="text-blue-600">zee</span>
        <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          {" "}
          Creators
        </span>
      </div>
      <Content image={DDD} name="Do Duc Dat" />
      <Content image={Ni} name="Huynh Nguyen Gia Bao" />
      <Content image={DoAn} name="Mai Nhat Dang" />
      <Content image={VVV} name="Mai Quang Vinh"/>
      <Content image={Habibi} name="Tran Le Hoang Long" />
      <div>
        <div className="mt-12 text-center text-2xl font-bold">
          I don't know why you are here but
        </div>
        <div className="mt-2 text-center text-lg font-semibold">
          Thanks {">"};3
        </div>
      </div>
    </div>
  );
}

export default AboutUs;