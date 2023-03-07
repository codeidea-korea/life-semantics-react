import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "@/states/userState";
import TitleHeadComponent from "@components/head/TitleHeadComponent";
import { countState, sampleState } from "@states/sampleState";
import DateComponent from "@components/survey/todaySurvey/DateComponent";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RangeComponent from "@components/survey/todaySurvey/RangeComponent";
import RangeArrowComponent from "@/components/survey/todaySurvey/RangeArrowComponent ";
import { modalState } from "@states/modalState";
import ModalComponent from "@components/modal/ModalComponent";
import ToastPopup from "@components/modal/ToastPopup";
import $ from "jquery";
function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
}

interface reqObj {
    saSvNo: number;
    saQst: number;
    saAnsList: unknown[];
    saAns: unknown;
    saEtcAns: string;
    saRegDate: string;
}
interface ReqData {
    svNo: Number,
    svPgNo: Number,
    svUserNo: unknown,
    svType1: unknown,
    svType2: string,
    svStatus: string,
    svRegDate: string,
    userSurveysAnswersDTO: reqObj[]
}

const reqData: ReqData = {
    "svNo": 0,
    "svPgNo": 8,
    "svUserNo": 0,
    "svType1": "ing",
    "svType2": getToday(),
    "svStatus": "set",
    "svRegDate": getToday(),
    "userSurveysAnswersDTO": []
}
for (let i = 0; i < 1; i++) {
    reqData.userSurveysAnswersDTO.push(
        {
            "saSvNo": 0,
            "saQst": 1,
            "saAnsList": [

            ],
            "saAns": 0,
            "saEtcAns": "string",
            "saRegDate": getToday(),
        }
    )
}


const SurveyToday = () => {
    const user = useRecoilValue(userState);
    reqData.svUserNo = user.userNo;
    const [modal, setModal] = useRecoilState(modalState);
    const location = useLocation();
    const navigate = useNavigate();
    const [sample, setSample] = useRecoilState(sampleState);
    const [toast, setToast] = useState(false);
    const [toast2, setToast2] = useState(false);

    //url로 전달받은 데이터
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const pgNo = urlParams.get('pgNo');
    reqData.svPgNo = Number(pgNo);

    const handleUseNotice = () => {
        setModal({
            ...modal,
            show: true,
            title: "",
            cancelShow: false,
            content: (
                <div className="modalImage">
                    초록색 원을
                    <br />
                    <span>좌우</span>로 움직여주세요!
                    <img src="images/modalprogress.svg" />
                </div>
            ),
            confirmText: "확인했어요!",
        });
    };

    const handleModal01 = () => {
        setModal({
            ...modal,
            show: true,
            title: "",
            cancelShow: false,
            content: <div className="modalImage">아직 설문이 불가합니다.</div>,
            confirmText: "확인",
        });
    };
    /* 조회 불가 모달 */
    const handleModal02 = () => {
        setModal({
            ...modal,
            show: true,
            title: "",
            cancelShow: false,
            content: (
                <div>
                    수정가능한 날짜만
                    <br />
                    조회 가능합니다.
                    <br />
                    (오늘날짜로부터
                    <br /> <b>5일 전</b>까지만 수정가능)
                </div>
            ),
            confirmText: "확인",
        });
    };
    /* 미작성 설문 부재 */
    const handleModal03 = () => {
        setModal({
            ...modal,
            show: true,
            title: "",
            cancelShow: false,
            content: (
                <div>
                    더 이상 해야할
                    <br />
                    설문이 없습니다.
                </div>
            ),
            confirmText: "확인",
        });
    };
    /* 설문완료 */
    const handleTodaySurveyComplete = () => {
        setModal({
            ...modal,
            show: true,
            title: "",
            cancelShow: false,
            callBackShow: true,
            content: <div>설문을 완료했습니다.</div>,
            confirmText: "확인",
            onConfirmCallback: moveSurveyMain,
        });
    };

    /* 설문종료 */
    const handleModal05 = () => {
        setModal({
            ...modal,
            show: true,
            title: "",
            cancelShow: false,
            content: <div>설문이 종료되었습니다.</div>,
            confirmText: "확인",
        });
    };

    const handlePopup = () => {
        setToast(true);
        setTimeout(() => {
            setToast(false);
            handleTodaySurveyComplete();

            navigate("/SurveyComplete");
        }, 3000);
    };

    const moveSurveyMain = () => {
        setModal({ ...modal, show: false });
        navigate("/survey");
    };



    function getDates(start: string): Array<{ year: string, month: string, day: string, total: string }> {
        const startDate = new Date(start);
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 1)
        const result = [];
        while (startDate <= endDate) {
            result.push({
                year: startDate.getFullYear().toString(),
                month: (startDate.getMonth() + 1).toString(),
                day: startDate.getDate().toString(),
                total: startDate.toISOString().slice(0, 10),
            });
            startDate.setDate(startDate.getDate() + 1);
        }

        return result;
    }

    const [selectedDate, setSelectedDate] = useState<Array<{ year: string; month: string; day: string; total: string }>>([]);
    const [selectedIndex, setSelectedIndex] = useState<any>(0);
    const [ingData, setIngData] = useState<any>([])
    useEffect(() => {
        fetch(`https://api.life.codeidea.io/usr/programs/myList?paUserNo=${user.userNo}`,
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + user.accessToken,
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                return response.json();
            }).then((data) => {
                data.body.forEach((item: any, idx: number) => {
                    if (pgNo == item.pgNo) {
                        setIngData([...ingData, item.surveys.ing]);
                        // const sDate = getDates(item.pgSttDate);
                        const sDate = getDates(item.pgSttDate).filter((e : any) => e.total <= getToday());
                        setSelectedDate(sDate)
                        setSelectedIndex(sDate.length - 1);
                    }
                });
            }).catch((error) => {
                console.log(error)
            });
    }, []);

    useEffect(() => {
        const element = document.querySelectorAll('.scoreRadio input:checked')[0] as HTMLInputElement
        if (element) {
            element.checked = false;
        }
        console.log(ingData);
        ingData?.forEach((item2: any, idx: number) => {
            item2.forEach((item3: any, idx: number) => {

                if (selectedDate[selectedIndex]?.total == item3.svType2) {
                    //왜 -1이 되어있었는지 잘모르겠음..ㅠㅠ
                    // const el = document.querySelectorAll('.scoreRadio input')[item3.qnaList[0].saAnsList[0] - 1] as HTMLInputElement
                    const el = document.querySelectorAll('.scoreRadio input')[item3.qnaList[0].saAnsList[0]] as HTMLInputElement
                    el.checked = true;
                }
            });

        });
        if (selectedDate.length !== 0) {
            reqData.userSurveysAnswersDTO[0].saRegDate = selectedDate[selectedIndex].total
            reqData.svType2 = selectedDate[selectedIndex].total
            reqData.svRegDate = selectedDate[selectedIndex].total
        }
    }, [selectedIndex, selectedDate])


    const handlePrevDate = () => {
        if (selectedIndex > selectedDate.length - 6)
            selectedIndex > 0 && setSelectedIndex(selectedIndex - 1)

        reqData.userSurveysAnswersDTO[0].saRegDate = selectedDate[selectedIndex].total
        reqData.svType2 = selectedDate[selectedIndex].total
        reqData.svRegDate = selectedDate[selectedIndex].total

    }

    const handleNextDate = () => {
        selectedIndex < selectedDate.length - 1 && setSelectedIndex(selectedIndex + 1)
        reqData.userSurveysAnswersDTO[0].saRegDate = selectedDate[selectedIndex].total
        reqData.svType2 = selectedDate[selectedIndex].total
        reqData.svRegDate = selectedDate[selectedIndex].total
    }

    const handleSubmit = () => {
        if (document.querySelectorAll('.scoreRadio input:checked')[0]) {
            reqData.userSurveysAnswersDTO[0].saAnsList = [];
            //왜 +1이 되어있는지 잘 모르겠음
            // reqData.userSurveysAnswersDTO[0].saAnsList.push(Number(Array.from(document.querySelectorAll('.scoreRadio input')).indexOf(document.querySelectorAll('.scoreRadio input:checked')[0])) + 1)
            reqData.userSurveysAnswersDTO[0].saAnsList.push(Number(Array.from(document.querySelectorAll('.scoreRadio input')).indexOf(document.querySelectorAll('.scoreRadio input:checked')[0])))
            fetch(`https://api.life.codeidea.io/usr/surveys`,
                {
                    method: 'POST',
                    body: JSON.stringify(reqData),
                    headers: {
                        Authorization: 'Bearer ' + user.accessToken,
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    if (data.result == "true") {
                        handleTodaySurveyComplete()
                    }
                }).catch((error) => {
                    console.log(error)
                });
        } else {
            setToast2(true);
            setTimeout(() => {
                setToast2(false)
            }, 3000);
        }

    }

    useEffect(() => {
        console.log(selectedDate)
    }, [selectedDate])

    return (
        <React.Fragment>
            <TitleHeadComponent name="일일 설문" targetUrl="" />
            <div className="survey surveyToday">


                <div className="dDay">D+{selectedDate.length}</div>
                <div className='date'>
                    <button type='button' onClick={handlePrevDate}></button>
                    {selectedDate.map((date, index) => (
                        index == selectedIndex
                            ?
                            <span style={getToday() == date.total ? {} : { background: 'white', color: 'black', fontWeight: '300' }}  className='today' key={index}>
                                {date.month}월{date.day}일
                            </span>
                            :
                            <span style={{ display: "none" }} className='today' key={index}>
                                {date.month}월{date.day}일
                            </span>
                    ))}
                    <button type='button' onClick={handleNextDate}> </button>
                </div>
                
                {/* 웰컴굿잠 */}
                {/* <p>어젯 밤 수면의 만족도를 나타내는 숫자를 선택해주세요. (0점: 수면만족도 낮음, 10점: 수면만족도 높음)</p> */}
                {/* 굿바이피로 */}
                {/* <p>지난 24시간 동안의 피로를 나타내는 숫자를 선택해주세요. (0점: 피로도 낮음, 10점: 피로도 높음)</p> */}
                
                {/* <p>
                    지난 24시간 동안의 피로를 나타내는 <br />
                    숫자에 원을 놓아주세요.
                </p> */}
                {/* <RangeComponent />
                <RangeArrowComponent left="피로도 낮음" right="피로도 높음" /> */}
                <ul className="scoreRadio">
                    <li>
                        <input type="radio" name="score" id="zero" />
                        <label htmlFor="zero">0점</label>
                    </li>
                    <li>
                        <input type="radio" name="score" id="one" />
                        <label htmlFor="one">1점</label>
                    </li>
                    <li>
                        <input type="radio" name="score" id="two" />
                        <label htmlFor="two">2점</label>
                    </li>
                    <li>
                        <input type="radio" name="score" id="three" />
                        <label htmlFor="three">3점</label>
                    </li>
                    <li>
                        <input type="radio" name="score" id="four" />
                        <label htmlFor="four">4점</label>
                    </li>
                    <li>
                        <input type="radio" name="score" id="five" />
                        <label htmlFor="five">5점</label>
                    </li>
                    <li>
                        <input type="radio" name="score" id="six" />
                        <label htmlFor="six">6점</label>
                    </li>
                    <li>
                        <input type="radio" name="score" id="seven" />
                        <label htmlFor="seven">7점</label>
                    </li>
                    <li>
                        <input type="radio" name="score" id="eight" />
                        <label htmlFor="eight">8점</label>
                    </li>
                    <li>
                        <input type="radio" name="score" id="nine" />
                        <label htmlFor="nine">9점</label>
                    </li>
                    <li>
                        <input type="radio" name="score" id="ten" />
                        <label htmlFor="ten">10점</label>
                    </li>
                </ul>
                <ToastPopup content={"수정되었습니다."} show={toast} />
                <ToastPopup content={"저장되었습니다."} show={toast} />
                <ToastPopup content={"점수를 선택해주세요."} show={toast2} />
                <button type="button" className="BtnActive02" onClick={handleSubmit}>
                    저장
                </button>
            </div>

            <ModalComponent />
        </React.Fragment>
    );
};

export default SurveyToday;
