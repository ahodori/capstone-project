import { Card, Divider, Grid, List, ListItem, ListItemText } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function UserProfile() {
    const [userData, setUserData] = useState({});
    
    let { id } = useParams();

    useEffect(() => {
        fetch("/users/"+id)
        .then(res => {
            // console.log(res);
            if (res.ok) {
                res.json().then((json) => {
                    // console.log(json);
                    setUserData(json);
                })
            } else {
                res.json().then((json) => {
                    // console.log(json);
                })
            }
        })
    }, [])
    
    return (<Container>
        <Grid container>
            <Grid item xs={5}>
            {Object.keys(userData).length > 0 ?
            <>
                <Card sx={{marginTop: 4, padding: 2, textAlign: "center"}}>
                <h2>{userData.username}</h2>
                <List>
                    {userData.wikiblogs.map((wikiblog) => {
                        return (<div key={wikiblog.id}>
                        <Divider/>
                        <ListItem>
                            <ListItemText>
                            <b><Link to={"/wikiblog/"+wikiblog.id}>{wikiblog.name}</Link></b>
                            </ListItemText>
                            <p>{wikiblog.pagenum} pages</p>
                        </ListItem>

                        </div>)
                    })}                   
                </List>

                </Card>
            </>
        :
            <>Loading user...</>
        }
            </Grid>
        </Grid>
    </Container>)
}

export default UserProfile;