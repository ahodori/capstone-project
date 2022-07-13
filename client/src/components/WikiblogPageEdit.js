import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

function WikiblogPageEdit() {
    const textareaRef = useRef();
    const [pageText, setPageText] = useState("");

    const [pageData, setPageData] = useState({});

    let { wikiblogid, pageid } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
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
    }, []) 

    useEffect(() => {
        setPageText(pageData.text);
        textareaRef.current.value = pageData.text;
    }, [pageData])

    function handleChangePageText(e) {
        //console.log(e);
        setPageText(e.target.value);
    }

    function handleKeyDown(e) {
        let insertCharacter;

        if (e.key === "Tab" && e.shiftKey) {
            e.preventDefault();
            insertCharacter = `\t`;
        }

        if (insertCharacter) {
            const { selectionStart, selectionEnd } = e.target;
            const newText = pageText.substring(0, selectionStart) + insertCharacter + pageText.substring(selectionEnd);
            //console.log(newText);
            setPageText(newText);
            if (textareaRef.current) {
                textareaRef.current.value = newText;
                textareaRef.current.selectionStart = textareaRef.current.selectionEnd = selectionStart+1;
            }
        }
        //console.log(e);
    }

    function handleSubmit(e) {
        e.preventDefault();
        //console.log(pageText);
    }

    return (<div>
        <form onSubmit={handleSubmit}>
            <textarea ref={textareaRef} onChange={handleChangePageText} onKeyDown={handleKeyDown}/>
            <button type="submit">Submit</button>
        </form>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{pageText}</ReactMarkdown>
    </div>)
}

export default WikiblogPageEdit;