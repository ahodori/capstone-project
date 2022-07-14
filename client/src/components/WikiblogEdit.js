import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import { useParams, useNavigate, Link } from "react-router-dom"
import { Button, DialogContentText, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";

function WikiblogEdit() {
    const [wikiblogData, setWikiblogData] = useState({});

    const [searchedUsers, setSearchedUsers] = useState([]);

    const [showAddEditorModal, setShowAddEditorModal] = useState(false);
    const [editorModalSearchText, setEditorModalSearchText] = useState("");
    const [submitErrorText, setSubmitErrorText] = useState("");

    const [showAddPageModal, setShowAddPageModal] = useState(false);
    const [addPageModalName, setAddPageModalName] = useState("");
    const [addPageErrorText, setAddPageErrorText] = useState("");

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


    function updateEditorModalSearch(e) {
        setEditorModalSearchText(e.target.value);
        
        fetch("/users?"+ new URLSearchParams({
            search: e.target.value
        }))
        .then(res => {
            if (res.ok) {
            res.json().then((json) => {
                console.log(json);
                setSearchedUsers(json);
            })
            } else {
            res.json().then((json) => {
                console.log(json);
            })
            }
        });
    }

    function updateAddPageModalName(e) {
        setAddPageModalName(e.target.value);
    }

    function handleAddEditor(e, user) {
        e.preventDefault();

        fetch("/editorships", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user_id: user.id,
              wikiblog_id: wikiblogData.id
            })
          })
        .then(res => {
            if (res.ok) {
            res.json().then((json) => {
                console.log(json);
            })
            } else {
            res.json().then((json) => {
                console.log(json);
            })
            }
        });
    }

    function handleSubmitAddPage(e) {
        e.preventDefault();

        fetch("/pages", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: addPageModalName,
              wikiblog_id: wikiblogData.id
            })
          })
        .then(res => {
            if (res.ok) {
            res.json().then((json) => {
                console.log(json);
                window.location.reload();
            })
            } else {
            res.json().then((json) => {
                console.log(json);
            })
            }
        });
    }

    function handlePressAddEditor(e) {
        e.preventDefault();
        setShowAddEditorModal(true);
    }

    function handlePressAddPage(e) {
        e.preventDefault();
        setShowAddPageModal(true);
    }

    return (<div>
        {Object.keys(wikiblogData).length > 0 ?
            <>
                <Dialog open={showAddEditorModal} onClose={()=>setShowAddEditorModal(false)}>
                    <DialogTitle>Add Editor</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Type in a username to search, then click on who you would like to add as an editor.</DialogContentText>
                        <TextField autoFocus autocomplete={"off"} label="username" fullWidth variant="standard" value={editorModalSearchText} onChange={updateEditorModalSearch}/>
                        <br/>
                        {searchedUsers.length > 0 ?
                            searchedUsers.map((user) => {
                                return (<div>
                                    <Button onClick={(e) => handleAddEditor(e, user)}>{user.username}</Button>
                                </div>)
                            })
                        :
                            <p>No users found. Try searching again</p>
                        }
                    </DialogContent>
                </Dialog>

                <Dialog open={showAddPageModal} onClose={() => setShowAddPageModal(false)}>
                    <DialogTitle>Add Page</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus label="title" fullWidth variant="standard" value={addPageModalName} onChange={updateAddPageModalName}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSubmitAddPage}>Add Page</Button>
                    </DialogActions>
                </Dialog>

                <h2>{wikiblogData.name} by <Link to={"/user/"+wikiblogData.user.id}>{wikiblogData.user.username}</Link></h2>

                <Button onClick={handlePressAddPage}>Add Page</Button>

                {wikiblogData.pages.reverse().map((page) => {
                    return (<div key={page.id}>
                        <p>{page.is_index && <>Index: </>} <Link to={"/wikiblog/"+wikiblogData.id+"/"+page.id}>{page.title}</Link></p>
                        <p>Updated {page.updated}</p>
                    </div>)
                })}

                <h2>Editors:</h2>
                <span>{wikiblogData.editorships.map((editor) => <><Link to={"/user/"+editor.user.id}>{editor.user.username}</Link> </>)}</span>
                <br/>

                <Button onClick={handlePressAddEditor}>Add Editor</Button>
            </>
        :
            <>Loading Wikiblog...</>
        }
    </div>)
}

export default WikiblogEdit;