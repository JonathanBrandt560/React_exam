import { House } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    
    return (
        <nav className="flex items-center bg-slate-600 text-slate-200 h-14 shadow-2xl sticky top-0 w-full z-10">
            <ul className="list-none flex pt-3 justify-center items-center gap-3 overflow-hidden fixed top-0 w-full">
                <li><Link to="/" className='hover:bg-slate-500 block decoration-none'>< House /></Link></li>
                <li><Link to="/userlist" className='hover:bg-slate-500 block decoration-none border-2 rounded-xl p-1'>Användarlista</Link></li>
            </ul>
        </nav>
    )
}