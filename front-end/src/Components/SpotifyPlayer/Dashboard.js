import React from 'react'
import useAuth from './useAuth';

const Dashboard = ( {code} ) => {
    const accessToken = useAuth(code)
    return(
        <div style={{border:"solid red 1px", padding:"10px"}}>
            its workinggg
        </div>
    )
}

export default Dashboard;