import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom';
import Doc from '../about/Doc'
import { MemoryRouter } from 'react-router-dom';

describe('list of documents', () => {

    const doc1 = {
        id: 1,
        file_name: "doc1"
    }
    const doc2 = {
        id: 1,
        file_name: ""
    }

    test('renders document details and actions', () => {
        render(<MemoryRouter>
            <Doc doc={doc1} />
        </MemoryRouter>)
        expect(screen.getByText('doc1')).toBeInTheDocument();
        expect(screen.getByText('Rename')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();

    })

    test('on clicking the rename button it should render with docId', async () => {
        render(<MemoryRouter >
            <Doc doc={doc2} />
        </MemoryRouter>)
        const eledoc = screen.getByText('Rename')
        fireEvent.click(eledoc)
        const inputElement = screen.getByDisplayValue('1');
        expect(inputElement).toBeInTheDocument();

    })
    test('on clicking the rename button it should render with docId', async () => {
        render(<MemoryRouter >
            <Doc doc={doc1} />
        </MemoryRouter>)
        const eledoc = screen.getByText('Rename')
        fireEvent.click(eledoc)
        const inputElement = screen.getByDisplayValue('doc1');
        expect(inputElement).toBeInTheDocument();

    })
})