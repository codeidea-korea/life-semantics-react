import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { userState } from "@states/userState";
import { useRecoilValue } from "recoil";

const HeaderComponent = () => {
    const [closeList, setCloseList] = useState<boolean>(false);
    const listRef = useRef<HTMLDivElement>(null);
    const user = useRecoilValue(userState);

    function foldList() {
        if (!listRef || !listRef.current) {
            return;
        }
        const style = listRef.current.style;
        if (closeList) {
            style.display = "none";
        } else if (!closeList) {
            style.display = "block";
        }
        setCloseList(!closeList);
    }

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        const target = event.target as HTMLLinkElement;
        const twoDep = target.nextElementSibling as HTMLDivElement;

        if (target.classList.contains("on")) {
            target.classList.remove("on");
            twoDep.style.display = "none";
        } else {
            target.classList.add("on");
            twoDep.style.display = "block";
        }
    };

    return (
        <React.Fragment>
            <div className="header">
                <span className="logo">
                    <Link to={"/main"}>
                        <img src="/images/logo.png" alt="logo" />
                    </Link>
                </span>
                <button
                    type="button"
                    onClick={foldList}
                    className={`${closeList ? "close" : "open"}`}
                >
                    <img src="" />
                </button>
                <div className="m-menu" ref={listRef}>
                    <div className="drawer on">
                        <div className="head">
                            <span className="logo">
                                <Link to={"/main"}>
                                    <img src="/images/logo.png" alt="logo" />
                                </Link>
                            </span>
                            <button
                                type="button"
                                onClick={foldList}
                                className={`${closeList ? "close" : "open"}`}
                            >
                                메뉴닫기
                            </button>
                            <div className="log-btn">
                                <ul>
                                    {user.accessToken && (
                                        <React.Fragment>
                                            <li>
                                                <Link to="/">로그아웃</Link>
                                            </li>

                                            <li>
                                                <Link to="/reservation">예약내역</Link>
                                            </li>
                                        </React.Fragment>
                                    )}
                                    {!user.accessToken && (
                                        <React.Fragment>
                                            <li>
                                                <Link to="/join">회원가입</Link>
                                            </li>
                                            <li>
                                                <Link to="/login">로그인</Link>
                                            </li>
                                        </React.Fragment>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="">
                            <nav className="nav">
                                <ul>
                                    <li>
                                        <Link to="/program">산림치유프로그램</Link>
                                    </li>
                                    <li className="">
                                        <Link to="/forest">치유의 숲 찾기</Link>
                                    </li>
                                    {/* <li>
                                        <Link to="/" className="arrow" onClick={handleMenuClick}>
                                            자료실
                                        </Link>
                                        <div className="two-dep">
                                            <ul>
                                                <li>
                                                    <Link to="">• 프로그램 사진 및 영상</Link>
                                                </li>
                                                <li>
                                                    <Link to="">• 암 치유인자</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li> */}
                                    {user.accessToken && (
                                        <React.Fragment>
                                            <li>
                                                <Link to="/survey">설문작성</Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/account"
                                                    className="arrow"
                                                    onClick={handleMenuClick}
                                                >
                                                    마이페이지
                                                </Link>
                                                <div className="two-dep">
                                                    <ul>
                                                        <li>
                                                            <Link to="/reservation">
                                                                • 예약내역
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/schedule">• 일정관리</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/SurveyList">
                                                                • 일일설문내역
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/modify">• 내 정보</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/account">• 계정관리</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </React.Fragment>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default HeaderComponent;
