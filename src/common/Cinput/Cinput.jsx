import "./Cinput.css"

export const Cinput = ({type, name, placeholder, value, changeEmit}) => {

    return (
        <input
        className="input-design"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e)=>changeEmit(e)}
    
        />
    )
}