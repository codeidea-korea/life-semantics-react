import React, { useEffect, useState, useRef } from "react";
import BookComponent from "@components/program/book/BookComponent";
import HeaderComponent from "@components/head/Header";
import DropBoxComponent from "@components/program/DropBoxComponent";
import ToastPopup from "@components/modal/ToastPopup";
import InputElement from "@components/elements/InputElement";
import BannerComponent02 from "@/components/program/banner/BannerComponent02";
import $ from "jquery";
import { Link, useLocation } from "react-router-dom";
import { PgTypeFilterInterface } from "@/interfaces/programFilterInterface";

const ProgramList = () => {
  const { state } = useLocation() as PgTypeFilterInterface;
  const typeSelectedText = useRef<HTMLSpanElement>(null);
  
  const [programFilter, setProgramFilter] = useState({
    type: state?.pgType || '',
    status: '',
    orderBy: '',
    ing: 0,
  })
  
  const handleFilter = (key: string, value: string) => {
    setProgramFilter({
      ...programFilter,
      [key]: value
    })
  }

  useEffect(() => {
    {state?.pgType && 
      setProgramFilter({
        ...programFilter,
        ['type']: state.pgType
      });
    }
  }, [])

  useEffect(() => {
    if (state?.pgType && typeSelectedText.current) {
      typeSelectedText.current.innerText = state?.pgType === 'goodBye' ? '굿바이 피로' : '웰컴 굿잠';
    }

    $(".dropDown .selected span").click(function () {
      const options = $(this).parent().siblings(".options");
      options.find("ul").show();
    });

    $(".dropDown .options ul li ").click(function () {
      const text = $(this).html();
      const selected = $(this).closest(".options").siblings(".selected");

      selected.find("> span").html(text);
      // programHandler(text);

      $(this).closest("ul").hide();

      $(document).bind("click", function (e) {
        const clicked = $(e.target);
        if (!clicked.parents().hasClass("dropDown")) {
          $(".dropDown .options ul").hide();
        }
      });
    });

    $(".checkBox .check").click(function () {
      check_select();
    });

    function check_select() {
      const check_box = $(".checkBox .check");
      const info_bx = $(".checkBox .standbyNot");
      if ($(check_box).is(":checked")) {
        info_bx.css("display", "block");
      } else {
        info_bx.css("display", "none");
      }
    }
  }, [programFilter]);

  return (
    <React.Fragment>
      <HeaderComponent />
      {/*<DropBoxComponent/>*/}
      <div className="dropBox">
        <h2>프로그램 목록</h2>
        <div className="dropDown">
          <div className="selected" >
            <span ref={typeSelectedText}>개요 프로그램 구분</span>
          </div>
          <div className="options">
            <ul>
              <li onClick={() => handleFilter('type', '')}>
                전체
                <div className="value"></div>
              </li>
              <li onClick={() => handleFilter('type', 'goodBye')}>
                굿바이 피로
                <div className="value"></div>
              </li>
              <li onClick={() => handleFilter('type', 'goodNight')}>
                웰컴 굿잠
                <div className="value"></div>
              </li>
            </ul>
          </div>
        </div>
        <div className="dropDown">
          <div className="selected">
            <span>프로그램 현황</span>
          </div>
          <div className="options">
            <ul>
              <li onClick={() => handleFilter('status', '')}>
                전체
                <div className="value"></div>
              </li>
              <li onClick={() => handleFilter('status', 'inApply')}>
                예약 접수 중<div className="value"></div>
              </li>
              <li onClick={() => handleFilter('status', 'endApply')}>
                (운영 대기 중)
                <div className="value"></div>
              </li>
              <li onClick={() => handleFilter('status', 'inOper')}>
                운영 중<div className="value"></div>
              </li>
              <li onClick={() => handleFilter('status', 'inApply')}>
                (종료)
                <div className="value"></div>
              </li>
            </ul>
          </div>
        </div>
        {
          programFilter.status === 'inApply' &&
          (
            <div className="dropDown">
              <div className="selected">
                <span>정렬 순서</span>
              </div>
              <div className="options">
                <ul>
                  <li onClick={() => handleFilter('orderBy', '')}>
                    전체
                    <div className="value"></div>
                  </li>
                  <li onClick={() => handleFilter('orderBy', 'pgAppEndDate')}>
                    마감 임박 순<div className="value"></div>
                  </li>
                  <li onClick={() => handleFilter('orderBy', 'pgLeftOver')}>
                    잔여 인원 순<div className="value"></div>
                  </li>
                </ul>
              </div>
            </div>
          )
        }
        <div className="checkBox" id="checkBox">
          <span className="inputCheckType01">
            <InputElement type="checkbox" className="check" id="agree" onClick={() => setProgramFilter({...programFilter, ing: 1-programFilter.ing})}/>
            <label>예약/참여 중</label>
          </span>
        </div>
      </div>
      <BookComponent programFilter={programFilter}/>
      <div className="banner03">
        <a href="https://www.fowi.or.kr/user/program/programList.do?progrmSeCd=PS01">
          <img src="images/banner03.svg" />
        </a>
      </div>
      {/*<div className="standbyNot">*/}
      {/*<span>*/}
      {/*  <img src="images/no.svg"/>*/}
      {/*</span>*/}
      {/*    <span>*/}
      {/*  운영 대기 중인*/}
      {/*  <br/>*/}
      {/*  프로그램이 없습니다.*/}
      {/*</span>*/}
      {/*</div>*/}
    </React.Fragment>
  );
};

export default ProgramList;
