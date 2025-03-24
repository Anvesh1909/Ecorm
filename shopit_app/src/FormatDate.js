function formatDate(date) {
    const options = { year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        // hour: '2-digit', 
        // minute: '2-digit', 
        // second: '2-digit', 
        hour12: true };
    return new Date(date).toLocaleDateString('en-US', options);
}

export default formatDate;

