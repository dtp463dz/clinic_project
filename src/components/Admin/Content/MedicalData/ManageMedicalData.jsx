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
    const { createData } = useCreateMedicalData();
    const [image, setImage] = useState("");
    const [isShowForm, setIsShowForm] = useState(false);
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
    }

    const handleSave = async () => {
        try {
            if (!formData.name || !formData.descriptionHTML || !formData.descriptionMarkdown) {
                toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
                return;
            }
            const data = {
                name: formData.name,
                descriptionHTML: formData.descriptionHTML,
                descriptionMarkdown: formData.descriptionMarkdown,
                image: image || null,
            };

            const res = await createData(entityType, data);
            if (res && res.errCode === 0) {
                toast.success(`Tạo ${entityLabels[entityType].title} thành công`);
                reSetForm();
                setRefreshTable(prev => !prev); // làm mới bảng
            } else {
                toast.error(`Tạo ${entityLabels[entityType].title} thất bại: ${res.errMessage || 'Lỗi không xác định'}`);
            }

        } catch (error) {
            toast.error(`Lỗi khi tạo ${entityLabels[entityType].title}`);
            console.error('Lỗi khi gọi API:', error);
        }
    };
    const toggleForm = () => {
        setIsShowForm(!isShowForm);
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
                            >Lưu</button>
                        </div>
                    </div>
                )}
                <div className="table-container mt-4">
                    <TableMedicalData entityType={entityType} refreshTable={refreshTable} />
                </div>

            </div>

        </div>
    )
}

export default ManageMedicalData