import { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { createJBrowseTheme } from '@jbrowse/core/ui/theme'
import { ThemeProvider } from '@mui/material/styles'

import Button from './Button'
import Link from './Link'
import GeneTreeId from './GeneTreeId'
import TreeFamId from './TreeFamId'
import { getUrlParams, updateUrlParams } from './urlParams'

const map = {
  treeFam: 'TreeFam',
  geneTree: 'GeneTree',
} as const

const App = observer(function () {
  const urlParams = getUrlParams()
  const [val, setVal] = useState(urlParams.id)
  const [id, setId] = useState(urlParams.id)
  const [type, setType] = useState<'treeFam' | 'geneTree'>(urlParams.type)

  useEffect(() => {
    updateUrlParams(type, id)
  }, [type, id])

  return (
    <div>
      <div className="m-2 p-2">
        <div>
          <div className="m-2">
            <div>
              <input
                id="genetree"
                type="radio"
                checked={type === 'geneTree'}
                value="geneTree"
                onChange={event => {
                  // @ts-expect-error
                  setType(event.target.value)
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
                  // @ts-expect-error
                  setType(event.target.value)
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
        {id ? (
          type === 'geneTree' ? (
            <GeneTreeId geneTreeId={id} />
          ) : (
            <TreeFamId treeFamId={id} />
          )
        ) : null}
      </div>
    </div>
  )
})

export default function MainApp() {
  const theme = createJBrowseTheme()
  return (
    <ThemeProvider theme={theme}>
      <App />
      <div style={{ height: 300 }} />
    </ThemeProvider>
  )
}
