import EntryNumber from "./EntryNumber";

export default function Pagination({paginateAfter, paginateBefore, routesPerPage, totalRoutes, currentPage, lastPage, goToPage, width}) {
    const pageNumbers = [];

    for (let i = 1; i <= lastPage; i++) {
        pageNumbers.push(i);
        
    }
    
    return(
        <div className={`inline-flex w-full lg:block mb-4 ${width<=import.meta.env.VITE_DESKTOP_THRESHOLD ? "justify-end pr-5 pt-2" : ""}`}>
            <EntryNumber
                routesPerPage={routesPerPage}
                totalRoutes={totalRoutes}
                currentPage={currentPage}
                lastPage={lastPage}
            />
            <div className="flex lg:justify-center">
                <div onClick={paginateBefore} className="bg-slate-300 dark:bg-slate-600 w-6 h-6 flex justify-center items-center rounded-lg ml-2 cursor-pointer lg:h-8 lg:w-8">
                    <p>&#60;</p>
                </div>
                { width>import.meta.env.VITE_DESKTOP_THRESHOLD && pageNumbers.map(number => {
                        return(
                            <li key={number} onClick={() => goToPage(number)} className={`${number===currentPage ? "bg-slate-400 border border-slate-500 dark:bg-slate-800 dark:border dark:border-gray-500" : ""} bg-slate-300 dark:bg-slate-600 w-8 h-8 flex justify-center items-center rounded-md ml-2 cursor-pointer`}>
                                <a href="!#" className='page-link'>
                                    {number}
                                </a>
                            </li>
                        )
                    })}
                <div onClick={paginateAfter} className="bg-slate-300 dark:bg-slate-600 w-6 h-6 flex justify-center items-center rounded-lg ml-2 cursor-pointer lg:h-8 lg:w-8">
                    <p>&#62;</p>
                </div>
            </div>
        </div>

    )
}