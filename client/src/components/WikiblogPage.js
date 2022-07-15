import ReactMarkdown from "react-markdown"
import ReactDom from "react-dom"
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import remarkGfm from 'remark-gfm'
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";

function WikiblogPage({showIndex, currentUser}) {
    const [wikiblogData, setWikiblogData] = useState({});
    const [pageData, setPageData] = useState({});

    let { wikiblogid, pageid } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        fetch("/wikiblogs/"+wikiblogid)
        .then(res => {
            // console.log(res);
            if (res.ok) {
                res.json().then((json) => {
                    console.log(json);
                    setWikiblogData(json);
                })
            } else {
                res.json().then((json) => {
                    // console.log(json);
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
            // console.log(res);
            if (res.ok) {
                res.json().then((json) => {
                    // console.log(json);
                    setPageData(json);
                })
            } else {
                res.json().then((json) => {
                    // console.log(json);
                })
            }
        })
    }, [wikiblogData, pageid])

    function handlePressEditWikiblog(e) {
        e.preventDefault();
        navigate("/wikiblog/"+wikiblogData.id+"/edit");
    }

    function handlePressEditPage(e) {
        e.preventDefault();
        navigate("/wikiblog/"+wikiblogData.id+"/"+pageData.id+"/edit")
    }


    return (<div>
        <Container>
            <Grid container spacing={2} sx={{marginTop: 4}}> 
                <Grid item xs={8}>
                    {Object.keys(pageData).length > 0 ? 
                        <Paper elevation={3} sx={{ padding: 3}}>
                            <Typography variant="h4">{pageData.title}</Typography>
                            by <Link to={"/user/"+wikiblogData.user.id}>{wikiblogData.user.username}</Link>
                            <hr/>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{pageData.text}</ReactMarkdown>
                        </Paper>
                    :
                        <>Loading page...</>
                    }     
                </Grid>
                <Grid item xs>
                {Object.keys(wikiblogData).length > 0 ?
                    <>
                        <Paper elevation={3} sx={{ padding: 3}}>
                        {wikiblogData.editorships.find((editor) => editor.user.id === currentUser.id) && 
                                                <Grid container sx={{textAlign: "center", marginBottom: 2}}>
                                                <Grid item xs><Button onClick={handlePressEditWikiblog}>Edit Wikiblog</Button></Grid>
                                                <Grid item xs><Button onClick={handlePressEditPage}>Edit Page</Button></Grid>
                                            </Grid>}
                        <b>Pages:</b>
                        {wikiblogData.pages.map((page) => {
                            return (<div key={page.id}>
                                <Link to={"/wikiblog/"+wikiblogData.id+"/"+page.id}>{page.title}</Link>
                            </div>);
                        })}

                        </Paper>

                    </>
                :
                    <>Loading wikiblog...</>
                }                   
                </Grid>
            </Grid>
        </Container>



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