import BaseCard from "../BaseCard";
import {UserInfo} from "../../../types/api-types";
import SkillProgress from "../../Skill/SkillProgress";

/**
 * Card that renders the skill progress component
 *
 * @param userInfo user info
 * @param isLoading is loading
 * @constructor
 */
function SkillProgressCard({userInfo = {}, isLoading = false}: {userInfo: UserInfo, isLoading: boolean}) {

    //  RENDER

    const subtitle = (userInfo.account?.broker ?? '') + ' ' + (userInfo.account?.accountType ?? '') + ' Account'
    return (
        <>
            <BaseCard
                loading={isLoading}
                title={'Skill'}
                subtitle={subtitle}
                hasBorder={true}
                content={[<SkillProgress key={0} userInfo={userInfo} />]}
            />
        </>
    )
}

export default SkillProgressCard;