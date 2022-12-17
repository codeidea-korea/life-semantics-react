import { UserInterface } from '@interfaces/userInterface';
import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

const userState = atom<UserInterface>({
  key: 'userState',
  default: {
    userAuthority: '',
    userBirth: '',
    userEmail: '',
    userEmailAgree: '',
    userGender: '',
    userID: '',
    userName: '',
    userNo: 0,
    userPass: '',
    userPhone: '',
    userRegDate: '',
    userSmsAgree: '',
    accessToken: '',
  },
  effects_UNSTABLE: [ persistAtom ],
});

export { userState };