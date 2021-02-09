import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import Axios from 'axios';
import Dropzone from 'react-dropzone'
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';





function PostPage(props) {
    const dispatch=useDispatch();
    const [Seed, setSeed] = useState("");
    const [FilePath, setFilePath] = useState("");
    const user=useSelector(state=>state.user); //reduxdevtool로 확인

    const onSeedHandler=(event)=>{
        setSeed(event.currentTarget.value);
    }
    const onDrop =(files)=>{
        let formData = new FormData;
        const config ={
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0]);
        
        Axios.post('/api/post/uploadfiles', formData, config)
            .then(response=>{
                if(response.data.success){
                    console.log(response.data);
                    
                    setFilePath(response.data.url);
                    
                }else{
                    alert('포스트 업로드를 실패했습니다');
                    console.log(response.data.err);
                }
            })
    }


    const onSubmit=(event)=>{
        event.preventDefault();
        const variables={
            writer: user.userData._id, //useSelector로 가져온다 reduxdevtool로 확인
            content:Seed,
            image:FilePath,
        }
        Axios.post('/api/post/uploadPost', variables)
            .then(response=>{
                if(response.data.success){
                    alert('성공적으로 업로드를 했습니다');
                    setTimeout(()=>{
                        props.history.push('/');
                    }, 2000)
                }else{
                    alert('포스트업로드 실패');
                }
            })
    }

    
    return (
        <div>
            <h3>Let's culture your tomato!</h3>
            <br/>
            
            <br/>
            <div>
                <form onSubmit={onSubmit}>
                    <div>
                        <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={10000000}>
                        {({getRootProps, getInputProps})=>(
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex',
                        alignItems: 'center', justifyContent: 'center'}}{...getRootProps()}>
                            <input {...getInputProps()} />
                            

                        </div>
                        )} 
                        </Dropzone>
                    </div>

                    {FilePath&&

                        <div>
                            <img src={`http://localhost:5000${FilePath}`} alt="thumnail"></img>
                        </div>

                    }

                    
                    
                    <textarea id="seed" name="content" maxLength="300" 
                    cols="70" rows="10"
                    style={{
                        borderColor:"red", borderWidth:"thick", resize:"none"
                    }} onChange={onSeedHandler} value={Seed}></textarea>
                    <br />
                    <div style={{marginLeft:"480px"}}>
                        <button type="submit" >Seed</button>
                    </div>
                    
                </form>
            </div>

            <br/>
            <br/>
            <Link to="/">Home</Link>

 

        </div>
    )
}

export default withRouter(PostPage);
