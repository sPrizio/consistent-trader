import {UserInfo} from "../../../types/api-types";
import {displayRankName} from "../../../services/data/FormattingService";
import {AiOutlineCheckCircle, AiOutlineUser} from "react-icons/ai";
import {GiRank3} from "react-icons/gi";
import {FiFlag} from "react-icons/fi";
import {MdLanguage} from "react-icons/md";
import {SlClock} from "react-icons/sl";

/**
 * Component that shows basic about info
 *
 * @param profileInfo profile info
 * @author Stephen Prizio
 * @version 1.0
 */
function ProfileAbout({profileInfo = {}}: { profileInfo: UserInfo }) {


    //  RENDER

    return (
        <div className="ct-profile-content__about">
            <span className="ct-profile-content__section-header">About</span>
            <div className="ct-profile-content__section-content">
                <div className="columns is-multiline is-mobile is-gapless">
                    <div className="column is-4">
                        <span className="icon-text">
                            <span className="icon">
                                <AiOutlineUser/>
                            </span>
                            <span>
                                <strong>Full Name:</strong>
                            </span>
                        </span>
                    </div>
                    <div className="column is-8">
                        <span>{profileInfo.firstName}&nbsp;{profileInfo.lastName}</span>
                    </div>
                    <div className="column is-4">
                        <span className="icon-text">
                            <span className="icon">
                                <AiOutlineCheckCircle/>
                            </span>
                            <span>
                                <strong>Status:</strong>
                            </span>
                        </span>
                    </div>
                    <div className="column is-8">
                        <span>{profileInfo.account?.active ?? false ? 'Active' : 'Inactive'}</span>
                    </div>
                    <div className="column is-4">
                        <span className="icon-text">
                            <span className="icon">
                                <GiRank3/>
                            </span>
                            <span>
                                <strong>Rank:</strong>
                            </span>
                        </span>
                    </div>
                    <div className="column is-8 account-summary">
                        <span className={"value " + profileInfo.account?.rank?.className ?? ''}>
                            {displayRankName(profileInfo.account?.rank?.name ?? '')}
                        </span>
                    </div>
                    <div className="column is-4">
                        <span className="icon-text">
                            <span className="icon">
                                <FiFlag/>
                            </span>
                            <span>
                                <strong>Country:</strong>
                            </span>
                        </span>
                    </div>
                    <div className="column is-8">
                        <span>{profileInfo.userLocale?.country ?? ''}</span>
                    </div>
                    <div className="column is-4">
                        <span className="icon-text">
                            <span className="icon">
                                <MdLanguage/>
                            </span>
                            <span>
                                <strong>Languages:</strong>
                            </span>
                        </span>
                    </div>
                    <div className="column is-8">
                        {
                            profileInfo.userLocale && profileInfo.userLocale.languages && profileInfo.userLocale.languages.map((item, key) => {
                                return (<span key={key}>{item}&nbsp;&middot;&nbsp;</span>)
                            })
                        }
                    </div>
                    <div className="column is-4">
                        <span className="icon-text">
                            <span className="icon">
                                <SlClock/>
                            </span>
                            <span>
                                <strong>Timezone:</strong>
                            </span>
                        </span>
                    </div>
                    <div className="column is-8">
                        <span>{profileInfo.userLocale?.timeZoneOffset ?? ''}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileAbout;