const COHERE_API_URL = 'https://api.cohere.ai'
const COHERE_API_GENERATE_URL = COHERE_API_URL + '/generate'

const getPetNames = async (pet, suggestions) => {
  let prompt = `Generate a list of twelve names for a ${pet.gender} ${pet.name}.`
  const characteristics =
    suggestions.characteristics.length > 0
      ? `\nThe names characteristics are ${suggestions.characteristics.map(
          ({ value }) => value
        )}.`
      : ''
  const references =
    suggestions.references.length > 0
      ? `\nMake only three of the names will be inspired on ${suggestions.references.map(
          ({ value }) => value
        )}.`
      : ''

  const includes =
    suggestions.includes.length > 0
      ? `\nMake Only three of the names must include the word ${suggestions.includes.map(
          ({ value }, index) => (index === 0 ? value : `, ${value}`)
        )}.`
      : ''

  prompt += characteristics + references + includes

  const parameters = {
    model: 'command-xlarge-nightly',
    prompt: prompt,
    max_tokens: 110,
    temperature: 1,
    k: 0,
    p: 1,
    frequency_penalty: 0.8,
    presence_penalty: 0.3,
    stop_sequences: ['--'],
    return_likelihoods: 'NONE',
  }

  const response = await fetch(COHERE_API_GENERATE_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_COHERE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parameters),
  }).then((res) => res.json())
  return response.text
    .split('\n')
    .filter((name) => name)
    .map((name) => {
      const match = name.match(/\d+\.(.*)/)
      if (match) {
        return match[1].trim()
      }
    })
}

const namerService = { getPetNames }
export default namerService
