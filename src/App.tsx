import { useEffect, useState } from 'react'

import { createJBrowseTheme } from '@jbrowse/core/ui/theme'
import { ThemeProvider } from '@mui/material/styles'
import { observer } from 'mobx-react'

import GeneTreeId from './GeneTreeId'
import Header from './Header'
import TreeFamId from './TreeFamId'
import { getUrlParams, updateUrlParams } from './urlParams'

const App = observer(function () {
  const urlParams = getUrlParams()
  const [value, setValue] = useState(urlParams.id)
  const [id, setId] = useState(urlParams.id)
  const [type, setType] = useState<'treeFam' | 'geneTree'>(urlParams.type)

  useEffect(() => {
    updateUrlParams(type, id)
  }, [type, id])

  return (
    <div>
      <div className="m-2 p-2">
        <Header
          type={type}
          setType={setType}
          id={id}
          setId={setId}
          val={value}
          setVal={setValue}
        />
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
