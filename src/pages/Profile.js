import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";


export const Profile = () => {

    const {id} = useParams();
    const [userName, setUserName] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    const navigate = useNavigate();
    const {authState} = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
            setUserName(response.data.username)
        });

        axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
            setListOfPosts(response.data);
        })
    }, []);

    return (
        <div className="profilePageContainer">
            <div className="basicInfo">
                <h1>Username: {userName}</h1>
                {authState.username === userName && (
                    <button onClick={() => {navigate("/changepassword")}}>Change My Password</button>
                )}
                
            </div>
            <div className="listOfPosts">
                {
                    listOfPosts.map((value, key) => {
                    return <div className='post'> 
                        <div className='title'> {value.title}</div>
                        <div className='body' onClick={() => {navigate(`/post/${value.id}`)}}>{value.postText}</div>
                        <div className='footer'>
                            <div className="username">{value.username}</div>
                                <div className="buttons">
                                    <label>{value.Likes.length}</label>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
           
        </div>
    );
}