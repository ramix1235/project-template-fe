export const webStorageID = 'project'; // TODO: Set your ID

export const getItem = (key: string) => {
  const webStorageKey = `${webStorageID}.${key}`;

  return localStorage.getItem(webStorageKey);
};

export const setItem = (key: string, value: string) => {
  const webStorageKey = `${webStorageID}.${key}`;

  localStorage.setItem(webStorageKey, value);
};

export const removeItem = (key: string) => {
  const webStorageKey = `${webStorageID}.${key}`;

  localStorage.removeItem(webStorageKey);
};
