import Table from "./Table/Table.jsx"
import Pagination from "./ui/Pagination.jsx"
import { sorting, getOrder } from "../utils/sorting.js"
import { search } from "../utils/searching.js"
import { useState, useEffect } from "react"


export default function TableContainer({filteredRoutes, state, query, JSONdata, updateJSONdata, keys, width, updateCurrentPage, currentPage}) {    
    
    const [routesPerPage] = useState(10);

    //states for table sorting
    const [order, setOrder] = useState("a-z"); //deafult sorting is ascending
    const [columnToSort, setColumnToSort] = useState("");

    //alphabetical ordering
    function handleSorting(col) {
        const newOrder = getOrder(col, columnToSort, order);
        setColumnToSort(col);
        const sortedJSONdata = sorting(col, newOrder, filteredRoutes);
        setOrder(newOrder);
        updateJSONdata(sortedJSONdata);
    }

    const searchedRoutes = search(query, filteredRoutes, updateCurrentPage, keys);

    // Get current routes
    const indexOfLastRoute = currentPage * routesPerPage;
    const indexOfFirstRoute = indexOfLastRoute - routesPerPage;
    const currentRoutes = searchedRoutes.slice(indexOfFirstRoute, indexOfLastRoute);
    
    //  Get the last page number
    const lastPage = Math.ceil(searchedRoutes.length/routesPerPage)
    
    // Change page
    function goToPage(number) {
        updateCurrentPage(number);
    }

    function paginateAfter() {
        if(currentPage!=lastPage){
        updateCurrentPage(prevPage=>prevPage+1)
        } else {
        updateCurrentPage(1);
        }
    }

    function paginateBefore() {
        if(currentPage!=1){
        updateCurrentPage(prevPage=>prevPage-1)
        } else {
        updateCurrentPage(lastPage);
        }
    }

    return(
        <>
            {(searchedRoutes.length==0 && JSONdata.length!=0) && <div className="w-full bg-slate-300 flex justify-center p-3 dark:bg-slate-600">
            <p>Cannot find results that fit the given restrictions.</p>
            </div>}

            {state != "loading" && JSONdata.length==0 && <div className="w-full bg-slate-300 flex justify-center p-3 dark:bg-slate-600">
                <p>No routes to display. Try again.</p>
            </div>}

            {state === "loading" && <div className="w-full bg-slate-300 flex justify-center p-3 dark:bg-slate-600">
                <p>Loading...</p></div>}

            { state === "success" && <> 
            <Table 
                currentRoutes={currentRoutes} 
                sort={handleSorting} 
                order={order}
                columnToSort={columnToSort}
                width={width}
                columnHeads={keys}
            />
            <Pagination
                paginateAfter={paginateAfter}
                paginateBefore={paginateBefore} 
                routesPerPage={routesPerPage} 
                totalRoutes={searchedRoutes.length}
                currentPage={currentPage} 
                lastPage={lastPage}
                width={width} goToPage={goToPage}
            /></>}
        </>
    )
}