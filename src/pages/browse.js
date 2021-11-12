import React from 'react'
import {useContent} from '../hooks'
import selectionFilter from '../utils/selection-filter'

export default function Browse() {
  const {series} = useContent('series')
  const {films} = useContent('films')

  const sildes = selectionFilter({series, films})
  
  return (
    <p>
      Hello from the Browse
    </p>
  )
}