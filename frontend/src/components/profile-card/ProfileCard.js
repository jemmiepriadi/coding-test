import Image from 'next/image'
import styles from './ProfileCard.module.css'
import { FaMapMarkerAlt } from 'react-icons/fa'
import Modal from '../modal/Modal'
import { useState } from 'react'

const ProfileCard = ({ profile }) => {
  const [openedModal, setOpenedModal] = useState(false)
  const formatShortNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
    return num.toString()
  }

  const totalAmount = profile.deals.reduce((sum, deal) =>
    deal.status === 'Closed Won' ? sum + deal.value : sum, 0
  )

  return (
    <>
      <div className={styles.card} onClick={() => setOpenedModal(true)}>
        <div className={styles.info}>
          <span><FaMapMarkerAlt /> {profile.region}</span>
          <Image className={styles.roundImg} src={profile.imgUrl} width={80} height={80} alt={profile.name} />
          <h3>{profile.name}</h3>
          <p>{profile.role}</p>
          <h4>${formatShortNumber(totalAmount)}</h4>
        </div>
      </div>
      <Modal isOpen={openedModal} onClose={() => setOpenedModal(false)}>
        {openedModal && (
          <div>
            <h2 className="text-xl text-gray-600 font-bold mb-2">{profile.name}</h2>
            <p className="text-gray-600 mb-1">Role: {profile.role}</p>
            <p className="text-gray-600 mb-1">Region: {profile.region}</p>
            <h2 className="text-xl text-gray-600 font-bold mb-2">Skills:</h2>
            <div className={`${styles.badges}`}>
              {profile.skills?.map((skill, i) => (
                <span key={i} className={`${styles.badge}`}>{skill}</span>
              ))}
            </div>
            <h2 className="text-xl text-gray-600 font-bold mb-2">Clients:</h2>
            <div className={`${styles.clients}`}>
              {profile.clients?.map((client, i) => (
                <div key={i} className={`${styles.clientCard}`}>
                  <div><strong>{client.name}</strong></div>
                  <div className={`${styles.clientDetail}`}>{client.industry}</div>
                  <div className={`${styles.clientDetail}`}><a href={`mailto:${client.contact}`}>{client.contact}</a></div>
                </div>
              ))}
            </div>
            <h2 className="text-xl text-gray-600 font-bold mb-2">Deals:</h2>
            <ul className="text-sm text-gray-600 mt-1 space-y-1 max-h-40 overflow-y-auto">
              {profile.deals.map((deal, i) => (
                <li key={i}>
                  💼 {deal.status} — ${deal.value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </>
  )
}

export default ProfileCard
