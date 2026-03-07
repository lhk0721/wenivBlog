import PageContainer from '../../components/common/PageContainer.jsx'

const ALERTS = [
    { id: 1, message: '회원가입이 완료되었습니다.', type: 'success' },
    { id: 2, message: '로그인 정보가 일치하지 않습니다.', type: 'error' },
    { id: 3, message: '게시글이 임시저장되었습니다.', type: 'info' },
]

function AlertPage() {
    return (
        <PageContainer title="Alert" subtitle="시스템 알림">
            <ul className="alert-list">
                {ALERTS.map((alert) => (
                    <li key={alert.id} className={`alert-item ${alert.type}`}>
                        {alert.message}
                    </li>
                ))}
            </ul>
        </PageContainer>
    )
}

export default AlertPage
