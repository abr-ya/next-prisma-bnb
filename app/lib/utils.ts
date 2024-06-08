export const addTimeStamp = (name: string) => {
  const arr = name.split(".");
  const ext = arr.pop();

  return `${arr.join(".")}-${Date.now()}.${ext}`;
};
