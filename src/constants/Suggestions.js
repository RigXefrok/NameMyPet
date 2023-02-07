export const SUGGESTION_TYPES = {
  characteristic: {
    type: 'characteristic',
    color: 'bg-suggestion-c',
    border: 'border-suggestion-c',
  },
  reference: {
    type: 'reference',
    color: 'bg-suggestion-r',
    border: 'border-suggestion-r',
  },
  similar: {
    type: 'similar',
    color: 'bg-suggestion-s',
    border: 'border-suggestion-s',
  },
}

export const SUGGESTIONS_LIMITS = {
  characteristic: 5,
  reference: 1,
  similar: 1,
}

export const INITIAL_SUGGESTIONS = [
  {
    type: SUGGESTION_TYPES.characteristic,
    value: 'likes bananas',
  },
  {
    type: SUGGESTION_TYPES.reference,
    value: 'pokemon',
  },
  {
    type: SUGGESTION_TYPES.similar,
    value: 'mon',
  },
]
