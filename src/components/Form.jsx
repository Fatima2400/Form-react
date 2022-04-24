import axios from "axios";
import { useEffect, useState } from "react"


export const User=()=>{
    const [data, setData]= useState({
        username:"",
        age:"",
        email:""
    });
    const handleChange=(e)=>{
const {id,value}= e.target;

setData({
    ...data, 
    [id]:value
})

    }
    const [form, setForm]=useState([])
   const getData=()=>{
       axios.get('http://localhost:3004/createUser').then((res)=>{
           setForm([...res.data,form])
       })
   }
   useEffect(()=>{
       getData();
   },[])

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3004/createUser',data).then(()=>{
            getData();
        alert('user created')
            setData({
                username:"",
                age:"",
                email:""  
            })
            
        })
    }


    return (
        <div>
            <h2>CREATE USERS</h2>
            <form onSubmit={handleSubmit}>
               <input 
               type="text"
               placeholder='username'
               id= 'username'
               value={data.username}
               onChange={handleChange}
               />

               <input 
               type="number"
               placeholder='age'
               id='age'
               value={data.age}
               onChange={handleChange}
               />
                <input 
               type="text"
               placeholder='email'
               id='email'
               value={data.email}
               onChange={handleChange}
               />
            <input type="submit" value='submit' />
               


            </form>

            <div className='tablediv'>
                <table>
                    <tr>
                        <td>USERNAME</td>
                        <td>AGE</td>
                        <td>EMAIL</td>
                    </tr>
                </table>
                {

                    form.map((el)=>{
                        
                        return  <tr>
                        <td>{el.username}</td>
                        <td>{el.age}</td>
                        <td>{el.email}</td>
                    </tr>
                    })
                }
            </div>
        </div>
    )
}