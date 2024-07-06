import { useState } from "react"
import axios from 'axios'

export default function Create() {
    const [values, setValues] = useState({
        name: '',
        email: ''
    })

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:8081/student', values)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
    
    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>Add Student</h2>
                    <div>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter name"  
                        onChange={e => setValues({...values, name: e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder="Enter Email"
                        onChange={e => setValues({...values, email: e.target.value})}/>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </>
    ) 
}