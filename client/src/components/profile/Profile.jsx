import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { findUserById } from "../../services/userService";
import { getSomeNotesByDueDateDesc } from "../../services/noteService";
import ProfileDetails from "./ProfileDetails";
import ProfileNotes from "./ProfileNotes";

export default function Profile({ user }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [profileDetails, setProfileDetails] = useState({});
    const [expiringNotes, setExpiringNotes] = useState([]);

    async function loadUser() {
        const userData = await findUserById(id);

        if (user._id === id && userData) {
            setProfileDetails({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                username: userData.username,
                dateOfBirth: userData.dateOfBirth,
                phoneNumber: userData.phoneNumber,
                imageUrl: userData.imageUrl,
                address: Object.values(userData.address),
            })

            await getExpiringEvents(userData._id, 4)

        } else {
            navigate('/404');
        }
    }

    async function getExpiringEvents(userId, numberOfEvents) {
        const expiringEvents = await getSomeNotesByDueDateDesc(userId, numberOfEvents);

        setExpiringNotes(expiringEvents);
    }

    useEffect(() => {
        loadUser();
    }, [id, user._id]);

    return (
        <div className="content profile">
            <ProfileDetails profileDetails={profileDetails} />

            <ProfileNotes expiringNotes={expiringNotes} />

            <div className="latest-checklists"></div>
        </div>

    )
}