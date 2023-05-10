import {HiOutlineChevronDoubleDown, HiOutlineChevronDoubleUp} from "react-icons/hi";
import {UserInfo} from "../../types/api-types";

/**
 * Components that displays a user's current level and remaining total
 *
 * @param userInfo user info
 * @author Stephen Prizio
 * @version 1.0
 */
function SkillProgress({userInfo = {}}: {userInfo: UserInfo}) {


    //  GENERAL FUNCTIONS

    function computeClass() {
        return userInfo.account?.skill?.delta ?? -1 >= 0 ? ' positive ' : ' negative '
    }


    //  RENDER

    return (
        <div className="ct-skillprogress">
            <div className="columns is-multiline is-mobile is-gapless">
                <div className="column is-12">
                    <nav className="level is-mobile">
                        <div className="level-left">
                            <div className="level-item">
                                <p className="ct-skillprogress__label">Level {userInfo.account?.skill?.level ?? 0}</p>
                            </div>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <div className="has-text-right">
                                <span className="icon-text ct-skillprogress__net">
                                    <span className={"icon " + (computeClass())}>
                                        {
                                            userInfo.account?.skill?.delta ?? -1 >= 0 ?
                                                <HiOutlineChevronDoubleUp/> :
                                                <HiOutlineChevronDoubleDown/>
                                        }
                                    </span>
                                    <span className={computeClass()}>
                                        {userInfo.account?.skill?.delta ?? 0}
                                    </span>
                                </span>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="column is-12">
                    <progress className="progress is-primary" value={userInfo.account?.skill?.points ?? 0} max={userInfo.account?.skill?.stepIncrement ?? 0} />
                </div>
                <div className="column is-12">
                    <nav className="level is-mobile">
                        <div className="level-left">
                            <div className="level-item">
                                <p className="ct-skillprogress__label">Current: {userInfo.account?.skill?.points ?? 0}</p>
                            </div>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <div className="has-text-right">
                                    <p className="ct-skillprogress__label">Remaining: {userInfo.account?.skill?.remaining ?? 0}</p>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default SkillProgress;