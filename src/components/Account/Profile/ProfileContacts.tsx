import {UserInfo} from "../../../types/api-types";
import {MdAlternateEmail} from "react-icons/md";
import {ImPhone} from "react-icons/im";

/**
 * Component that displays a user's contact information
 *
 * @param profileInfo profile info
 * @author Stephen Prizio
 * @version 1.0
 */
function ProfileContacts({profileInfo = {}}: { profileInfo: UserInfo }) {


    //  RENDER

    return (
        <div className="ct-profile-content__contact">
            <span className="ct-profile-content__section-header">Contact Info</span>
            <div className="ct-profile-content__section-content">
                <div className="columns is-multiline is-mobile is-gapless">
                    <div className="column is-4">
                            <span className="icon-text">
                                <span className="icon">
                                    <ImPhone/>
                                </span>
                                <span>
                                    <strong>Phone:</strong>
                                </span>
                            </span>
                    </div>
                    <div className="column is-8">
                            <span>
                                {profileInfo.phoneNumber?.display ?? ''}
                            </span>
                    </div>
                    <div className="column is-4">
                            <span className="icon-text">
                                <span className="icon">
                                    <MdAlternateEmail/>
                                </span>
                                <span>
                                    <strong>Email:</strong>
                                </span>
                            </span>
                    </div>
                    <div className="column is-8">
                        <span>{profileInfo.email}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileContacts;