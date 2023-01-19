import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRecoilState } from "recoil";
import { countState, sampleState } from "@states/sampleState";
import ModalComponent from "@components/modal/ModalComponent";
import HeaderComponent from "@components/head/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { modalState } from "@states/modalState";
import TitleHeadComponent from "@components/head/TitleHeadComponent";
import RoundTextComponent from "@components/program/RoundTextComponent";
import ForestCardComponent from "@components/program/ForestCardComponent";
import $ from "jquery";
import BannerComponent02 from "@/components/program/banner/BannerComponent02";
import { ForestInterface } from "@/interfaces/forestInterface";

const ForestList = () => {
  return (
    <React.Fragment>
      <HeaderComponent />
      <div className="programInfo" id="forest">
        <h2>치유의 숲 찾기</h2>
        <RoundTextComponent/>
      </div>
      <div className="banner03">
        <a href="https://www.fowi.or.kr/user/program/programList.do?progrmSeCd=PS01">
          <img src="images/banner03.svg" />
        </a>
      </div>
      <div className="programInfo">
        <ForestCardComponent/>
      </div>

      {/* <div className="forestCard">
          <Link to={"/forestView"}>
            <p className="forestName">산음 치유의 숲</p>
            <span>경기도 양평군 단월면 윗고북길<br/> 33-39</span>
            <span>031-774-8133</span>
          </Link>
        </div> */}
      <BannerComponent02/>
    </React.Fragment>
  );
};

export default ForestList;
