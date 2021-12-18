import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import Home from './components/Home'
import Login from './components/Login'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import MealItems from './components/MealItems'


function App() {
   

    return (
        <BrowserRouter>
        <div className="App">
            <Routes>
                <Route path = '/*' element = {<Home/>} >
                    <Route index element = {<MealItems/>}/>
                </Route>
                <Route path = '/login' element = {<Login/>} />
                <Route path = '/register' element = {<Register/>} />
                <Route path = '/forgotpassword' element = {<ForgotPassword/>} />
                <Route path = '/resetpassword/:name' element = {<ResetPassword/>} />
            </Routes>
        </div>
        </BrowserRouter>
    );
}

export default App;
