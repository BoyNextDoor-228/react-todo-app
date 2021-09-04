import React from 'react'
import loader from '../images/loading.gif'

export const LoaderGif = () => {
    return (
        <div className="container ">
        <img src={loader} width="200px" height="150px" className="rounded mx-auto d-block" alt="Loading..."/>
        </div>
    )
}