/* 
* Pour faire des imports absolus :

https://medium.com/geekculture/making-life-easier-with-absolute-imports-react-in-javascript-and-typescript-bbdab8a8a3a1*/

import 'App.css';
//import Header from 'components/Header';
import Menu from 'components/Menu';
import Contenu from 'components/Contenu';
import ModalProfil from 'components/ModalProfil';
import Basket from 'components/Basket';
import { useSelector, useDispatch } from 'react-redux'

import { signOut } from 'redux/actions/auth.actions'

import "bootstrap/dist/css/bootstrap.min.css";

import eventBus from "common/EventBus"
import { useState, useEffect, useCallback } from 'react'

function App() {

  const [query, setQuery] = useState('');

  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch()

  const logOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard(currentUser.role === "admin");
      // setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
    else {
      setShowAdminBoard(false);
    }

    eventBus.on("logout", () => {
      logOut();
    });

    return () => {
      eventBus.remove("logout");
    };

  }, [currentUser, logOut]);

  // document.addEventListener('click', function (e) {

  //   if (e.target.tagName === 'BUTTON') {
  //     document.activeElement.blur();
  //   }
  // });

  return (

    <div className="App">
      {/* <Header
        titre="Buy me if U can"
        img="https://i.pinimg.com/236x/56/21/91/562191ddb927e72259844a2df5578d8a.jpg"
        logo="https://logo-marque.com/wp-content/uploads/2020/11/Best-Buy-Co.Superstores-Logo-1983-1984.png"
      /> */}
      {/* <Menu query={query} setQuery={setQuery} /> */}
      <Menu query={query} setQuery={setQuery} showAdminBoard={showAdminBoard} currentUser={currentUser}/>
      <Contenu query={query} />
      <Basket />
      <ModalProfil />
    </div>
  );
}

export default App;

///////////////////////////////////////////////////////////////////
//////////////////////AUTRE SYNTAXE //////////////////////////////
//////////////////////////////////////////////////////////////////

// import 'App.css';
// import Header from 'components/Header';
// import Menu from 'components/Menu';
// import Contenu from 'components/Contenu';
// import { loadProducts } from 'redux/actions/actions'
// import { connect } from 'react-redux'

// function ConnectedApp({ loadProducts }) {

//   loadProducts('./produits.json');

//   return (
//     <div className="App">
//       <Header
//         titre="Buy me if U can"
//         img="https://i.pinimg.com/236x/56/21/91/562191ddb927e72259844a2df5578d8a.jpg"
//         logo="https://logo-marque.com/wp-content/uploads/2020/11/Best-Buy-Co.Superstores-Logo-1983-1984.png"
//       />
//       <Menu />
//       <Contenu />
//     </div>
//   );
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loadProducts: (item) => dispatch(loadProducts(item))
//   }
// }

// const App = connect(null, mapDispatchToProps)(ConnectedApp)

// export default App;