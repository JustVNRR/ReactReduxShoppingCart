import Caddie from "./Caddie"
import NavUSer from "./NavUser"
import { Link } from 'react-router-dom'

import { showHideModale } from 'redux/actions/produits.actions'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav, FormControl, ButtonGroup } from 'react-bootstrap'
import './Menu.css'
import { AiFillHome } from "react-icons/ai";
import { ImUsers } from "react-icons/im";
import { MdOutlineSearchOff } from "react-icons/md";

const Menu = ({ query, setQuery, showAdminBoard, user }) => {


    const quantite = useSelector((state) => state.productReducer.basket)
        .reduce((accumulator, item) => accumulator + item.quantite, 0);

    const dispatch = useDispatch();

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                <div className="wrapper">
                    <div className="nav-menu">
                        <Nav.Link as={Link} to="/"><AiFillHome color="white" fontSize="2em" /></Nav.Link>
                        {showAdminBoard &&
                            <Nav.Link as={Link} to="/users"><ImUsers color="white" fontSize="2em" /></Nav.Link>
                        }
                    </div>
                    <div className="nav-search">
                        <ButtonGroup id="search-group" className="mx-auto">
                            <FormControl
                                type="search"
                                className="m-auto "
                                aria-label="Search"
                                value={query}
                                onChange={(e) => { setQuery(e.target.value) }}
                            />
                            {query.length > 0 && <span id="searchclear" onClick={(e) => { setQuery("") }}><MdOutlineSearchOff color="red" fontSize="1.5em" /></span>}
                        </ButtonGroup>
                    </div>
                    <div className="nav-caddie">
                        {!showAdminBoard &&
                            <Nav>
                                <Caddie quantite={quantite} showHide={() => { dispatch(showHideModale()) }} />
                            </Nav>
                        }
                        <NavUSer />
                    </div>
                </div>
            </Navbar>

            {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                <Container fluid>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            {"admin" === role &&
                                <Nav.Link as={Link} to="/users">Users</Nav.Link>
                            }
                        </Nav>
                        <FormControl
                            type="search"
                            className="m-auto w-50"
                            aria-label="Search"
                            value={query}
                            onChange={(e) => { setQuery(e.target.value) }}
                        />
                    </Navbar.Collapse>
                    {"admin" !== role &&
                        <Nav>
                            <Caddie quantite={quantite} showHide={() => { dispatch(showHideModale()) }} />
                        </Nav>}
                    <NavUSer />
                </Container>
            </Navbar> */}
        </>
    )
}

export default Menu

