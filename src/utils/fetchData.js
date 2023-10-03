import { Octokit } from "octokit";
import { preProcessJSON } from "./preProcessJSON";

/**
 * @description instantiate new octokit to use REST API using access token from GitHub
 * @type Octokit
 */
//
const octokit = new Octokit({ 
    auth: import.meta.env.VITE_API_KEY,
  });

/**
 * @description makes api call using Octokit & REST API to access a github repo folder.
 * 
 * @returns {Array} an array of file names to display in the dropdown menu and make the api call on selection
 */
//
export const fetchPathList = async () => {
    const response = await octokit.request("GET /repos/{owner}/{repo}/contents/src/data", {
        owner: import.meta.env.VITE_REPO_OWNER,
        repo: import.meta.env.VITE_REPO_NAME,
        per_page: 2
    });
    
    const dataPathList = []
    
    for (let index = 0; index < response.data.length; index++) {
        dataPathList.push(response.data[index].name)
    }

    return(dataPathList);
}

/**
 * @description makes api call using Octokit & REST API to access a github repo file to receive the data
 * 
 * @param {string} path file name of the selected data in the select box on top of the page
 * 
 * @returns {Array} the selected JSON file's Routes to display on the table
 */
//

export const fetchData = async (path) => {
    
      /**
       * on selection make the api call
       */
      const dataFile = await octokit.request(`GET /repos/{owner}/{repo}/contents/src/data/${path}`, {
        mode: 'no-cors',
        owner: import.meta.env.VITE_REPO_OWNER,
        repo: import.meta.env.VITE_REPO_NAME,
        per_page: 2
      });

      console.log(dataFile);

      /**
       * atob function decodes base64 encoded data.
       */
      const JSONcontents = JSON.parse(atob(dataFile.data.content));

      console.log(JSONcontents);
      const JSONroutes = preProcessJSON(JSONcontents);


      
      return(JSONroutes);
    
  };
