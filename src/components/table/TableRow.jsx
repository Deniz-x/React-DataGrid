import React, {useState} from 'react'
import MethodBadge from './MethodBadge';

export default function TableRow({route, width}) {
    const [isShown, setIsShown] = useState(false);
    const {ServiceName, DownstreamPathTemplate, UpstreamPathTemplate, UpstreamHttpMethod, ...rest} = route;

    function ShowHide() {
        setIsShown(prevIsShown => !prevIsShown);
    }

    return (
        <>
            {
                //mobile row
            }
            {width<=import.meta.env.VITE_DESKTOP_THRESHOLD && <div onClick={ShowHide} className="border-2 p-3 pt-1 pb-21 rounded-xl mb-2 bg-slate-50 border-gray-300 hover:bg-slate-200 dark:bg-slate-700 dark:border-gray-500 hover:dark:bg-slate-600">
                <div className="flex items-baseline mt-1">
                    <p className="mr-auto font-semibold">{ServiceName}</p>
                                
                    {UpstreamHttpMethod.map((method, index) => {         
                        return(          
                            <MethodBadge method={method} key={index}/>
                        )
                    })}
                                
                </div>
                            
                <div>
                    <div className="flex items-baseline">
                        <p className="text-slate-400 text-sm">Service:</p>
                        <p className="text-sm break-all">{DownstreamPathTemplate}</p>
                    </div>
                    <div className="flex items-baseline">
                        <p className="text-slate-400 text-sm">BFF:</p>
                        <p className="text-sm break-all">{UpstreamPathTemplate}</p>
                    </div>
                </div>
                {isShown && <div className='text-xs bg-inherit border-t-2 pl-2 pt-1 mt-1 break-all'>
                    <p>{JSON.stringify(rest)}</p>
                </div>}

            </div>}

            {
                //desktop row
            }
            

            {width>import.meta.env.VITE_DESKTOP_THRESHOLD && 
            <tr className='text-sm border-t-2  dark: border-slate-300 leading-7 first-of-type:border-slate-400'>
                <td className='font-semibold pr-3 pl-2'>{ServiceName}</td>
                <td className='pr-3 break-all'>{DownstreamPathTemplate}</td>
                <td className='pr-3'>{UpstreamPathTemplate}</td>
                <td>
                    {UpstreamHttpMethod.map((method,index) => {
                        return (
                            <MethodBadge method={method} key={index}/>
                        )
                    })}
                </td>
                {
                //the details button will show the remaining properties
                }

                <td onClick={ShowHide} className='pr-2 cursor-pointer'><i className="fa-solid fa-ellipsis text-lg"></i></td>

            </tr>
            }
            {width>import.meta.env.VITE_DESKTOP_THRESHOLD && isShown && <tr>
                    <td colSpan={5} className='text-xs bg-slate-200 dark:bg-inherit border-t-2 pl-2 pr-2 break-all'>{JSON.stringify(rest)}</td>
            </tr>}
            
        </>

    ) 
}
