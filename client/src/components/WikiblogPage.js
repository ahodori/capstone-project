import ReactMarkdown from "react-markdown"
import ReactDom from "react-dom"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function WikiblogPage({showIndex}) {
    const [wikiblogData, setWikiblogData] = useState({});
    const [pageData, setPageData] = useState({});

    let { wikiblogid, pageid } = useParams();

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
    }, [wikiblogData])


    return (<div>
        {Object.keys(pageData).length > 0 ? 
            <ReactMarkdown>{pageData.text}</ReactMarkdown>
        :
            <>Loading...</>
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