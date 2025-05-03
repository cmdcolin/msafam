import { ErrorMessage } from '@jbrowse/core/ui'
import useSWR from 'swr'

import ReactMSAView from './ReactMSAView'
import { geneTreeFetcher } from './ensemblGeneTreeUtils'

export default function GeneTreeId({ geneTreeId }: { geneTreeId: string }) {
  const { data, isLoading, error } = useSWR(geneTreeId, geneTreeFetcher)
  return error ? (
    <ErrorMessage error={error} />
  ) : isLoading ? (
    <div>Loading...</div>
  ) : data ? (
    <ReactMSAView
      msa={data.msa}
      tree={data.tree}
      treeMetadata={data.treeMetadata}
    />
  ) : null
}
