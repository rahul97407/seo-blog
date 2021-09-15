import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { createBlog } from '../../actions/blog';
import { QuillModules, QuillFormats } from '../../helpers/quill';


import Link from 'next/link';
import { useState, useEffect } from 'react';
import router from 'next/router';
import dynamic from 'next/dynamic'
import { withRouter } from 'next/router'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import '../../node_modules/react-quill/dist/quill.snow.css';

const CreateBlog = () => {

    const blogFromLS = () => {

        if (typeof window === 'undefined') return false;

        if (localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'));
        }
        else return false;
    };

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [checked, setChecked] = useState([]);
    const [checkedTag, setCheckedTag] = useState([]);
    const [body, setBody] = useState(blogFromLS());
    const [values, setValues] = useState({

        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: false,
        reload: false
    });



    const { error, sizeError, success, formData, title, hidePublishButton } = values;
    const token = getCookie('token');

    useEffect(() => {

        setValues({ ...values, formData: new FormData() })
        initCategories();
        initTags();
    }, [router])

    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            }
            else {
                setCategories(data);
            }
        })
    }


    const initTags = () => {

        getTags().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            }

            else {
                setTags(data);
            }
        });
    };


    const publishBlog = e => {

        e.preventDefault();
        createBlog(formData, token).then(data => {

            console.log(data)
            if (data.error) {
                console.log(data.error)
                setValues({ ...values, error: data.error })
            }
            else {
                setValues({ ...values, title: '', error: '', success: `A new blog titled ${data.title} is created` })
                setBody('');
                setChecked([]);
                setCheckedTag([]);
            }
        })
    };

    const handleChange = name => e => {

        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        console.log(value);
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const handleBody = e => {

        setBody(e);
        formData.set('body', e);

        if (typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e));
        }
    };

    const handleToggle = (c) => (e) => {

        setValues({ ...values, error: '' })
        const all = [...checked];
        const clickedCategory = checked.indexOf(c)

        if (clickedCategory === -1 && e.target.checked) {
            all.push(c);
        }

        else {
            all.splice(clickedCategory, 1);
        }

        console.log(all);
        setChecked(all);
        formData.set('categories', all);
    }


    const handleTagsToggle = (t) => (e) => {

        setValues({ ...values, error: '' })
        const all = [...checkedTag];
        const clickedTag = checkedTag.indexOf(t)

        if (clickedTag === -1 && e.target.checked) {
            all.push(t);
        }

        else {
            all.splice(clickedTag, 1);
        }

        console.log(all);
        setCheckedTag(all);
        formData.set('tags', all);
    }

    const showCategories = () => {

        return (
            categories && categories.map((c, i) => (

                <li key={i} className="list-unstyled">
                    <input onChange={handleToggle(c._id)} type="checkbox" className="ms-2" ></input>
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        );
    };


    const showTags = () => {

        return (
            tags && tags.map((t, i) => (

                <li key={i} className="list-unstyled">
                    <input onChange={handleTagsToggle(t._id)} type="checkbox" className="ms-2"></input>
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        );
    };

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>{error}</div>
    )

    const showSuccess = () => (
        <div className="alert alert-danger" style={{ display: success ? '' : 'none' }}>{success}</div>
    )

    const createBlogForm = () => {

        return (
            <form onSubmit={publishBlog}>
                <div className="form-group">
                    <label className="text-muted mb-2">Title</label>
                    <input type="text"
                        className="form-control"
                        onChange={handleChange('title')}
                        value={title} />
                </div>
                <div className="form-group">
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body}
                        placeholder="Write Something amazing"
                        onChange={handleBody} />
                </div>

                <div>
                    <button
                        type="submit"
                        className="btn btn-primary mb-2 mt-2">
                        Publish
                    </button>
                </div>
            </form>
        )
    }


    return (
        <div className="container-fluid pb-5">
            <div className="row">
                <div className="col-md-8">
                    {createBlogForm()}

                    <div className="pt-3">
                        {showError()}
                        {showSuccess()}
                    </div>
                </div>
                <div className="col-md-4">
                    <div>
                        <div className="form-group pb-2">
                            <h2>Featured image</h2>
                            <hr />
                            <div className="text-muted mb-2">Max Size : 1MB</div>
                            <label className="btn btn-outline-info">Upload featured image
                                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden></input>
                            </label>
                        </div>
                    </div>
                    <h3>Categories</h3>
                    <hr />
                    <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                        {showCategories()}
                    </ul>
                    <h3>Tags</h3>
                    <hr />
                    <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                        {showTags()}

                    </ul>
                </div>
            </div>
        </div>
    );
};




export default withRouter(CreateBlog);
