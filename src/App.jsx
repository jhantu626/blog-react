import { useEffect, useState } from 'react'
import './App.css'
import { Header,Footer,LoadingScreen } from './components'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from './app/authSlice'

const App = () => {
  const [loading,setLoading]=useState(true);
  const dispatch=useDispatch();


  useEffect(()=>{
    
    authService.getCurrentUser()
      .then((userData)=>{
        if(userData){
          dispatch(login({userData}));
        }else{
          dispatch(logout());
        }        
      }).finally(()=>setLoading(false));
  },[])

  console.log(loading);
  return !loading?(
    <>
      <div className='min-h-screen min-w-full flex flex-wrap content-betwee bg-green-100 rounded-md'>
        <div className='w-full block'>
          <Header/>
          <main>
            {/* <Outlet/> */}
          </main>
          <Footer/>
        </div>
      </div>
    </>
  ):(
    <>
      <LoadingScreen/>
    </>
  );
}

export default App