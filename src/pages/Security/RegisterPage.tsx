import SimpleButton from "../../components/Buttons/SimpleButton";

/**
 * Renders the registration page
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function RegisterPage() {


    //  RENDER

    return (
        <>
            <div className="ct-register-page">
                <div className="ct-register-page__container">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-title">
                                Registration Form
                            </div>
                            <div className="card-form">
                                <div className="columns is-multiline is-vcentered is-mobile">
                                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                        <div className="field">
                                            <label className="label">First Name</label>
                                            <div className="control">
                                                <input className="input" type="text" placeholder="Text input" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                        <div className="field">
                                            <label className="label">Last Name</label>
                                            <div className="control">
                                                <input className="input" type="text" placeholder="Text input" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                        <div className="field">
                                            <label className="label">Email</label>
                                            <div className="control">
                                                <input className="input" type="email" placeholder="Text input" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                        <div className="field">
                                            <label className="label">Username</label>
                                            <div className="control">
                                                <input className="input" type="text" placeholder="Text input" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-3-desktop is-12-tablet is-12-mobile">
                                        <label className="label">Phone Number</label>
                                    </div>
                                    <div className="column is-9-desktop is-12-tablet is-12-mobile">
                                        <div className="field has-addons">
                                            <div className="control">
                                                <span className="select">
                                                  <select>
                                                    <option>+1</option>
                                                    <option>+35</option>
                                                    <option>+9</option>
                                                  </select>
                                                </span>
                                            </div>
                                            <div className="control is-expanded">
                                                <input className="input" type="tel" placeholder="Phone Number" />
                                            </div>
                                            <div className="control">
                                                <span className="select">
                                                  <select>
                                                    <option>Mobile</option>
                                                    <option>Home</option>
                                                    <option>Work</option>
                                                    <option>Other</option>
                                                  </select>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-4-desktop is-12-tablet is-12-mobile">
                                        <div className="field">
                                            <div className="field">
                                                <label className="label">City</label>
                                                <div className="control">
                                                    <input className="input" type="text" placeholder="Text input" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-4-desktop is-12-tablet is-12-mobile">
                                        <div className="field">
                                            <label className="label">Country</label>
                                            <div className="control">
                                                <div className="select is-fullwidth">
                                                    <select>
                                                        <option>Male</option>
                                                        <option>Female</option>
                                                        <option>Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-4-desktop is-12-tablet is-12-mobile">
                                        <div className="field">
                                            <label className="label">Timezone</label>
                                            <div className="control">
                                                <div className="select is-fullwidth">
                                                    <select>
                                                        <option>Male</option>
                                                        <option>Female</option>
                                                        <option>Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                        <div className="field">
                                            <label className="label">Currencies</label>
                                            <div className="control">
                                                <div className="select is-fullwidth">
                                                    <select>
                                                        <option>Male</option>
                                                        <option>Female</option>
                                                        <option>Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                        <div className="field">
                                            <label className="label">Languages</label>
                                            <div className="control">
                                                <div className="select is-fullwidth">
                                                    <select>
                                                        <option>Male</option>
                                                        <option>Female</option>
                                                        <option>Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                        <div className="field">
                                            <label className="label">Password</label>
                                            <div className="control">
                                                <input className="input" type="text" placeholder="Text input" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                        <div className="field">
                                            <label className="label">Confirm Password</label>
                                            <div className="control">
                                                <input className="input" type="text" placeholder="Text input" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-12">
                                        <SimpleButton text={'Submit'} />
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

export default RegisterPage;