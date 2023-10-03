export default function EntryNumber({currentPage, lastPage, totalRoutes, routesPerPage}) {
    // get viewed column numbers for mobile pagination
    let entryNumberFrom =  1 + (currentPage-1)*routesPerPage;
    return (
        <div className="inline-flex lg:w-screen lg:justify-end lg:pr-20 lg:pt-5">
            <div className="bg-slate-300 pr-1 pl-1 rounded-lg dark:bg-slate-600">
                <p>{totalRoutes === 0 ? 0 : `${entryNumberFrom}${currentPage===lastPage ? (entryNumberFrom===totalRoutes? "" : `-${totalRoutes}` ): `-${entryNumberFrom+routesPerPage-1}`}`}</p>
            </div>
            <p>&nbsp;of {totalRoutes}</p>
        </div>
    )
}