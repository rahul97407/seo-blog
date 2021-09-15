import { Layout } from '../components/Layout.js';
import Link from 'next/link'
import { isAuth } from '../actions/auth.js';


const Index = () => {
    return (
        <Layout>
            <h2>Index page</h2>

            {!isAuth() && (
                <Link href="/signup">
                    <a>Signup</a>
                </Link>
                )
            }
        </Layout>
    );
};

export default Index;