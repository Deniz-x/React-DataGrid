import { useMemo } from "react"

/**
 * @description filters the data over two columns: BFF Method and Service Name. filters based on the select values in Filter section
 * @param {Array} searchedRoutes data that has been searched and now needs to be filtered before printing on screen
 * @param {Array} selectedMethods user selected methods to filter for
 * @param {Array} selectedServices user selected services to filter for
 * @param {Function} updateCurrentPage function to run setCurrentPage in App.jsx. here after any filtering, current page is set to 1 to avoid bugs in pagination and better user experince
 * @returns {Array} filtered data
 */

export function filter(searchedRoutes, selectedMethods, selectedServices, updateCurrentPage) {
    let filteredRoutes = searchedRoutes;

    filteredRoutes = useMemo(() => {
    return(selectedMethods.length>0 || selectedServices.length>0) ? searchedRoutes.filter(route => {

    updateCurrentPage(1);
    
    return(
      (selectedServices.includes(route.ServiceName) || selectedServices.length===0) && (route.UpstreamHttpMethod.map(method=> selectedMethods.includes(method)).includes(true) || selectedMethods.length===0)
    )
    }) : searchedRoutes;}, [selectedMethods, selectedServices, searchedRoutes])
    return filteredRoutes;
}