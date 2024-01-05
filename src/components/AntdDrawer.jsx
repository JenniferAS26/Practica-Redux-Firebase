import React, { useState } from "react";
import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateData } from "../store/products/productActions";
import { saveImage } from "../helpers/uploadFile";
import { updateProfileAsync } from "../store/users/userThunks";
const AntdDrawer = () => {
    const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(()=>user.photoURL || "");
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      photoURL: user.photoURL || "",
    },
  });
  console.log(user);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const updateProfile = (data) => {
    data.photoURL = image || user.photoURL;
    data.id = user.id;
    dispatch(updateProfileAsync(data))
  };
  const updateImage = async (e)=>{
    const file = e.target.files[0];
    const imageUrl = await saveImage(file);
    setImage(imageUrl);
  };
  return (
    <>
      <img onClick={showDrawer} src={user.photoURL} alt={user.name} />
      <Drawer title={user.name} placement="right" onClose={onClose} open={open}>
        <img src={image} alt={user.name} />
        <form onSubmit={handleSubmit(updateProfile)}>
          <input type="text" {...register("name")} />
          <input type="email" disabled {...register("email")} />
          <input type="file" {...register("photoURL")} onChange={updateImage}/>
          <button type="submit"> Editar perfil</button>
        </form>
      </Drawer>
    </>
  );
};
export default AntdDrawer;
