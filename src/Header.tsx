import Button from './Button'
import Link from './Link'

import type { MSATYPE } from './types'

const map = {
  treeFam: 'TreeFam',
  geneTree: 'GeneTree',
  pfam: 'PFAM',
} as const

const examples = {
  pfam: {
    id: 'PF02171.23',
    description: 'Piwi domain',
  },
  treeFam: {
    id: 'TF105041',
    description: 'BRCA2',
  },
  geneTree: {
    id: 'ENSGT00390000003602',
    description: 'BRCA2',
  },
}

function Header({
  type,
  setType,
  val,
  setVal,
  id,
  setId,
}: {
  type: MSATYPE
  setType: (type: MSATYPE) => void
  val: string
  setVal: (value: string) => void
  id: string
  setId: (id: string) => void
}) {
  return (
    <div>
      <div className="m-2">
        <div>
          <input
            id="genetree"
            type="radio"
            checked={type === 'geneTree'}
            value="geneTree"
            onChange={event => {
              setType(event.target.value as 'geneTree')
              setVal('')
              setId('')
            }}
          />
          <label htmlFor="genetree">Ensembl Compara GeneTree</label>
        </div>
        <div>
          <input
            id="treefam"
            type="radio"
            checked={type === 'treeFam'}
            value="treeFam"
            onChange={event => {
              setType(event.target.value as 'treeFam' | 'pfam')
              setVal('')
              setId('')
            }}
          />
          <label htmlFor="treefam">TreeFam (historical)</label>
        </div>
        <div>
          <input
            id="pfam"
            type="radio"
            checked={type === 'pfam'}
            value="pfam"
            onChange={event => {
              setType(event.target.value as 'pfam')
              setVal('')
              setId('')
            }}
          />
          <label htmlFor="pfam">Pfam</label>
        </div>
        <div>
          <label htmlFor="query">Enter {map[type]} ID: </label>
          <input
            id="query"
            className="bg-gray-200 shadow border rounded"
            type="text"
            value={val}
            onChange={event => {
              setVal(event.target.value)
              setId('')
            }}
          />

          <Button
            onClick={() => {
              setVal(examples[type].id)
              setId(examples[type].id)
            }}
          >
            Example ({examples[type].id} {examples[type].description})
          </Button>
          <Button
            onClick={() => {
              setId(val)
            }}
          >
            Submit
          </Button>
          {id ? (
            type === 'geneTree' ? (
              <Link
                href={`https://useast.ensembl.org/Multi/GeneTree/Image?gt=${id}`}
              >
                See {id} at Ensembl
              </Link>
            ) : type === 'treeFam' ? (
              <Link href={`http://www.treefam.org/family/${id}`}>
                See {id} at TreeFam
              </Link>
            ) : type === 'pfam' ? (
              <Link
                href={`https://www.ebi.ac.uk/interpro/entry/pfam/${id.split('.')[0]}`}
              >
                See {id} at PFAM
              </Link>
            ) : null
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Header
