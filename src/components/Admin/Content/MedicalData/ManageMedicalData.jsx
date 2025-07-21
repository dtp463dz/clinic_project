import { useState } from "react";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-toastify';
import ImageUpload from "../../ImageUpload";
import useCreateMedicalData from "../../../../hooks/useCreateMedicalData";
import TableMedicalData from "./TableMedicalData";
import "../../../../styles/manageStyle.scss";

const mdParser = new MarkdownIt(/* Markdown-it options */);
const ManageMedicalData = ({ entityType }) => {
    const { createData, updateData } = useCreateMedicalData();
    const [image, setImage] = useState("");
    const [isShowForm, setIsShowForm] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        descriptionHTML: '',
        descriptionMarkdown: '',
    });
    const [refreshTable, setRefreshTable] = useState(false);

    const entityLabels = {
        symptoms: {
            title: 'Triệu chứng',
            nameLabel: 'Tên triệu chứng'
        },
        drugs: {
            title: 'Thuốc',
            nameLabel: 'Tên thuốc'
        },
        herbs: {
            title: 'Dược liệu',
            nameLabel: 'Tên dược liệu',
        },
        bodyParts: {
            title: 'Bộ phận cơ thể',
            nameLabel: 'Tên bộ phận'
        }
    };
    // Kiểm tra entityType hợp lệ
    if (!entityLabels[entityType]) {
        return (
            <div className="manage-medical-data-container">
                <div className="ms-title">Lỗi: Loại thực thể không hợp lệ</div>
                <p>Vui lòng kiểm tra giá trị entityType được truyền vào. Các giá trị hợp lệ: symptom, drug, herbs, bodyParts.</p>
            </div>
        );
    }

    const reSetForm = () => {
        setImage('');
        setFormData({
            name: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        });
        setIsEditMode(false);
        setEditId(null);
        setIsShowForm(false);
    };

    const handleImageChange = (base64) => {
        setImage(base64);
    }

    const handleEditorChange = ({ html, text }) => {
        setFormData(prevState => ({
            ...prevState,
            descriptionHTML: html,
            descriptionMarkdown: text
        }))
    }

    const handleOnChangeInput = (event, id) => {
        const valueInput = event.target.value;
        setFormData(prevState => ({
            ...prevState,
            [id]: valueInput
        }))
    };
    const handleEdit = (item) => {
        setFormData({
            name: item.name,
            descriptionHTML: item.descriptionHTML,
            descriptionMarkdown: item.descriptionMarkdown,
        });
        setImage(item.image || '');
        setIsEditMode(true);
        setEditId(item.id);
        setIsShowForm(true);
    };
    const validateForm = () => {
        // Kiểm tra tên
        if (!formData.name) {
            toast.error(`${entityLabels[entityType].nameLabel} không được để trống`);
            return false;
        }
        if (formData.name.length < 3) {
            toast.error(`${entityLabels[entityType].nameLabel} phải có ít nhất 3 ký tự`);
            return false;
        }

        // Kiểm tra descriptionMarkdown
        if (!formData.descriptionMarkdown) {
            toast.error('Mô tả Markdown không được để trống');
            return false;
        }
        if (formData.descriptionMarkdown.length < 10) {
            toast.error('Mô tả Markdown phải có ít nhất 10 ký tự');
            return false;
        }

        // Kiểm tra descriptionHTML
        if (!formData.descriptionHTML) {
            toast.error('Mô tả HTML không được để trống');
            return false;
        }

        // Kiểm tra image (nếu có)
        if (image && !image.startsWith('data:image/')) {
            toast.error('Ảnh không đúng định dạng base64');
            return false;
        }

        return true;
    };

    const handleSave = async () => {
        try {
            if (!validateForm()) {
                return;
            }

            const data = {
                id: isEditMode ? editId : null,
                name: formData.name,
                descriptionHTML: formData.descriptionHTML,
                descriptionMarkdown: formData.descriptionMarkdown,
                image: image || null,
            };
            let res;
            if (isEditMode) {
                res = await updateData(entityType, data);
            } else {
                res = await createData(entityType, data);
            }
            if (res && res.errCode === 0) {
                toast.success(`${isEditMode ? 'Cập nhật' : 'Tạo'} ${entityLabels[entityType].title} thành công`);
                reSetForm();
                setRefreshTable(prev => !prev); // Làm mới bảng
            } else {
                toast.error(`${isEditMode ? 'Cập nhật' : 'Tạo'} ${entityLabels[entityType].title} thất bại: ${res.errMessage || 'Lỗi không xác định'}`);
            }

        } catch (error) {
            toast.error(`Lỗi khi ${isEditMode ? 'cập nhật' : 'tạo'} ${entityLabels[entityType].title}`);
            console.error('Lỗi khi gọi API:', error);
        }
    };
    const toggleForm = () => {
        if (isShowForm && isEditMode) {
            reSetForm();
        } else {
            setIsShowForm(!isShowForm);
        }
    };

    return (
        <div className="manage-medical-data-container">
            <div className="ms-title">Quản lý {entityLabels[entityType].title}</div>
            <div className="add-new-medical-data">
                <button className="btn btn-primary my-3" onClick={toggleForm}>
                    {isShowForm ? `Ẩn Form` : `Thêm ${entityLabels[entityType].title}`}
                </button>
                {isShowForm && (
                    <div className="form-container row">
                        <div className="col-6 form-group my-3">
                            <label className="title-label mb-2">{entityLabels[entityType].nameLabel}</label>
                            <input
                                className="form-control"
                                type="text"
                                value={formData.name}
                                onChange={(event) => handleOnChangeInput(event, 'name')}
                            />
                        </div>
                        <div className="col-6 form-group my-3">
                            <label className="title-label mb-2">Ảnh {entityLabels[entityType].title}</label>
                            <ImageUpload onImageChange={handleImageChange} initialImage={image} />
                        </div>
                        <div className="medical-data-editor">
                            <MdEditor
                                style={{ height: '500px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={handleEditorChange}
                                value={formData.descriptionMarkdown}
                            />
                        </div>
                        <div className="col-12 my-3">
                            <button
                                className="btn btn-primary"
                                onClick={handleSave}
                            >{isEditMode ? 'Cập nhật' : 'Lưu'}</button>
                        </div>
                    </div>
                )}
                <div className="table-container mt-4">
                    <TableMedicalData
                        entityType={entityType}
                        refreshTable={refreshTable}
                        onEdit={handleEdit}
                    />
                </div>

            </div>

        </div>
    )
}

export default ManageMedicalData