import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import './header.css'
import './content.css'
import './article.css'

const App = () => {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  const open = url => window.open(url, '_blank', 'noopener,noreferrer')

  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async (values, { resetForm }) => {
            if (!values.search.trim()) return
            
            setLoading(true)
            setError(null)
            setHasSearched(true)
            
            try {
              const response = await fetch(
                `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
                {
                  headers: {
                    'Authorization': `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
                  }
                }
              )
              
              if (!response.ok) throw new Error('Error al buscar imágenes')
              
              const data = await response.json()
              setPhotos(data.results)
            } catch (err) {
              setError(err.message)
              setPhotos([])
            } finally {
              setLoading(false)
            }
            resetForm()
          }}
        >
          <Form>
            <label htmlFor="search" className="sr-only">Buscar imágenes</label>
            <Field 
              id="search"
              name="search" 
              type="search"
              placeholder="Buscar imágenes..."
              aria-label="Buscar imágenes"
            />
          </Form>
        </Formik>
      </header>
      
      <div className="container">
        {loading && <div className="loading">Buscando imágenes...</div>}
        
        {error && <div className="error">{error}</div>}
        
        {!loading && !error && hasSearched && photos.length === 0 && (
          <div className="no-results">No se encontraron resultados</div>
        )}
        
        <div className="center">
          {photos.map(photo => (
            <article 
              key={photo.id} 
              onClick={() => open(photo.links.html)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && open(photo.links.html)}
            >
              <img 
                src={photo.urls.regular} 
                alt={photo.description || photo.alt_description || 'Imagen de Unsplash'}
                loading="lazy"
              />
              <p>{[photo.description, photo.alt_description].filter(Boolean).join(' - ')}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App