import { useState } from 'react';
//components
import Calendar from 'react-calendar';
import Popup from './features/Popup/Popup';
//styles
import 'react-calendar/dist/Calendar.css';
//types
type ValueType = Date | null;

function App() {
    const [date, setDate] = useState<string>(new Date().toDateString());
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handleChangeDay = (date: ValueType) => {
        if (date !== null) {
            const parsedDate = date.toDateString();

            setDate(parsedDate);

            setShowPopup(!showPopup);
        }
    };

    return (
        <div className="calendar-wrapper">
            <Calendar onClickDay={handleChangeDay} value={date} />
            {showPopup && <Popup setShowPopup={setShowPopup} date={date} />}
        </div>
    );
}

export default App;
