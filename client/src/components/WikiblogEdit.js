import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import { useParams, useNavigate, Link } from "react-router-dom"

function WikiblogEdit() {
    const [wikiblogData, setWikiblogData] = useState({});

    const [submitErrorText, setSubmitErrorText] = useState("");

    let { wikiblogid } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        fetch("/wikiblogs/"+wikiblogid)
        .then(res => {
            console.log(res);
            if (res.ok) {
                res.json().then((json) => {
                    console.log(json);
                    setWikiblogData(json);
                })
            } else {
                res.json().then((json) => {
                    console.log(json);
                })
            }
        })
    }, [])

    return (<div>
        {Object.keys(wikiblogData).length > 0 ?
            <>
                <h2>{wikiblogData.name} by <Link to={"/user/"+wikiblogData.user.id}>{wikiblogData.user.username}</Link></h2>
                {wikiblogData.pages.reverse().map((page) => {
                    return (<div>
                        <p>{page.is_index && <>Index: </>} <Link to={"/wikiblog/"+wikiblogData.id+"/"+page.id}>{page.title}</Link></p>
                        <p>Updated {page.updated}</p>
                    </div>)
                })}
            </>
        :
            <>Loading Wikiblog...</>
        }
    </div>)
}

export default WikiblogEdit;