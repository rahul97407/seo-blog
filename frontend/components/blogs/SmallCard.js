import Link from 'next/link';
import { API } from '../../config';
import moment from 'moment';
import renderHTML from 'react-render-html';


const SmallCard = ({ blog }) => {

    return (
        <div className="card" style = {{ justifyContent : 'space-between'}}>
            <section>
                <Link href={`/blogs/${blog.slug}`}>
                    <a>
                        <img
                            className="img img-fluid"
                            style={{ height: '250px', width: '100%' }}
                            src={`${API}/blog/photo/${blog.slug}`}
                            alt={blog.title}>
                        </img>
                    </a>
                </Link>
            </section>
            <div className="card-body">
                <section>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a><h5 className="card-title mb-3">{blog.title}</h5></a>
                    </Link>
                    <p className="card-text">{renderHTML(blog.excerpt)}</p>
                </section>
            </div>
            <div className="card-body">
                <div>
                    Posted {moment(blog.updatedAt).fromNow()} by {' '}
                    <Link href={`/profile/${blog.postedBy.username}`}>
                        <a>{` ${blog.postedBy.username}`}
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SmallCard;