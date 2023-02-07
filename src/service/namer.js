const COHERE_API_URL = 'https://api.cohere.ai'
const COHERE_API_GENERATE_URL = COHERE_API_URL + '/generate'

const getPetNames = async (prompt) => {
  const parameters = {
    model: 'command-xlarge-nightly',
    prompt: prompt,
    max_tokens: 90,
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
  return response.text.split('\n').filter((name) => name)
}

const namerService = { getPetNames }
export default namerService
