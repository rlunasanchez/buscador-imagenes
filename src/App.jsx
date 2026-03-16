import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import './header.css'
import './content.css'
import './article.css'

const tecnologias = [
  { nombre: 'React', descripcion: 'Biblioteca JavaScript para construir interfaces de usuario' },
  { nombre: 'Vite', descripcion: 'Build tool rápida para proyectos web modernos' },
  { nombre: 'Formik', descripcion: 'Biblioteca para manejar formularios en React' },
  { nombre: 'Unsplash API', descripcion: 'API para acceder a imágenes de alta calidad' },
  { nombre: 'CSS3', descripcion: 'Estilos modernos con flexbox, gradientes y animaciones' },
  { nombre: 'JavaScript ES6+', descripcion: 'Características modernas del lenguaje JavaScript' },
]

const App = () => {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [mostrarTecnologias, setMostrarTecnologias] = useState(false)

  const open = url => window.open(url, '_blank', 'noopener,noreferrer')

  return (
    <div>
      {mostrarTecnologias && (
        <div className="modal-overlay" onClick={() => setMostrarTecnologias(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Tecnologías del Proyecto</h2>
            <ul className="tech-list">
              {tecnologias.map((tech, index) => (
                <li key={index}>
                  <strong>{tech.nombre}</strong>
                  <p>{tech.descripcion}</p>
                </li>
              ))}
            </ul>
            <button className="modal-close" onClick={() => setMostrarTecnologias(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      <header>
        <h1>Buscador de Imágenes</h1>
        <button 
          className="tech-button" 
          onClick={() => setMostrarTecnologias(true)}
          aria-label="Ver tecnologías del proyecto"
        >
          Tecnologías
        </button>
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
              placeholder="¿Qué imágenes buscas?..."
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

      <footer>
        <p>Derechos reservados Rodrigo Luna 2026</p>
      </footer>
    </div>
  )
}

export default App