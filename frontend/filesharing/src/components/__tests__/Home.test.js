import React from "react";import '@testing-library/jest-dom';
import { screen,render } from "@testing-library/react";
import { AuthProvider } from "../../context";
import Home from "../home/Home";
import { MemoryRouter } from 'react-router-dom';
describe('',()=>{

    test('when login status is false ',()=>{
        render(<MemoryRouter><AuthProvider value={{loginStatus:false}}>
            <Home/>
        </AuthProvider></MemoryRouter>)
        
        expect(screen.getByText('Not authenticated')).toBeInTheDocument()
    })
    test('when login status is true ',()=>{
        render(<MemoryRouter><AuthProvider value={{loginStatus:true}}>
            <Home/>
        </AuthProvider></MemoryRouter>)
        
        expect(screen.getByText('New Doc')).toBeInTheDocument()
    })
})