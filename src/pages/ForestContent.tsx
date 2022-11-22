import React from "react";
import { Link } from "react-router-dom";
import BannerComponent02 from "@/components/program/banner/BannerComponent02";
import HeaderComponent from "../components/head/Header";

const ForestContent = () => {
  const handleChange = () => {
    const explainText = document.querySelector(
      ".explainText"
    ) as HTMLBodyElement;
    const moreText = document.querySelector(".moreText") as HTMLBodyElement;

    if (explainText.style.display === "block") {
      explainText.style.display = "-webkit-box";
      moreText.innerText = "더보기";
    } else {
      explainText.style.display = "block";
      moreText.innerText = "닫기";
    }
  };
  return (
    <React.Fragment>
      <HeaderComponent />
      <div className="programInfo">
        <h2>치유의 숲</h2>
        <div className="forestContent">
          <p className="forestTitle">산음 치유의 숲</p>
          <ul>
            <li>
              <span>소재지</span>
              <span>경기도 양평군 단월면 윗고북길 33-39</span>
            </li>
            <li>
              <span>운영시간</span>
              <span>하절기 06시 ~ 19시, 동절기 08시 ~ 17시</span>
            </li>
            <li>
              <span>전화번호</span>
              <span>031-774-8133</span>
            </li>
            <li>
              <span>설명</span>
              <div className="explainBox">
                <p className="explainText">
                  국내 치유의 숲 1호인 산음 치유의 숲은 국립 산음 자연휴양림
                  내에 조성되어 있다. 산음 치유의 숲은 낙엽송과 잣나무, 활엽수
                  등 다양한 수 종이 분포하고 있다. 지형이 복잡 다양해서
                  지형요법을 활용해 산림치유 프로그램에 적합하다. 또한 고도는 약
                  200m에서부터 1,000m까지 분포 하고 있어 기후요법, 운동요법 등을
                  산림치유프로그램에 적용하는 것이 가능하다. 또 산음 치유의 숲은
                  계곡이 잘 발달되어 음이온이 풍부하다.
                </p>
                <span className="moreText" onClick={handleChange}>
                  더보기
                </span>
              </div>
            </li>
          </ul>
          <div className="forestImages">
            <span>
              <img src="images/forest01.jpg" />
            </span>
            <span>
              <img src="images/forest02.jpg" />
            </span>
          </div>
          <div className="information">
            <p className="infoTitle">기타 정보</p>
            <span>• 차량주차안내</span>
            <p>
              치유의 숲 입구 50m 전 대형주차장 이용. 건강증진센터 안내실로 도보
              진입
              <span>* 장애인 주차장 4개소 - 치유의 숲 내부 위치</span>
            </p>
          </div>
        </div>
        <Link to={"/forest"} className="listButton">
          목록으로 돌아가기
        </Link>
      </div>
      <BannerComponent02/>
    </React.Fragment>
  );
};

export default ForestContent;
