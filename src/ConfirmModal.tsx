import React from 'react';
import ReactDOM from 'react-dom';

interface ConfirmModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    message: string;
}

const modalRoot = document.getElementById('modal-root');

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onConfirm, onCancel, message }) => {
    if (!isOpen || !modalRoot) return null;

    return ReactDOM.createPortal(
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <p>{message}</p>
                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                    <button onClick={onConfirm} style={{ backgroundColor: '#d9534f', color: 'white', padding: '8px 12px', border: 'none', borderRadius: 4 }}>
                        Да, вернуться на главную
                    </button>
                    <button onClick={onCancel} style={{ padding: '8px 12px', borderRadius: 4 }}>
                        Нет, остаться на этой странице
                    </button>
                </div>
            </div>
        </div>,
        modalRoot
    );
};

const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 8,
    maxWidth: 400,
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
};

export default ConfirmModal;
