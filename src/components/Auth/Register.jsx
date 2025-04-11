
import { useState } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [userName, setUserName] = useState();

    const navigate = useNavigate();
    return (
        <div className="register-container">
            <div className="header">
                <span>Already have an account ?</span>
                <button className='btn-login' onClick={() => { navigate('/login') }}>Login</button>

            </div>
            <div className="title col-4 mx-auto">
                Booking Heath
            </div>
            <div className="welcome col-4 mx-auto">
                Heathy Care
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type={"email"}
                        className="form-control"
                        value={email} // truyen cho react quan ly
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type={"password"}
                        className="form-control"
                        value={password} // truyen cho react quan ly
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>User Name</label>
                    <input
                        type={"text"}
                        className="form-control"
                        value={userName} // truyen cho react quan ly
                        onChange={(event) => setUserName(event.target.value)}
                    />
                </div>
                <div>
                    <button
                        className="btn-submit"
                    >Create my free account</button>
                </div>
                <div className='text-center'>
                    <span className="back" onClick={() => { navigate('/') }}>
                        &#60;&#60; Go to Homepage
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Register;