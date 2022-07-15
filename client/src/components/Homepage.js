import { Card, Box, Paper, Grid, Button , Typography} from "@mui/material";
import { Container } from "@mui/system";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

function Homepage({handleOpenNewWikiblog, isLoggedIn}) {
    const [wikiblogsList, setWikiblogsList] = useState({});

    useEffect(() => {
        fetch("/wikiblogs")
        .then(res => {
            // console.log(res);
            if (res.ok) {
                res.json().then((json) => {
                    // console.log(json);
                    setWikiblogsList(json);
                })
            } else {
                res.json().then((json) => {
                    // console.log(json);
                    console.error("Error:", json.error);  
                })
            }
        })
    }, [])

    return (<>

        <Container>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                {isLoggedIn && 
                    <Paper elevation={3} sx={{margin: 5, textAlign: "center"}}>
                        <Card variant="outlined">
                            <Button fullWidth onClick={handleOpenNewWikiblog}>New Wikiblog</Button>
                        </Card>
                    </Paper>}

                </Grid>
                <Grid item xs={7}>
                    {wikiblogsList.length > 0 ?
                    wikiblogsList.map((wikiblogEntry) => {
                        return (<Paper key={wikiblogEntry.id} sx={{margin: 5}} elevation={3}>
                            <Card variant="outlined" sx={{ padding: 2}}>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        <Typography variant="h6" gutterBottom className="cardbutton">
                                            <Link to={"/wikiblog/"+wikiblogEntry.id}>{wikiblogEntry.name}</Link>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs="auto" sx={{ marginRight: 2}}>
                                        <Typography variant="h6" gutterBottom className="cardbutton2">
                                           <Link to={"/user/"+wikiblogEntry.user.id}>{wikiblogEntry.user.username}</Link>
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                                    {wikiblogEntry.pagenum} pages 
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    Updated {wikiblogEntry.updated.slice(0, 10)}, {wikiblogEntry.updated.slice(12,-5)}
                                </Typography>
                        </Card>
                            </Paper>)
                    })
                    :
                        <>Loading...</>
                    }
                </Grid>
            </Grid>

        </Container>
    </>)
}

export default Homepage;