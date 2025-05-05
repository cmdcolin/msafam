import { useState } from 'react'

import { createJBrowseTheme } from '@jbrowse/core/ui/theme'
import { ThemeProvider } from '@mui/material/styles'
import { observer } from 'mobx-react'
import { useQueryState } from 'nuqs'

import GeneTreeId from './GeneTreeId'
import Header from './Header'
import TreeFamId from './TreeFamId'

const App = observer(function () {
  const [id, setId] = useQueryState('id', { defaultValue: '' })
  const [value, setValue] = useState(id)
  const [type, setType] = useQueryState('type', {
    defaultValue: 'treeFam' as 'treeFam' | 'geneTree',
    parse: value => (value === 'geneTree' ? 'geneTree' : 'treeFam'),
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
        ) : (
          <TreeFamId treeFamId={id} />
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
