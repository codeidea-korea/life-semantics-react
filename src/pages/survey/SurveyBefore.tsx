import React, { useEffect, useState } from "react";
import TitleHeadComponent from "@components/head/TitleHeadComponent";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "@/states/userState";
import { modalState } from "@states/modalState";
import ModalComponent from "@components/modal/ModalComponent";
const SurveyBefore = () => {
  const user = useRecoilValue(userState);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const pgNo = urlParams.get("pgNo");
  const type = urlParams.get("type");
  const type2 = urlParams.get("type2");
  const title = urlParams.get("title");

  const navigate = useNavigate();
  const [isShow, setShow] = useState<boolean>(false);
  const handleToolTip = () => {
    setShow(!isShow);
  };
  const [modal, setModal] = useRecoilState(modalState);
  const handleNavigate = (e: any, url: string) => {
    if (e.target.classList.contains("active")) {
      setModal({
        ...modal,
        show: true,
        title: "",
        cancelShow: false,
        content: (
          <div>
            이미 참여 완료한
            <br />
            설문입니다.
          </div>
        ),
        confirmText: "확인",
      });
    } else {
      navigate(url);
    }
  };
  useEffect(() => {
    fetch(
      `https://api.life.codeidea.io/usr/programs/myList?paUserNo=${user.userNo}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + user.accessToken,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.body.forEach((item: any, idx: number) => {
          if (pgNo == item.pgNo) {
            if (item.surveys.pre.length !== 0) {
              item.surveys.pre.forEach((item2: any, idx2: number) => {
                document
                  .querySelectorAll(".survey_list li")
                  .forEach((item3: any, idx3) => {
                    if (item3.getAttribute("data-title") == item2.svType2) {
                      item3.classList.add("active");
                    }
                  });
              });
            }
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <TitleHeadComponent name="시작 전 설문" targetUrl="/survey" />
      <div className="survey">
        <div className="surveyMain">
          <div className="surveyName">
            <p>{title}</p>
            <div className="noticeIco on" onClick={handleToolTip}>
              <img src="/images/question.svg" alt="" className="" />
              {isShow && (
                <div className="noticeBox">
                  <ul>
                    <li>
                      <span>디스트레스</span>는 지난 일주일 동안 염려되는 항목을
                      각각의 문제(신체, 정서, 사회관계, 실생활, 영성/종교, 기타
                      문제)별로 체크하는 설문입니다.
                    </li>
                    <li>
                      <span>통증</span>은 앞모습과 뒷모습의 아픈 부위와 가장
                      아픈 부위를 선택하고, 가장 아픈 부위의 아픈 정도를 수치로
                      입력하는 설문입니다.
                    </li>
                    <li>
                      <span>피로</span>는 총 15문항이며, 각각의 문항마다
                      현재상태를 가장 적절하게 설명하는 선지를 선택하는
                      설문입니다.
                    </li>
                    <li>
                      <span>수면(ISI)</span>는 총 5문항이며, 각각의 문항에 대해
                      응답하는 설문입니다.
                    </li>
                    <li>
                      <span>수면위생(NCCN)</span>는 총 11문항이며, 최근 1주일
                      동안의 각각의 문항에 응답하는 설문입니다.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <ul className="survey_list">
            {/*설문을 완료 했을때 회색으로 변경 active */}
            {type == "goodBye" ? (
              <>
                <li
                  data-title="destress"
                  onClick={(event) =>
                    handleNavigate(event, `/deStress?pgNo=${pgNo}&type=pre&status=goodBye`)
                  }
                >
                  디스트레스
                </li>
                <li
                  data-title="ache"
                  onClick={(event) =>
                    handleNavigate(event, `/pain?pgNo=${pgNo}&type=pre`)
                  }
                >
                  통증
                </li>
                <li
                  data-title="fatigue"
                  onClick={(event) =>
                    handleNavigate(event, `/tired?pgNo=${pgNo}&type=pre`)
                  }
                >
                  피로
                </li>
              </>
            ) : (
              <>
                <li
                  data-title="destress"
                  onClick={(event) =>
                    handleNavigate(event, `/deStress?pgNo=${pgNo}&type=pre&status=goodNight`)
                  }
                >
                  디스트레스
                </li>
                <li
                  data-title="ISI"
                  onClick={(event) =>
                    handleNavigate(event, `/isi?pgNo=${pgNo}&type=pre`)
                  }
                >
                  불면(ISI)
                </li>
                <li
                  data-title="NCCN"
                  onClick={(event) =>
                    handleNavigate(event, `/nccn?pgNo=${pgNo}&type=pre`)
                  }
                >
                  수면위생(NCCN)
                </li>
              </>
            )}
            {/* <li className="active">피로</li> */}
          </ul>
        </div>
      </div>
      <ModalComponent />
    </React.Fragment>
  );
};

export default SurveyBefore;
