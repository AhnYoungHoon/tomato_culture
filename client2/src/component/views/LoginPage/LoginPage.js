import React, {useState} from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';




function LoginPage(props) {
    const dispatch=useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler =(event)=>{
        setEmail(event.currentTarget.value);
    }

    const onPasswordHandler=(event)=>{
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler =(event)=>{
        event.preventDefault(); //refresh방지기능
        let body={
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response=>{
                if(response.payload.loginSuccess){
                    props.history.push('/');
                    alert('로그인 성공');
                }else{
                    alert('error');
                }
            })

        
    }
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
             width: '100%', height: '100vh'
        }}>
            <form style={{display: 'flex', flexDirection: 'column'}} 
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">로그인</button>

                <br/>
                <br/>
                <Link to="/">Home</Link>
                <br/>
                <Link to="/register">Register</Link>


            </form>
        </div>
    )
}

export default withRouter(LoginPage);
