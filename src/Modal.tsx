// Modal.tsx
import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const modalRoot = document.getElementById('modal-root');

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen || !modalRoot) return null;

    return ReactDOM.createPortal(
        <div style={styles.overlay}>
            <div style={styles.modal}>
                {children}
                <button onClick={onClose} style={styles.closeButton}>Закрыть</button>
            </div>
        </div>,
        modalRoot
    );
};

const styles = {
    overlay: {
        position: 'fixed' as const,
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        background: '#fff',
        padding: 20,
        borderRadius: 8,
        width: 400,
        maxHeight: '80vh',
        overflowY: 'auto' as const,
    },
    closeButton: {
        marginTop: 10,
    }
};

export default Modal;
