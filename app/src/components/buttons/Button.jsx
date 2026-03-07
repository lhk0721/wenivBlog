export default function Button({text, icon, bgcolor, onClick}){
    return(
        <button
            style={{backgroundColor: bgcolor}}
            onClick={onClick}
            className="btn"
        >
            {icon && <img src="icon" alt=""/>}
            {text}
        </button>
    )
}