import "./InputName.css"

/**
 * Componente visual que representa una caja de texto para ingresar el nombre
 * 
 * @param {Object} props - Propiedades del componente
 * @param {String} props.name -  Valor del nombre del usuario
 * @param {Function} props.setName - Setea el nombre del usuario
 * @returns {JSX.Element} Elemento JSX del componente
 */

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