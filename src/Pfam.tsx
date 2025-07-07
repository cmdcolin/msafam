import { ErrorMessage } from '@jbrowse/core/ui'
import useSWR from 'swr'

import ReactMSAView from './ReactMSAView'
import { pfamFetcher } from './pfamUtils'

type Ret = Awaited<ReturnType<typeof pfamFetcher>>

export default function Pfam({ pfamId }: { pfamId: string }) {
  const { data, isLoading, error } = useSWR<Ret, unknown>(pfamId, pfamFetcher)

  return error ? (
    <ErrorMessage error={error} />
  ) : isLoading ? (
    <div>Loading...</div>
  ) : data ? (
    <ReactMSAView msa={data.msa} tree={data.tree} />
  ) : null
}
