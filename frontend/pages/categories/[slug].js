import Head from 'next/head';
import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { Layout } from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import { singleCategory } from '../../actions/category'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import Card from '../../components/blogs/Card'

const Category = ({category , blogs , query}) => {



    const head = () => (
        <Head>
            <title>{category.name} | {APP_NAME}</title>
            <meta
                name="description"
                content={`Best programming tutorial on ${category.name}`}>
            </meta>
            <link rel="canonical"
                href={`${DOMAIN}/categories/${query.slug}`}></link>
            <meta property="og:title"
                content={`${category.name} | ${APP_NAME}`}></meta>
            <meta
                property="og:description"
                content={`Best programming tutorial on ${category.name}`}>
            </meta>
            <meta property="og:type" content="website"></meta>
            <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`}></meta>
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
                    <div className ="container-fluid text-center">
                    <h2 className = "display-4 fw-bold">{category.name}</h2>
                        { blogs.map((b,i) => <div>
                            <Card key = {i} blog = {b}></Card>.
                            <hr/>
                            </div>)}
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    )
}

Category.getInitialProps = ({query}) => {

    return singleCategory(query.slug)
    .then(data => {
        if(data.error){
            console.log(data.error);
        }

        else{

            return {category : data.category , 
                blogs : data.blogs, 
                query
            }
        }
    })
}

export default Category;