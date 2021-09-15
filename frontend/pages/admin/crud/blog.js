import { Layout } from '../../../components/Layout.js';
import Admin from '../../../components/auth/Admin.js';
import BlogCreate from '../../../components/crud/BlogCreate.js';
import Link from 'next/link';


const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Create a new Blog</h2>
                        </div>
                        <div className="">
                            <BlogCreate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Blog;