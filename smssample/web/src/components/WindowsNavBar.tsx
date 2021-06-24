import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import '../css/icon-bar.css';
import { setElectron } from '../store/slices/appSlice';

function WindowsNavBar() {
  const dispatch = useDispatch();
  const [isMaximized, setMaximized] = useState(false);

  const electron = window.require ? window.require('@electron/remote') : null;

  useEffect(() => {
    if (electron) {
      dispatch(setElectron(true));

      const isWindowsMaximized = electron.getCurrentWindow().isMaximized();
      setMaximized(isWindowsMaximized);
    }
  }, [electron, dispatch]);

  const handleMinimize = () => {
    if (electron) {
      electron.getCurrentWindow().minimize();
    }
  };

  const handleMaximize = () => {
    if (electron) {
      electron.getCurrentWindow().maximize();
      setMaximized(true);
    }
  };

  const handleRestore = () => {
    if (electron) {
      electron.getCurrentWindow().unmaximize();
      setMaximized(false);
    }
  };

  const handleClose = () => {
    if (electron) {
      electron.getCurrentWindow().close();
    }
  };

  return (
    <header id='titlebar'>
      <div id='drag-region'>
        <div id='window-title'>
          <span>School Management System</span>
        </div>
        <div id='window-controls'>
          <div
            className='button text-center'
            id='min-button'
            onClick={handleMinimize}
          >
            <img
              alt='minimize'
              className='icon'
              src='/icons/min-w-15.png'
              draggable='false'
            />
          </div>

          {isMaximized ? (
            <div
              className='button text-center'
              id='restore-button'
              onClick={handleRestore}
            >
              <img
                alt='restore'
                className='icon'
                src='/icons/restore-w-15.png'
                draggable='false'
              />
            </div>
          ) : (
            <div
              className='button text-center'
              id='max-button'
              onClick={handleMaximize}
            >
              <img
                alt='maximize'
                className='icon'
                src='/icons/max-w-15.png'
                draggable='false'
              />
            </div>
          )}

          <div
            className='button text-center'
            id='close-button'
            onClick={handleClose}
          >
            <img
              alt='close'
              className='icon'
              src='/icons/close-w-15.png'
              draggable='false'
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default WindowsNavBar;
