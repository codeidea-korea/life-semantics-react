import {atom} from 'recoil';

/**
 *  회원가입에 사용하는 전역변수
 */
const joinState = atom({
    key: 'joinState',
    default: {
        userNo: 0,
        userID: '',
        userPass: '',
        userName: '',
        userBirth: '',
        userPhone: '',
        userSmsAgree: '0',
        userEmail: '',
        userEmailAgree: '0',
        tos1: false,
        tos2: false,
        tos3: false,

        // piNo: 0,
        // userGender: '',
        // userIsSmoke: '',
        // userSmokeAmt: 0,
        // userSmokeStartYear: 0,
        // userSmokeEndYear: 0,
        // userIsDrink: '',
        // userDrinkAmt: 0,
        // userDrinkStartYear: 0,
        // userDrinkEndYear: 0,
        // userIsCaffeine: '',
        // ciNo: 0,
        // userDiagnosis: '',
        // userDiagName: '',
        // userDiagDate: '',
        // userCureType: '',
        // userCureName: '',
        // userCureEndDate: '',
        // userDiagEtc: '',
        // userDiagEtcName: '',
        // userNowHealStat: '',
    },
});


export {joinState};
