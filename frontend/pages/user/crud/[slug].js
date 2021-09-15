import { Layout } from '../../../components/Layout.js';
import Private from '../../../components/auth/Private.js';
import BlogUpdate from '../../../components/crud/BlogUpdate.js';
import Link from 'next/link';


const Blog = () => {
    return (
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Update Blog</h2>
                        </div>
                        <div className="">
                            <BlogUpdate />
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default Blog;