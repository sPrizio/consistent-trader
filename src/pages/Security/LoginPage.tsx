import React, {useState} from "react";
import {Helmet} from "react-helmet";
import SimpleButton from "../../components/Buttons/SimpleButton";
import brandImage from '../../assets/images/brand/brand_white-removebg.png'

/**
 * Renders the login page
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function LoginPage() {

    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //  TODO: on login, global state / local storage to retain auth token


    //  RENDER

    return (
        <>
            <Helmet>
                <title>CTrader | Login</title>
            </Helmet>
            <div className="ct-login-page">
                <div className="ct-login-page__container">
                    <div className="card">
                        <div className="card-content">
                            <div className="columns is-multiline is-mobile is-vcentered">
                                <div className="column is-12 has-text-centered">
                                    <img src={brandImage} width="250" height="100" alt={"CTrader Brand"}/>
                                </div>
                                <div className="column is-12">
                                    <div className="welcome">
                                        <h5 className="header">
                                            Welcome to CTrader!
                                        </h5>
                                        <h6 className="sub-header">Please sign-in to continue</h6>
                                    </div>
                                </div>
                                <div className="column is-12">
                                    <label htmlFor="email">Email or Username</label>
                                    <input className="input" type="text" placeholder="john.doe@email.com"
                                           value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className="column is-12">
                                    <label htmlFor="Name">Password</label>
                                    <input className="input" type="password" placeholder="********"
                                           value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    <div className="forgot-password">
                                        <a href="#" className="forgot-password-text">Forgot password?</a>
                                    </div>
                                </div>
                                <div className="column is-12">
                                    <div className="sign-in-container">
                                        <SimpleButton text={'Sign In'} />
                                    </div>
                                </div>
                                <div className="column is-12 has-text-centered">
                                    <div className="register">
                                        <p className="">New here?&nbsp;
                                            <a href="#" className="value">Register</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage;