import ReactMarkdown from "react-markdown"
import ReactDom from "react-dom"
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import remarkGfm from 'remark-gfm'
import { Button } from "@mui/material";

function WikiblogPage({showIndex}) {
    const [wikiblogData, setWikiblogData] = useState({});
    const [pageData, setPageData] = useState({});

    let { wikiblogid, pageid } = useParams();
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

    useEffect(() => {
        if (Object.keys(wikiblogData).length === 0) return

        if (showIndex) {
            pageid = wikiblogData.pages.find((page) => page.is_index).id
        }

        fetch("/pages/"+pageid)
        .then(res => {
            console.log(res);
            if (res.ok) {
                res.json().then((json) => {
                    console.log(json);
                    setPageData(json);
                })
            } else {
                res.json().then((json) => {
                    console.log(json);
                })
            }
        })
    }, [wikiblogData, pageid])

    function handlePressEditWikiblog(e) {
        e.preventDefault();
        navigate("edit");
    }


    return (<div>
        {Object.keys(wikiblogData).length > 0 ?
            <>
                <Button onClick={handlePressEditWikiblog}>Edit Wikiblog</Button>
                <Button>Edit Page</Button>

                {wikiblogData.pages.map((page) => {
                    return (<div>
                        <Link to={"/wikiblog/"+wikiblogData.id+"/"+page.id}>{page.title}</Link>
                    </div>);
                })}
            </>
        :
            <>Loading wikiblog...</>
        }

        {Object.keys(pageData).length > 0 ? 
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{pageData.text}</ReactMarkdown>
        :
            <>Loading page...</>
        }
    </div>)
}

export default WikiblogPage;

// const markdown = `Test Here's some more *test* text

// # Test

// are you serious
// with me right now
// `;

//     return (<div>
//         <ReactMarkdown>{markdown}</ReactMarkdown>
//     </div>)