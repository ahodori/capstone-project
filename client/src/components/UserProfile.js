import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function UserProfile() {
    const [userData, setUserData] = useState({});
    
    let { id } = useParams();

    useEffect(() => {
        fetch("/users/"+id)
        .then(res => {
            console.log(res);
            if (res.ok) {
                res.json().then((json) => {
                    console.log(json);
                    setUserData(json);
                })
            } else {
                res.json().then((json) => {
                    console.log(json);
                })
            }
        })
    }, [])
    
    return (<div>
        {Object.keys(userData).length > 0 ?
            <>
                <h3>{userData.username}</h3>
                {userData.wikiblogs.map((wikiblog) => {
                    return (<div key={wikiblog.id}>
                        <Link to={"/wikiblog/"+wikiblog.id}>{wikiblog.name}</Link>
                        <p>{wikiblog.pagenum} pages</p>
                    </div>)
                })}
            </>
        :
            <>Loading user...</>
        }
    </div>)
}

export default UserProfile;