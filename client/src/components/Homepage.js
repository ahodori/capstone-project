import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Homepage() {
    const [wikiblogsList, setWikiblogsList] = useState({});

    useEffect(() => {
        fetch("/wikiblogs")
        .then(res => {
            console.log(res);
            if (res.ok) {
                res.json().then((json) => {
                    setWikiblogsList(json);
                })
            } else {
                res.json().then((json) => {
                    console.log(json);
                    console.error("Error:", json.error);  
                })
            }
        })
    }, [])

    return (<div>
        {wikiblogsList.length > 0 ?
            wikiblogsList.map((wikiblogEntry) => {
                return (<div key={wikiblogEntry.id}>
                    <h3><Link to={"/wikiblog/"+wikiblogEntry.id}>{wikiblogEntry.name}</Link> by {wikiblogEntry.user.username}</h3>
                    <p>{wikiblogEntry.pagenum} pages</p>
                    <p>Updated {wikiblogEntry.updated}</p>
                </div>)
            })
        :
            <>Loading...</>
        }
    </div>)
}

export default Homepage;