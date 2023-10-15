import { Link, useLoaderData } from "react-router-dom";
import { BiSolidUser } from "react-icons/bi";
import { BsPencilFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import Swal from 'sweetalert2';

function App() {

    const loadedUsers = useLoaderData();
    const [ users, setUsers ] = useState(loadedUsers);

    const handleDelete = _id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/users/${_id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    Swal.fire(
                        'Deleted!',
                        'User has been deleted.',
                        'success'
                    )
                        const remaining = users.filter(user => user._id != _id);
                        setUsers(remaining);
                    }
                })
            }
        })
    }

    return (
        <main>
            <div className="max-w-7xl mx-auto overflow-x-auto">
                <Link to="/add-user" className="block max-w-fit mt-16">
                    <button className="btn normal-case flex items-center py-2 px-4 border text-[#5a0ce0] hover:bg-[#5a0ce0] hover:text-white">New User <BiSolidUser className="ml-2" /> </button>
                </Link>
                <div className="mt-10">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#2b2c43] text-[#FFFFF8]">
                            <tr>
                                <th className="text-lg text-center">ID</th>
                                <th className="text-lg text-center">Name</th>
                                <th className="text-lg text-center">@Email</th>
                                <th className="text-lg text-center">Gender</th>
                                <th className="text-lg text-center">Status</th>
                                <th className="text-lg text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {/* <tr className="hover">
                                <th className="text-lg text-center">1</th>
                                <td className="text-lg text-center">Prathmesh Asole</td>
                                <td className="text-lg text-center">18prathmeshasole@gmail.com</td>
                                <td className="text-lg text-center">Male</td>
                                <td className="text-lg text-center">Inactive</td>
                                <td className="text-lg flex justify-center gap-2">
                                    <button className="btn text-[#5a0ce0] py-2 px-3 border shadow-md hover:bg-[#5a0ce0] hover:text-white"><BsPencilFill /></button>
                                    <button className="btn text-[#5a0ce0] py-2 px-3 border shadow-md hover:bg-[#5a0ce0] hover:text-white"><ImCross /></button>
                                </td>
                            </tr> */}
                            {
                                users.map((user, userIdx) => (
                                    <tr key={user._id} className="hover">
                                        <th className="text-lg text-center">{userIdx + 1}</th>
                                        <td className="text-lg text-center">{user.name}</td>
                                        <td className="text-lg text-center">{user.email}</td>
                                        <td className="text-lg text-center">{user?.gender}</td>
                                        <td className="text-lg text-center">{user?.status}</td>
                                        <td className="text-lg flex justify-center gap-2">
                                            <Link to={`/update-user/${user._id}`}>
                                                <button className="btn text-[#5a0ce0] py-2 px-3 border shadow-md hover:bg-[#5a0ce0] hover:text-white"><BsPencilFill /></button>
                                            </Link>
                                            <button onClick={() => handleDelete(user._id)} className="btn text-red-600 py-2 px-3 border shadow-md hover:bg-red-600 hover:text-white"><ImCross /></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}

export default App
