import { useState } from 'react'

import { createJBrowseTheme } from '@jbrowse/core/ui/theme'
import { ThemeProvider } from '@mui/material/styles'
import { observer } from 'mobx-react'
import { useQueryState } from 'nuqs'

import GeneTreeId from './EnsemblGeneTree'
import Header from './Header'
import TreeFamId from './TreeFamId'
import Pfam from './Pfam'

const App = observer(function () {
  const [id, setId] = useQueryState('id', { defaultValue: '' })
  const [value, setValue] = useState(id)
  const [type, setType] = useQueryState('type', {
    defaultValue: 'treeFam' as 'treeFam' | 'geneTree' | 'pfam',
    parse: value =>
      value === 'geneTree' ? 'geneTree' : value === 'pfam' ? 'pfam' : 'treeFam',
  })

  return (
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
        ) : type === 'treeFam' ? (
          <TreeFamId treeFamId={id} />
        ) : (
          <Pfam pfamId={id} />
        )
      ) : null}
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
