import { TableHeader } from "./TableHeader.jsx";
import TableRow from "./TableRow.jsx"

export default function Table({currentRoutes, sort, order, columnToSort, width, columnHeads}) {
    //arrow determines whether the up or down arrow will be displayed
    const arrow = order === "a-z" ? <i className="fa-solid fa-caret-down text-xs text-slate-500 dark:text-slate-400 pl-2"></i> : 
    <i className="fa-solid fa-caret-up text-xs text-slate-500 dark:text-slate-400 pl-2"></i>;

    return (
        <div>
            
            {
                //mobile table
            }
            {width<=import.meta.env.VITE_DESKTOP_THRESHOLD && <div className="pr-3 pl-3 mt-2">
                
                {currentRoutes.map((route, index) => {
                    return(
                    <TableRow 
                    route={route} 
                    key={index} 
                    width={width} 
                    />)    
                            
                })}

            </div>}
            {
                //desktop table
            }
            
            {width>import.meta.env.VITE_DESKTOP_THRESHOLD && <div className="flex items-center justify-center pr-20 pl-20">
                <table className="text-left border-collapse rounded-lg overflow-hidden w-full lg:mt-3">
                    <thead>
                        <tr key="thead" className="bg-slate-300 dark:bg-slate-500">
                            {columnHeads.map(column => {
                                return(
                                    <TableHeader key={column} column={column} sort={sort} columnToSort={columnToSort} arrow={arrow}/>
                                )
                            })}
                        
                            <th></th>
                        </tr>
                    </thead>
                    
                        {
                            //data extraction: map the route objects to access the properties we want from each object
                        }
                        <tbody className="bg-slate-50 dark:bg-slate-700">
                            {currentRoutes.map((route, index) => {
                                return (
                                    <TableRow route={route} key={index} width={width}/>
                                )
                            
                            })}
                            
                        </tbody>
                    
                </table>
            </div>}
            
        </div>

    );
};
