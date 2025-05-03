export function getUrlParams() {
  const searchParams = new URLSearchParams(window.location.search)
  const type = searchParams.get('type')
  const id = searchParams.get('id') ?? ''
  return {
    type: (type && (type === 'treeFam' || type === 'geneTree')
      ? type
      : 'geneTree'),
    id,
  }
}

export function updateUrlParams(type: 'treeFam' | 'geneTree', id: string) {
  const url = new URL(window.location.href)
  url.searchParams.set('type', type)
  if (id) {
    url.searchParams.set('id', id)
  } else {
    url.searchParams.delete('id')
  }
  window.history.pushState({}, '', url)
}
