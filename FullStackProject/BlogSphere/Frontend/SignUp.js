import React , {useState} from "react";
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const SignUp = ({ onSwitchToLogin }) => {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [message,setMessage] = useState("");
    const[showPassword,setShowPassword]=useState(false);
    const handleSignup = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/public/signup`,{
                method:"POST",
                headers:{
                    "Content-type" : "application/json",
                },
                body : JSON.stringify({ username, email, password }),
            }
            );

            if(response.ok){
                setMessage("You have been successfully registered.")
            }
            else{
                setMessage("Email already exists!")
            }

        } catch (error) {
            console.log(error);
            setMessage("Error : "+error);
        }

        setUsername("");
        setEmail("");
        setPassword("");
    };

    return (
        <div class="SignupDiv">
            <h2>Register Here</h2>
            <p>Enter your credentials to create new account</p>
            <form onSubmit={handleSignup}>
                <div class="formDiv">
                    <div class="usernameDiv">
                        <label>Username : </label>
                        <input 
                            type="text" 
                            placeholder="type your username"
                            value={username} 
                            onChange={(e)=>setUsername(e.target.value)}
                            required
                        />
                    </div>

                <div class="emailDiv">
                    <label>Email : </label>
                    <input 
                    type="email" 
                    placeholder="abc@gmail.com"
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    />
                </div>
                    
                <div class="passDiv">
                    <label>Password : </label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  placeholder="Password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  required
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize:'17px',
                                    marginLeft: '-30px',
                                    marginTop:'10px'
                                  }}
                                >
                                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                              </div>
                </div>

            </div>
                <div class="registerBtn">
                <button class="btn" type="Submit" > Register </button>
                </div>
            </form>
            {message && <p>{message}</p>}
                <p>Already have an account?{` `}
                    {/* <span onClick={onSwitchToLogin}>
                        Login
                    </span> */}
                    <Link to="/login">Login</Link>
                </p>
        </div>
    );

}

export default SignUp;