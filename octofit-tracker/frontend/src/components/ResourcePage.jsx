import { useEffect, useState } from 'react'
import { API_BASE_URL, fetchCollection } from '../api.js'

function formatValue(value) {
  if (value === null || value === undefined || value === '') return '—'
  if (Array.isArray(value)) return value.map(formatValue).join(', ')
  if (typeof value === 'object') {
    return value.name ?? value.username ?? value.title ?? value._id ?? '—'
  }
  return String(value)
}

export default function ResourcePage({ resource, title, description, columns }) {
  const [collection, setCollection] = useState(null)
  const [error, setError] = useState('')
  const [pageUrl, setPageUrl] = useState(null)
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setCollection(null)
    setError('')

    fetchCollection(resource, pageUrl, controller.signal)
      .then(setCollection)
      .catch((requestError) => {
        if (!controller.signal.aborted) setError(requestError.message)
      })

    return () => controller.abort()
  }, [pageUrl, reloadCount, resource])

  const isLoading = collection === null && !error
  const endpoint = `${API_BASE_URL}/${resource}/`

  return (
    <section className="resource-page" aria-labelledby={`${resource}-title`}>
      <div className="page-topline">
        <div>
          <p className="page-eyebrow">OCTOFIT / {resource.toUpperCase()}</p>
          <h1 className="page-title" id={`${resource}-title`}>{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <button
          className="refresh-button"
          type="button"
          onClick={() => setReloadCount((count) => count + 1)}
          disabled={isLoading}
        >
          Refresh
        </button>
      </div>

      <div className="list-toolbar">
        <span className="endpoint-label"><span>GET</span> {endpoint}</span>
        <span>{collection ? `${collection.count} records` : isLoading ? 'Loading' : 'Unavailable'}</span>
      </div>

      <div className="table-frame">
        <table className="resource-table">
          <thead>
            <tr>
              {columns.map((column) => <th key={column.label} scope="col">{column.label}</th>)}
            </tr>
          </thead>
          <tbody aria-live="polite">
            {isLoading && (
              <tr><td className="table-message" colSpan={columns.length}>Loading records...</td></tr>
            )}
            {error && (
              <tr><td className="table-message error" colSpan={columns.length}>{error}</td></tr>
            )}
            {collection?.items.length === 0 && (
              <tr><td className="table-message" colSpan={columns.length}>No records found.</td></tr>
            )}
            {collection?.items.map((item, index) => (
              <tr key={item._id ?? item.id ?? `${resource}-${index}`}>
                {columns.map((column, columnIndex) => {
                  const value = column.render ? column.render(item[column.key], item) : item[column.key]
                  const className = columnIndex === 0 ? 'primary-cell' : 'subtle-cell'
                  return <td className={className} key={column.label}>{formatValue(value)}</td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {collection && (
        <footer className="table-footer">
          <span>{collection.count} total</span>
          {(collection.previousUrl || collection.nextUrl || collection.page) && (
            <div className="pagination-controls">
              <button
                className="page-button"
                type="button"
                onClick={() => setPageUrl(collection.previousUrl)}
                disabled={!collection.previousUrl}
              >
                Previous
              </button>
              <span className="pagination-label">{collection.page ? `PAGE ${collection.page}` : 'PAGES'}</span>
              <button
                className="page-button"
                type="button"
                onClick={() => setPageUrl(collection.nextUrl)}
                disabled={!collection.nextUrl}
              >
                Next
              </button>
            </div>
          )}
        </footer>
      )}
    </section>
  )
}