import { unzipfetch } from './util'

export async function treeFamFetcher(id: string) {
  return id
    ? {
        msa: await unzipfetch(
          `https://jbrowse.org/demos/treefam_family_data/${id}.aln.emf.gz`,
        ),
        tree: await unzipfetch(
          `https://jbrowse.org/demos/treefam_family_data/${id}.nh.emf.gz`,
        ),
      }
    : undefined
}
