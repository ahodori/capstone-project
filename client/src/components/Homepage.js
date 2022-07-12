import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Homepage({handleOpenNewWikiblog}) {
    const [wikiblogsList, setWikiblogsList] = useState({});

    useEffect(() => {
        fetch("/wikiblogs")
        .then(res => {
            console.log(res);
            if (res.ok) {
                res.json().then((json) => {
                    console.log(json);
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

    return (<>
        <div>
            <button onClick={handleOpenNewWikiblog}>New Wikiblog</button>
        </div>
        <div>
            {wikiblogsList.length > 0 ?
                wikiblogsList.map((wikiblogEntry) => {
                    return (<div key={wikiblogEntry.id}>
                        <h3><Link to={"/wikiblog/"+wikiblogEntry.id}>{wikiblogEntry.name}</Link> by <Link to={"/user/"+wikiblogEntry.user.id}>{wikiblogEntry.user.username}</Link></h3>
                        <p>{wikiblogEntry.pagenum} pages</p>
                        <p>Updated {wikiblogEntry.updated}</p>
                    </div>)
                })
            :
                <>Loading...</>
            }
        </div>
    </>)
}

export default Homepage;