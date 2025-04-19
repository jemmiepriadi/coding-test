import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import Sidebar from '@/components/sidebar/Sidebar'
import Profiles from '@/components/profiles/Profiles'
import Sales from '@/components/sales/Sales'
import Leaderboard from '@/components/leaderboard/Leaderboard'
import useSidebarStore from '@/store/sidebarStore'
import LoadingSpinner from '@/components/loading-spinner/LoadingSpinner'
import axios from 'axios'

export default function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isSidebarOpen } = useSidebarStore()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:8000/api/data')
      setData(response.salesReps || {
        "salesReps": [
          {
            "id": 1,
            "name": "Alice",
            "imgUrl": "/alice.jpg",
            "role": "Senior Sales Executive",
            "region": "North America",
            "skills": ["Negotiation", "CRM", "Client Relations"],
            "deals": [
              { "client": "Acme Corp", "value": 120000, "status": "Closed Won", "date": 1742310390 },
              { "client": "Beta Ltd", "value": 50000, "status": "In Progress", "date": 1743087990 },
              { "client": "Omega Inc", "value": 85000, "status": "Closed Lost", "date": 1744124790 }
            ],
            "clients": [
              { "name": "Acme Corp", "industry": "Manufacturing", "contact": "alice@acmecorp.com" },
              { "name": "Beta Ltd", "industry": "Retail", "contact": "contact@betaltd.com" }
            ]
          },
          {
            "id": 2,
            "name": "Bob",
            "imgUrl": "/bob.jpg",
            "role": "Sales Representative",
            "region": "Europe",
            "skills": ["Lead Generation", "Presentation", "Negotiation"],
            "deals": [
              { "client": "Gamma Inc", "value": 75000, "status": "Closed Lost", "date": 1736348790 },
              { "client": "Delta LLC", "value": 90000, "status": "Closed Won", "date": 1737385590 },
              { "client": "Sigma Corp", "value": 65000, "status": "In Progress", "date": 1737685590 }
            ],
            "clients": [
              { "name": "Gamma Inc", "industry": "Tech", "contact": "info@gammainc.com" },
              { "name": "Delta LLC", "industry": "Finance", "contact": "support@deltallc.com" }
            ]
          },
          {
            "id": 3,
            "name": "Charlie",
            "imgUrl": "/charlie.jpg",
            "role": "Account Manager",
            "region": "Asia-Pacific",
            "skills": ["Customer Service", "Sales Strategy", "Data Analysis"],
            "deals": [
              { "client": "Epsilon Ltd", "value": 110000, "status": "In Progress", "date": 1737385590 },
              { "client": "Zeta Corp", "value": 60000, "status": "Closed Won", "date": 1740063990 },
              { "client": "Theta Enterprises", "value": 70000, "status": "Closed Lost", "date": 1742310390 }
            ],
            "clients": [
              { "name": "Epsilon Ltd", "industry": "Healthcare", "contact": "contact@epsilonltd.com" },
              { "name": "Zeta Corp", "industry": "Finance", "contact": "sales@zetacorp.com" }
            ]
          },
          {
            "id": 4,
            "name": "Danny",
            "imgUrl": "/danny.jpg",
            "role": "Business Development Manager",
            "region": "South America",
            "skills": ["Strategic Partnerships", "Negotiation", "Market Analysis"],
            "deals": [
              { "client": "Eta Co", "value": 130000, "status": "In Progress", "date": 1737385590 },
              { "client": "Theta Inc", "value": 80000, "status": "Closed Won", "date": 1739063990 },
              { "client": "Iota Group", "value": 55000, "status": "Closed Lost", "date": 1740063990 }
            ],
            "clients": [
              { "name": "Eta Co", "industry": "Energy", "contact": "info@etaco.com" },
              { "name": "Theta Inc", "industry": "Telecommunications", "contact": "sales@thetainc.com" }
            ]
          },
          {
            "id": 5,
            "name": "Eve",
            "imgUrl": "/eve.jpg",
            "role": "Regional Sales Manager",
            "region": "Middle East",
            "skills": ["Relationship Building", "Negotiation", "Market Expansion"],
            "deals": [
              { "client": "Iota Ltd", "value": 95000, "status": "Closed Won", "date": 1737063990 },
              { "client": "Kappa LLC", "value": 45000, "status": "In Progress", "date": 1739063990 },
              { "client": "Lambda Partners", "value": 105000, "status": "Closed Lost", "date": 1740063990 }
            ],
            "clients": [
              { "name": "Iota Ltd", "industry": "Hospitality", "contact": "contact@iotaltd.com" },
              { "name": "Kappa LLC", "industry": "Retail", "contact": "info@kappallc.com" }
            ]
          }
        ]
      })
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError(`Failed to fetch data: ${err}. Please try again.`)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <p className="text-red-600 text-center">{error}</p>
  return (
    <div className={styles.main}>
      <div>
        <Sidebar />
      </div>
      <div className={`${styles.section} ${isSidebarOpen ? styles.mlOpened : styles.mlClosed }`}>
        <div className={styles.center}>
          <div>
            <Leaderboard data={data.salesReps} />
          </div>
          <div>
            <Sales data={data.salesReps} />
            <Profiles data={data.salesReps} />
          </div>
        </div>
      </div>
    </div>
  )
}
