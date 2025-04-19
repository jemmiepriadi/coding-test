'use client'
import Link from 'next/link'
import styles from './Sidebar.module.css'
import { useEffect, useState } from 'react'
import { AiFillAppstore, AiFillQuestionCircle } from 'react-icons/ai'
import { LuPanelLeftOpen, LuPanelLeftClose }  from 'react-icons/lu'
import useSidebarStore from '@/store/sidebarStore'
import Modal from '../modal/Modal'
import LoadingSpinner from '../loading-spinner/LoadingSpinner'
import axios from 'axios'

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar, setSidebarOpen } = useSidebarStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (window.innerWidth < 768) setSidebarOpen(false);
  }, []);

  const handleInput = (e) => {
    const value = e.target.value
    setSearchTerm(value)
  }

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      setLoading(true)
      try {
        const response = await axios.post('http://localhost:8000/api/ai', {
          question: searchTerm
        })
        setResults(response.data.answer)
      } catch (error) {
        console.error(`Error fetching answer: ${error}`)
        setResults('Something went wrong')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.closed}`}>
        <button onClick={() => toggleSidebar()} className={styles.toggleBtn}>
          {isSidebarOpen ? <LuPanelLeftClose /> : <LuPanelLeftOpen />}
        </button>
        {isSidebarOpen && <h2>Sales Dash</h2>}
        <nav>
          <Link href="/">{isSidebarOpen ? <span>Dashboard</span> : <AiFillAppstore /> }</Link>
          <button onClick={() => setIsModalOpen(true)} className={styles.button}>{isSidebarOpen ? <span>FAQ</span> : <AiFillQuestionCircle />}</button>
        </nav>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={styles.searchContainer}>
          <h2>FAQ</h2>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleInput(e)}
            onKeyUp={(e) => handleSearch(e)}
            placeholder="Ask anything and press enter..."
            className={styles.searchInput}
          />
          <div className={styles.resultContainer}>
            {loading ? <LoadingSpinner /> : <span>{results}</span>}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Sidebar