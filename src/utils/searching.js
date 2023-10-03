import { useMemo } from "react";

/**
 * @description search in all 4 columns if 3 or more letters are typed in the search bar
 * @param {String} query what is typed on the search bar
 * @param {Array} JSONdata 
 * @param {Function} setCurrentPage 
 * @param {Array} keys 
 * @returns {Array} routes that includes the query in any of their 4 properties (columns)
 */

export function search(query, JSONdata, setCurrentPage, keys) {

  /**
   * useMemo makes sure to only recalculate searchedRoutes when query or JSONdata is changed as opposed to recaulculate every re-render
   */
  
  const searchedRoutes = useMemo(() => {

    if(query.length >= 3){setCurrentPage(1);}

    return query.length >= 3 ? (JSONdata.filter(route => {
    return (keys.some((key) => {
      return key==="UpstreamHttpMethod" ? route[key][0].includes(query) : route[key].toUpperCase().includes(query)}))
  })) : JSONdata;
  }, [query, JSONdata])

  return searchedRoutes;
}