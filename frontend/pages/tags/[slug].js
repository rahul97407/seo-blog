import Head from 'next/head';
import { Layout } from '../../components/Layout';
import React from 'react';
import { singleTag } from '../../actions/tag'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import Card from '../../components/blogs/Card'

const Tag = ({ tag, blogs, query }) => {



    const head = () => (
        <Head>
            <title>{tag.name} | {APP_NAME}</title>
            <meta
                name="description"
                content={`Best programming tutorial on ${tag.name}`}>
            </meta>
            <link rel="canonical"
                href={`${DOMAIN}/tags/${query.slug}`}></link>
            <meta property="og:title"
                content={`${tag.name} | ${APP_NAME}`}></meta>
            <meta
                property="og:description"
                content={`Best programming tutorial on ${tag.name}`}>
            </meta>
            <meta property="og:type" content="website"></meta>
            <meta property="og:url" content={`${DOMAIN}/tags/${query.slug}`}></meta>
            <meta property="og:site_name" content={`${APP_NAME}`}></meta>


            <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`}></meta>
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`}></meta>
            <meta property="og:image:type" content="image/jpg"></meta>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}></meta>
        </Head>
    )

    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <div className="container-fluid text-center">
                        <h2 className="display-4 fw-bold">{tag.name}</h2>
                        {blogs.map((b, i) => <div>
                            <Card key={i} blog={b}></Card>.
                            <hr />
                        </div>)}
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    )
}

Tag.getInitialProps = ({ query }) => {

    return singleTag(query.slug)
        .then(data => {
            if (data.error) {
                console.log(data.error);
            }

            else {

                return {
                    tag: data.tag,
                    blogs: data.blogs,
                    query
                }
            }
        })
}

export default Tag;