import styles from './Profiles.module.css'
import ProfileCard from '../profile-card/ProfileCard'

const Profiles = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Profiles</h2>
      <div className={styles.grid}>
        {data.map((item) => (
          <ProfileCard key={item.id} profile={item} />
        ))}
      </div>
    </div>
  )
}

export default Profiles