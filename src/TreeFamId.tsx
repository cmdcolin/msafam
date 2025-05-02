import { ErrorMessage } from '@jbrowse/core/ui'
import ReactMSAView from './ReactMSAView'
import { treeFamFetcher } from './treeFamUtils'
import useSWR from 'swr'

export default function TreeFamId({ treeFamId }: { treeFamId: string }) {
  const { data, isLoading, error } = useSWR(treeFamId, treeFamFetcher)
  return error ? (
    <ErrorMessage error={error} />
  ) : isLoading ? (
    <div>Loading...</div>
  ) : data ? (
    <ReactMSAView msa={data.msa} tree={data.tree} />
  ) : null
}
