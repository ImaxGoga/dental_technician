import React, { useState, useEffect } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';
import Navbar from './Navbar';

const phoneRegex = /^(\+7|8)?[\s\-]?\(?\d{3,5}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;

interface Errors {
    fio?: boolean;
    phone?: boolean;
    description?: boolean;
    file?: boolean;
}

const CreateRequest: React.FC = () => {
    const [fio, setFio] = useState('');
    const [phone, setPhone] = useState('+7');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<Errors>({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!phone) {
            setPhone('+7');
        }
    }, []);

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (!value.startsWith('+7')) {
            if (value.startsWith('+')) {
                value = '+7' + value.slice(1).replace(/\D/g, '');
            } else {
                value = '+7' + value.replace(/\D/g, '');
            }
        } else {
            const afterPlus7 = value.slice(2).replace(/[^0-9\s\-()]/g, '');
            value = '+7' + afterPlus7;
        }

        setPhone(value);
        setErrors(prev => ({ ...prev, phone: false }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setErrors(prev => ({ ...prev, file: false }));
        } else {
            setFile(null);
        }
    };

    const validatePhone = (phone: string) => {
        const cleaned = phone.replace(/[\s\-()]/g, '');
        return phoneRegex.test(phone) || phoneRegex.test(cleaned);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const newErrors: Errors = {};

        if (!fio.trim()) newErrors.fio = true;
        if (!phone.trim() || !validatePhone(phone)) newErrors.phone = true;
        if (!description.trim()) newErrors.description = true;
        if (!file) newErrors.file = true;

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            alert(
                `Заявка создана!\nФИО: ${fio}\nТелефон: ${phone}\nОписание: ${description}\nФайл: ${file!.name}`
            );
            setFio('');
            setPhone('+7');
            setDescription('');
            setFile(null);
            setErrors({});
        }
    };

    const handleBackClick = () => {
        const isFormDirty =
            fio !== '' || (phone !== '' && phone !== '+7') || description !== '' || file !== null;

        if (isFormDirty) {
            setIsModalOpen(true);
        } else {
            navigate('/');
        }
    };

    const confirmLeave = () => {
        setIsModalOpen(false);
        navigate('/');
    };

    const cancelLeave = () => {
        setIsModalOpen(false);
    };

    // Общий стиль инпутов с подсветкой ошибки
    const inputStyle = (error?: boolean): React.CSSProperties => ({
        border: error ? '2px solid #d9534f' : '1.5px solid #ccc',
        // outline: 'none',
        background: 'linear-gradient(90deg, #995C00 0%, #4D4D4D 100%)',
        // color: '#181A20',
        color: '#ffffff',
        // border: 'none',
        borderRadius: 8,
        padding: '12px 28px',
        fontWeight: 700,
        fontSize: 18,
        cursor: 'pointer',
        boxShadow: '0 2px 12px #FF990044',
        transition: 'background 0.3s, color 0.3s',
    });

    return (
        <>
            <Navbar />
            <div style={styles.pageWrapper}>
                <div style={styles.formContainer}>
                    <h2 style={styles.title}>Создание заявки</h2>

                    <button
                        type="button"
                        onClick={handleBackClick}
                        style={{ ...styles.button, ...styles.backButton }}
                    >
                        ← Назад
                    </button>

                    <form onSubmit={handleSubmit} style={styles.form}>
                        <label style={styles.label}>
                            ФИО:
                            <input
                                type="text"
                                value={fio}
                                onChange={e => {
                                    setFio(e.target.value);
                                    setErrors(prev => ({ ...prev, fio: false }));
                                }}
                                style={inputStyle(errors.fio)}
                                placeholder="Введите ФИО"
                            />
                        </label>

                        <label style={styles.label}>
                            Контактный телефон:
                            <input
                                type="text"
                                value={phone}
                                onChange={handlePhoneChange}
                                maxLength={18}
                                placeholder="+7 (999) 999-99-99 или городской телефон"
                                style={inputStyle(errors.phone)}
                            />
                            {errors.phone && (
                                <div style={styles.errorText}>Введите корректный телефон</div>
                            )}
                        </label>

                        <label style={styles.label}>
                            Описание:
                            <textarea
                                value={description}
                                onChange={e => {
                                    setDescription(e.target.value);
                                    setErrors(prev => ({ ...prev, description: false }));
                                }}
                                rows={5}
                                style={{
                                    ...inputStyle(errors.description),
                                    resize: 'vertical',
                                    minHeight: 100,
                                    background: 'linear-gradient(90deg, #995C00 0%, #4D4D4D 100%)',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: 8,
                                    padding: '12px 28px',
                                    fontWeight: 700,
                                    fontSize: 18,
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 12px #FF990044',
                                    transition: 'background 0.3s, color 0.3s',
                                }}
                                placeholder="Опишите вашу заявку"
                            />
                        </label>

                        <label style={styles.label}>
                            Приложить файл:
                            <input
                                type="file"
                                onChange={handleFileChange}
                                style={{
                                    marginTop: 8,
                                    border: errors.file ? '2px solid #d9534f' : 'none',
                                    borderRadius: 6,
                                    padding: 4,
                                }}
                            />
                            {errors.file && (
                                <div style={styles.errorText}>Пожалуйста, приложите файл</div>
                            )}
                        </label>

                        <button type="submit" style={{ ...styles.button, ...styles.submitButton }}>
                            Отправить заявку
                        </button>
                    </form>
                </div>

                <ConfirmModal
                    isOpen={isModalOpen}
                    onConfirm={confirmLeave}
                    onCancel={cancelLeave}
                    message="Все введённые данные будут потеряны. Вы уверены, что хотите вернуться на главную страницу?"
                />
            </div>
        </>
    );
};

const styles: Record<string, React.CSSProperties> = {
    pageWrapper: {
        display: 'flex',
        justifyContent: 'center',
        padding: '40px 20px',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #181A20 60%, #1F2633 100%)',
        paddingTop: 80, // для отступа под navbar
        color: '#fff'
    },
    formContainer: {
        width: '75vw',
        maxWidth: 900,
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 12,
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        boxSizing: 'border-box',
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #181A20 60%, #1F2633 100%)',
        paddingTop: 80, // для отступа под navbar
        color: '#fff'
    },
    title: {
        marginBottom: 24,
        fontSize: 28,
        color: '#fff',
        fontWeight: '600',
        textAlign: 'left',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        fontWeight: 500,
        fontSize: 16,
        color: '#fff',
    },
    errorText: {
        color: '#d9534f',
        fontSize: 14,
        marginTop: 4,
    },
    button: {
        // cursor: 'pointer',
        // fontWeight: 600,
        // fontSize: 16,
        // borderRadius: 8,
        // padding: '12px 20px',
        // border: 'none',
        // transition: 'background-color 0.3s, box-shadow 0.3s',
        // userSelect: 'none',
        background: 'linear-gradient(90deg, #FF9900 0%, #B3B3B3 100%)',
        color: '#181A20',
        border: 'none',
        borderRadius: 8,
        padding: '12px 28px',
        fontWeight: 700,
        fontSize: 18,
        cursor: 'pointer',
        boxShadow: '0 2px 12px #FF990044',
        transition: 'background 0.3s, color 0.3s',
    },
    submitButton: {
        backgroundColor: '#007bff',
        color: 'white',
        boxShadow: '0 4px 12px rgba(0,123,255,0.4)',
    },
    backButton: {
        backgroundColor: '#6c757d',
        color: 'white',
        marginBottom: 30,
        width: 140,
        boxShadow: '0 4px 12px rgba(108,117,125,0.4)',
    },
};

export default CreateRequest;
