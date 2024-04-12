import "./CinputProfile.css"

export const CinputProfile = ({type, name, value, placeholder, functionChange}) => {

    return (
        <input
        className="input-design"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={functionChange}
        />
    )
}