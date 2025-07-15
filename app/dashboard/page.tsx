'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.scss';

export default function DashboardPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsLoading(false);
        } else {
            router.replace('/auth');
        }
    }, [router]);

    return (
            <div className={styles.container}>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <h1>Welcome to the Dashboard</h1>
                )}
            </div>
    );
}
