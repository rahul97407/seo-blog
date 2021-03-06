import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { getCookie, isAuth, updateUser } from '../../actions/auth'
import { getProfile, update } from '../../actions/user'
import { API } from '../../config'


const ProfileUpdate = () => {

    const [values, setValues] = useState({
        username: '',
        name: '',
        email: '',
        about: '',
        password: '',
        error: false,
        success: false,
        loading: false,
        photo: '',
        userData: ''

    })


    const token = getCookie('token')
    const { username, name, email, about, password, error, success, loading, photo, userData } = values


    const init = () => {

        getProfile(token).then(data => {

            console.log(data);
            if (data.error) {
                setValues({ ...values, error: data.error })
            }

            else {

                setValues({
                    ...values,
                    username: data.username,
                    name: data.name,
                    email: data.email,
                    about: data.about
                })
            }
        })
    }


    useEffect(() => {

        init()
    }, [])

    const handleChange = name => e => {

        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        let userFormData = new FormData()
        userFormData.set(name, value);
        setValues({ ...values, [name]: value, userData: userFormData, error: false, success: false });
    };

    const handleSubmit = (e) => {

        e.preventDefault()
        setValues({ ...values, loading: true })
        update(token, userData)
            .then(data => {

                console.log(data);
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false, loading: false })
                }
                else {
                    updateUser(data, () => {

                        setValues({
                            ...values,
                            username: data.username,
                            name: data.name,
                            email: data.email,
                            about: data.about,
                            success: true,
                            loading: false
                        })

                    })
                }
            })

    }

    const profileUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="btn btn-outline-info mb-3">Profile Photo
                    <input onChange={handleChange('photo')} type="file" accept="image/*" hidden></input>
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted mt-3">Username</label>
                <input onChange={handleChange('username')} type="text" value={username} className="form-control"></input>
            </div>
            <div className="form-group">
                <label className="text-muted mt-3">Name</label>
                <input onChange={handleChange('name')} type="text" value={name} className="form-control"></input>
            </div>
            <div className="form-group">
                <label className="text-muted mt-3">Email</label>
                <input onChange={handleChange('email')} type="email" value={email} className="form-control"></input>
            </div>
            <div className="form-group">
                <label className="text-muted mt-3">About</label>
                <input onChange={handleChange('about')} type="texr" value={about} className="form-control"></input>
            </div>
            <div className="form-group">
                <label className="text-muted mt-3">Password</label>
                <input onChange={handleChange('password')} type="password" value={password} className="form-control"></input>
            </div>
            <div >
                <button type="submit" className="btn btn-primary mt-3">
                    Submit
                </button>
            </div>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>{error}</div>
    )
    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>Profile Updated</div>
    )
    const showLoading = () => (
        <div className="alert alert-info" style={{ display: loading ? '' : 'none' }}>Loading...</div>
    )


    return (

        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <img
                            src={`${API}/user/photo/${username}`}
                            className="img img-fluid mb-3 img-thumbnail"
                            style={{ maxHeight: 'auto', maxWidth: '100%' }}
                            alt="user profile">
                        </img>
                    </div>
                    <div className="col-md-8 mb-5">
                        {showSuccess()}
                        {showError()}
                        {showLoading()}
                        {profileUpdateForm()}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}

export default ProfileUpdate;