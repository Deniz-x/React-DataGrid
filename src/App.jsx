import Navbar from "./components/Navbar.jsx" 
import { useState, useEffect} from "react"
import TableContainer from "./components/TableContainer.jsx"
import SearchBar from "./components/ui/SearchBar.jsx"
import Filtering from "./components/ui/Filtering.jsx"
import FilterSettings from "./components/ui/FilterSettings.jsx"
import { fetchData, fetchPathList } from "./utils/fetchData.js"
import { useWindowSize } from "./hooks/useWindowSize.jsx"
import { filter } from "./utils/filtering.js"


/**
 * @description List of names of properties we're pulling from the JSON file corresponding to the table headers
 * @type {Array}
 */
const keys = ["ServiceName", "DownstreamPathTemplate", "UpstreamPathTemplate", "UpstreamHttpMethod"];

function App() {

  //state to hold the selected and pulled from api, sorted and preprocessed data in the form of an array of objects. This is before filtering or searching.
  const [JSONdata, setJSONdata] = useState([]);

  //state to handle error when pulling from api. not imlemented yet.
  const [error, setError] = useState(false);

  // state to handle loading and success stated which decide which components to render
  const [state, setState] = useState('');

  //state to hold the selected data file name from the select box on top of the page

  const [path, setPath] = useState('bff-data1.json');
  
  //state to hold the options for the select box that chooses which file to pull data from
  const [pathList, setPathList] = useState(['bff-data1.json']);

  //state for pagination
  const [currentPage, setCurrentPage] = useState(1);

  //get the path list for select box and for later api call to get data from that path
  useEffect(() => {
    fetchPathList().then(pathlist => {setPathList(pathlist)});
  }, [])
 
  //handle loading data on selectbox selection. runs on mount and when path changes
  useEffect(() => {
    setState("loading");
    console.log(path);
    fetchData(path).then(
      (data => {
        setState("success");
        setCurrentPage(1);
        setJSONdata(data);
      })
    ).catch(setError(true));
  }, [path]);

  //current responsive window width
  const width = useWindowSize();
  
  //state to hold the query types into the search bar
  const [query, setQuery] = useState("");

  //user selected Methods/Services from the Filter dropdown
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  //state to show and hide the filtering options
  const [isShown, setIsShown] = useState(false);

  //does system prefer dark theme
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  //toggling light/dark theme that defaults to system preference for first viewing
  const [theme, setTheme] = useState(defaultDark ? 'dark' : 'light');

  //adding the theme to the page: code taken from tailwind documentation
  if (theme==="dark") {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  function switchTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    newTheme === "light" ? localStorage.theme = 'light' : localStorage.theme = 'dark';
    setTheme(newTheme);
  }

  function handleFiltering(column, value){
    column === "method" ? setSelectedMethods(value) : setSelectedServices(value);
  }

  let filteredRoutes = filter(JSONdata, selectedMethods, selectedServices, updateCurrentPage);

  function ShowHide() {
    setIsShown(prevIsShown => !prevIsShown);
  }

  function helperSetPath(value) {
    setPath(value);
  }

  function updateJSONdata(newData) {
    setJSONdata(newData);
  }

  function updateCurrentPage(newPage) {
    setCurrentPage(newPage);
  }

  return ( 
    <div className="bg-slate-100 h-screen overflow-auto font-mono dark:bg-slate-800 dark:text-slate-200 box-border">
      <Navbar
        theme={theme}
        switchTheme={switchTheme}
        pathList={pathList}
        setPath={helperSetPath}
        width={width}
      />
      <div className="flex items-center mb-1">
        <SearchBar setQuery={setQuery}/>
        <Filtering ShowHide={ShowHide}/>
      </div>
      <FilterSettings isShown={isShown} handleFiltering={handleFiltering} filteredRoutes={filteredRoutes}/>
      <TableContainer filteredRoutes={filteredRoutes} 
        state={state}
        query={query} 
        updateJSONdata={updateJSONdata} 
        JSONdata={JSONdata} 
        keys={keys} 
        width={width}
        updateCurrentPage={updateCurrentPage}
        currentPage={currentPage}/>
    </div>
  )
}
export default App