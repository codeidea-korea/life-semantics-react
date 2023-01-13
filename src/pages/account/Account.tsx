import React from "react";
import HeaderComponent from "@components/head/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "@states/modalState";
import ModalComponent from "@components/modal/ModalComponent";
import { userState } from "@/states/userState";


const Account = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [modal, setModal] = useRecoilState(modalState);
    const user = useRecoilValue(userState);

    const handleDeleteAccount = () => {
        navigate('/deleteAccount');
    };

    const moveMain = () => {
        setModal({ ...modal, show: false });
        navigate('/');
    };

    const handleConfirmLogout = () => {
        setModal({
            ...modal,
            show: true,
            title: "",
            cancelShow: true,
            callBackShow: true,
            content: (
                <div>
                    로그아웃 하시겠습니까?
                </div>
            ),
            confirmText: "네",
            cancelText: "아니요",
            onConfirmCallback: moveMain,
        });
    };

    return (
        <React.Fragment>
            <HeaderComponent />
            <div className="account">
                <h2>계정관리</h2>
                <div className="">
                    <Link to={"/modify"}>내 정보 수정하기</Link>
                    <div className="accountBox">
                        <div>
                            <span>현재 계정</span>
                            <span>{user.userID}</span>
                        </div>
                        <p>
                            <span>{user.userName}</span>님, 환영합니다.
                        </p>
                    </div>
                </div>
                <div className="grayButton">
                    <button type="button" onClick={handleDeleteAccount}>회원탈퇴</button>
                    <button type="button" onClick={handleConfirmLogout}>로그아웃</button>
                </div>
            </div>
            <ModalComponent id="flexModal" />
        </React.Fragment>
    );
};

export default Account;
