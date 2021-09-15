import { Layout } from '../../../components/Layout.js';
import Admin from '../../../components/auth/Admin.js';
import BlogRead from '../../../components/crud/BlogRead.js';
import Link from 'next/link';


const Blogs = () => {
    return (
        <Layout>
            <Admin>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Manage Blog</h2>
                        </div>
                        <div>
                            <BlogRead />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Blogs;