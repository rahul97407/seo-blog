import Head from 'next/head';
import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { Layout } from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import { listRelated, singleBlog } from '../../actions/blog'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import SmallCard from '../../components/blogs/SmallCard'
import DisqusThread from '../../components/DisqusThread';


const SingleBlog = ({ blog, query }) => {


    const [related, setRelated] = useState([]);


    const loadRelated = () => {
        listRelated({ blog })
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    setRelated(data);
                }
            })
    }

    useEffect(() => {
        loadRelated();
    }, [])


    const showRelatedBlog = () => {

        return related.map((blog, i) => (
            <div className="col-md-4" key={i}>
                <article>
                    <SmallCard blog={blog}>
                    </SmallCard>
                </article>
            </div>
        ))
    }

    const showComments = () => {

        return (
            <div>
                <DisqusThread id = {blog.id} title = {blog.title} path = {`/blog/${blog.slug}`}>

                </DisqusThread>
            </div>
        )
    }


    const head = () => (
        <Head>
            <title>{blog.title} | {APP_NAME}</title>
            <meta
                name="description"
                content={blog.mdesc}>
            </meta>
            <link rel="canonical"
                href={`${DOMAIN}/blogs/${query.slug}`}></link>
            <meta property="og:title"
                content={`${blog.title} | ${APP_NAME}`}></meta>
            <meta
                property="og:description"
                content={blog.mdesc}>
            </meta>
            <meta property="og:type" content="website"></meta>
            <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`}></meta>
            <meta property="og:site_name" content={`${APP_NAME}`}></meta>


            <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`}></meta>
            <meta property="og:image:secure_url" content={`${API}/blogs/photo/${blog.slug}`}></meta>
            <meta property="og:image:type" content="image/jpg"></meta>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}></meta>
        </Head>
    )
    const showBlogCategories = blog =>

        blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn btn-primary me-1 ms-1 mt-3 mb-3">{c.name}</a>
            </Link>
        ))


    const showBlogTags = blog => (

        blog.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-primary me-1 ms-1 mt-3 mb-3">{t.name}</a>
            </Link>
        ))
    )

    return <React.Fragment>
        {head()}
        <Layout>
            <main>
                <article>
                    <div className="container-fluid">
                        <section>
                            <div className="row" style={{ marginTop: '-30px' }}>
                                <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} className="img img-fluid featured-image"></img>
                            </div>
                        </section>
                        <section>
                            <div className="container">
                                <h1 className="display-2 pb-3 pt-3 text-center fw-bold">{blog.title}</h1>
                                <p className="lead mt-3 mark">
                                    Written by 
                                    <Link href={`/profile/${blog.postedBy.username}`}>
                                        <a>{` ${blog.postedBy.username}`}
                                        </a>
                                    </Link>
                                     | Published {moment(blog.updatedAt).fromNow()}
                                </p>
                                <div className="pb-3">
                                    {showBlogCategories(blog)}
                                    {showBlogTags(blog)}
                                    <br />
                                    <br />
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="container">
                        <section>
                            <div className="col-md-12 lead">
                                {renderHTML(blog.body)}
                            </div>
                        </section>
                    </div>
                    <div className="container">
                        <h4 className="text-center pt-5 pb-5 h2">
                            Related blogs
                        </h4>
                        <hr />
                        <div className="row">
                            {showRelatedBlog()}
                        </div>
                    </div>
                    <div className="container pt-5 pb-5">
                        {showComments()}
                    </div>
                </article>
            </main>
        </Layout>
    </React.Fragment>
}


SingleBlog.getInitialProps = ({ query }) => {

    return singleBlog(query.slug)
        .then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                return { blog: data, query }
            }
        })
}

export default (SingleBlog)