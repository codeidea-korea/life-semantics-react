import { UserInterface } from '@interfaces/userInterface';
import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

const userState = atom<UserInterface>({
  key: 'userState',
  default: {
    userId: '',
    name: '',
  },
  effects_UNSTABLE: [ persistAtom ],
});

export { userState };