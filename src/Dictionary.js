import React, {useState} from "react";
import "./Dictionary.css";
import Results from "./Results";
import axios from "axios";

export default function Dictionary (){

    let [keyword, setKeyword] = useState ("sunset");
    let [results, setResults] = useState (null);
    let [loaded, setLoaded] = useState (false);


    function handleResponse (response) {
        setResults (response.data[0]);
    }
    
    function search (){
        let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
        axios.get(apiUrl).then(handleResponse)
     }

    function handleSubmit(event) {
        event.preventDefault();
        search();  
    }

    function handleKeywordChange (event) {
        setKeyword(event.target.value);
    }

    function load() {
        setLoaded(true);
        search();
    }
   
    if (loaded){
    return (
    <div className="Dictionary">
        <section>
            <h1>What are you looking for?...</h1>
        <form onSubmit={handleSubmit}>
            <input type="search" onChange={handleKeywordChange} autoFocus={true} defaultValue="sunset"/> 
        </form>
        <div className="hint">
            suggested words: sunset, wine, yoga...
        </div>
        </section>
        <Results results={results} />
    </div> 
) } else {
    load();
    return null;
}
}