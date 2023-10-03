import React from 'react'
import Select from 'react-select'



export default function Filtering({ShowHide}) {

    return (
        <>
            <div onClick={ShowHide} className="flex items-center p-1 pt-2 mr-auto mb-2 pr-5 lg:mb-0 lg:pr-20 cursor-pointer">
                <i className="fa-solid fa-filter mr-1 text-lg"></i>
                <p className="text-sm font-semibold">Filter</p>
            </div>
            
        </>
        
    )
}