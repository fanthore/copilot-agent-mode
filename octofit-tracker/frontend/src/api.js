const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const API_BASE_URL = `${apiOrigin}/api`

function extractItems(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return null

  for (const key of ['results', 'items', 'records', 'docs', 'data']) {
    const items = extractItems(payload[key])
    if (items) return items
  }

  return null
}

function findMetadata(payload, keys) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return undefined

  for (const key of keys) {
    if (payload[key] !== undefined) return payload[key]
  }

  for (const key of ['pagination', 'meta', 'data']) {
    const value = findMetadata(payload[key], keys)
    if (value !== undefined) return value
  }

  return undefined
}

function resolvePageUrl(value, requestUrl) {
  if (typeof value !== 'string' || value.length === 0) return null

  const url = new URL(value, requestUrl)
  if (url.origin !== new URL(API_BASE_URL).origin) return null
  return url.toString()
}

export function getCollectionUrl(resource, pageUrl) {
  const baseUrl = `${API_BASE_URL}/`
  const url = pageUrl ? new URL(pageUrl, baseUrl) : new URL(`${resource}/`, baseUrl)

  if (url.origin !== new URL(API_BASE_URL).origin) {
    throw new Error('The requested page is outside the configured API host.')
  }

  return url.toString()
}

export function normalizeCollection(payload, requestUrl) {
  const items = extractItems(payload)
  if (!items) {
    throw new Error('The API response did not contain a list of records.')
  }

  const count = findMetadata(payload, ['count', 'total', 'totalCount'])
  const page = findMetadata(payload, ['page', 'currentPage', 'current_page'])
  const next = findMetadata(payload, ['next', 'nextPage', 'next_page'])
  const previous = findMetadata(payload, ['previous', 'previousPage', 'previous_page'])

  return {
    items,
    count: Number.isFinite(Number(count)) ? Number(count) : items.length,
    page: Number.isFinite(Number(page)) ? Number(page) : null,
    nextUrl: resolvePageUrl(next, requestUrl),
    previousUrl: resolvePageUrl(previous, requestUrl),
  }
}

export async function fetchCollection(resource, pageUrl, signal) {
  const requestUrl = getCollectionUrl(resource, pageUrl)
  const response = await fetch(requestUrl, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}.`)
  }

  return normalizeCollection(await response.json(), requestUrl)
}