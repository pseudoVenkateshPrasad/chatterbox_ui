import React, { useState, useEffect } from "react";
import LoginCss from "./register.module.css";
import Button from "../../custom/button/Button";
import TextField from "@mui/material/TextField";
import toast from 'react-hot-toast';
import { ErrorBoundary } from "react-error-boundary";

// import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import WordRotate from "../magicui/word-rotate";

const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
        height: '35px', // Adjust the height as needed
        width: '250px', // Adjust the width as needed
        padding: '8px 12px', // Adjust the padding as needed
        borderRadius: '4px', // Optional: Add border radius
    },
}));


const Register = () => {
    const [name, setName] = useState(false);
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const [formData, setFormData] = useState({});

    useEffect(() => {

    }, []);


    const navigate = useNavigate();

    function matchPasswords(password, confirmPassword) {
        return password === confirmPassword;
    }

    async function handleRegister() {
        let form = {
            name,
            email,
            password,
            confirmPassword: confirm
        }

        let isPasswordMatching = matchPasswords(password, confirm);
        if (!isPasswordMatching) {
            toast.error('Passwords doesnt match !');
            return;
        }

        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            return;
        }

        try {
            let response = await axios.post("http://localhost:8080/registerUser", form);

            if (response) {
                navigate("/");
                toast.success(response.data.message);
                console.log("response", response);
            }
        } catch (err) {
            console.log(err)
            toast.error('Error Occurred !');
        }

    }

    function redirectToLogin() {
        navigate("/login");
    }

    return (
        <section className={LoginCss.container}>
            <section className={LoginCss.leftScreen}>
                <img
                    className={LoginCss.registerImg}
                    src={"/register/signup.svg"}
                    alt="register-icon"
                />
                <div style={{color:"#fff", fontSize:"2em"}}>
                    <WordRotate className="text-4xl font-bold text-white dark:text-white"
                        words={[
                            "Connect", "Chat", "Converse", "Enjoy !!!"
                        ]} />
                </div>

            </section>
            <section
                className={LoginCss.rightScreen}>
                <h2 style={{ color: "#a3b18a" }}>Welcome to <span style={{ color: "#588157" }}>Chatter</span><span style={{ color: "#3a5a40" }}>Box</span></h2>
                <div className={LoginCss.registerBox}>

                    <section className={LoginCss.signupSection}>
                        {/* <div > */}
                        {/* <p className={LoginCss.registerHeading}>Register with Us</p> */}
                        {/* </div> */}
                        <div className={LoginCss.signupfieldsBox}>
                            <TextField type="text" required id="outlined-required" label="Name" onChange={e => setName(e.target.value)} />
                            <TextField type="email" required id="outlined-required" label="Email id" onChange={e => setEmail(e.target.value)} />
                            <TextField
                                required
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                onChange={e => setPassword(e.target.value)}

                            />
                            <TextField
                                required
                                id="outlined-password-input"
                                label="Confirm Password"
                                type="password"
                                onChange={e => setConfirm(e.target.value)}
                            />
                        </div>
                        <div className={LoginCss.submitBtnBox}>
                            <Button
                                onClick={handleRegister}
                                color="#fff"
                                bgColor="#588157"
                                hoverColor="#344e41"
                                title="Register Here"
                            />
                        </div>
                        <div className={LoginCss.forgotPassword}>
                            <span className={LoginCss.forgot}>forgot password ?</span>
                        </div>
                    </section>
                    <section className={LoginCss.loginSection}>
                        {/* <span> */}
                        <span className={LoginCss.question}>Already Registered ? </span>
                        <span className={LoginCss.loginBtn}>
                            <Button
                                onClick={redirectToLogin}
                                color="#fff"
                                bgColor="#8d99ae"
                                hoverColor="#344e41"
                                title="Log In"
                            />
                        </span>
                        {/* </span> */}
                    </section>
                </div>
            </section>
        </section>
    );
};

export default Register;
