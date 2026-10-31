import React from 'react'
import { Link } from 'react-router'

// link to se NavBar har file se click hoga , RecipeFinder par click karne ke baad alag alag pages par jaa sakte hai

function NavBar() {
    return (

        

        <header className="sticky top-0 z-10 bg-card border-b border-border">
            <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="font-serif font-bold text-xl text-accent">
                    RecipeFinder
                </Link>
                <Link to="/" className="text-text hover:text-accent font-medium">
                    Home
                </Link>
            </nav>
        </header>


    )
}

export default NavBar    