import './App.css';
import { useSelector } from 'react-redux';
import Interface from './CrudApp/Ui/Interface';
import AdduserForm from './CrudApp/Ui/AdduserForm';
import Edituser from "./CrudApp/Ui/EdituserForm";
function App() {
  const {showAadd_Form,showEdit_Form}=useSelector(state=>state.users);
  return (
    <div className="App">
      {showAadd_Form?<AdduserForm/>:false}
      {showEdit_Form?<Edituser/>:false}
      <Interface/>
    </div>
  );
}

export default App;
