import React from "react";
import WebLayout from "@layouts/web/WebLayout";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "@components/head/Header";

const Agreement = () => {
    window.scrollTo(0, 0);
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <HeaderComponent />
            <WebLayout>
                <div className="headerSpace"></div>
                <div className="policy">
                    <h3>이용약관</h3>
                    <div>
                        <h4>제1조 (목적)</h4>
                        <p>이 약관은 가천대학교 산학협력단(이하 "기관" 또는 "가천대"라 함)에서 제공하는 유무선 인터넷을 이용한 산림치유 서비스의 이용과 관련하여 기관과 이용자와의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
                        <h4>제2조 (용어의 정의)</h4>
                        <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
                        <ol style={{listStyle:"auto"}}>
                            <li>"서비스"라 함은 구현되는 단말기(PC, 휴대형 단말기 등의 각종 유무선 장치를 포함)와 상관없이 “기관”이 제공하는 “사이트”(주소를 기재하시기 바랍니다)를 통하여 이용할 수 있는 암 경험자를 위한 산림치유 서비스를 의미합니다.</li>
                            <li>“사이트”라 함은 산림치유 프로그램의 예약, 설문작성, 교육 신청 및 홍보 등 산림치유서비스를 회원에게 제공하기 위하여 “기관”이 운영하는 웹사이트를 의미합니다. </li>
                            <li>"회원"이라 함은 이 약관에 동의하여, ID와Password(비밀번호)를 발급받아 "기관"과 이용계약을 체결하고, "기관"이 제공하는 "서비스"를 이용하는 고객을 말합니다. 회원의 자격 및 권한 등은 이 약관에서 정한 바에 따라 일부 제한될 수 있습니다.</li>
                            <li>"이용자"라 함은 제1항의 서비스를 이용하는 “회원”을 말합니다.</li>
                            <li>“이용계약”이라 함은 홈페이지 이용과 관련하여 기관과 이용자간에 체결하는 계약을 의미합니다. </li>
                            <li>"아이디(ID)"라 함은 "회원"의 식별과 "서비스"이용을 위하여 "회원"이 정하고 “기관”이 승인하는 문자와 숫자의 조합을 말합니다. </li>
                            <li>"비밀번호(PASSWORD)"라 함은 "회원"이 “기관”으로부터 부여 받은 "아이디(ID)"를 통해 “서비스”에 접속할 때 회원 본인임을 증명하기 위하여 추가로 입력하는 정보로서, 회원 자신이 설정한 문자, 숫자, 및 특수문자 조합 최소 8자리를 말합니다. </li>
                            <li>”설문데이터”이라 함은 “회원”의 암 관련 건강력 등에 관한 설문 데이터를 “회원”의 동의 하에 수집하는 정보입니다. </li>
                            <li>”프로그램”이라 함은 “회원”이 "서비스"를 이용함에 있어 조회, 예약, 취소 등을 이용할 수 있는 “게시물”의 정보를 말합니다. </li>
                            <li>"개인정보"라 함은 살아 있는 개인에 관한 정보로서 해당 정보에 포함되어 있는 성명, 생년월일, 등의 사항에 의하여 해당 개인을 식별할 수 있는 정보(해당 정보만으로는 특정 개인을 식별할 수 없더라도 다른 정보와 쉽게 결합하여 알아볼 수 있는 것을 포함)를 말합니다.</li>
                            <li>"컨텐츠"이라 함은 "기관"이 서비스상에 게시한 부호, 문자, 음성, 음향, 화상, 동영상 등의 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등을 말합니다.</li>
                            <li>"회원탈퇴"라 함은 "회원"이 “기관”과의 서비스 이용계약을 해지하는 것을 의미합니다.</li>
                        </ol>
                        <h4>제3조 (약관의 효력 및 변경)</h4>
                        <ol>
                            <li>“기관”은 이 약관의 내용과 상호, 영업소재지, 대표자의 성명, 사업자등록번호, 연락처 등을 ”회원”이 알 수 있도록 “서비스” 홈페이지 초기화면에 게시하거나 기타의 방법으로 ”회원”에게 공지합니다.</li>
                            <li>“회원”은 “서비스” 가입 시 이 약관에 동의함으로써 효력이 발생합니다.</li>
                            <li>“기관”은 약관의 규제에 관한 법률, 전기통신기본법, 전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다. 개정된 약관은 “서비스” 홈페이지에 공지함으로써 효력을 발휘합니다.</li>
                            <li>“기관”이 약관을 개정할 경우에는 시행일자 및 개정사유를 명시하여 현행약관과 함께 개정약관의 시행일자 7일전부터 시행일자 전일까지 공지합니다. 단 “회원”에게 불리하게 약관내용을 변경하는 경우에는 시행일자로부터 30일 전까지 공지하도록 합니다.</li>
                            <li>“회원”은 변경된 약관에 대해 거부할 권리가 있습니다. “회원”은 변경된 약관이 공지된 지 15일 이내에 거부의사를 표시할 수 있습니다. “회원”이 거부하는 경우 “서비스” 제공자인 “기관”은 15일의 기간을 정하여 “회원”에게 사전통지 후 당해 “회원”과의 계약을 해지할 수 있습니다. 만약, “회원”이 거부 의사를 명시적으로 표시하지 않거나, 변경된 약관의 시행일자 이후에 "서비스"를 이용하는 경우에는 개정약관에 동의한 것으로 간주합니다.</li>
                        </ol>
                        <h4>제4조 (약관의 해석)</h4>
                        <ol>
                            <li>“회원”이 “기관”과 개별 계약을 체결하여 “서비스”를 이용하는 경우 “기관”은 개별 서비스에 대한 이용약관 또는 운영정책 등(이하 "운영정책 등")을 둘 수 있으며, 해당 내용이 본 약관과 상충되는 경우 개별 서비스에 대한 운영정책 등이 우선합니다.</li>
                            <li>이 약관에서 규정하지 않은 사항에 관해서는 약관의 규제에 관한 법률, 전기통신기본법, 전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등의 관계 법령에 따릅니다.</li>
                        </ol>
                        <h4>제 5조 (이용계약의 성립)</h4>
                        <ol>
                            <li>”이용계약”은 "회원"이 되고자 하는 자(이하 "가입신청자")가 이 약관의 내용에 대해 동의하면서 회원가입을 신청하고, 이에 대해 "기관"이 승낙함으로써 성립됩니다.</li>
                            <li>”기관”은 가입신청자의 신청에 대하여 "서비스" 이용을 승낙함을 원칙으로 합니다. 다만, “기관”은 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사용 후에 이용계약을 해지할 수 있습니다.
                                <ol>
                                    <li>허위의 정보를 기재하거나, "기관"이 제시하는 내용을 기재하지 않은 경우</li>
                                    <li>실명이 아니거나 타인의 명의를 이용하는 경우</li>
                                    <li>이용자의 귀책 사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하여 신청하는 경우</li>
                                    <li>가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 단 "기관"의 회원 재가입 승낙을 얻은 경우에는 예외로 함.</li>
                                </ol>
                            </li>
                            <li>제 1항에 따른 신청에 있어 "기관"은 "회원"의 종류에 따라 전문기관을 통한 실명확인 및 본인인증을 요청할 수 있습니다.</li>
                            <li>"기관"은 “서비스”를 제공함에 있어 “서비스” 관련 설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다.</li>
                            <li>제 2항과 제4항에 따라 회원가입신청의 승낙을 하지 아니하거나 유보하는 경우, "기관"은 원칙적으로 이를 가입 신청자에게 알리도록 합니다.</li>
                            <li>“이용계약”의 성립 시기는 "기관"이 홈페이지를 통한 회원가입 신청절차 상 회원가입 완료를 표시한 시점으로 합니다.</li>
                        </ol>
                        <h4>제6조 (이용자 정보의 제공)</h4>
                        <ol>
                            <li>“회원”으로 가입하여 “서비스”를 이용하고자 하는 가입신청자는 휴대폰 번호 등의 정보를 제공하고, 휴대폰 인증을 하여야 합니다.</li>
                            <li>가입신청자가 제1항에서 정한 인증을 거치지 않은 경우 “서비스” 이용이 제한될 수 있으며, 실명으로 등록하지 않은 자는 본 “서비스”에 관하여 일체의 권리를 주장할 수 없습니다.</li>
                            <li>타인의 명의를 도용하여 이용신청을 한 “회원”의 경우 “회원ID”는 삭제되며, 그 “회원”은 관계 법령에 따라 처벌을 받을 수 있습니다.</li>
                        </ol>
                        <h4>제7조 (개인정보의 보호 및 관리)</h4>
                        <ol>
                            <li> “기관”은 관계 법령이 정하는 바에 따라 계정정보를 포함한 회원의 개인정보를 보호하기 위하여 노력합니다. “회원”의 개인정보 보호 및 사용에 대해서는 “기관”이 별도로 고지하는 개인정보 처리방침에 따릅니다. 다만, “기관”이 제공하는 공식 사이트 이외의 웹사이트에서는 “기관”의 개인정보 처리방침이 적용되지 않습니다.</li>
                            <li> “기관”은 “회원”의 귀책사유로 인하여 노출된 “회원”의 계정정보를 포함한 모든 정보에 대해서는 “기관”의 고의 또는 중과실이 없는 한 책임을 지지 않습니다.</li>
                        </ol>
                        <h4>제 8조(회원정보의 변경)</h4>
                        <ol>
                            <li>"회원"은 개인정보관리 화면을 통하여 언제든지 개인정보를 열람하고 수정할 수 있습니다. 다만, 서비스 관리를 위해 필요한 아이디(ID), 생년월일, 실명 등 일부 정보는 수정이 불가능 합니다.</li>
                            <li>"회원"은 회원가입시 기재한 사항이 변경되었을 경우 온라인으로 수정을 하거나 전자우편 기타 방법으로 "기관"에 대하여 그 변경사항을 알려야 합니다.</li>
                            <li>제2항의 변경사항을 "기관"에 알리지 않아 발생한 불이익에 대하여 “기관”은 “기관”의 고의 또는 중과실이 없는 한 책임지지 않습니다.</li>
                        </ol>
                        <h4>제 9조(개인정보보호 의무)</h4>
                        <p>“기관”은 "개인정보 보호법" 등 관계 법령이 정하는 바에 따라, "회원"의 개인정보를 보호하기 위하여 노력합니다. 개인정보의 안전한 처리에 대해서는 관련 법령에 따른 "기관"의 개인정보 처리방침이 적용됩니다.</p>
                        <h4>제 10조(회원의 아이디 및 비밀번호 관리 의무)</h4>
                        <ol>
                            <li>"회원"의 "아이디(ID)"와 "비밀번호"에 관한 관리 책임은 "회원"에게 있으며, 이를 제3자가 이용하도록 하여서는 안 됩니다.</li>
                            <li>"회원"은 "아이디(ID)" 및 "비밀번호"가 도용되거나 제3자가 사용하고 있음을 인지한 경우에는 이를 즉시 “기관”에 통지하고 “기관”의 안내에 따라야 합니다.</li>
                            <li>제2항의 경우 해당 "회원"이 그 사실을 통지하지 않거나, 통지한 경우에도 "기관"의 안내에 따르지 않아 발생한 불이익에 대하여 “기관”은 “기관”의 고의 또는 중과실이 없는 한 책임지지 않습니다.</li>
                            <li>”기관”은 "회원"의 "아이디"가 개인정보 유출 우려가 있거나, 반사회적 또는 미풍양속에 어긋나거나 "기관" 및 "기관"의 운영자로 오인한 우려가 있는 경우, 해당 "아이디"의 이용을 거부하거나 제한할 수 있습니다.</li>
                        </ol>
                        <h4>제 11조(기관의 의무)</h4>
                        <ol>
                            <li>”기관”은 관련 법령과 이 약관이 금지하는 행위를 하지 않으며, 지속적이고 안정적으로 서비스를 제공하기 위하여 최선을 다하여 노력합니다.</li>
                            <li>”기관”은 "회원"의 개인정보를 본인의 승낙 없이 제3자에 누설, 배포하지 않고 이를 보호하기 위하여 노력합니다.</li>
                        </ol>
                        <h4>제 12조(회원의 의무)</h4>
                        <ol>
                            <li>"회원"은 다음 행위를 하여서는 안 됩니다.
                                <ol>
                                    <li>회원가입 신청 또는 회원정보 변경 시 허위 내용의 등록</li>
                                    <li>타인의 정보를 도용하는 행위</li>
                                    <li>"기관"의 동의 없이 영리를 목적으로 서비스를 사용하는 행위</li>
                                    <li>다른 “회원”의 명예를 훼손하거나 권리를 침해하는 행위</li>
                                    <li>기타 법령에 위배되는 행위</li>
                                </ol>
                            </li>
                            <li>”기관”은 "회원"이 제 1항의 행위를 하는 경우 이를 “회원”에게 통지하고, 서비스의 이용을 일시 또는 영구히 제한할 수 있습니다. 다만, 긴급히 조치할 필요가 있는 경우 사후에 통지할 수 있습니다.</li>
                        </ol>
                        <h4>제 13조(서비스의 이용)</h4>
                        <ol>
                            <li>“서비스” 이용은 회원가입 완료 후부터 가능 합니다.</li>
                            <li>“서비스”는 연중무휴 1일 24시간 제공함을 원칙으로 합니다. 다만, 서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며, "기관"이 별도로 날짜와 시간을 정할 수 있습니다.</li>
                            <li>”기관”은 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절 또는 운영상 상당한 이유가 있는 경우 "서비스"의 제공을 일시적으로 중단할 수 있습니다. </li>
                            <li>제2항 및 제3항의 경우 “기관”은 홈페이지 및 어플리케이션에 팝업 메시지, 개별 문자 발송 등을 통하여 "회원"에게 통지합니다. 다만, "기관"이 사전에 통지할 수 없는 부득이한 사유가 있는 경우 사후에 통지할 수 있습니다.</li>
                        </ol>
                        <h4>제 14조(서비스의 변경 등)</h4>
                        <ol>
                            <li>"기관"은 운영상ㆍ기술상의 필요에 따라 제공하고 있는 “서비스”의 전부 또는 일부를 변경할 수 있습니다.</li>
                            <li>"서비스"의 내용, 이용방법에 대하여 변경이 있는 경우 변경사유, 변경될 서비스의 내용 및 제공일자 등은 변경 전에 해당 서비스 초기화면에 게시하여야 합니다. 다만, 부득한 사정이 있는 경우에는 사후에 통지할 수 있습니다.</li>
                            <li>"기관"은 무료로 제공되는 서비스의 일부 또는 전부를 “기관”의 정책 및 운영의 필요에 따라 수정하거나 중단 또는 변경할 수 있으며, 이에 대하여 관련 법령상 특별한 규정이 없는 한 "회원"에게 별도의 보상을 하지 않습니다.</li>
                        </ol>
                        <h4>제 15조(이용계약 해지 및 이용제한 등)</h4>
                        <ol>
                            <li>"회원"은 “기관”에 언제든지 이용계약 해지 신청을 할 수 있으며, "기관"은 관련 법령이 정하는 바에 따라 이를 즉시 처리하여야 합니다.</li>
                            <li>"회원"이 계약을 해지할 경우, 관련 법령 및 개인정보 보호방침에 따라 "기관"이 회원정보를 보유하는 경우 및 정당한 업무처리를 위해 필요한 경우를 제외하고는 해지 즉시 "회원"의 모든 데이터는 삭제됩니다.</li>
                            <li>"회원"이 연속하여 1년 동안 “서비스”를 이용하기 위하여 “사이트”에 로그인(log-in)한 기록이 없는 경우 관련 법령에 따라 “기관”은 “회원”의 계정을 분리 보관 또는 파기할 수 있습니다.</li>
                            <li>”기관”은 "회원"이 이 약관의 의무를 위반하거나 “서비스”의 정상적인 운영을 방해한 경우, 경고, 일시정지, 영구이용정지 등으로 “서비스”의 이용을 단계적으로 제한할 수 있습니다.</li>
                            <li>”기관”은 전항에도 불구하고, "주민등록법"을 위반한 명의도용 및 결제도용, "저작권법" 을 위반한 불법프로그램의 제공 및 운영방해, "정보통신망 이용촉진 및 정보보호 등에 관한 법률 "을 위반한 해킹, 악성프로그램의 배포, 접속권한 초과행위 등과 같이 관련 법령을 위반한 경우에는 즉시 영구이용정지를 할 수 있습니다. </li>
                            <li>”기관”은 "회원"이 계속해서 3개월 이상 로그인하지 않는 경우, 회원정보의 보호 및 운영의 효율성을 위해 이용을 제한할 수 있습니다.</li>
                            <li>”기관”은 본 조의 이용제한 범위 내에서 제한의 조건 및 세부내용은 이용제한정책 및 개별 서비스상의 운영정책에서 정하는 바에 의합니다.</li>
                            <li>본 조에 따라 "서비스" 이용을 제한하거나 계약을 해지하는 경우에는 “기관”은 홈페이지에 팝업 메시지, 개별 문자 발송 등을 통하여 “회원”에게 통지합니다.</li>
                            <li>"회원"은 본 조에 따른 이용제한 등에 대하여 “기관”이 정한 절차에 따라 이의신청을 할 수 있습니다. 이 때 이의가 사유가 정당하다고 "기관"이 인정하는 경우 “기관”은 즉시 “서비스” 이용을 재개합니다.</li>
                        </ol>
                        <h4>제 16조(책임제한)</h4>
                        <ol>
                            <li>”기관”은 천재지변 또는 이에 준하는 불가항력으로 인하여 “기관”의 고의 또는 중과실 없이 “서비스”를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</li>
                            <li>”기관”은 "회원"의 귀책사유로 인한 서비스 이용의 장애 또는 손해에 대하여 책임을 지지 않습니다.</li>
                            <li>"회원"이 서비스를 통해 게재하거나 유포, 전송한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 해당 “회원”이 책임을 부담하며, ”기관”은 이로 인해 제3자에게 발생한 손해에 대하여는 책임지지 않습니다.</li>
                            <li>”기관”은 “회원”간 또는 “회원”과 제3자 상호간에 “서비스”를 매개로 하여 거래 등을 한 경우 에는 책임을 부담하지 않습니다.</li>
                        </ol>
                        <h4>제 17조 (손해배상)</h4>
                        <ol>
                            <li>“회원”이 본 약관의 규정을 위반함으로 인하여 “기관”에 손해가 발생하게 되는 경우, 본 약관을 위반한 “회원”은 “기관”에 발생하는 모든 손해를 배상하여야 합니다.</li>
                            <li>“회원”이 “서비스”를 이용하는 과정에서 행한 불법행위나 본 약관 위반행위로 인하여 “기관”이 당해 “회원” 이외의 제3자로부터 손해배상 청구 또는 소송을 비롯한 각종 이의제기를 받는 경우 당해 “회원”은 자신의 책임과 비용으로 “기관”을 면책시켜야 하며, “기관”이 면책되지 못한 경우 당해 “회원”은 그로 인하여 “기관”에 발생한 모든 손해를 배상하여야 합니다.</li>
                        </ol>
                        <h4>제 18조 (면책사항)</h4>
                        <ol>
                            <li> “기관”은 천재지변, 디도스(DDOS)공격, IDC장애, 기간통신사업자의 회선 장애 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면책됩니다.</li>
                            <li> “기관”은 “회원”의 귀책사유로 인한 서비스의 이용 장애에 대하여 책임을 지지 않습니다.</li>
                            <li> “기관”은 “회원”이 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며 그 밖에 서비스를 통하여 얻은 자료로 인한 손해 등에 대하여도 책임을 지지 않습니다. “기관”은 “회원”이 사이트에 게재한 게시물의 정확성 등 내용에 대하여는 책임을 지지 않습니다.</li>
                            <li>“기관”은 “회원” 상호 간 또는 “회원”과 제3자 상호 간에 서비스를 매개로 발생한 분쟁에 대해서는 개입할 의무가 없으며 이로 인한 손해를 배상할 책임도 없습니다.</li>
                            <li>“회원”이 자신의 개인정보를 타인에게 유출 또는 제공함으로써, 발생하는 피해에 대해서 “기관”은 책임을 지지 않습니다.</li>
                            <li> 본 서비스 화면에서 링크, 배너 등을 통하여 연결된 기관(이하 “피연결기관”)과 “회원”간에 이루어진 거래에 “기관”은 개입하지 않으며, 해당 거래에 대하여 책임을 지지 않습니다.</li>
                            <li>”기관”은 “회원”의 컴퓨터 환경이나 “기관”의 관리 범위에 있지 아니한 보안 문제로 인하여 발생하는 제반 문제 또는 현재의 보안기술 수준으로 방어가 곤란한 네트워크 해킹 등 “기관”의 고의 또는 중과실 없이 발생하는 문제에 대해서 책임을 지지 않습니다.</li>
                        </ol>
                        <h4>제 19조(준거법 및 재판관할)</h4>
                        <ol>
                            <li>”기관”과 "회원"간 제기된 소송은 대한민국의 법을 준거법으로 합니다.</li>
                            <li>”기관”과 "회원"간 발생한 분쟁은 대한상사중재원의 중재에 의해 해결합니다.</li>
                            <li>“기관”과 "회원"간 발생한 분쟁에 관한 소송은 민사소송법상 관할법원을 관할법원으로 합니다. </li>
                        </ol>
                        <h5>부 칙</h5>
                        <p>제1조 (시행일) 본 이용약관은 2023년 03월 06일부터 적용합니다. </p>
                    </div>
                </div>
            </WebLayout>
        </React.Fragment>
    );
};

export default Agreement;
