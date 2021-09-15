import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { Layout } from '../../components/Layout';
import React, { useState } from 'react';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';

import Card from '../../components/blogs/card'



const Blogs = ({ blogs, categories, tags, totalBlogs, router, blogSkip, blogsLimit }) => {


    const head = () => (
        <Head>
            <title>Programming blogs | {APP_NAME}</title>
            <meta
                name="description"
                content="Programming blogs and tutorials on react node next vue php laravel and web development">
            </meta>
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}></link>
            <meta property="og:title" content={`Latest web development tutorials | ${APP_NAME}`}></meta>
            <meta
                property="og:description"
                content="Programming blogs and tutorials on react node next vue php laravel and web development">
            </meta>
            <meta property="og:type" content="website"></meta>
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`}></meta>
            <meta property="og:site_name" content={`${APP_NAME}`}></meta>


            <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`}></meta>
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`}></meta>
            <meta property="og:image:type" content="image/jpg"></meta>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}></meta>
        </Head>
    )

    const [limit, setLimit] = useState(blogsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] = useState([]);


    const loadMore = () => {

        let toSkip = skip + limit
        listBlogsWithCategoriesAndTags(toSkip, limit)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }

                else {
                    setLoadedBlogs([...loadedBlogs, ...data.blogs])
                    setSize(data.size);
                    setSkip(toSkip)
                }
            })
    }


    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit &&
            (<button onClick={loadMore} className="btn btn-outline-primary btn-lg">Load More</button>)
        )
    }
    const showLoadedBlogs = () => {

        return loadedBlogs.map((blog, i) => {
            return <article key={i}>
                <Card blog={blog}></Card>
                <hr />
            </article>
        })
    }

    const showAllBlogs = () => {

        return blogs.map((blog, i) => {
            return <article key={i}>
                <Card blog={blog}></Card>
                <hr />
            </article>
        })
    }



    const showAllCategories = () => {

        return categories.map((c, i) => (
            <Link href={`categories/${c.slug}`} key={i}>
                <a className="btn btn-primary me-1 ms-1 mt-3">{c.name}</a>
            </Link>
        ))
    }


    const showAllTags = () => {

        return tags.map((t, i) => (
            <Link href={`tags/${t.slug}`} key={i}>
                <a className="btn btn-outline-primary me-1 ms-1 mt-3">{t.name}</a>
            </Link>
        ))
    }

    return (

        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <div className="container-fluid">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 fw-bold text-center">
                                    Programming blogs and tutorials
                                </h1>
                            </div>
                            <section>
                                <div className="pb-5 text-center">
                                    {showAllCategories()}
                                    <br />
                                    {showAllTags()}
                                </div>
                            </section>
                        </header>
                    </div>
                    <div className="container-fluid">
                        {showAllBlogs()}
                    </div>
                    <div className = "container-fluid">
                        {showLoadedBlogs()}
                    </div>
                    <div className ="text-center pt-5 pb-5">
                        {loadMoreButton()}
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    );

}

Blogs.getInitialProps = () => {

    let skip = 0;
    let limit = 2;

    return listBlogsWithCategoriesAndTags(skip, limit)
        .then(data => {
            if (data.error) {
                console.log(data.error)
            }

            else {
                return {
                    blogs: data.blogs,
                    categories: data.categories,
                    tags: data.tags,
                    totalBlogs: data.size,
                    blogsLimit: limit,
                    blogSkip: skip
                }
            }
        });
}

export default withRouter(Blogs);