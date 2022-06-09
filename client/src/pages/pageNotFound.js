import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {

    return (
        <>
        <h1>Page Not Found</h1>
        <Link to="/dashboard">Go to dashboard</Link>
        </>
    )
}

export default PageNotFound