// ModalEdit.jsx
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import ImageUpload from '../Admin/ImageUpload';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

const mdParser = new MarkdownIt(/* Markdown-it options */);
const ModalEdit = ({ show, onClose, onConfirm, item, type, loading }) => {
    const [formData, setFormData] = useState({
        id: item?.id || '',
        name: item?.name || '',
        address: item?.address || '', // Dùng cho Clinic
        descriptionHTML: item?.descriptionHTML || '',
        descriptionMarkdown: item?.descriptionMarkdown || '',
        image: item?.image || '',
    });
    // Cập nhật formData khi item thay đổi
    useEffect(() => {
        if (item) {
            setFormData({
                id: item.id || '',
                name: item.name || '',
                address: item.address || '',
                descriptionHTML: item.descriptionHTML || '',
                descriptionMarkdown: item.descriptionMarkdown || '',
                image: item.image || '',
            })
        }
    }, [item])
    // thay đổi form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    // thay đổi ảnh
    const handleImageChange = (base64) => {
        setFormData({ ...formData, image: base64 });
    };
    // thay đổi html, markdown
    const handleEditorChange = ({ html, text }) => {
        setFormData({
            ...formData,
            descriptionHTML: html,
            descriptionMarkdown: text
        });
    };
    // Xóa ảnh
    const handleClearImage = () => {
        setFormData({ ...formData, image: '' });
    };
    // submit
    const handleSubmit = () => {
        if (!formData.name || !formData.descriptionHTML || !formData.descriptionMarkdown || !formData.image) {
            toast.error('Vui lòng điền đầy đủ các trường bắt buộc!');
            return;
        }
        if (type === 'Clinic' && !formData.address) {
            toast.error('Vui lòng nhập địa chỉ phòng khám!');
            return;
        }
        if (!formData.image.startsWith('data:image/')) {
            toast.error('Hình ảnh không hợp lệ! Vui lòng chọn file hình ảnh.');
            return;
        }
        onConfirm(formData);
    };

    return (
        <Modal
            show={show}
            onHide={onClose}
            size="lg"
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa {type === 'Clinic' ? 'phòng khám' : 'chuyên khoa'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên {type === 'Clinic' ? 'phòng khám' : 'chuyên khoa'}</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nhập tên..."
                        />
                    </Form.Group>
                    {type === 'Clinic' && (
                        <Form.Group className="mb-3">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Nhập địa chỉ..."
                            />
                        </Form.Group>
                    )}
                    <Form.Group className="mb-3">
                        <Form.Label>Ảnh {type === 'Clinic' ? 'phòng khám' : 'chuyên khoa'}</Form.Label>
                        <ImageUpload onImageChange={handleImageChange} initialImage={formData.image} />
                        {formData.image && (
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={handleClearImage}
                                disabled={loading}
                                className="mt-2"
                            >
                                Xóa ảnh
                            </Button>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả</Form.Label>
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={handleEditorChange}
                            value={formData.descriptionMarkdown}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose} disabled={loading}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Đang lưu...' : 'Lưu'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEdit;