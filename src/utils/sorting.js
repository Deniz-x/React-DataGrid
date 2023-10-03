/**
 * @description sorts the data based on the alphabetic order, either a-z or z-a, on the column selected (clicked on column header)
 * @param {String} col column clicked on to sort
 * @param {String} newOrder either a-z or z-a decided by the getOrder function below
 * @param {Array} JSONdata data to sort
 * @returns sorted JSONdata
 */

export function sorting(col, newOrder, JSONdata) {
    let sortedJSONdata;

    /**
    * because UpStreamHTTPMethod is a list, need to access it as such and only consider first method in the list
    */
    if (newOrder === "a-z") {
      sortedJSONdata = [...JSONdata].sort((a,b) =>
        col === "UpstreamHttpMethod" ? (a[col][0].toLowerCase() > b[col][0].toLowerCase() ? 1 : -1) :
        (a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1)
      );
      
    } else {
      sortedJSONdata = [...JSONdata].sort((a,b) =>
      col === "UpstreamHttpMethod" ? (a[col][0].toLowerCase() < b[col][0].toLowerCase() ? 1 : -1) :
      (a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1)
      );
    }

    return sortedJSONdata;
}

/**
 * @description decides on the order based on current state of the table. makes sure first sorting is a-z when clicked on a new column. then toggles between a-z and z-a
 * @param {String} col current column selected to sort
 * @param {String} prevCol previous column that was sorted
 * @param {String} order current order of the prev column selected to sort. allows for toggling if clicked on the same column header multiple times
 * @returns {String} new order a-z or z-a
 */

export function getOrder (col, prevCol, order) {
    let newOrder;
    if (col!=prevCol) {
        newOrder = "a-z";
    } else {
        newOrder = ( order === "z-a") ? "a-z" : "z-a";
    }
    return newOrder;
}

