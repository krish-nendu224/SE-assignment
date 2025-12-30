function Diagnosis(){
    const handleButton = ()=>{
        alert("successfull");
    }
    return(
        <div>
            <h1>Basic Diagnosis</h1>
            <textarea placeholder="enter your symptoms"/><br/><br/>
            <button onClick={handleButton}>Check</button>
        </div>
    );

}
export default Diagnosis