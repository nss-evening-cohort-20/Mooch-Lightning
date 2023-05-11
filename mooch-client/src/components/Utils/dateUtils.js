/** 
* This function translates a C# DateTime string and formats it correctly. Also it gracefully handles null values
*/
export const formatDateToString = (date) => {
    if (!date) {
        return ""
    }
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString()
}