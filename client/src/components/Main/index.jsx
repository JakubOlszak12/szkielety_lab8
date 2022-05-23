import styles from "./styles.module.css"
import { useState } from "react"
import axios from "axios"
const Main = () => {
    const [dane,ustawDane] = useState([])
    const [error, setError] = useState("")
    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }
    const handleGetUsers = async (e) => {
        e.preventDefault()
        //pobierz token z localStorage:
        const token = localStorage.getItem("token")
        //jeśli jest token w localStorage to:
        if (token) {
        try {
        //konfiguracja zapytania asynchronicznego z tokenem w nagłówku:
        const config = {
        method: 'get',
        url: 'http://localhost:8080/api/userlist',
        headers: { 'Content-Type': 'application/json', 'x-access-token': token }
        }
        //wysłanie żądania o dane:
        const { data: res } = await axios(config)
        console.log(res.data)
        //ustaw dane w komponencie za pomocą hooka useState na listę z danymi przesłanymi
        //z serwera – jeśli został poprawnie zweryfikowany token
        ustawDane(res.data)
        console.log(dane) // `res.data` - zawiera sparsowane ciało odpowiedzi (response body)
        } catch (error) {
        if (error.response && error.response.status >= 400 &&error.response.status <= 500)
        {
        setError(error.response.data.message)
        //localStorage.removeItem("token")
        //window.location.reload()
        }
        }
        }
        }
    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>MySite</h1>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Wyloguj się
                </button>
                <button className={styles.white_btn} onClick={handleGetUsers}>
                    Użytkownicy
                </button>
            </nav>
        </div>
    )
}
export default Main
