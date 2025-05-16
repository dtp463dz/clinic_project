import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDoctor, saveDetailDoctor } from '../../../../redux/action/adminAction';
import { getDetailInforDoctor } from '../../../../services/userService';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);


const ManageDoctor = () => {
    const [contentMarkdown, setContentMarkdown] = useState("");
    const [contentHTML, setContentHTML] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [description, setDescription] = useState("");
    const [isEdit, setIsEdit] = useState(false); // hide show edit, save btn
    // Xử lý thay đổi nội dung Markdown
    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html);
        setContentMarkdown(text);
    }
    // reset form
    const resetForm = () => {
        setSelectedDoctor(null); // Reset về null cho react-select
        setContentHTML('');
        setContentMarkdown('');
        setDescription(''); // Reset description
        setIsEdit(false);
    };
    const handleSaveContentMarkdown = () => {
        console.log('State values:', {
            contentMarkdown,
            contentHTML,
            selectedDoctor,
            description,
            listDoctors
        });

        dispatch(saveDetailDoctor({
            contentHTML: contentHTML,
            contentMarkdown: contentMarkdown,
            description: description,
            doctorId: selectedDoctor.value,
            action: isEdit === true ? "EDIT" : "CREATE",
        }));
        resetForm()
    }
    const handleChangeSelect = async (selectedOption) => {

        setSelectedDoctor(selectedOption)
        let res = await getDetailInforDoctor(selectedOption.value) // lay thong tin chi tiet bac si
        if (res && res.errCode === 0 && res.data && res.data.Markdown.description) {
            let markdown = res.data.Markdown;
            setContentMarkdown(markdown.contentMarkdown)
            setContentHTML(markdown.contentMarkdown)
            setDescription(markdown.description);
            setIsEdit(true);
        } else {
            setContentMarkdown('');
            setContentHTML('');
            setDescription('');
            setIsEdit(false);
        }
        console.log('Option selected:', res);
    }
    const handleOnChangeDes = (event) => {
        setDescription(event.target.value);
        // console.log('description', event.target.value)
    }

    const dispatch = useDispatch();
    // Lấy danh sách bác sĩ khi component mount
    useEffect(() => {
        dispatch(fetchAllDoctor());
    }, [dispatch])

    const allDoctors = useSelector((state) => state.admin.allDoctors)
    const [listDoctors, setListDoctors] = useState([])
    // Cập nhật danh sách bác sĩ cho Select
    useEffect(() => {
        if (allDoctors && allDoctors.length > 0) {
            let dataSelect = buildDataInputSelect(allDoctors);
            setListDoctors(dataSelect)
        }
    }, [allDoctors])

    // data input select
    const buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let label = `${item.firstName} ${item.lastName}`;
                object.label = label;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }
    return (
        <div className='manage-doctor-container'>
            <div className='title'>Thêm Thông Tin Bác Sĩ</div>
            <div className='more-infor'>
                <div className='content-left form-group'>
                    <div className='title-label mb-2'>Chọn Bác Sĩ</div>
                    <Select
                        options={listDoctors}
                        value={selectedDoctor}
                        onChange={handleChangeSelect}
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
                    value={contentMarkdown}
                />
            </div>
            <button
                className={isEdit ? "save-content-doctor btn btn-warning" : "save-content-doctor btn btn-primary"}
                onClick={() => handleSaveContentMarkdown()}
            >
                {isEdit ? "Sửa thông tin" : "Lưu thông tin"}</button>
        </div>
    )
}
export default ManageDoctor;