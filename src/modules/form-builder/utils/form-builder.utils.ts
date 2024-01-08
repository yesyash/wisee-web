export const setBlockInFocus = (position: number) => {
  setTimeout(() => {
    const elements = document.querySelectorAll("[contenteditable]");
    const newBlock = elements[position] as HTMLElement;

    window.getSelection()?.selectAllChildren(newBlock);
    window.getSelection()?.collapseToEnd();

    newBlock.focus();
  }, 0);
};
