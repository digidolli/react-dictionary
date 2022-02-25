import React, {useState} from "react";
import "./Dictionary.css";
import Results from "./Results";
import axios from "axios";
import Photos from "./Photos";

export default function Dictionary (){

    let [keyword, setKeyword] = useState ("sunset");
    let [results, setResults] = useState (null);
    let [loaded, setLoaded] = useState (false);
    let [photos, setPhotos] = useState (null);


    function handleResponse (response) {
        setResults (response.data[0]);
    }

    function handlePexelsResponse (response){
       setPhotos(response.data.photos)
    }
    
    function search (){
        let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
        axios.get(apiUrl).then(handleResponse)

        let pexelsApiKey = "563492ad6f91700001000001d844e8da93234d51a0409a9d26ddccc2";
        let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=6`;
        let headers = { Authorization: `Bearer ${pexelsApiKey}` };
        axios.get(pexelsApiUrl, { headers: headers }).then(handlePexelsResponse);
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
        <Photos photos={photos} />
    </div> 
) } else {
    load();
    return null;
}
}