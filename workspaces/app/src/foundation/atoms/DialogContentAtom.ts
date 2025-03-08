import { atom } from 'jotai';

const StateAtom = atom<JSX.Element | null>(null);

export const DialogContentAtom = atom(
  (get) => {
    return get(StateAtom);
  },
  (_get, set, content: JSX.Element | null) => {
    const isOpen = content != null;

    if (isOpen) {
      document.getElementById('body')?.setAttribute('style', 'overflow: hidden;');
    } else {
      document.getElementById('body')?.setAttribute('style', 'overflow: auto;');
    }

    set(StateAtom, content);
  },
);
