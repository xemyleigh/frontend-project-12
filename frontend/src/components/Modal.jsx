import { useFormik } from 'formik';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import { actions as modalActions } from '../slices/modalSlice';
import { actions as channelsActions } from '../slices/channelsSlice';
import { useApi } from '../hooks';

const AddChannelModal = () => {
  const dispatch = useDispatch();
  const { addChannel } = useApi();
  const channels = useSelector((state) => state.channels.channels);
  const channelsNames = channels.map((channel) => channel.name);
  const { t } = useTranslation();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [creationFailed, setCreationFailedStatus] = useState(false);

  const closeHandler = () => {
    dispatch(modalActions.closeModal());
  };

  const formik = useFormik({
    initialValues: { newChannel: '' },
    onSubmit: async (values) => {
      const newChannelName = values.newChannel;
      setLoadingStatus(true);
      try {
        if (!channelsNames.includes(newChannelName)) {
          const data = await addChannel(newChannelName);
          dispatch(modalActions.closeModal());
          dispatch(channelsActions.setChannel(data.id));
          toast.success(t('channels.created'));
        } else {
          throw Error('channel already exists');
        }
      } catch (e) {
        setCreationFailedStatus(true);
        setLoadingStatus(false);
      }
    },
  });

  const input = useRef(null);
  useEffect(() => input.current.focus(), []);

  return (
    <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">{t('modals.add')}</div>
            <button type="button" aria-label="Close" onClick={closeHandler} data-bs-dismiss="modal" className="btn btn-close" />
          </div>
          <div className="modal-body">
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="form-floating mb-2">
                <Form.Control onBlur={formik.handleBlur} ref={input} type="newChannel" isInvalid={creationFailed} id="newChannel" name="newChannel" onChange={formik.handleChange} value={formik.values.newValue} />
                <Form.Control.Feedback type="invalid" tooltip>{t('modals.uniq')}</Form.Control.Feedback>
                <Form.Label htmlFor="newChannel">{t('modals.channelName')}</Form.Label>
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button type="button" disabled={loadingStatus} className="me-2 btn btn-secondary">{t('modals.cancel')}</Button>
                <Button type="submit" disabled={loadingStatus}>{t('modals.submit')}</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const { removeChannel } = useApi();
  const idToRemove = useSelector((state) => state.modalInfo.channelId);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { t } = useTranslation();

  const [loadingStatus, setLoadingStatus] = useState(false);

  const closeHandler = () => {
    dispatch(modalActions.closeModal());
  };

  const removeHandler = (id) => async () => {
    setLoadingStatus(true);
    try {
      await removeChannel(id);
      dispatch(modalActions.closeModal());
      if (id === currentChannelId) {
        dispatch(channelsActions.setChannel(1));
      }
      toast.success(t('channels.removed'));
    } catch (e) {
      setLoadingStatus(false);
    }
  };

  return (
    <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">{t('modals.remove')}</div>
            <button type="button" aria-label="Close" onClick={closeHandler} data-bs-dismiss="modal" className="btn btn-close" />
          </div>
          <div className="modal-body">
            <div>
              <div className="d-flex justify-content-end gap-2">
                <button disabled={loadingStatus} type="button" onClick={closeHandler} className="btn btn-secondary mr-2">{t('modals.cancel')}</button>
                <button onClick={removeHandler(idToRemove)} type="button" disabled={loadingStatus} className="btn btn-danger">{t('modals.confirm')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RenameChannelModal = () => {
  const dispatch = useDispatch();
  const { renameChannel } = useApi();
  const channels = useSelector((state) => state.channels.channels);
  const channelsNames = channels.map((channel) => channel.name);
  const idToRename = useSelector((state) => state.modalInfo.channelId);
  const currentChannel = channels.find((channel) => channel.id === idToRename);
  const { t } = useTranslation();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [renamingFailStatus, setRenamingStatus] = useState(false);

  const closeHandler = () => {
    dispatch(modalActions.closeModal());
  };

  const formik = useFormik({
    initialValues: { newValue: currentChannel.name },
    onSubmit: async (values) => {
      const newChannelName = values.newValue;
      setLoadingStatus(true);
      try {
        if (!channelsNames.includes(newChannelName)) {
          await renameChannel(idToRename, newChannelName);
          dispatch(modalActions.closeModal());
          toast.success(t('channels.renamed'));
        } else {
          setRenamingStatus(true);
          throw Error('channel already exists');
        }
      } catch (e) {
        setLoadingStatus(false);
      }
    },
  });

  const input = useRef(null);
  useEffect(() => input.current.focus(), []);

  return (
    <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">{t('modals.rename')}</div>
            <button type="button" aria-label="Close" onClick={closeHandler} data-bs-dismiss="modal" className="btn btn-close" />
          </div>
          <div className="modal-body">
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="form-floating mb-2">
                <Form.Control onBlur={formik.handleBlur} ref={input} type="newValue" isInvalid={renamingFailStatus} id="newValue" name="newValue" onChange={formik.handleChange} value={formik.values.newValue} />
                <Form.Control.Feedback type="invalid" tooltip>{t('modals.uniq')}</Form.Control.Feedback>
                <Form.Label htmlFor="newValue">{t('modals.channelName')}</Form.Label>
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button type="button" disabled={loadingStatus} className="me-2 btn btn-secondary">{t('modals.cancel')}</Button>
                <Button type="submit" disabled={loadingStatus}>{t('modals.submit')}</Button>
              </div>
            </Form>

          </div>
        </div>
      </div>
    </div>
  );
};

const modals = {
  addChannel: AddChannelModal,
  removeChannel: RemoveChannelModal,
  renameChannel: RenameChannelModal,
};

const Modal = () => {
  const activeModal = useSelector((state) => state.modalInfo.modalType);
  const ModalToShow = modals[activeModal];
  return (
    activeModal && (
      <>
        <div className="fade modal-backdrop show" />
        <ModalToShow />
      </>
    )
  );
};

export default Modal;
