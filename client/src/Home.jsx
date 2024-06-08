import { useEffect, useState } from "react";
import axios from 'axios'

function Home () {
    const [data, setData] = useState([])
    useEffect(()=> {
        axios.get('http://localhost:8081')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])
    return (
        <>
            <div>
                <div>
                    <table>
                        <thead>
                            <tr> 
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Home