import "./Cinput.css"

export const Cinput = (type, name, value, changeEmit) => {

    return (
        <input
        className="input-desing"
        type={type}
        name={name}
        value={value}
        onChange={(e) => changeEmit(e)}
        />
    )
}