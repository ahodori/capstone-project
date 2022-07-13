import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import { Button, TextField } from "@mui/material";

function WikiblogPageEdit({currentUser, isLoggedIn}) {
    const textareaRef = useRef();
    const [pageText, setPageText] = useState("");

    const [pageData, setPageData] = useState({});

    const [submitErrorText, setSubmitErrorText] = useState("");

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
        console.log(pageText);

        if (!isLoggedIn) {
            setSubmitErrorText("You must be logged in to submit an edit.");
            return;
        } 

        fetch("/page_versions", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              text: pageText,
              page_id: pageData.id,
              user_id: currentUser.id
            })
          })
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
                  setSubmitErrorText(json.error);   
                })
              }
            });
        }

    function handlePressReturn(e) {
        e.preventDefault();
        navigate("/wikiblog/"+wikiblogid+"/"+pageid)
    }

    return (<div>
        <Button onClick={handlePressReturn}>Return to page</Button>
        <form onSubmit={handleSubmit}>
            <textarea ref={textareaRef} onChange={handleChangePageText} onKeyDown={handleKeyDown} cols={100} rows={50}/><br/>
            <Button type="submit">Submit change</Button>
        </form>
        <h2>Page preview:</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{pageText}</ReactMarkdown>
    </div>)
}

export default WikiblogPageEdit;