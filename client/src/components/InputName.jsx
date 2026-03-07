import "./InputName.css"

function InputName({ name, setName }) {
    return(
        <div className="input-content">
            <input 
            type="text"
            placeholder="Ingrese su nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </div>
    );
}

export default InputName;