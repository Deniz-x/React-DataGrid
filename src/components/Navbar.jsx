import Select from 'react-select'

export default function Navbar({ theme, switchTheme, pathList, setPath, width }) {

    const dataOptions = pathList.map(path => ({ value: path, label: path }));

    return (
        <>
            <nav className="p-5 pl-10 pr-10 flex justify-between text-2xl">
                <div className='flex items-center'>
                    <h1 className="bg-inherit font-bold lg:inline-block">App BFF</h1>
                    {width > 430 && <Select options={dataOptions}
                        className='text-sm lg:inline-block ml-5 lg:ml-7 font-semibold text-slate-400'
                        name="json" id="json"
                        defaultValue={pathList[0]}
                        placeholder={pathList[0]}
                        onChange={(e) => {
                            setPath(e.value)
                        }}

                    />}
                </div>
                <div className="cursor-pointer flex items-center">
                    <div onClick={switchTheme} className="inline-block h-8 ml-5">
                        {theme === "dark" ? <i className="fas fa-sun"></i> : <i onClick={switchTheme} className="fa-solid fa-moon"></i>}
                    </div>
                    {
                        //<i className="fa-solid fa-arrow-right-from-bracket"></i>
                    }
                </div>

            </nav>
            {width <= 430 && <Select options={dataOptions}
                className='text-sm lg:inline-block ml-5 lg:ml-7 mb-2 w-fit font-semibold text-slate-400'
                name="json" id="json"
                defaultValue={pathList[0]}
                placeholder={pathList[0]}
                onChange={(e) => {
                    setPath(e.value)
                }}

            />}
        </>
    )
}