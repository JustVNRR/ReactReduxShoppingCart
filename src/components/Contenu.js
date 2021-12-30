import { Routes, Route } from 'react-router-dom'
import ListProduits from 'components/ListProduits'
import ListUsers from 'components/ListUsers'

import PageNotFound from 'components/PageNotFound'
import PageNotAllowed from 'components/PageNotAllowed'

const Contenu = ({ query }) => {

    return (
        <>
            <Routes>
                <Route path="/" element = { <ListProduits query={query}/>}/>
                <Route path="/products/:id" element = { <ListProduits query={query}/>}/>
                <Route path="/users/" element = { <ListUsers query={query}/>}/>
                <Route path="/forbidden/" element = { <PageNotAllowed />}/>
                <Route path="*" element = {<PageNotFound/>}/>
            </Routes>
        </>
    )
}

export default Contenu

