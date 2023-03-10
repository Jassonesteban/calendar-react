import { addHours } from "date-fns";
import { useCalendarStore, useUiSotre } from "../../hooks"

export const FabAddNew = () => {

    const { openDateModal } = useUiSotre();
    const { setActiveEvent } = useCalendarStore();

    const handleClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                _id: '123456',
                name: 'Jasson Gualguan'
            }
        });
        openDateModal();
    }

    return (
        <button className="btn btn-primary fab" onClick={handleClickNew}>
            <i className="fas fa-plus"></i>
        </button>
    )
}
