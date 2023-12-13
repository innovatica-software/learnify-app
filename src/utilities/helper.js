exports.formatDate=(dateString)=>{
  const months = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];
  
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
  
    // Convert hours from 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12;
  
    // Add leading zero to minutes if needed
    const formattedMinutes = (minutes < 10 ? "0" : "") + minutes;
  
    return `${day} ${month} ${year}       ${hours}:${formattedMinutes}${amOrPm}`;
  }
exports.newFormatDate = (inputDate) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(inputDate);
  return date.toLocaleDateString('en-US', options);
};