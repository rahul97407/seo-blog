import { Layout } from '../components/Layout.js';
import Link from 'next/link';
import SignupComponent from '../components/auth/SignupComponent'


const Signup = () => {
    return (
        <Layout>
            <h2 className="text-center pt-4 pb-4">Signup page</h2>
            <div className = "row">
                <div className = "col-md-6 offset-md-3">
                    <SignupComponent>

                    </SignupComponent>
                </div>
            </div>
        </Layout>
    );
};

export default Signup;