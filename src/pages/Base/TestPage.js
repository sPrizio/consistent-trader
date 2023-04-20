import SimpleButton from "../../components/Buttons/SimpleButton";
import BaseCard from "../../components/Cards/BaseCard";

/**
 * A generic page used for testing components and functionality
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function TestPage() {
    return (
        <div className="container">
            <div className="columns is-multiline is-mobile">
                <div className="column is-6">
                    <SimpleButton
                        text='Primary'
                        variant='primary'
                    />
                    <br />
                    <SimpleButton
                        text='Primary Inverted'
                        variant='primary'
                        inverted={true}
                    />
                    <br />
                    <SimpleButton
                        text='Secondary'
                        variant='secondary'
                    />
                    <br />
                    <SimpleButton
                        text='Tertiary'
                        variant='tertiary'
                    />
                    <br />
                    <SimpleButton
                        text='Disabled'
                        variant='primary'
                        disabled={true}
                    />
                    <br />
                    <SimpleButton
                        text='Inverted Disabled'
                        variant='primary'
                        inverted={true}
                        disabled={true}
                    />
                    <br />
                    <SimpleButton
                        text='Plain Primary'
                        variant='primary'
                        plain={true}
                    />
                    <br />
                    <SimpleButton
                        text='Plain Secondary'
                        variant='secondary'
                        plain={true}
                    />
                    <br />
                    <SimpleButton
                        text='Plain Primary Active'
                        variant='primary'
                        plain={true}
                        active={true}
                    />
                    <br />
                    <SimpleButton
                        text='Plain Secondary Active'
                        variant='secondary'
                        plain={true}
                        active={true}
                    />
                    <br />
                    <SimpleButton
                        text='Plain Disabled'
                        variant='primary'
                        plain={true}
                        disabled={true}
                    />
                    <br />
                    <SimpleButton
                        text='Plain Active Disabled'
                        variant='primary'
                        plain={true}
                        disabled={true}
                        active={true}
                    />
                    <br />
                    <SimpleButton
                        text='Primary Loading'
                        variant='primary'
                        loading={true}
                    />
                    <br />
                    <SimpleButton
                        text='Primary Inverted Loading'
                        variant='primary'
                        inverted={true}
                        loading={true}
                    />
                    <br />
                    <SimpleButton
                        text='Secondary Loading'
                        variant='secondary'
                        loading={true}
                    />
                    <br />
                    <SimpleButton
                        text='Tertiary Loading'
                        variant='tertiary'
                        loading={true}
                    />
                </div>
                <div className="column is-6">
                    <BaseCard
                        content={[<p key={0}>This is some test content</p>]}
                        controls={[<SimpleButton text={'Submit'} key={0} loading={false} />, <SimpleButton text={'Cancel'} variant={"tertiary"} key={1} />]}
                    />
                </div>
            </div>
        </div>
    )
}

export default TestPage;