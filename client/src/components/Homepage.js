import { useState, useEffect } from "react";

function Homepage() {
    const [wikiblogsList, setWikiblogsList] = useState({});

    useEffect(() => {
        fetch("/wikiblogs")
        .then(res => {
            console.log(res);
            if (res.ok) {
                res.json().then((json) => {
                    console.log(json);
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

    </div>)
}

export default Homepage;