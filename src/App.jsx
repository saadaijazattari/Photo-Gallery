


import axios from 'axios'
import { useEffect, useState } from 'react'

const App = () => {
  const [userData, setUserData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  async function getData() {
    try {
      setLoading(true)
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=12`
      )
      setUserData(response.data)
    } finally {
      setLoading(false)
    }
  }

  function nextPage() {
    setPage((prev) => prev + 1)
  }

  function previousPage() {
    setPage((prev) => (prev > 1 ? prev - 1 : prev))
  }

  useEffect(() => {
    getData()
  }, [page])

  return (
    <main className="gallery-app">
      <section className="gallery-shell">
        <header className="gallery-header">
          <p className="gallery-kicker">Inspiration Board</p>
          <h1 className="gallery-title">Modern Photo Gallery</h1>
          <p className="gallery-subtitle">
            Browse curated shots from Lorem Picsum.
          </p>
        </header>

        <div className="gallery-toolbar">
          <button className="control-btn" onClick={previousPage} disabled={page === 1}>
            Previous
          </button>
          <p className="page-badge">Page {page}</p>
          <button className="control-btn" onClick={nextPage}>
            Next
          </button>
        </div>

        {loading ? (
          <p className="loading-text">Loading photos...</p>
        ) : (
          <section className="gallery-grid">
            {userData.map((item) => (
              <article className="photo-card" key={item.id}>
                <img src={item.download_url} alt={`Photo by ${item.author}`} />
                <div className="photo-overlay">
                  <p>{item.author}</p>
                </div>
              </article>
            ))}
          </section>
        )}
      </section>
    </main>
  )
}

export default App
