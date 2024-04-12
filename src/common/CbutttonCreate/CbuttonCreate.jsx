import "./CbuttonCreate.css"

export const CButtonCreate = ({className, title, functionEmit}) => {
    return(
        <div className={className} onClick={functionEmit}>
        {title}

        </div>
    )
}