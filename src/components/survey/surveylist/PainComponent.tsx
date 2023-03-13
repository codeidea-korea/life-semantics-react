import React, { useEffect, useState } from "react";
import FrontPainComponent from "./pain/FrontPainComponent";
import BackPainComponent from "./pain/BackPainComponent";
import $ from "jquery";
import ModalComponent from "@/components/modal/ModalComponent";
import { useRecoilState } from "recoil";
import { modalState } from "@/states/modalState";

const PainComponent = ({ step }: { step: number }) => {
  
  useEffect(() => {
    $(".pain")
      .off("click touchstart")
      .on("click touchstart", ".dot", function (event) {
        event.preventDefault();
        console.log(step);
        if (step === 1) {
          $(this).toggleClass("on");
        } else {
          if ($(this).hasClass("on")) {
            if ($(this).hasClass("red")) {
              $(this).removeClass("red");
            } else {
              $(".dot.red").removeClass("red");
              $(this).addClass("red");
            }
          }else{
            handleDuplicationNotice();
          }
        }
      });
  }, [step]);

  const [modal, setModal] = useRecoilState(modalState);
  const handleDuplicationNotice = () => {
    setModal({
        ...modal,
        show: true,
        title: "",
        cancelShow: false,
        content: (
            <div>
                선택이 불가합니다.<br />
                아픈 부위 중에서만<br />
                제일 아픈 부위 선택이 <br />
                가능합니다.
            </div>
        ),
        confirmText: "확인",
        onConfirmCallback: () => {
          setModal({ ...modal, show: false });
        },
    });
};

  return (
    <React.Fragment>
      {step === 1 && (
        <p>
          1. 아픈 부위를 <b>모두</b> 선택해주세요
        </p>
      )}

      {step === 2 && (
        <p>
          2. 제일 아픈 부위를 선택해주세요
          <br />(<b>한 곳만 선택</b>)<br/>
          초록색 원 중에서만 선택 가능합니다
        </p>
      )}

      <div className="pain">
        <FrontPainComponent />
        <BackPainComponent />
      </div>
      <ModalComponent />
    </React.Fragment>
  );
};

export default PainComponent;
