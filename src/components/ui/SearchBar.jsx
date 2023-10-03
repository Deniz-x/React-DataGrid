export default function SearchBar({setQuery}) {
    return(
        <div className="w-screen p-5 lg:pl-16 pt-0 pb-1">
            <div className="flex align-middle border border-slate-300 max-w-xs rounded-xl lg:w-1/4">
                <i className="fa fa-search text-base ml-2 mr-2" aria-hidden="true"></i>
                <input onChange={(e) => setQuery(e.target.value.toUpperCase())} type="search" placeholder="search routes..." className="w-full bg-inherit text-sm mr-2 focus:border-slate-300"/>
            </div>
        </div>
    ) 

}