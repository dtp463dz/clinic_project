import "./ManageSpecialty.scss";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import ImageUpload from "../../ImageUpload";
import { useState } from "react";
import { createNewSpecialty } from "../../../../services/userService";
import { toast } from 'react-toastify';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
const ManageSpecialty = () => {
    const [image, setImage] = useState("");

    const [formSpecialty, setFormSpecialty] = useState({
        name: '',
        descriptionHTML: '',
        descriptionMarkdown: '',
    })
    const handleImageChange = (base64) => {
        setImage(base64);
        console.log("Ảnh base64:", base64); // Kiểm tra dữ liệu ảnh
    };

    const handleOnChangeInput = (event, id) => {
        const valueInput = event.target.value;
        setFormSpecialty(prevState => ({
            ...prevState,
            [id]: valueInput
        }))
    }

    const handleEditorChange = ({ html, text }) => {
        setFormSpecialty(prevState => ({
            ...prevState,
            descriptionHTML: html,
            descriptionMarkdown: text
        }))
    }

    const handleSaveSpecialty = async () => {
        console.log('Check state: ', {
            Name: formSpecialty.name,
            HTML: formSpecialty.descriptionHTML,
            Markdown: formSpecialty.descriptionMarkdown,
            Image: image
        })

        // call api
        let res = await createNewSpecialty({
            name: formSpecialty.name,
            image: image,
            descriptionHTML: formSpecialty.descriptionHTML,
            descriptionMarkdown: formSpecialty.descriptionMarkdown,
        })
        if (res && res.errCode === 0) {
            toast.success('Tạo chuyên khoa thành công')
        } else {
            toast.error('Tạo chuyên khoa thất bại')
        }
    }
    return (
        <div className="manage-specialty-container">
            <div className="ms-title">Quản lý chuyên khoa</div>
            <div className="add-new-specialty row">
                <div className="col-6 form-group my-3">
                    <label className='title-label mb-2'>Tên chuyên khoa</label>
                    <input
                        className="form-control"
                        type="text"
                        value={formSpecialty.name}
                        onChange={(event) => handleOnChangeInput(event, 'name')}
                    />
                </div>

                <div className="col-6 form-group my-3">
                    <label className="title-label mb-2">Ảnh chuyên khoa</label>
                    <ImageUpload onImageChange={handleImageChange} initialImage={image} />
                </div>
                <div className='specialty-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={handleEditorChange}
                        value={formSpecialty.descriptionMarkdown}
                    />
                </div>
                <div className="col-12 my-3">
                    <button
                        className="btn btn-primary"
                        onClick={handleSaveSpecialty}
                    >Lưu</button>
                </div>
            </div>

        </div>
    )
}
export default ManageSpecialty;