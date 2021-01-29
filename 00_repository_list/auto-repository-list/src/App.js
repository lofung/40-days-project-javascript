import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  const [list, setList] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch("https://api.github.com/users/lofung/repos");
      const jsonData = await response.json();
      const result = jsonData.filter(entry => entry.has_pages === true);
      //console.log(jsonData);
      setList(result);
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  return (
    <div className="App">
      <h3>List of small gadget projects</h3>
      <h4>This page is currently made in simple mode. It would be updated to a modern frontend when there is more time.</h4>
      {/* list */}
      <span>Repository Name // </span><span>Github // </span><span>Last Update Date // </span><br />
      {list.map((entry, idx) => 
        <><a href={"http://lofung.github.io/" + entry.name} key={idx+ "abc"}>{entry.name}</a> <a href={entry.svn_url} key={idx}>github</a><span> {entry.updated_at.split("T")[0]}</span><br /></>
      )}
      <h6>This page is rendered by simple react/hook pulling an github API of repository.</h6>
      <h6><a href="https://old.reddit.com/r/learnjavascript/comments/ke8b5p/getting_an_array_of_all_github_repository_that/gg19r7u/?context=3">source</a></h6>

    </div>
  );
}

export default App;
