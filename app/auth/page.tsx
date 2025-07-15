'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './auth.module.scss';
import { fetchRandomUser } from '@/services/userService';

export default function AuthPage() {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const validatePhone = (value: string) => {
        const iranPhoneRegex = /^(\+98|0)?9\d{9}$/;
        return iranPhoneRegex.test(value);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setPhone(value);
    };

    const handleLogin = async () => {
        if (!validatePhone(phone)) {
            setError('لطفاً شماره موبایل معتبر وارد کنید.');
            return;
        }

        setError('');
        setLoading(true);
        try {
            const user = await fetchRandomUser();
            localStorage.setItem('user', JSON.stringify(user));
            router.push('/dashboard');
        } catch (err) {
            console.error(err);
            setError('مشکلی پیش آمده است.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1>ورود</h1>
            <div className={styles.form}>
                <input
                    type="text"
                    maxLength={11}
                    placeholder="شماره موبایل"
                    value={phone}
                    onChange={handlePhoneChange}
                    className={`${styles.input} ${error ? styles.inputError : ''}`}
                />
                {error && <p className={styles.errorMessage}>{error}</p>}
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className={styles.button}
                >
                    {loading ? 'در حال ورود...' : 'ورود'}
                </button>
            </div>
        </div>
    );
}
