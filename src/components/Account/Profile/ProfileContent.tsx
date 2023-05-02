import BaseCard from "../../Cards/BaseCard";
import {UserInfo} from "../../../types/api-types";
import ProfileAbout from "./ProfileAbout";
import ProfileContacts from "./ProfileContacts";
import ProfileOverview from "./ProfileOverview";

/**
 * Component that lays out basic profile content
 *
 * @param profileInfo profile info
 * @author Stephen Prizio
 * @version 1.0
 */
function ProfileContent({profileInfo = {}}: { profileInfo: UserInfo }) {


    //  RENDER

    return (
        <div className="ct-profile-content">
            <div className="columns is-multiline is-vcentered is-mobile">
                <div className="column is-12">
                    <BaseCard
                        loading={false}
                        title={''}
                        subtitle={''}
                        hasBorder={false}
                        content={[<ProfileAbout key={0} profileInfo={profileInfo} />]}
                    />
                </div>
                <div className="column is-12">
                    <BaseCard
                        loading={false}
                        title={''}
                        subtitle={''}
                        hasBorder={false}
                        content={[<ProfileContacts key={0} profileInfo={profileInfo} />]}
                    />
                </div>
                <div className="column is-12">
                    <BaseCard
                        loading={false}
                        title={''}
                        subtitle={''}
                        hasBorder={false}
                        content={[<ProfileOverview key={0} profileInfo={profileInfo} />]}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProfileContent;