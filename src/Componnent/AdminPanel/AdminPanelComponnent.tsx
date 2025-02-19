/* eslint-disable jsx-a11y/heading-has-content */
import HeaderAdmin from "./HeaderAdmin";
import { useStore } from "../../Store/Store";
import { Link, Outlet } from "react-router-dom";
import { RiUserForbidFill } from "react-icons/ri";
export default function AdminPanelComponnent() {
  const { IsAdmin } = useStore();
  return (
    <>
      {IsAdmin && (
        <div className="bg-blue-50 w-full h-screen">
          <HeaderAdmin />
          <Outlet />
        </div>
      )}
      {
        !IsAdmin &&(
          <div className="w-full flex items-center justify-center flex-col h-screen">
            <div className="flex items-center text-3xl">
            <h2 className="font-Byekan">
            شما به این صفحه دسترسی ندارید لطفا لاگین کنید
            </h2>
            <span className="text-red-600"><RiUserForbidFill/></span>

            </div>
           <div className="bg-blue-500 px-5 py-3 text-white my-4 rounded-md hover:scale-110 duration-200">
           <Link to="/signIn">لاگین</Link>

           </div>
          </div>
        )
      }
    </>
  );
}
