async function jsonfetch(url: string, arg?: RequestInit) {
  const res = await fetch(url, arg)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} from ${url}: ${await res.text()}`)
  }
  return res.json() as Promise<unknown>
}

async function textfetch(url: string, arg?: RequestInit) {
  const res = await fetch(url, arg)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} from ${url}`)
  }
  return res.text()
}

interface TreeNode {
  children?: TreeNode[]
  sequence?: {
    mol_seq: {
      seq: string
      location?: string
    }
    id: {
      accession: string
    }[]
  }
  taxonomy: {
    common_name: string
    scientific_name: string
  }
}

interface Row {
  id: string
  seq: string
  species: string
  genomicLocString?: string
}

async function fetchWithLocalStorageCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
): Promise<T> {
  const cachedData = localStorage.getItem(key)

  if (cachedData) {
    try {
      return JSON.parse(cachedData) as T
    } catch (error) {
      console.error(`Error parsing cached data for ${key}:`, error)
      // Continue to fetch fresh data if parsing fails
    }
  }

  const data = await fetchFn()
  localStorage.setItem(key, JSON.stringify(data))
  return data
}

function gatherSequencesFromTree(tree: TreeNode, arr: Row[] = []): Row[] {
  if (tree.children) {
    for (const child of tree.children) {
      if (child.sequence) {
        const seq = child.sequence.mol_seq.seq
        const id = child.sequence.id[0]?.accession
        if (id) {
          arr.push({
            id,
            seq,
            species:
              child.taxonomy.common_name || child.taxonomy.scientific_name,
            genomicLocString: child.sequence.mol_seq.location,
          })
        }
      }
      gatherSequencesFromTree(child, arr)
    }
  }
  return arr
}
export async function geneTreeFetcher(id: string) {
  const msa = await fetchWithLocalStorageCache(
    `${id}-msa`,
    () =>
      jsonfetch(
        `https://rest.ensembl.org/genetree/id/${id}?content-type=application/json;aligned=1;sequence=pep`,
      ) as Promise<{ tree: TreeNode }>,
  )

  const tree = await fetchWithLocalStorageCache<string>(`${id}-tree`, () =>
    textfetch(
      `https://rest.ensembl.org/genetree/id/${id}?nh_format=simple;content-type=text/x-nh`,
    ),
  )

  const result = gatherSequencesFromTree(msa.tree)
  return {
    tree,
    msa: result.map(r => `>${r.id}\n${r.seq}`).join('\n'),
    treeMetadata: JSON.stringify(
      Object.fromEntries(
        result.map(r => [r.id, { genome: r.species }] as const),
      ),
    ),
  }
}
