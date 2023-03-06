import React, { useEffect, useState } from "react";
import HeaderComponent from "@components/head/Header";
import InputElement from "@components/elements/InputElement";
import { modalState } from "@states/modalState";
import ModalComponent from "@components/modal/ModalComponent";
import ToastPopup from "@components/modal/ToastPopup";
import { useRecoilState, useRecoilValue } from "recoil";
import $, { each } from "jquery";
import { userState } from "@/states/userState";
import { useNavigate } from "react-router-dom";

const ReservationList = () => {
    interface Reservation {
        pgNum: number;
        pgTitle: string;
        pgApply: string;
        pgNo: number;
    }
    const navigate = useNavigate();
    const user = useRecoilValue(userState);
    let [listData, setListData] = useState<Reservation[]>([]);


    const [modal, setModal] = useRecoilState(modalState);
    const [toast, setToast] = useState(false);
    const [toast2, setToast2] = useState(false);

    const [dummy, setDummy] = useState([
        { seq: 0, programTitle: '굿바이 피로 1기', status: 'R' },
        { seq: 1, programTitle: '굿바이 피로 2기', status: 'J' },
        { seq: 2, programTitle: '굿바이 피로 3기', status: 'R' },
        { seq: 3, programTitle: '굿바이 피로 4기', status: 'R' },
    ])


    //예약리스트
    const getUserReservationList = (orderBy: string) => {
        listData = [];
        // pgAppSttDate -  최신 등록순
        // inApply - 참여 우선 순
        // inOper - 예약 우선 순
        fetch(`https://api.life.codeidea.io/usr/programs/myList?paUserNo=${user.userNo}&orderBy=${orderBy}`,
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + user.accessToken,
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                // data.body.forEach((item: Reservation) => {
                //     setListData([...listData, item])
                // })
                setListData(data.body);
            }).catch((error) => {
                console.log(error)
            });
    }
    useEffect(() => {
        getUserReservationList("pgAppSttDate");
    }, [])

    useEffect(() => {
        $(".dropDown .selected span").click(function () {
            const options = $(this).parent().siblings(".options");
            options.find("ul").show();
            if (this.textContent == "최신 등록 순") {
                getUserReservationList("pgAppSttDate");
            } else if (this.textContent == "참여 우선 순") {
                getUserReservationList("inApply");
            } else if (this.textContent == "예약 우선 순") {
                getUserReservationList("inOper");
            }
        });

        $(".dropDown .options ul li ").click(function () {
            const text = $(this).html();
            const selected = $(this).closest(".options").siblings(".selected");

            selected.find("> span").html(text);
            $(this).closest("ul").hide();

            $(document).bind("click", function (e) {
                const clicked = $(e.target);
                if (!clicked.parents().hasClass("dropDown")) {
                    $(".dropDown .options ul").hide();
                }
            });
        });

        $(".check").click(function () {
            var checked = $(".check").is(":checked");

            if (checked) {
                $(this).parent().parent().addClass("on");
            } else {
                $(this).parent().parent().removeClass("on");
            }
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
    }, []);

    useEffect(() => {
        uncheck();
    }, [dummy]);

    const uncheck = () => {
        const target = document.querySelectorAll('input:checked');
        target.forEach(item => {
            // @ts-ignore
            item.checked = false;
            // @ts-ignore
            item.parentElement.parentElement.classList.remove('on');
        })
    };

    const handleDeleteConfirm = () => {
        if (!document.querySelectorAll('input:checked')[0]) {
            setToast2(true)
            setTimeout(() => {
                setToast2(false)
            }, 3000);
        } else {
            setModal({
                ...modal,
                show: true,
                title: "",
                cancelShow: true,
                callBackShow: true,
                content: (
                    <div>
                        선택하신 프로그램을 <br />
                        취소하시겠습니까?
                    </div>
                ),
                confirmText: "네",
                cancelText: "아니요",
                onConfirmCallback: handleRemove,
            });
        }
    };

    const handlePopup = () => {
        setToast(true);
        setTimeout(() => {
            setToast(false);
        }, 3000);
    };

    const handleRemove = () => {
        const target = document.querySelectorAll('input:checked');
        const selectedOrderByValue = document.querySelectorAll('.reservationList .tabelDropdown .dropDown .selected span')[0].textContent as string
        let reqData = {}
        fetch(`https://api.life.codeidea.io/usr/programs/cancel?pgNoList=${target[0].getAttribute("pg-no")}&userNo=${user.userNo}`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: 'Bearer ' + user.accessToken,
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.result == "true") {
                    getUserReservationList(selectedOrderByValue);
                    setModal({ ...modal, show: false });
                    setToast(true)
                    setTimeout(() => {
                        setToast(false)
                    }, 3000);
                }
            }).catch((error) => {
                console.log(error)
            });


    };

    return (
        <React.Fragment>
            <HeaderComponent />
            <div className="reservationList" id="">
                <h2>예약내역</h2>
                <button type="button" className="cancelButton " onClick={handleDeleteConfirm}>
                    선택취소
                </button>
                <div className="reservationTable">
                    <div className="tabelDropdown">
                        <div className="dropDown">
                            <div className="selected">
                                <span>최신 등록 순</span>
                            </div>
                            <div className="options">
                                <ul>
                                    <li>
                                        최신 등록 순
                                        <div className="value"></div>
                                    </li>
                                    <li>
                                        참여 우선 순
                                        <div className="value"></div>
                                    </li>
                                    <li>
                                        예약 우선 순
                                        <div className="value"></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>프로그램명</td>
                                <td>현황</td>
                            </tr>
                            {
                                listData.map((item: Reservation, idx) => <tr key={idx}>
                                    <td>
                                        <InputElement type="checkbox" className="check" pg-no={item.pgNo} pg-num={item.pgNum} />
                                    </td>
                                    <td>{item.pgTitle}</td>
                                    <td>
                                        {item.pgApply === "inApply" && <span className="reserved">예약 중</span>}
                                        {item.pgApply === 'inOper' && <span className="attend">참여 중</span>}
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                    <ToastPopup content={"선택하신 프로그램을 취소했습니다."} show={toast} />
                    <ToastPopup content={<span>프로그램을 취소하시려면, <br /> 해당 프로그램을 선택해주세요.</span>} show={toast2} />
                </div>
            </div>

            <ModalComponent id="flexModal" />
        </React.Fragment>
    );
};

export default ReservationList;
