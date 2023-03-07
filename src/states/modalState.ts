import { ModalInterface } from "@/interfaces/modalInterface";
import { atom } from "recoil";

const modalState = atom<ModalInterface>({
  key: "modalState",
  default: {
    show: false,
    title: "",
    content: "기본",
    saveShow: false,
    closeShow: false,
    callBackShow: false,
    confirmShow: false,
    confirmText:'확인',
    cancelShow: false,
    cancelText: "취소",
  },

});

export { modalState };
