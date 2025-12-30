function Login(){
    const handleLogin = ()=>{
        alert("done");
    }
    return(
        <div>
            <h2>Login page</h2>
            <input type="text" placeholder="enter id"/><br/><br/>
            <input type="password" placeholder="enter password"/><br/><br/>
            <button onClick={handleLogin}>Login</button>
        </div>
    );

}
export default Login