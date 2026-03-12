import { useState } from 'react'
import Button from '../../components/buttons/Button.jsx'
import PageContainer from '../../components/common/PageContainer.jsx'
import { useAlert } from '../../contexts/AlertContext.jsx'
import styles from './AlertPage.module.css'

function AlertPage() {
    const { alert, confirm } = useAlert()
    const [lastResult, setLastResult] = useState('아직 실행된 alert가 없습니다.')

    const handleOpenAlert = async () => {
        await alert({
            alertTitle: '저장이 완료되었습니다.',
            alertContents: '브라우저 alert 대신 AlertBox를 사용한 기본 알림입니다.',
            confirmText: '확인',
            confirmVariant: 'solid-primary',
        })

        setLastResult('단일 확인형 alert를 닫았습니다.')
    }

    const handleOpenConfirm = async () => {
        const result = await confirm({
            alertTitle: '게시글을 삭제할까요?',
            alertContents: '브라우저 confirm 대신 AlertBox를 사용한 확인 모달입니다.',
            confirmText: '삭제',
            cancelText: '취소',
            confirmVariant: 'solid-negative',
        })

        setLastResult(result ? '삭제를 선택했습니다.' : '취소를 선택했습니다.')
    }

    return (
        <PageContainer title="Alert" subtitle="시스템 알림">
            <section className={styles.page}>
                <div className={styles.actions}>
                    <Button
                        variant='solid-primary'
                        size='md'
                        text='기본 Alert 열기'
                        onClick={handleOpenAlert}
                    />
                    <Button
                        variant='solid-negative'
                        size='md'
                        text='Confirm 열기'
                        onClick={handleOpenConfirm}
                    />
                </div>
                <p className={styles.result}>{lastResult}</p>
            </section>
        </PageContainer>
    )
}

export default AlertPage
