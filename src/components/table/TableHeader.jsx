export function TableHeader({column, sort, columnToSort, arrow}) {
    let theadText = "THEAD";
    switch (column){
        case "ServiceName":
            theadText = "SERVICE NAME";
            break;
        case "DownstreamPathTemplate":
            theadText = "SERVICE URL";
            break;
        case "UpstreamPathTemplate":
            theadText = "BFF URL";
            break;
        case "UpstreamHttpMethod":
            theadText = "BFF METHOD";
    }

    return(
        <th onClick={() => sort(column)}
            className="align-middle pr-2 border-b-2 dark: border-slate-400 cursor-pointer">
            <p className="inline-block pl-2 align-middle leading-8">{theadText}</p>
            {columnToSort!=column && <i className="fa-solid fa-sort ml-1 text-xs text-slate-500 dark:text-slate-400"></i>}
            {columnToSort === column && arrow}
        </th>
    )
}