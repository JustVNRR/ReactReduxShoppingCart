import './Caddie.css'
import { FaShoppingCart } from "react-icons/fa";
import { Button } from 'react-bootstrap';

const Caddie = ({ quantite, showHide }) => {

    return (
        <>
            <Button variant="link position-relative" onClick={() => showHide()}>
                <FaShoppingCart color="white" fontSize="2em" />
                {quantite > 0 && (<span className='item__count'>{quantite}</span>)}
            </Button>
        </>
    )
}
export default Caddie