import { Instance, types } from 'mobx-state-tree'
import { MSAModelF } from 'react-msaview'

const App = types.model({
  msaview: MSAModelF(),
})

export default App
export type AppModel = Instance<typeof App>
