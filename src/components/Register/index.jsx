
import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
function Register(){
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [state, setState] = useState("");
    const navigate = useNavigate();

    const onSubmit = (data) => {
        if(data.password !== document.getElementById("confirmPassword").value){
            setState("Password do not match");
            return;
        }
        fetch(`http://localhost:8081/api/user/user`, {
            method: 'POST',
            headers : {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if(response.ok){
                setState("Success");
                navigate('/');
            }
        })
    }
    
    return(
    <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <h2>Register</h2>
            <label htmlFor="username">UserName:</label>
            <input 
                type="text" 
                id="username" 
                placeholder='username'
                {...register("login_name", {
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
            <label htmlFor="confirmPassword">confirm password:</label>
            <input 
                type="password" 
                id="confirmPassword" 
                placeholder='confirm your password'
            />
            <label htmlFor="first_name">first_name:</label>
            <input 
                type="text" 
                id="first_name" 
                placeholder='first_name'
                {...register("first_name", {
                    required: "first_name is required"
                })}
            />
            <label htmlFor="last_name">last_name:</label>
            <input 
                type="text" 
                id="last_name" 
                placeholder='last_name'
                {...register("last_name", {
                    required: "last_name is required"
                })}
            />
            <label htmlFor="location">location:</label>
            <input 
                type="text" 
                id="location" 
                placeholder='location'
                {...register("location", {
                    required: "location is required"
                })}
            />
            <label htmlFor="description">description:</label>
            <input 
                type="text" 
                id="description" 
                placeholder='description'
                {...register("description", {
                    required: "description is required"
                })}
            />
            <label htmlFor="occupation">occupation:</label>
            <input 
                type="text" 
                id="occupation" 
                placeholder='occupation'
                {...register("occupation", {
                    required: "occupation is required"
                })}
            />
            <button type="submit">Register</button>
            <div>{state}</div>
        </form>
    </div>);
}
export default Register;