export const setCursorToEnd = (element: HTMLElement) => {
  const range = document.createRange();
  const sel = window.getSelection();

  range.selectNodeContents(element);
  range.collapse(false);

  sel?.removeAllRanges();
  sel?.addRange(range);

  element.focus();
};

export const setBlockInFocus = (position: number) => {
  setTimeout(() => {
    const elements = document.querySelectorAll("[contenteditable]");
    const newBlock = elements[position] as HTMLElement;

    setCursorToEnd(newBlock);
  }, 0);
};
