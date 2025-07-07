/**
 * Converts an Ensembl Gene ID to UniProt IDs using the UniProt SPARQL endpoint.
 *
 * @param {string} ensemblGeneId - The Ensembl Gene ID to convert.
 * @returns {Promise<Array<{id: string, name: string}>} - A promise that resolves to an array of objects,
 * where each object contains the UniProt ID and name.  Returns an empty array on error
 * or if no UniProt IDs are found.
 */
async function getUniprotIdsFromEnsemblGeneId(ensemblGeneId: string) {
  const sparqlQuery = `
        PREFIX up: <http://purl.uniprot.org/core/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

        SELECT ?uniprot_id ?uniprot_name
        WHERE {
          ?gene up:database <http://purl.uniprot.org/database/ENSEMBL>;
                up:identifier "${ensemblGeneId}" .
          ?protein up:encodedBy ?gene .
          ?protein rdfs:seeAlso ?uniprot_resource .
          ?uniprot_resource up:database <http://purl.uniprot.org/database/UniProtKB> ;
                            up:identifier ?uniprot_id .
          ?uniprot_entry rdfs:seeAlso ?uniprot_resource ;
                       rdfs:label ?uniprot_name .
        }
    `

  const endpointUrl = 'https://sparql.uniprot.org/'
  const queryUrl = `${endpointUrl}?query=${encodeURIComponent(sparqlQuery)}&format=json`

  try {
    const response = await fetch(queryUrl)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    console.log({ data })
    const results = data.results.bindings

    // Map the results into a more usable format.  Handles empty results.
    return results
      .map(item => ({
        id: item.uniprot_id?.value || '',
        name: item.uniprot_name?.value || '',
      }))
      .filter(item => item.id !== '') // Filter out any empty results
  } catch (error) {
    console.error('Error fetching UniProt IDs:', error)
    return [] // Return an empty array on error, so the caller doesn't have to check for null/undefined.
  }
}

/**
 * Example usage of the getUniprotIdsFromEnsemblGeneId function.
 */
async function exampleUsage() {
  const ensemblGeneId = 'ENSG00000139618' // Example: BRCA1 gene
  const uniprotIds = await getUniprotIdsFromEnsemblGeneId(ensemblGeneId)

  if (uniprotIds.length > 0) {
    console.log(`UniProt IDs for Ensembl Gene ID ${ensemblGeneId}:`)
    uniprotIds.forEach(protein => {
      console.log(`  ID: ${protein.id}, Name: ${protein.name}`)
    })
  } else {
    console.log(`No UniProt IDs found for Ensembl Gene ID ${ensemblGeneId}`)
  }

  // Example of a gene that might not have a direct mapping.
  const anotherEnsemblGeneId = 'ENSG00000279271'
  const anotherUniprotIds =
    await getUniprotIdsFromEnsemblGeneId(anotherEnsemblGeneId)
  if (anotherUniprotIds.length > 0) {
    console.log(`UniProt IDs for Ensembl Gene ID ${anotherEnsemblGeneId}:`)
    anotherUniprotIds.forEach((protein: { id: string; name: string }) => {
      console.log(`  ID: ${protein.id}, Name: ${protein.name}`)
    })
  } else {
    console.log(
      `No UniProt IDs found for Ensembl Gene ID ${anotherEnsemblGeneId}`,
    )
  }
}

// Run the example usage function.
exampleUsage()
