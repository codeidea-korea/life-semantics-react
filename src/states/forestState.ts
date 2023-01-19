import { atom } from 'recoil';
import { ForestInterface } from '@/interfaces/forestInterface';

const forestState = atom<ForestInterface[]>({
    key: "forestState",
    default: [],
});
  
export { forestState };