const formatDate = (time) => {
  const originalTime = new Date(time);

  const year = originalTime.getFullYear();
  const month = ("0" + (originalTime.getMonth() + 1)).slice(-2);
  const date = ("0" + originalTime.getDate()).slice(-2);
  const formattedDate = `${date}-${month}-${year}`;
  return formattedDate;
};
export default formatDate;
