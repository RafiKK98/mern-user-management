import { AiOutlineDoubleLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


const AddUser = () => {

    const navigate = useNavigate();

    const handleAddUser = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const gender = form["radio-gender"].value;
        const status = form["radio-status"].value;
        console.log(name, email, gender, status);
        const newUserData = {name, email, gender, status};

        fetch(`http://localhost:5000/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUserData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'User has been added!',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/');
        })
    }

    return (
        <section>
            <div className="max-w-7xl mx-auto">
                <Link to="/" className="block max-w-fit mt-16">
                    <h4 className="flex items-center gap-2 text-[#5a0ce0] font-semibold">
                        <AiOutlineDoubleLeft /> All Users
                    </h4>
                </Link>
                <div className="text-center mt-4">
                    <h2 className="text-3xl font-semibold text-[#2b2c43] mb-4">New User</h2>
                    <p className="text-base font-normal text-[#afc6e1] mb-4">Use the form below to create a new account</p>
                </div>
                <div>
                    <form onSubmit={handleAddUser} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Name" name="name" className="input input-bordered rounded-none" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Email" name="email" className="input input-bordered rounded-none" required />
                        </div>
                        <div className="form-control flex-row">
                            <label className="label mr-5">
                                <span className="label-text">Gender</span>
                            </label>
                            <div className="flex items-center gap-3">
                                <input type="radio" name="radio-gender" value="Male" className="radio checked:bg-[#16da92]" /> Male
                                <input type="radio" name="radio-gender" value="Female" className="radio checked:bg-[#16da92]" /> Female
                            </div>
                        </div>
                        <div className="form-control flex-row">
                            <label className="label mr-5">
                                <span className="label-text">Status</span>
                            </label>
                            <div className="flex items-center gap-3">
                                <input type="radio" name="radio-status" value="Active" className="radio checked:bg-[#16da92]" /> Active
                                <input type="radio" name="radio-status" value="Inactive" className="radio checked:bg-[#16da92]" /> Inactive
                            </div>
                        </div>
                        
                        <div className="form-control mt-6">
                            <button className="btn normal-case text-white bg-[#16da92] rounded-sm hover:brightness-90 hover:bg-[#16da92]">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default AddUser