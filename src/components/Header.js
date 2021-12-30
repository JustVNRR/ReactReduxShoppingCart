import styled from 'styled-components';
import './Header.css'
const MaBanniere = styled.div`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:5em;
    background-image: url("${props=>props.intermediateProp}");
    background-size: cover;
`;

const Header = ({ titre, img, logo }) => {

    // const monStyle = {
    //     position : "absolute",
    //     top : "0",
    //     left : "0",
    //     width : "100%",
    //     height : "5em",
    //     backgroundImage : `url(${img})`,
    //     backgroundSize : "cover"
    // }

    return (
        <>
            <header className="App-header">
                <MaBanniere intermediateProp ={img}></MaBanniere>
                {/* <div style={monStyle}></div> */} {/* Moins bien : crée du css inline... */}
                <h1 className="mon-titre">
                    {titre}
                </h1>
                <img src={logo} className="App-logo" alt="logo" />
            </header>
        </>
    )
}

export default Header

