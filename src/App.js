import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddPet from './components/AddPet';
import PetsList from './components/PetsList'
import UpadtePet from './components/UpdatePet';
import AddSeller from './components/AddSeller';
import SellerList from './components/SellerList'
import UpdateSeller from './components/UpdateSeller';
import Signup from './components/Signup';
import Login from './components/Login';

const myRouter = createBrowserRouter([
  {path:'signup', Component:Signup},
  {path:'login', Component:Login},
  {path:'dashboard', Component:Dashboard, children:[
    {path:'', Component:PetsList},
    {path:'addpet', Component:AddPet},
    {path:'petslist', Component:PetsList},
    {path:'updatepet', Component:UpadtePet},
    {path:'addseller', Component:AddSeller},
    {path:'sellerlist', Component:SellerList},
    {path:'updateseller', Component:UpdateSeller}
  ]}
])

function App() {
  return (
    <div>
      <RouterProvider router={myRouter}/>
    </div>
  );
}

export default App;
