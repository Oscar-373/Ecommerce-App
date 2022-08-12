import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home, Login, Purchases, ProductDetail } from './pages'
import { NavBar, LoadingScreen, ProtectedRoutes, Footer } from './components'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'

function App() {

 const isLoading = useSelector(state => state.isLoading)

  return (
    <HashRouter>
        <NavBar />
        { isLoading && <LoadingScreen /> }
        <Container className='mt-3' style={{ background:"rgb(175, 238, 238)"}}>
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/login' element={ <Login /> } />
            <Route element={ <ProtectedRoutes /> }>
              <Route path='/purchases' element={ <Purchases /> } />
            </Route>
            <Route path='/products/:id' element={ <ProductDetail /> } />
          </Routes>
        </Container>
        <Footer />
    </HashRouter>
  )
}

export default App
