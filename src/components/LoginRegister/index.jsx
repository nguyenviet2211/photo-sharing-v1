import { useState } from 'react';
import './style.css';
import {useForm} from 'react-hook-form';
import { useNavigate} from 'react-router-dom';


function LoginRegister(){
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onSubmit = (data) => {
        fetch('http://localhost:8081/api/user/admin/login', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
                console.log(response);
                setError("user not found");
                return null;
            }
        })
        .then(data => {
            if(data)   {
                localStorage.setItem("userId", data._id);
                localStorage.setItem("firstName", data.first_name);
                localStorage.setItem("lastName", data.last_name);
                navigate(`users/${localStorage.getItem("userId")}`);
            }
        })
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                <h2>Login</h2>
                <label htmlFor="username">UserName:</label>
                <input 
                    type="text" 
                    id="username" 
                    placeholder='username'
                    {...register("username", {
                        required: "Username is required",
                        minLength: {
                            value: 3,
                            message: "Username must be at least 3 characters"
                        }
                    })}
                />
                {errors.username && <span>{errors.username.message}</span>}
                <label htmlFor="password">password:</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder='password'
                    {...register("password", {
                        required: "password is required"
                    })}
                />
                <button type="submit">Login</button>
                <button onClick={() => {navigate('/register')}}>Register</button>
                <div>{error}</div>
            </form>
        </div>
    );
}

export default LoginRegister;