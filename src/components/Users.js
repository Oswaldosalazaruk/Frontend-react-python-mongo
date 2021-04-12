import React, { useState, useEffect } from "react";


export default function Users(e) {
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [usuarios, setUsers] = useState([]);
    const [editing, setEditing] = useState(false);
    const [idusuario, setId] = useState('');
    const API = process.env.REACT_APP_API;

    

    useEffect( ()=> {
        const getUsers = async () => {
            const res = await fetch(`${API}/users`)
            const data = await res.json();
            setUsers(data)
        };
        getUsers();
    },[API]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editing) {
            const res = await fetch(`${API}/users`,{
                method : 'POST',
                headers :  {'content-Type' : 'application/json'},
                body: JSON.stringify({
                    username,
                    email,
                    password
                })},
                { mode: 'no-cors'}
            );
            const data = await res.json();
            console.log(await data);
            await getUsers();
        } 
        else {
            setEditing(false);
            const res = await fetch(`${API}/users/${idusuario}`,{
                method : 'PUT',
                headers :  {'content-Type' : 'application/json'},
                body: JSON.stringify({
                    username,
                    email,
                    password
                })},
                { mode: 'no-cors'});
            const data = await res.json();
            console.log(await data);
            setId('');
            setName('');
            setPassword('');
            setEmail('');
            await getUsers();

        }
    }

    const getUsers = async () => {
        const res = await fetch(`${API}/users`)
        const data = await res.json();
        setUsers(data)
        console.log(data)
    };
   
    const deleteUser = async (id) => {
        const userResponse = window.confirm('Are you sure you want to delete it?')
        if (userResponse){
            const ident=id['$oid']
            console.log(ident)
            const res = await fetch(`${API}/users/${ident}`, {method: 'DELETE'});
            const data = await res.json();
            console.log(await data)
            await getUsers();
        }
    };
    const editUser = async (id) => {
        const ident=id['$oid']
        const res = await fetch(`${API}/user/${ident}`, {method: 'GET'});
        const data = await res.json();
        setEditing(true);
        setId(ident);
        setName(data['username']);
        setPassword(data['password']);
        setEmail(data['e-mail']);
        console.log(await data)
    };



    

    return ( 
        <div className = "row" >
            <div className = "col-md-4" >
            <form onSubmit= {handleSubmit} className = "card card-body" >
                <div className="form-group">
                    <input type="text" 
                    onChange={e => setName(e.target.value)} 
                    value ={username}
                    className = "form control "
                    placeholder = "username"
                    autoFocus />
                </div>
                <div className="form-group">
                    <input type="password" 
                    onChange={e => setPassword(e.target.value)} 
                    value ={password}
                    className = "form control "
                    placeholder = "password" />
                </div>
                <div className="form-group">
                    <input type="email" 
                    onChange={e => setEmail(e.target.value)} 
                    value ={email}
                    className = "form control "
                    placeholder = "email"/>
                </div>
                <button className="btn btn-primary btn-block">
                    {editing ? 'UPDATE' : 'CREATE'} </button>
            </form>
            
            </div> 
            <div className = "col-md-6" >
            <table id = "myTable" className = "table table-striped myTable">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>e-mail</th>
                        <th>password</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((user) => (
                    <tr key={user._id['$oid']}>
                        <th>{user['username']}</th>
                        <th>{user['e-mail']}</th>
                        <th>{(user['password']).substr(10,20)}</th>
                        <td>
                        <button 
                            className="btn btn-secondary btn-sm btn-block"
                            onClick={()=> editUser(user['_id'])}>
                            Edit
                        </button>
                        <button 
                            className="btn btn-danger btn-sm btn-block"
                            onClick={()=> deleteUser(user['_id'])} >
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>         
            </div>
        </div>
    )
}