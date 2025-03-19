import Switch from '@mui/material/Switch';
import "../../App.css";
import { useSearchParams } from 'react-router-dom';


const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function BasicSwitch({ name, toggle, setToggle }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const UpdateParams = (name, Value) => {
        const newParams = new URLSearchParams(searchParams);

        newParams.set(name, Value);

        setSearchParams(newParams)


    }



    const changeHandler = (event) => {
        setToggle(event.target.checked)
        UpdateParams(name, event.target.checked)
    }


    return (
        <div className='basic_switch' style={{ width: 'fit-content' }}>
            <div className='switch_label'>{name}</div>
            <Switch
                checked={toggle}
                onChange={changeHandler}
                {...label} />
        </div>
    );
}