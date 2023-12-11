exports.formatDate = (dateString) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct", "Nov", "Dec"
];
  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  return `${month} ${day} `;
}
exports.newFormatDate = (inputDate) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(inputDate);
  return date.toLocaleDateString('en-US', options);
};