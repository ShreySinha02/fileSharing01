
import React from "react";
import { render, screen,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AllDoc from "../about/AllDoc";
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from "../../context";
import { createServer } from "miragejs";

let server

beforeEach(() => {
  server = createServer()
//  If your API is at a different port or host than your app, you'll need something like:
//  server = createServer({
//    environment: "test",
//    urlPrefix: "http://api.acme.com:3000",
//  })
})

afterEach(() => {
  server.shutdown()
})




describe('testing AllDoc Component', () => {


  test('testing when login status is false', () => {
    render(
      <MemoryRouter>
        <AuthProvider value={{ loginStatus: false }}>
          <AllDoc />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Not Authenticated')).toBeInTheDocument();
  });

  test('testing when login status is true', async () => {
  server.get(`http://127.0.0.1:8000/getdoc`,()=>(
    [
      {
        id:1,
        file_name:"file1"
      },
      {
        id:2,
        file_name:"file2"
      }
    ]
  ))
 render(<MemoryRouter>
        <AuthProvider value={{ loginStatus: true }}>
          <AllDoc />
        </AuthProvider>
      </MemoryRouter>)


      await waitFor(() => {
      expect(screen.getByText('file1')).toBeInTheDocument();
    });
  });
});
