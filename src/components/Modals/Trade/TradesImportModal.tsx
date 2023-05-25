import BaseModal from "../BaseModal";
import {ChangeEvent, useState} from "react";
import {CgSoftwareUpload} from "react-icons/cg";
import {CoreConstants} from "../../../constants/CoreConstants";

/**
 *
 * @param active
 * @param closeHandler
 * @constructor
 */
function TradesImportModal({active = false, closeHandler}: { active: boolean, closeHandler: Function }) {

    const [isLoading, setIsLoading] = useState(false)
    const [fileInputKey, setFileInputKey] = useState<number>(1)
    const [file, setFile] = useState<File | null>(null)


    //  HANDLER FUNCTIONS

    /**
     * Handles file change
     *
     * @param e change event
     */
    function handleChange(e: ChangeEvent) {
        const target = e.target as HTMLInputElement
        // @ts-ignore
        setFile(target.files[0] ?? null)
    }

    /**
     * Handles form submit
     */
    async function handleSubmit() {

        if (file) {
            setIsLoading(true)
            setFileInputKey(Math.random())

            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('fileName', file.name);
                await fetch(
                    CoreConstants.ApiUrls.Trade.Upload.replace('{delimiter}', ',').replace('{tradePlatform}', 'CMC_MARKETS'),
                    {
                        method: 'POST',
                        body: formData
                    }
                )

                setFile(null)
                window.location.reload()
            } catch (e) {
                console.log(e)
            }

            setIsLoading(false)
        }
    }


    //  RENDER

    let content =
        <section>
            <p>Keep track of your trades by uploading a .csv file of your trades!</p>
            <br/>
            <div className="file is-right is-fullwidth">
                <label className="file-label">
                    <input className="file-input"
                           type="file"
                           name="importTrades"
                           onChange={handleChange}
                           key={fileInputKey}
                    />
                    <span className="file-cta is-primary">
                        <span className="file-icon">
                            <CgSoftwareUpload/>
                        </span>
                        <span className="file-label">Select File</span>
                    </span>
                    <span className="file-name">
                        {file ? file.name : 'Choose a file...'}
                    </span>
                </label>
            </div>
            <br/>
            <p>
                Don't worry about uploading files with duplicate trades, we'll
                take care of handling duplicates.
            </p>
        </section>

    return (
        <>
            <BaseModal
                isLoading={isLoading}
                active={active}
                title={'Import Trades'}
                closeHandler={closeHandler}
                content={[content]}
                hasControls={true}
                submitHandler={handleSubmit}
            />
        </>
    )
}

export default TradesImportModal;