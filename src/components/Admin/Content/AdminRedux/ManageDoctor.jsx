import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'
import { useState } from 'react';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);


const ManageDoctor = () => {
    const [contentMarkdown, setContentMarkdown] = useState("");
    const [contentHTML, setContentHTML] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [description, setDescription] = useState("");
    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html);
        setContentMarkdown(text);
    }
    const handleSaveContentMarkdown = () => {
        console.log('State values:', {
            contentMarkdown,
            contentHTML,
            selectedDoctor,
            description
        });

    }
    const handleChange = (selectedOption) => {
        setSelectedDoctor(selectedOption)
        console.log('Option selected:', selectedOption);
    }
    const handleOnChangeDes = (event) => {
        setDescription(event.target.value);
        // console.log('description', event.target.value)
    }

    return (
        <div className='manage-doctor-container'>
            <div className='title'>Thêm Thông Tin Bác Sĩ</div>
            <div className='more-infor'>
                <div className='content-left form-group'>
                    <div className='title-label mb-2'>Chọn Bác Sĩ</div>
                    <Select
                        options={options}
                        value={selectedDoctor}
                        onChange={handleChange}
                    />

                </div>
                <div className='content-right'>
                    <div className='title-label mb-2'>Thông tin giới thiệu</div>
                    <textarea className='form-control' rows="4"
                        value={description}
                        onChange={handleOnChangeDes}>

                    </textarea>
                </div>
            </div>

            <div className='manage-doctor-editor'>
                <MdEditor
                    style={{ height: '500px' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={handleEditorChange}
                />
            </div>
            <button
                className='save-content-doctor btn btn-primary'
                onClick={() => handleSaveContentMarkdown()}
            >
                Lưu thông tin</button>
        </div>
    )
}
export default ManageDoctor;