import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";

function WikiblogEdit() {
    const textareaRef = useRef();
    const [pageText, setPageText] = useState("");

    function handleChangePageText(e) {
        //console.log(e);
        setPageText(e.target.value);
    }

    function handleKeyDown(e) {
        let insertCharacter;

        if (e.key == "Tab" && e.shiftKey) {
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
        <ReactMarkdown>{pageText}</ReactMarkdown>
    </div>)
}

export default WikiblogEdit;