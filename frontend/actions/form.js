import fetch from 'isomorphic-fetch';
import { API } from '../config';


export const emailContactForm = (data) => {

    let emailEndpoint

    if (data.authorEmail) {
        emailEndpoint = `${API}/contact-blog-author`
    }

    else {
        emailEndpoint = `${API}/contact`
    }


    return fetch(`${emailEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const listBlogsWithCategoriesAndTags = (skip, limit) => {

    const data = {
        limit, skip
    }

    return fetch(`${API}/blogs-categories-tags`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const singleBlog = slug => {
    return fetch(`${API}/blog/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const listRelated = (blog) => {

    return fetch(`${API}/blogs/related`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blog)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = (username) => {

    let listBlogsEndpoint;

    if (username) {
        listBlogsEndpoint = `${API}/${username}/blogs`
    }

    else {
        listBlogsEndpoint = `${API}/blogs`
    }
    return fetch(`${listBlogsEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const removeBlog = (slug, token) => {

    let deleteBlogEndpoint

    if (isAuth() && isAuth().role === 1) {
        deleteBlogEndpoint = `${API}/blog/${slug}`
    }

    else if (isAuth() && isAuth().role === 0) {
        deleteBlogEndpoint = `${API}/user/blog/${slug}`
    }
    return fetch(`${deleteBlogEndpoint}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};


export const updateBlog = (blog, token, slug) => {

    let updateBlogEndpoint

    if (isAuth() && isAuth().role === 1) {
        updateBlogEndpoint = `${API}/blog/${slug}`
    }

    else if (isAuth() && isAuth().role === 0) {
        updateBlogEndpoint = `${API}/user/blog/${slug}`
    }
    return fetch(`${updateBlogEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listSearch = (params) => {

    let query = queryString.stringify(params);
    return fetch(`${API}/blogs/search?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}