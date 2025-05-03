import { ErrorMessage } from '@jbrowse/core/ui'
import useSWR from 'swr'

import ReactMSAView from './ReactMSAView'
import { treeFamFetcher } from './treeFamUtils'

type Ret = Awaited<ReturnType<typeof treeFamFetcher>>

export default function TreeFamId({ treeFamId }: { treeFamId: string }) {
  const { data, isLoading, error } = useSWR<Ret, unknown>(
    treeFamId,
    treeFamFetcher,
  )
  return error ? (
    <ErrorMessage error={error} />
  ) : isLoading ? (
    <div>Loading...</div>
  ) : data ? (
    <ReactMSAView msa={data.msa} tree={data.tree} />
  ) : null
}
