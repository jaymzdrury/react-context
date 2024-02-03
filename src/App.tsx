import createFastContext from "./createFastContext"

const { Provider, useStoreHook } = createFastContext({first: '', second: ''})

const Display = ({name}:{name: 'first' | 'second'}) => {
  const [value] = useStoreHook((store) => store[name])
  return <p>{value}</p>
}

const Input = ({name}:{name: 'first' | 'second'}) => {
  const [value, setValue] = useStoreHook((store) => store[name])
  return (
    <input 
      type="text" 
      value={value} 
      onChange={e => setValue({[name]: e.target.value})} 
    />
  )
}

const InnerContainer = () => {
  return (
    <div style={{border: '1px solid black', padding: '12px'}}>
      InnerContainer
      <br />
      <Input name="first" />
      <Display name="first" />
      <Input name="second" />
      <Display name="second" />
    </div>
  )
}

const Container = ({children}:{children: React.ReactNode}) => {
  return (
    <div style={{border: '1px solid black', padding: '12px'}}>
      Container
      {children}
    </div>
  )
}

function App() {
  return (
    <div style={{border: '1px solid black', padding: '12px'}}>
      App
      <Provider>
        <Container>
          <InnerContainer />
        </Container>
      </Provider>
    </div>
  )
}

export default App
