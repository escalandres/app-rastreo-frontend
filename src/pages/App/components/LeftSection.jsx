import ScrollContainer from "./ScrollContainer";
import { jwtDecode } from 'jwt-decode';

const LeftSection = () => {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    console.log(decoded); // Aquí tendrás acceso a los datos del JWT
    
    // Por ejemplo, si tienes un campo llamado "userId"
    const userName = decoded.user.name;
    const items = [{
        id: 48273619,
        img: '/icons/send-box.png',
    }, {
        id: 59102473,
        img: '/icons/picture.png',
    }, {
        id: 30814562,
        img: '/icons/phone.png',
    }]

    return (
        <div className="left-section">
            <h1 className="text-left text-lg font-bold mb-4">Bienvenido {userName}</h1>
            <ScrollContainer items={items} width={100} height={30} />
        </div>
    );
}

export default LeftSection;