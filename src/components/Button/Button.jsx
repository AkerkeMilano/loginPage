import './Button.css';

const Button = ( { mode, onClick, children }) => {
    return (
        <button className={`${mode === 'negative' ? 'negative' : 'btn' }`} onClick={onClick}>{
            children
        }</button>
    )
}

export default Button;