import Button from './Button'
import Link from './Link'

const map = {
  treeFam: 'TreeFam',
  geneTree: 'GeneTree',
} as const

function Header({
  type,
  setType,
  val,
  setVal,
  id,
  setId,
}: {
  type: 'treeFam' | 'geneTree'
  setType: (type: 'treeFam' | 'geneTree') => void
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
              setType(event.target.value as 'treeFam')
              setVal('')
              setId('')
            }}
          />
          <label htmlFor="treefam">TreeFam (historical)</label>
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
              if (type === 'treeFam') {
                setVal('TF105041')
                setId('TF105041')
              } else {
                setVal('ENSGT00390000003602')
                setId('ENSGT00390000003602')
              }
            }}
          >
            Example
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
            ) : (
              <Link href={`http://www.treefam.org/family/${id}`}>
                See {id} at TreeFam
              </Link>
            )
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Header
