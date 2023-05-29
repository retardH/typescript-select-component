import { useState } from 'react'
import Select, { SelectOption } from './components/Select'
const options = [
  {
    label: 'first',
    value: 1,
  },
  {
    label: 'second',
    value: 2,
  },
  {
    label: 'third',
    value: 3,
  },
  {
    label: 'fourth',
    value: 4,
  },
  {
    label: 'fifth',
    value: 5,
  },
  {
    label:'sixth',
    value: 6,
  },
  {
    label:'seventh',
    value: 7,
  },
  {
    label: 'eighth',
    value: 8,
  },
  {
    label: 'ninth',
    value: 9,
  },
  {
    label: 'tenth',
    value: 10,
  }
]
function App() {
  const [value, setValue] = useState<SelectOption | undefined>(options[0])
  const [value1, setValue1] = useState<SelectOption[]>([]);
  return (
    <>
      <Select  multiple={false} options={options} value={value} onChange={o => setValue(o)}/>
      <br/>
      <br/>
      <Select multiple={true} options={options} value={value1} onChange={o => setValue1(o)}/>

    </>
  )
}

export default App;
