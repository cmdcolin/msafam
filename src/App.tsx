import { useEffect, useState } from 'react'

import { createJBrowseTheme } from '@jbrowse/core/ui/theme'
import { ThemeProvider } from '@mui/material/styles'
import { observer } from 'mobx-react'

import GeneTreeId from './GeneTreeId'
import Header from './Header'
import TreeFamId from './TreeFamId'
import { getUrlParams as getUrlParameters, updateUrlParams as updateUrlParameters } from './urlParams'

const App = observer(function () {
  const urlParameters = getUrlParameters()
  const [value, setValue] = useState(urlParameters.id)
  const [id, setId] = useState(urlParameters.id)
  const [type, setType] = useState<'treeFam' | 'geneTree'>(urlParameters.type)

  useEffect(() => {
    updateUrlParameters(type, id)
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
