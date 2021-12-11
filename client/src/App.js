import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import Home from './components/Home'
import Login from './components/Login'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import MealItems from './components/MealItems'
import GoalItems from './components/GoalItems' 
import TaskItems from './components/TaskItems'
import CalendarItems from './components/CalendarItems'
import UserItems from './components/UserItems'
import ScreenItems from './components/ScreenItems'


function App() {
   

    return (
        <BrowserRouter>
        <div className="App">
            <Routes>
                <Route path = '/*' element = {<Home/>} >
                    <Route path = ''element = {<MealItems/>}/>
                    <Route path = 'meal'element = {<MealItems/>}/>
                    <Route path = 'menu'element = {<MealItems/>}/>
                    <Route path = 'goal'element = {<GoalItems/>}/>
                    <Route path = 'calendar'element = {<CalendarItems/>}/>
                    <Route path = 'task'element = {<TaskItems/>}/>
                    <Route path = 'user'element = {<UserItems/>}/>
                    <Route path = 'screen'element = {<ScreenItems/>}/>
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
