import ReactMarkdown from "react-markdown"
import ReactDom from "react-dom"

function Wikiblog() {

    const markdown = `Test Here's some more *test* text

# Test

are you serious
with me right now
`;

    return (<div>
        <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>)
}

export default Wikiblog;