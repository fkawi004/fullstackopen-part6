import { useNotification } from '../NotificationContext'
export default function Notification() { const { notification } = useNotification(); return <div data-testid="notification" style={{ display: notification ? '' : 'none', border: 'solid', padding: 10, color: notification?.error ? 'red' : 'green' }}>{notification?.text}</div> }
