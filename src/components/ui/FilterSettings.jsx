import Select from 'react-select'

export default function FilterSettings({isShown, handleFiltering, filteredRoutes}) {
    //getting select options for filtering
    let uniqueMethods = [... new Set(filteredRoutes.flatMap(x=>x.UpstreamHttpMethod))];
    let uniqueServices = [... new Set(filteredRoutes.map(x=>x.ServiceName))]

    const methodOptions = uniqueMethods.map(method => ({ value: method, label: method }));
    const serviceOptions = uniqueServices.map(service => ({ value: service, label: service }));
    return (
        <>
            {isShown && <div className='w-screen block p-2 pr-10 pl-10 text-sm font-semibold text-slate-400 lg:flex lg:justify-end lg:pr-20'>
            <label htmlFor="methods" className="inline-block">Select Service: 
            <Select options={serviceOptions}
                className='inline-block mb-3 mr-5 ml-5' 
                name="services" id="services"  
                isMulti
                onChange={(e) => {
                handleFiltering("service", e.map(o => o.value))
                }}
            />
            </label>
            <label htmlFor="methods" className="inline-block ">Select Method: 
            <Select options={methodOptions}
                className='inline-block ml-5' 
                name="methods" id="methods" 
                isMulti
                onChange={(e) => {
                handleFiltering("method",e.map(o => o.value))
                }}
            />
            </label>
            </div>}
        </>
    )
}