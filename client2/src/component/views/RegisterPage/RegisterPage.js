import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';




function RegisterPage(props) {
    const dispatch= useDispatch();
    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ComfirmPassword, setComfirmPassword] = useState("");

    const onEmailHandler=(event)=>{
        setEmail(event.currentTarget.value);
    }
    const onNameHandler=(event)=>{
        setName(event.currentTarget.value);
    }
    const onPasswordHandler=(event)=>{
        setPassword(event.currentTarget.value);
    }

    const onConfirmPasswordHandler=(event)=>{
        setComfirmPassword(event.currentTarget.value);
    }

    const onSubmitHandler=(event)=>{
        event.preventDefault();
        if(Password!==ComfirmPassword){
            alert("비밀번호와 비밀번호확인은 같아야합니다");
        }
        let body={
            email: Email,
            name: Name,
            password: Password,
        }
        dispatch(registerUser(body))
            .then(response=>{
                if(response.payload.success){
                    props.history.push('/login');
                    alert('회원가입 완료! 로그인해주세요');
                }
                else{
                    alert("회원가입 실패!");
                }
            })

    }
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
             width: '100%', height: '100vh'
        }}>
            <form style={{display: 'flex', flexDirection: 'column'}} 
            onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={ComfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button type="submit">회원가입</button>

                <br />
                <br />
                <div style={{margin:10}}>
                    <Link to="/">Home</Link>
                    <br/>
                    <Link to="/login">Login</Link>
                    <br />
                    
                    <h5>※ 비밀번호는 6자이상 입력해주세요</h5>
                    <h5>※ Tomato-Culture는 타인이 경작한 토마토를 <br/>
                        존중해주는 문화입니다.<br/>
                        타인의 토마토를 비난하거나 혹은 <br/>
                        이 문화를 훼손시키는 유저분께서는<br/>
                        가입이 취소될 수 있습니다. <br/>이 문화에 참여할 분만 가입해주세요.
                    </h5>
                </div>
            </form>
            
        </div>
    );
}

export default withRouter(RegisterPage)
