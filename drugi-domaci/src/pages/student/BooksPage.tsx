import React from 'react'
import { useBooks } from '../../hooks/apiHooks'
import Form from '../../components/form/Form';
import { useLocation, useNavigate } from 'react-router';

export default function BooksPage() {
    const books = useBooks();
    const search = useLocation().search;
    //?search=asfa&page=1
    const urlParams = new URLSearchParams(search);
    const navigate = useNavigate();
    return (
        <div className='container'>
            <h2 className='text-center m-2'>Search public books</h2>
            <div className='search-filter'>
                <input
                    type="text"
                    value={urlParams.get('search') || ''}
                    className='form-control'
                    onChange={(e) => {
                        const value = e.currentTarget.value;
                        urlParams.set('search', value);
                        navigate('/books?' + urlParams.toString());
                    }}
                    placeholder='Search...' />
                <button
                    onClick={() => {
                        const page = Number(urlParams.get('page') || 1);
                        urlParams.set('page', `${page - 1}`)
                        navigate('/books?' + urlParams.toString());
                    }}
                    disabled={!books?.hasPrevious}
                    className="btn btn-white  border-dark"
                > &laquo;</button>
                <button
                    onClick={() => {
                        const page = Number(urlParams.get('page') || 1);
                        urlParams.set('page', `${page + 1}`)
                        navigate('/books?' + urlParams.toString());
                    }}
                    disabled={!books?.hasNext}
                    className="btn btn-white border-dark"
                > &raquo;</button>
            </div>
            <table className='table mt-2'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Authors</th>
                        <th>Translators</th>
                        <th>Subjects</th>
                        <th>Languages</th>
                        <th>Bookshelves</th>
                        <th>Copyright</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books?.data.map(book => {
                            return (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>{book.authors.map(person => person.name).join(', ')}</td>
                                    <td>{book.translators.map(person => person.name).join(', ')}</td>
                                    <td>{book.languages.join(', ')}</td>
                                    <td>{book.bookshelves.join(', ')}</td>
                                    <td>{book.copyright ? 'Yes' : 'No'}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
