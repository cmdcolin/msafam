import { textfetch } from './util'

const msaBase = 'https://jbrowse.org/demos/pfam/seed'
const treeBase = 'https://jbrowse.org/demos/pfam/trees'

export async function pfamFetcher(id: string) {
  const msa = await textfetch(`${msaBase}/${id}.txt`)
  const tree = await textfetch(`${treeBase}/${id.split('.')[0]}.tree`)

  return {
    msa,
    tree,
  }
}
