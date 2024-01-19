import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Realators from "./realators/realators";
import SpecialVA from "./special-va/special-va";
import CallCenter from "./callcenter/callcenter";
import "./virtual-assistance.css";

const VirtualAssistance = () => {
  const [toggle, setToggle] = useState(1);

  function updateToggle(id) {
    setToggle(id);
  }

  return (
    <div className="container viras__container">
      <div className="top-horizontal-line"></div>
      <div className="vatitle__choose">
        <h1>What Virtual Assistance are you looking for?</h1>
      </div>
      <div className="va__choose">
        <div
          className={
            toggle === 1 ? "vachoose__box var active__hex" : "vachoose__box var"
          }
          onClick={() => updateToggle(1)}
        >
          <h1>Virtual Assistants for Realtors</h1>
        </div>

        <div
          className={
            toggle === 2 ? "vachoose__box sva active__hex" : "vachoose__box sva"
          }
          onClick={() => updateToggle(2)}
        >
          <h1>Specialized Virtual Assistants</h1>
        </div>
        <div
          className={
            toggle === 3 ? "vachoose__box vcc active__hex" : "vachoose__box vcc"
          }
          onClick={() => updateToggle(3)}
        >
          <h1>Virtual Call Center (Coming Soon)</h1>
        </div>
      </div>
      <div className={toggle === 1 ? "show__content" : "content__tab"}>
        <Realators />
      </div>
      <div className={toggle === 2 ? "show__content" : "content__tab"}>
        <SpecialVA />
      </div>

      <div className={toggle === 3 ? "show__content" : "content__tab"}>
        <CallCenter />
      </div>
    </div>
  );
};

export default VirtualAssistance;
