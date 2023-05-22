import {Helmet} from "react-helmet";
import {useEffect, useState} from "react";
import {CreateRetrospectiveForm, RetrospectiveType} from "../../types/ui-types";
import SimpleButton from "../../components/Buttons/SimpleButton";
import CreateRetrospectiveModal from "../../components/Modals/Retrospective/CreateRetrospectiveModal";

/**
 * Component that renders the retrospectives page
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function RetrospectivesPage() {

    const [modalActive, setModalActive] = useState(false)
    const [retroType, setRetroType] = useState(RetrospectiveType.NOTE.code)
    const [shouldCancel, setShouldCancel] = useState(false)
    const [formData, setFormData] = useState<CreateRetrospectiveForm>({
        intervalFrequency: 'WEEKLY',
        startDate: '',
        endDate: '',
        points: []
    })

    useEffect(() => {
        if (shouldCancel) {
            resetForm()
        }
    }, [modalActive, shouldCancel])


    //  HANDLER FUNCTIONS

    function toggleModal(shouldCancel: boolean, modType: string) {
        setModalActive(!modalActive)
        setRetroType(modType)
        setShouldCancel(shouldCancel)
    }


    //  GENERAL FUNCTIONS

    function resetForm() {
        /*this.setState({
            newRetro: {
                intervalFrequency: 'WEEKLY',
                startDate: '',
                endDate: '',
                points: []
            },
            isEditing: false,
            datePicker: [new Date(), new Date()],
            isInvalidDate: false
        })*/
    }

    function isEmpty() {
        /*if (!this.state.retros || this.state.retros.length === 0) {
            return !this.state.audio || this.state.audio.length === 0
        }

        return false;*/
    }


    //  RENDER

    return (
        <>
            <Helmet>
                <title>CTrader | Retrospectives</title>
            </Helmet>
            <div className="ct-retrospectives-page">
                <p>Hello World!</p>
                <SimpleButton text={'Click Me'} handler={() => toggleModal(true, RetrospectiveType.NOTE.code)} />
                <CreateRetrospectiveModal
                    modalActive={modalActive && retroType === RetrospectiveType.NOTE.code}
                    closeHandler={() => toggleModal(true, RetrospectiveType.NOTE.code)}
                    handleSubmit={() => console.log('hi')}
                    retroData={formData}
                />
            </div>
        </>
    )
}

export default RetrospectivesPage;