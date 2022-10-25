import { useFormik } from "formik"
import { useEffect } from "react"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { actions as modalActions } from "../slices/modalSlice"
import { actions as channelsActions } from "../slices/channelsSlice"
import { useApi } from "../hooks/useAuth"
import { useTranslation } from "react-i18next"

const AddChannelModal = () => {
    const dispatch = useDispatch()
    const { addChannel } = useApi()
    const channels = useSelector(state => state.channels.channels)
    const channelsNames = channels.map(channel => channel.name)
    const { t } = useTranslation()


    const closeHandler = () => {
        dispatch(modalActions.closeModal())
    }

    const formik = useFormik({ initialValues: { newValue: '' }, onSubmit: async values => {
        console.log()
        const newChannelName = values.newValue
            try {
                if (!channelsNames.includes(newChannelName)) {
                    const data = await addChannel(newChannelName)
                    dispatch(modalActions.closeModal())
                    dispatch(channelsActions.setChannel(data.id))
                } else {
                    throw Error('channel already exists')
                }
            } catch(e) {
                console.log(e)
            }
    } })

    const input = useRef(null)
    useEffect(() => input.current.focus(), [])

    return (
        <>
            <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{'display': 'block'}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title h4">{t('modals.add')}</div>
                            <button type="button" aria-label="Close" onClick={closeHandler} data-bs-dismiss="modal" className="btn btn-close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={formik.handleSubmit}>
                                <div>
                                    <input className="mb-2 form-control" name="newValue" id='newValue' value={formik.values.newValue} onChange={formik.handleChange} ref={input}/>
                                    <label className="visually-hidden" htmlFor="name">{t('modals.channelName')}</label>
                                    <div className="invalid-feedback"></div>
                                    <div className="d-flex justify-content-end">
                                        <button type="button" className="me-2 btn btn-secondary">{t('modals.cancel')}</button>
                                        <button type="submit" className="btn btn-primary">{t('modals.submit')}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const RemoveChannelModal = () => {
    const dispatch = useDispatch()
    const { removeChannel } = useApi()
    const idToRemove = useSelector(state => state.modalInfo.channelId)
    const currentChannelId = useSelector(state => state.channels.currentChannelId)
    const { t } = useTranslation()


    let loading = false

    const closeHandler = () => {
        dispatch(modalActions.closeModal())
    }

    const removeHandler = (id) => async () => {
        try {
            loading = true
            await removeChannel(id)
            dispatch(modalActions.closeModal())
            if (id === currentChannelId) {
                dispatch(channelsActions.setChannel(1))
            }
        } catch(e) {
            console.log(e)
        }
        
    }

    return (
        <>
            <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{'display': 'block'}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title h4">{t('modals.remove')}</div>
                            <button type="button" aria-label="Close" onClick={closeHandler} data-bs-dismiss="modal" className="btn btn-close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="d-flex justify-content-end gap-2">
                                    <button type="" onClick={closeHandler} disabled={loading} className="btn btn-secondary mr-2">{t('modals.cancel')}</button>
                                    <button onClick={removeHandler(idToRemove)} disabled={loading} className="btn btn-danger">{t('modals.confirm')}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const RenameChannelModal = () => {
    const dispatch = useDispatch()
    const { renameChannel } = useApi()
    const channels = useSelector(state => state.channels.channels)
    const channelsNames = channels.map(channel => channel.name)
    const idToRename = useSelector(state => state.modalInfo.channelId)
    const { t } = useTranslation()

    const closeHandler = () => {
        dispatch(modalActions.closeModal())
    }

    const formik = useFormik({ initialValues: { newValue: '' }, onSubmit: async values => {
        console.log()
        const newChannelName = values.newValue
            try {
                if (!channelsNames.includes(newChannelName)) {
                    console.log(idToRename)

                    await renameChannel(idToRename, newChannelName)
                    dispatch(modalActions.closeModal())
                } else {
                    throw Error('channel already exists')
                }
            } catch(e) {
                console.log(e)
            }
    } })

    const input = useRef(null)
    useEffect(() => input.current.focus(), [])

    return (
        <>
            <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{'display': 'block'}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title h4">{t('modals.rename')}</div>
                            <button type="button" aria-label="Close" onClick={closeHandler} data-bs-dismiss="modal" className="btn btn-close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={formik.handleSubmit}>
                                <div>
                                    <input className="mb-2 form-control" name="newValue" id='newValue' value={formik.values.newValue} onChange={formik.handleChange} ref={input}/>
                                    <label className="visually-hidden" htmlFor="name">{t('modals.editChannelName')}</label>
                                    <div className="invalid-feedback"></div>
                                    <div className="d-flex justify-content-end">
                                        <button type="button" className="me-2 btn btn-secondary">{t('modals.cancel')}</button>
                                        <button type="submit" className="btn btn-primary">{t('modals.submit')}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const modals = {
    addChannel: AddChannelModal,
    removeChannel: RemoveChannelModal,
    renameChannel: RenameChannelModal
}


const Modal = () => {
    const activeModal = useSelector(state => state.modalInfo.modalType)
    const ModalToShow = modals[activeModal]
    return (
        <>
            {activeModal && (
                <>
                    <div className="fade modal-backdrop show"></div>
                    <ModalToShow />
                </>
            )}
        </>
    )
}

export default Modal