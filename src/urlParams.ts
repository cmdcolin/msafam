export function getUrlParams() {
  const searchParams = new URLSearchParams(window.location.search)
  const type = searchParams.get('type') as 'geneTree' | 'treeFam' | 'pfam' | null
  const id = searchParams.get('id') ?? ''
  return {
    type:
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      type && (type === 'treeFam' || type === 'geneTree' || type === 'pfam') ? type : 'geneTree',
    id,
  }
}

export function updateUrlParams(type: 'treeFam' | 'geneTree' | 'pfam', id: string) {
  const url = new URL(window.location.href)
  url.searchParams.set('type', type)
  if (id) {
    url.searchParams.set('id', id)
  } else {
    url.searchParams.delete('id')
  }
  window.history.pushState({}, '', url)
}
