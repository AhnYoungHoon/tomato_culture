import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import {Col} from 'antd';


import { withRouter } from 'react-router-dom';



function LandingPage(props) {
    const [Tomato, setTomato] = useState([]);
    
    useEffect(()=>{
        Axios.get('/api/post/getPost')
        .then(response=>{
            if(response.data.success){
                setTomato(response.data.posts);
            }else{
                alert('토마토를 가져오는데 실패했습니다');
            }
        })
        //서버에 보냄
         //서버에서 돌아온 응답 콘솔에 띄움
    }, [])

    const Gallery=Tomato.map((post, index)=>{
        return(
            <Col lg={6} md={8} xs={24}>
                    <div style={{position: 'relative'}}>
                        <img src={`http://localhost:5000/${post.image}`} alt='tomato'></img>
                        <br></br>
                        <span>{post.writer.name}</span>
                        <h5>{post.content}</h5>
                    </div>
            </Col>
            
        )
    })
    

    const onLogoutHandler=()=>{
        Axios.get('/api/users/logout')
            .then(response=>{
                if(response.data.success){
                    props.history.push('/login');
                }
                else{
                    alert("Failed to logout");
                }
            })
    }
    return (
        <div>
            <h2>Welcome to Tomato Culture!</h2>
            
            <Link to="/">Home</Link>
            <br />
            
            <Link to="/login">Login</Link>
            <br />
            <Link to="/register">Register</Link>
            <br/>
            <Link to="/post">Post</Link>
            <br/>
            
            <h4>◎ If you want to post your tomato, you should login</h4>
            <button style={{margin: 100}} onClick={onLogoutHandler}>로그아웃</button>
            <div>
                {Gallery}
            </div>
            

            
        </div>

        
    )
}

export default withRouter(LandingPage)

