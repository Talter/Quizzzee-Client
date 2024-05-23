import React from "react"
import "../../css/SignUp.css";

function SignUp() {
    return (
        <div className="signUp-page">
            <div className="cloud-2">
            </div>
            <div className="cloud-2-second"></div>
            <div className="signUp-container">
                <a className="signUp-title">Sign Up</a>
                <form className="signUp-form">
                    <div className="first-part">
                        <div className="input-field">
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="input-field">
                            <input type="email" placeholder="Email" />
                        </div>
                        <div className="input-field">
                            <input type="password" placeholder="Password" />
                        </div>
                    </div>
                    <button className="signUp-confirm-btn" type="submit">Sign Up</button>
                    <br />
                    <button className="had-acc-btn" type="submit">Aleady had an account?</button>
                </form>
            </div >
        </div>
    );
}

export default SignUp