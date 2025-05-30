import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDoctor, getRequiredDoctorInfor, saveDetailDoctor } from '../../../../redux/action/adminAction';
import { getDetailInforDoctor } from '../../../../services/userService';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);


const ManageDoctor = () => {
    // save to markdown table
    const [contentMarkdown, setContentMarkdown] = useState("");
    const [contentHTML, setContentHTML] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [description, setDescription] = useState("");
    const [isEdit, setIsEdit] = useState(false); // hide show edit, save btn
    const allDoctors = useSelector((state) => state.admin.allDoctors)
    const [listDoctors, setListDoctors] = useState([])

    // save to doctor_infor table
    const [listPrice, setListPrice] = useState([]);
    const [listPayment, setListPayment] = useState([]);
    const [listProvince, setListProvince] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState("");
    const [selectedPayment, setSelectedPayment] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [nameClinic, setNameClinic] = useState("");
    const [addressClinic, setAddressClinic] = useState("");
    const [note, setNote] = useState("");

    const allRequiredDoctorInfor = useSelector((state) => state.admin.allRequiredDoctorInfor);
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
        dispatch(getRequiredDoctorInfor());
    }, [dispatch])


    // data input select
    const buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item) => {
                let object = {};
                let label = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueVi;
                object.label = label;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    // Cập nhật danh sách bác sĩ cho Select
    useEffect(() => {
        if (allDoctors && allDoctors.length > 0) {
            let dataSelect = buildDataInputSelect(allDoctors, 'USERS');
            setListDoctors(dataSelect)
        }
        if (allRequiredDoctorInfor && allRequiredDoctorInfor.resPayment) {
            let { resPayment, resPrice, resProvince } = allRequiredDoctorInfor;
            let dataSelectPrice = buildDataInputSelect(resPrice);
            let dataSelectPayment = buildDataInputSelect(resPayment);
            let dataSelectProvince = buildDataInputSelect(resProvince);
            console.log('data new: ', dataSelectPrice, dataSelectPayment, dataSelectProvince)
            setListPrice(dataSelectPrice);
            setListPayment(dataSelectPayment);
            setListProvince(dataSelectProvince);

        }
    }, [allDoctors, allRequiredDoctorInfor])


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
                        placeholder={'Chọn bác sĩ'}
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
            <div className='more-infor-extra row'>
                <div className='col-4 form-group'>
                    <label className='title-label mb-2'>Chọn giá</label>
                    <Select
                        options={listPrice}
                        // value={selectedDoctor}
                        // onChange={handleChangeSelect}
                        placeholder={'Chọn giá'}
                    />
                </div>
                <div className='col-4 form-group'>
                    <label className='title-label mb-2'>Chọn phương thức thanh toán</label>
                    <Select
                        options={listPayment}
                        // value={selectedDoctor}
                        // onChange={handleChangeSelect}
                        placeholder={'Chọn phương thức thanh toán'}
                    />
                </div>
                <div className='col-4 form-group'>
                    <label className='title-label mb-2'>Chọn tỉnh thành</label>
                    <Select
                        options={listProvince}
                        // value={selectedDoctor}
                        // onChange={handleChangeSelect}
                        placeholder={'Chọn tỉnh thành'}
                    />
                </div>
                <div className='col-4 form-group mt-2'>
                    <label className='title-label mb-2'>Tên phòng khám</label>
                    <input className='form-control' />
                </div>
                <div className='col-4 form-group mt-2'>
                    <label className='title-label mb-2'>Địa chỉ phòng khám</label>
                    <input className='form-control' />
                </div>
                <div className='col-4 form-group mt-2'>
                    <label className='title-label mb-2'>Note</label>
                    <input className='form-control' />
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