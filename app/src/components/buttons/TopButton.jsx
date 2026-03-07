import buttonStyles from './Button.module.css';
import Button from './Button.jsx';
import topButtonStyles from './TopButton.module.css';
// import ArrowTop from 'app/src/assets/icons/ArrowTop.svg';

export default function TopButton({text, icon, activeIcon, onClick}){
    return(
        <Button
            onClick={onClick}
            className = {`${buttonStyles.btn} ${topButtonStyles.btn}`}
        >
            {text}
        </Button>
    )
}

