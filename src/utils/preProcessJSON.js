/**
 * @description preprocess JSON selected to print on screen 1) remove "Service" from Service Name values for cleaner look 3) make BFF Methods uppercase 2) make undefined service names "External"
 *
 * @param {JSON} JSONFile 
 * 
 * @returns preprocessed JSON that is an array of objectss
 */
export const preProcessJSON = (JSONFile) => {return(JSONFile.Routes.map(route => {
    const serviceIndex = route.ServiceName === undefined ? -1 : route.ServiceName.search("[Ss]ervice");
    const cleanServiceName = serviceIndex===-1 ? route.ServiceName : route.ServiceName.substring(0, serviceIndex);
    const upperMethod = route.UpstreamHttpMethod.map(method => method.toUpperCase());
    return(
      route.ServiceName === undefined ? {...route, ServiceName: "External", UpstreamHttpMethod: upperMethod} : {...route, ServiceName: cleanServiceName, UpstreamHttpMethod: upperMethod}
    )
  }))}