import React, { useEffect, useState } from "react";
import HeaderComponent from "@components/head/Header";
import InputElement from "@components/elements/InputElement";
import { modalState } from "@states/modalState";
import ModalComponent from "@components/modal/ModalComponent";
import ToastPopup from "@components/modal/ToastPopup";
import { useRecoilState } from "recoil";
import $, { each } from "jquery";

const ReservationList = () => {
    const [modal, setModal] = useRecoilState(modalState);
    const [toast, setToast] = useState(false);

    const [dummy, setDummy] = useState([
        { seq: 0, programTitle: '굿바이 피로 1기', status: 'R' },
        { seq: 1, programTitle: '굿바이 피로 2기', status: 'J' },
        { seq: 2, programTitle: '굿바이 피로 3기', status: 'R' },
        { seq: 3, programTitle: '굿바이 피로 4기', status: 'R' },
    ])

    useEffect(() => {
        $(".dropDown .selected span").click(function () {
            const options = $(this).parent().siblings(".options");
            options.find("ul").show();
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
    };

    const handlePopup = () => {
        setToast(true);
        setTimeout(() => {
            setToast(false);
        }, 3000);
    };

    const handleRemove = () => {
        const target = document.querySelectorAll('input:checked');
        const sequences = new Array();
        target.forEach(item => {
            if (item instanceof HTMLElement) {
                sequences.push(parseInt(item.dataset.seq as string));
            }
        });
        let rows = [...dummy];
        sequences.forEach(item => {
            rows = rows.filter(data => data.seq !== item)
        });
        setDummy(rows);
        setModal({ ...modal, show: false });
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
                            {dummy.map((item, index) =>
                                <tr key={index}>
                                    <td>
                                        <InputElement type="checkbox" className="check" data-seq={item.seq}
                                            value={item.seq} />
                                    </td>
                                    <td>{item.programTitle}</td>
                                    <td>
                                        {item?.status === 'R' && <span className="reserved">예약 중</span>}
                                        {item?.status === 'J' && <span className="attend">참여 중</span>}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <ToastPopup content={"선택하신 프로그램을 취소했습니다."} show={toast} />
                    <ToastPopup content={<span>프로그램을 취소하시려면, <br /> 해당 프로그램을 선택해주세요.</span>} show={toast} />
                </div>
            </div>

            <ModalComponent id="flexModal" />
        </React.Fragment>
    );
};

export default ReservationList;
