//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import './NavUser.css';
import { showHideModale } from 'redux/actions/auth.actions'
import { Button } from 'react-bootstrap'

const NavUSer = () => {

    // const user = useSelector((state) => state.userReducer.pseudo);
    // const avatar = useSelector((state) => state.userReducer.avatar);

    const { user: currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch()

    return (
        <>
            <Button variant="link text-light" onClick={() => { dispatch(showHideModale()) }}>
                <span >{!currentUser && "Sign In"}</span>
                {currentUser && currentUser.avatar && <img className="avatar mx-2" src={currentUser.avatar} alt="avatar" />}
            </Button>
        </>
    )
}

export default NavUSer