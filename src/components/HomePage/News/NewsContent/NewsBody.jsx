import { useState, useEffect } from 'react';
import { getAllHandBook } from '../../../../services/handbookService';
import { useNavigate } from 'react-router-dom';
import './NewsBody.scss';
import Pagination from '../../../Pagination/Pagination';

const NewsBody = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 8;
    const navigate = useNavigate();

    // Hàm cắt text để làm tóm tắt
    const truncateText = (text, maxLength) => {
        if (!text) return '';
        const cleanText = text.replace(/<[^>]+>/g, ''); // bỏ tag HTML
        return cleanText.length > maxLength
            ? cleanText.slice(0, maxLength) + '...'
            : cleanText;
    };

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const response = await getAllHandBook(page, limit);
                if (response.errCode === 0) {
                    const data = response.data?.handbooks || [];
                    setNewsItems(data);
                    setTotalPages(Math.ceil((response.data?.total || 0) / limit));
                } else {
                    console.error(response.errMessage);
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách tin tức:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [page]);

    if (loading) {
        return <div className="loading">Đang tải...</div>;
    }

    if (newsItems.length === 0) {
        return <div className="no-news">Không có tin tức nào.</div>;
    }

    const mainPost = newsItems[0];
    const sidePosts = newsItems.slice(1, 4);
    const gridPosts = newsItems.slice(4);

    return (
        <main className="news-body">
            <div className="container">
                <h2>Tin tức y tế</h2>

                {/* Hàng đầu */}
                <div className="top-news">
                    {/* Bài chính */}
                    {mainPost && (
                        <article
                            className="main-post"
                            onClick={() => navigate(`/detail-handbook/${mainPost.id}`)}
                        >
                            <img src={mainPost.image} alt={mainPost.title} />
                            <div className="post-info">
                                <span className="category">Tin tức BookingHealth</span>
                                <h3>{mainPost.title}</h3>
                                <p className="summary">
                                    {truncateText(mainPost.description || mainPost.contentHTML, 150)}
                                </p>
                                <p className="date">
                                    Ngày đăng: {new Date(mainPost.createdAt).toLocaleDateString('vi-VN')}
                                </p>
                            </div>
                        </article>
                    )}

                    {/* 2 bài phụ */}
                    <div className="side-posts">
                        {sidePosts.map((post) => (
                            <article
                                key={post.id}
                                className="side-post"
                                onClick={() => navigate(`/detail-handbook/${post.id}`)}
                            >
                                <img src={post.image} alt={post.title} />
                                <div className="post-info">
                                    <span className="category">Tin tức BookingHealth</span>
                                    <h4>{post.title}</h4>
                                    <p className="summary">
                                        {truncateText(post.description || post.contentHTML, 80)}
                                    </p>
                                    <p className="date">
                                        Ngày đăng: {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                {/* Grid bài viết */}
                <div className="grid-posts">
                    {gridPosts.map((post) => (
                        <article
                            key={post.id}
                            className="grid-post"
                            onClick={() => navigate(`/detail-handbook/${post.id}`)}
                        >
                            <img src={post.image} alt={post.title} />
                            <div className="post-info">
                                <span className="category">Tin tức BookingHealth</span>
                                <h5>{post.title}</h5>
                                <p className="summary">
                                    {truncateText(post.description || post.contentHTML, 60)}
                                </p>
                                <p className="date">
                                    Ngày đăng: {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={(newPage) => setPage(newPage)}
                    />
                )}
            </div>
        </main>
    );
};

export default NewsBody;
