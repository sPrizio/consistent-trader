import {AiOutlineCalendar, AiOutlineCheckCircle} from "react-icons/ai";
import {VscError} from "react-icons/vsc";
import {UserInfo} from "../../../types/api-types";
import {TfiLocationPin} from "react-icons/tfi";
import {CgRuler} from "react-icons/cg";
import {CoreConstants} from "../../../constants/CoreConstants";
import {formatDate} from "../../../services/datetime/DateTimeService";

/**
 * Component representing the banner above the profile content
 *
 * @param profileInfo profile info
 * @author Stephen Prizio
 * @version 1.0
 */
function ProfileBanner({profileInfo = {}}: { profileInfo: UserInfo }) {


    //  GENERAL FUNCTIONS

    /**
     * Generates the image path for the banner
     */
    function handleImagePath() {
        if (
            profileInfo &&
            profileInfo.account &&
            profileInfo.account.rank &&
            profileInfo.account.rank.imageUrl &&
            profileInfo.account.rank.imageUrl.length > 0
        ) {
            return require(`../../../assets/images${profileInfo.account.rank.imageUrl}`)
        }

        return require(`../../../assets/images/ranks/unranked/unranked_1.png`)
    }


    //  RENDER

    return (
        <div className="ct-profile-banner">
            <div className="columns is-multiline is-mobile is-gapless">
                <div className="column is-12">
                    <figure className="image ct-profile-banner__banner">
                        <img
                            src={require('../../../assets/images/content/profile-banner.png')}
                            alt={'AccountBanner'}
                        />
                    </figure>
                </div>
                <div className="column is-12">
                    <div className="card reset-borders ct-profile-banner__banner-card">
                        <div className="card-content">
                            <div className="columns is-multiline is-mobile is-vcentered">
                                <div className="column is-1 has-text-centered">
                                    <figure className="image ct-profile-banner__rank is-1by1 is-fullwidth">
                                        <img
                                            src={handleImagePath()}
                                            alt={'Rank'}
                                        />
                                    </figure>
                                </div>
                                <div className="column is-7">
                                    <h4 className="ct-profile-banner__profile-name">
                                        {profileInfo.firstName}&nbsp;{profileInfo.lastName}
                                        <small>
                                            {
                                                profileInfo.roles && profileInfo.roles.map((item, key) => {
                                                    return (
                                                        key === 0 ?
                                                            <span key={key}>
                                                                &nbsp;{item}&nbsp;
                                                            </span>
                                                            :
                                                            <span key={key}>
                                                                &middot;&nbsp;{item}&nbsp;
                                                            </span>
                                                    )
                                                })
                                            }
                                        </small>
                                    </h4>
                                    <div className="level">
                                        <div className="level-left">
                                            <div className="level-item">
                                                <span className="icon-text">
                                                    <span className="icon ct-profile-banner__profile-sub-headers is-size-5">
                                                        <TfiLocationPin/>
                                                    </span>
                                                    <span className="ct-profile-banner__profile-sub-headers">
                                                        {profileInfo.userLocale?.townCity ?? ''},&nbsp;{profileInfo.userLocale?.country ?? ''}
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="level-item">
                                                <span className="icon-text">
                                                    <span className="icon ct-profile-banner__profile-sub-headers is-size-5">
                                                        <AiOutlineCalendar/>
                                                    </span>
                                                    <span className="ct-profile-banner__profile-sub-headers">
                                                        Joined {formatDate(profileInfo.account?.accountOpenTime ?? '', CoreConstants.DateTime.ISOMonthYearFormat)}
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="level-item">
                                                <span className="icon-text">
                                                    <span className="icon ct-profile-banner__profile-sub-headers is-size-5">
                                                        <CgRuler/>
                                                    </span>
                                                    <span className="ct-profile-banner__profile-sub-headers">
                                                        Level {profileInfo.account?.skill?.level ?? 0}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="column is-4 has-text-centered">
                                    {
                                        profileInfo.account && profileInfo.account.active ?
                                            <span className="tag is-active">
                                                <span className="icon-text">
                                                    <span className="icon">
                                                        <AiOutlineCheckCircle/>
                                                    </span>
                                                    <span>Active</span>
                                                </span>
                                            </span>
                                            :
                                            <span className="tag is-inactive">
                                                <span className="icon-text">
                                                    <span className="icon">
                                                        <VscError/>
                                                    </span>
                                                    <span>Inactive</span>
                                                </span>
                                            </span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileBanner