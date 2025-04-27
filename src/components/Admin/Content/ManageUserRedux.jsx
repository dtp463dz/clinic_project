import { FcPlus } from "react-icons/fc";
import { getAllCodeService } from "../../../services/apiService";
import { useEffect, useState } from "react";

const ManageUserRedux = () => {
    const [genderArr, setGenderArr] = useState('');
    // componentDidMount
    useEffect(() => {
        fetchListType();
    }, []);

    // call api allcode(type)
    const fetchListType = async () => {
        let res = await getAllCodeService('gender');
        if (res && res.errCode === 0) {
            setGenderArr(res.data);
        }
        console.log('check res: ', res);

    }
    return (

        <div className="user-redux-container">
            <div className="title h3 px-4 py-2">
                User Redux
            </div>
            <div className="user-redux-body">
                <div className="container">
                    <div className="form-row d-flex">
                        <div className="form-group col-5 px-3">
                            <label >Email</label>
                            <input type="email" className="form-control" placeholder="Email" />
                        </div>
                        <div className="form-group col-5">
                            <label >Password</label>
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>
                    </div>
                    <div className="form-row d-flex py-2">
                        <div className="form-group col-5 px-3 py-2">
                            <label >First Name</label>
                            <input type="text" className="form-control" placeholder="First Name" />
                        </div>
                        <div className="form-group col-5 py-2">
                            <label >Last Name</label>
                            <input type="text" className="form-control" placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="form-row d-flex ">
                        <div className="form-group col-3 px-3">
                            <label >Phonenumber</label>
                            <input type="text" className="form-control" placeholder="....." />
                        </div>
                        <div className="form-group col-7 ">
                            <label >Address</label>
                            <input type="text" className="form-control" placeholder="1234 Main St" />
                        </div>
                    </div>
                    <div className="form-row d-flex py-3">
                        <div className="form-group col-2 px-3">
                            <label >Gender</label>
                            <select className="form-control">
                                {genderArr && genderArr.length > 0 &&
                                    genderArr.map((item, index) => {
                                        return (
                                            <option key={index}>{item.valueEn}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group col-2 px-3">
                            <label >Position</label>
                            <select className="form-control">
                                <option >Choose...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div className="form-group col-2 px-3">
                            <label >RoleId</label>
                            <select className="form-control">
                                <option >Choose...</option>
                                <option>...</option>
                            </select>
                        </div>

                    </div>
                    <div className='form-group col-md-12 px-3'>
                        <label className="form-label label-upload" htmlFor='labelUpload'>
                            <FcPlus />Upload File Image
                        </label>
                        <input
                            type="file"
                            hidden
                        />
                        <div className='col-md-12 img-preview'>
                            <span>Preview Image</span>
                        </div>
                    </div>

                    <div className="form-group px-3 mt-3">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>

                </div>

            </div>



        </div>
    )
}

export default ManageUserRedux;