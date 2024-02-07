export const PageDefaultTitle = "Alura App";

export const setPageTitle = (title: string) => {
  if (title && document.title !== title) {
    document.title = title;
  }
};

export const setPageBaseTitle = (title: string) => {
  const baseTitle = `${title} - ${PageDefaultTitle}`;

  if (title && document.title !== baseTitle) {
    document.title = baseTitle;
  }
};
