import { Layout } from '../../../components/Layout.js';
import Private from '../../../components/auth/Private.js';
import BlogRead from '../../../components/crud/BlogRead.js';
import Link from 'next/link';
import {isAuth} from '../../../actions/auth'


const Blogs = () => {

    const username = isAuth() && isAuth().username;

    return (
        <Layout>
            <Private>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Manage Blog</h2>
                        </div>
                        <div>
                            <BlogRead username = {username}/>
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default Blogs;