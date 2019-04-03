import { Termlist } from './Termlist'

export default function(t) {
  const TERMS = Termlist

  return TERMS[t] || `(no definition found)`

}
