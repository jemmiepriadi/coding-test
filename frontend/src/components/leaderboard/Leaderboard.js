import styles from './Leaderboard.module.css'
import { FaCrown } from 'react-icons/fa'

const Leaderboard = ({ data }) => {
  const formatShortNumber = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
    return num.toString()
  }

  const sorted = [...data].map(rep => {
    const total = rep.deals.reduce((sum, deal) =>
      deal.status === 'Closed Won' ? sum + deal.value : sum, 0)
    return { ...rep, total }
  }).sort((a, b) => b.total - a.total)

  return (
    <div className={styles.board}>
      <h2 className={styles.title}>Sales Leaderboard</h2>
      <ul className={styles.list}>
        {sorted.map((rep, index) => (
          <li key={rep.id} className={styles.item}>
            <span className={styles.rank}>
              {index === 0 && <FaCrown className={styles.crown} />}
              {index + 1}
            </span>
            <div className={styles.info}>
              <strong>{rep.name}</strong>
              <span>{rep.role} - {rep.region}</span>
            </div>
            <span className={styles.amount}>${formatShortNumber(rep.total)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Leaderboard
