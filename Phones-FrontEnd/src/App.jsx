import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [coolPhones, setcoolPhones] = useState(null);

    const router = createBrowserRouter([
        {
            path: "/",
            children: [
                {
                    path: "/about",
                    element: <About />
                },
                {
                    path: "/phones",
                    element: <CoolPhonesOverview/>
                },
                {
                    path: "/phones/create",
                    element: <CreateForm />
                },
                {
                    path: "/phones/:id",
                    element: <CoolPhoneDetail />
                }
            ]
        }
    ]);



    async function fetchcoolPhones() {
        try {
            const response = await fetch("https://prg06-node-express.antwan.eu/spots/", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });

            const data = await response.json();
            setcoolPhones(data.items);
        } catch (e) {
            console.error("Fout bij het ophalen van producten:", e);
        }
    }

    useEffect(() => {
        fetchcoolPhones();
    }, []);

    return (
        <>
            <h1 className="text-2xl font-bold py-4">ChessSpots</h1>

            {coolPhones ? (
                <ul className="divide-y divide-gray-200">
                    {coolPhones.map((spot) => (
                        <li key={spot.id} className="py-4">
                            <p className="font-bold">{spot.name}</p>
                            <p className="text-sm">{spot.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>coolPhones laden...</p>
            )}
        </>
    );
}

export default App;