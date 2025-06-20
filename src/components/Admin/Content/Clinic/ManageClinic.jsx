import "./ManageClinic.scss";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import ImageUpload from "../../ImageUpload";
import { useState } from "react";
import { toast } from 'react-toastify';
import { createNewClinic } from "../../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);
const ManageClinic = () => {
    const [image, setImage] = useState("");

    const [formClinic, setFormClinic] = useState({
        name: '',
        address: '',
        descriptionHTML: '',
        descriptionMarkdown: '',
    })

    const reSetForm = () => {
        setImage('')
        setFormClinic({
            name: '',
            address: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        })
    }
    const handleImageChange = (base64) => {
        setImage(base64);
        console.log("Ảnh base64:", base64); // Kiểm tra dữ liệu ảnh
    };

    const handleOnChangeInput = (event, id) => {
        const valueInput = event.target.value;
        setFormClinic(prevState => ({
            ...prevState,
            [id]: valueInput
        }))
    }

    const handleEditorChange = ({ html, text }) => {
        setFormClinic(prevState => ({
            ...prevState,
            descriptionHTML: html,
            descriptionMarkdown: text
        }))
    }

    const handleSaveClinic = async () => {
        console.log('Check state: ', {
            Name: formClinic.name,
            Addres: formClinic.address,
            HTML: formClinic.descriptionHTML,
            Markdown: formClinic.descriptionMarkdown,
            Image: image
        })

        // call api
        let res = await createNewClinic({
            name: formClinic.name,
            address: formClinic.address,
            descriptionHTML: formClinic.descriptionHTML,
            descriptionMarkdown: formClinic.descriptionMarkdown,
            image: image,
        })
        if (res && res.errCode === 0) {
            toast.success('Tạo phòng khám thành công')
            reSetForm()
        } else {
            toast.error('Tạo phòng khám thất bại')
        }


    }
    return (
        <div className="manage-specialty-container">
            <div className="ms-title">Quản lý phòng khám</div>
            <div className="add-new-specialty row">
                <div className="col-6 form-group my-3">
                    <label className='title-label mb-2'>Tên phòng khám</label>
                    <input
                        className="form-control"
                        type="text"
                        value={formClinic.name}
                        onChange={(event) => handleOnChangeInput(event, 'name')}
                    />
                </div>
                <div className="col-6 form-group my-3">
                    <label className="title-label mb-2">Địa chỉ phòng khám</label>
                    <input
                        className="form-control"
                        type="text"
                        value={formClinic.address}
                        onChange={(event) => handleOnChangeInput(event, 'address')}
                    />
                </div>

                <div className="col-12 form-group my-3">
                    <label className="title-label mb-2">Ảnh phòng khám</label>
                    <ImageUpload onImageChange={handleImageChange} initialImage={image} />
                </div>

                <div className='specialty-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={handleEditorChange}
                        value={formClinic.descriptionMarkdown}
                    />
                </div>
                <div className="col-12 my-3">
                    <button
                        className="btn btn-primary"
                        onClick={handleSaveClinic}
                    >Lưu</button>
                </div>
            </div>

        </div>
    )
}
export default ManageClinic;