import "./CinputProfile.css"

export const CinputProfile = ({type, name, value, placeholder, disabled , functionChange, functionBlur}) => {

    return (
        <input
        className="input-design"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={functionChange}
        onBlur={functionBlur}
    
        />
    )
}