import React, { Component } from 'react'
import { useSelector } from 'react-redux'
import { Route, Navigate } from 'react-router-dom'

const ProtectedRoute = ({ Component }) => {
    const { isAuthenticated, loading, user } = useSelector(state => state.user)
    return isAuthenticated ? <Component /> : <Navigate to="/login" />

}

export default ProtectedRoute