import  { Link, Outlet} from 'react-router';

function Layout() {
    return (
        <div className="mx-auto max-w-7xl">
            <header>
                <nav className="flex gap-4">

                    <Link to={'/'} className="italic p-4 font-bold">Home</Link>
                    <Link to={'/about'} className="italic p-4 font-bold">About</Link>
                    <Link to={'/spots'} className="italic p-4 font-bold">Spots</Link>
                    <Link to={'/spots/create'} className="italic p-4 font-bold">Create</Link>
                </nav>
            </header>
            <main className="mx-2">
                <Outlet/>
            </main>
            <footer className="text-center p-4">&copy; Antwan</footer>
        </div>
    )
}