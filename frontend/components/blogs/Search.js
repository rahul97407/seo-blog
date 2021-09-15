import Link from 'next/link'
import renderHTML from 'react-render-html';
import { useState, useEffect } from 'react';
import { listSearch } from '../../actions/blog';


const Search = () => {

    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    })

    const { search, results, searched, message } = values

    const handleChange = (e) => {

        setValues({ ...values, search: e.target.value, searched: false, results: [] })
    }

    const searchSubmit = (e) => {
        e.preventDefault();
        listSearch({ search })
            .then(data => {
                setValues({ ...values, results: data, searched: true, message: `${data.length} blogs found` })
            })
    }

    const searchedBlogs = (results = []) => {

        return (
            <div className="bg-white"
                style={{
                    padding: '4rem 2rem',
                    marginBottom: '2rem',
                    backgroundColor: 'var(--bs - light)',
                    borderRadius: '.3rem'
                }}>
                {message && <p className=" pt-4 text-muted font-italic">{message}</p>}
                {results.map((blog, i) => (
                    <div key={i}>
                        <Link href={`/blogs/${blog.slug}`}>
                            <a className="text-primary">{blog.title}</a>
                        </Link>
                    </div>
                ))}
            </div>
        )
    }
    const searchForm = () => (

        <form onSubmit={searchSubmit}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-11">
                        <input type="search"
                            className="form-control"
                            placeholder="Search blogs"
                            onChange={handleChange}>

                        </input>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-primary btn-block" style = {{ width : 'auto'}} type="submit">
                            Search
                        </button>
                    </div>
                </div>
            </div>

        </form>
    )

    return (
        <div className="container-fluid">
            <div className="pt-3 pb-5">{searchForm()}</div>
            {searched && <div style={{ marginTop: '-120px', marginBottom: '-80px' }}>{searchedBlogs(results)}</div>}
        </div>
    )
}

export default Search;


